const fs = require('fs');
const { Transform, pipeline } = require('stream');
const { pipeline: pipelinePromise } = require('stream/promises');

module.exports = {
    /** Parse CSV đơn giản (Giả định dòng đầu là header, phân tách bằng dấu phẩy) */
    parseCSVStream: (filePath) => {
        let headers = [];
        return fs.createReadStream(filePath, { encoding: 'utf8' })
            .pipe(new Transform({
                objectMode: true,
                transform(chunk, encoding, callback) {
                    const lines = chunk.toString().split('\n').filter(l => l.trim());
                    lines.forEach((line, index) => {
                        const values = line.split(',');
                        if (index === 0 && headers.length === 0) {
                            headers = values;
                        } else {
                            const obj = {};
                            headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim());
                            this.push(obj);
                        }
                    });
                    callback();
                }
            }));
    },

    /** Ghi CSV từ mảng Objects */
    writeCSVStream: async (filePath, data, headers) => {
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(headers.join(',') + '\n');
        data.forEach(row => {
            const line = headers.map(h => row[h]).join(',');
            writeStream.write(line + '\n');
        });
        writeStream.end();
    },

    /** Lọc dữ liệu CSV và ghi ra file mới */
    filterCSV: async (inputPath, outputPath, filterFn) => {
        const readStream = fs.createReadStream(inputPath, { encoding: 'utf8' });
        const writeStream = fs.createWriteStream(outputPath);
        let headers = '';

        const filterTransform = new Transform({
            transform(chunk, encoding, callback) {
                const lines = chunk.toString().split('\n');
                if (!headers) headers = lines.shift();
                const filtered = lines.filter(line => line && filterFn(line));
                callback(null, (headers + '\n' + filtered.join('\n')).trim());
                headers = 'processed'; // Đánh dấu đã xong header
            }
        });
        await pipelinePromise(readStream, filterTransform, writeStream);
    }
};