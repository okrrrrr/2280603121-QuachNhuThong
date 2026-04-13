const commandExecutor = require('../src/bai6_2_command_executor');

describe('Command Executor Module', () => {
    test('execAsync should execute echo command', async () => {
        const { stdout } = await commandExecutor.execAsync('echo hello');
        expect(stdout.trim()).toBe('hello');
    });

    test('parallelExec should execute multiple commands', async () => {
        const results = await commandExecutor.parallelExec(['echo 1', 'echo 2']);
        expect(results[0].stdout.trim()).toBe('1');
        expect(results[1].stdout.trim()).toBe('2');
    });

    test('execWithTimeout should work for quick commands', async () => {
        const { stdout } = await commandExecutor.execWithTimeout('echo ok', 1000);
        expect(stdout.trim()).toBe('ok');
    });
});
