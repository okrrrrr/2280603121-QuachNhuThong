const { exec, spawn } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

/**
 * Bài 6.2: Command Executor
 * 
 * Module thực thi các lệnh hệ thống (child_process)
 * @module commandExecutor
 */

/**
 * Thực thi lệnh bất đồng bộ
 * @param {string} command - Câu lệnh
 * @returns {Promise<{stdout: string, stderr: string}>}
 */
async function runExecAsync(command) {
    return await execAsync(command);
}

/**
 * Thực thi lệnh với thời gian chờ tối đa
 * @param {string} command - Câu lệnh
 * @param {number} timeout - Thời gian chờ (ms)
 * @returns {Promise<any>}
 */
function execWithTimeout(command, timeout) {
    return new Promise((resolve, reject) => {
        const child = exec(command, (error, stdout, stderr) => {
            if (error) {
                if (error.killed) reject(new Error('Process timed out'));
                else reject(error);
                return;
            }
            resolve({ stdout, stderr });
        });

        setTimeout(() => {
            child.kill();
        }, timeout);
    });
}

/**
 * Spawn một child process mới
 * @param {string} command - Câu lệnh
 * @param {string[]} args - Tham số
 * @returns {ChildProcess}
 */
function runSpawn(command, args = []) {
    return spawn(command, args);
}

/**
 * Chạy một file script (ví dụ file .js hoặc .sh)
 * @param {string} scriptPath - Đường dẫn script
 * @returns {Promise<any>}
 */
async function runScript(scriptPath) {
    const extension = scriptPath.split('.').pop();
    let cmd = '';
    if (extension === 'js') cmd = `node ${scriptPath}`;
    else if (extension === 'sh') cmd = `sh ${scriptPath}`;
    else cmd = scriptPath;

    return await runExecAsync(cmd);
}

/**
 * Thực thi nhiều lệnh song song
 * @param {string[]} commands - Danh sách câu lệnh
 * @returns {Promise<any[]>}
 */
async function parallelExec(commands) {
    return Promise.all(commands.map(cmd => runExecAsync(cmd)));
}

/**
 * Pipe output của lệnh này sang lệnh kia
 * @param {string[]} commands - Danh sách các lệnh cần pipe
 * @returns {Promise<string>} Output cuối cùng
 */
function pipeCommands(commands) {
    return new Promise((resolve, reject) => {
        let currentProcess;
        let lastProcess;

        for (let i = 0; i < commands.length; i++) {
            const [cmd, ...args] = commands[i].split(/\s+/);
            currentProcess = spawn(cmd, args);

            if (lastProcess) {
                lastProcess.stdout.pipe(currentProcess.stdin);
            }

            lastProcess = currentProcess;
        }

        let output = '';
        currentProcess.stdout.on('data', data => {
            output += data.toString();
        });

        currentProcess.on('close', code => {
            if (code === 0) resolve(output);
            else reject(new Error(`Process chain failed with code ${code}`));
        });
    });
}

module.exports = {
    execAsync: runExecAsync,
    execWithTimeout,
    spawn: runSpawn,
    runScript,
    parallelExec,
    pipeCommands
};
