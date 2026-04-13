const fs = require('fs');
const { pipeline } = require('stream/promises');
const { Transform } = require('stream');
const zlib = require('zlib');

module.exports = {
    copyFileWithStream: async (src, dest) => await pipeline(fs.createReadStream(src), fs.createWriteStream(dest)),

    readLargeFile: (filePath, onChunk) => new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
        stream.on('data', onChunk).on('end', resolve).on('error', reject);
    }),

    /** Ghi file lớn sử dụng Generator để tạo dữ liệu */
    writeLargeFile: async (filePath, dataGenerator) => {
        const writeStream = fs.createWriteStream(filePath);
        for (const chunk of dataGenerator()) {
            if (!writeStream.write(chunk)) {
                await new Promise(resolve => writeStream.once('drain', resolve));
            }
        }
        writeStream.end();
    },

    /** Transform dữ liệu qua stream */
    transformStream: (input, transformFn) => {
        const transformer = new Transform({
            transform(chunk, encoding, callback) {
                callback(null, transformFn(chunk.toString()));
            }
        });
        return input.pipe(transformer);
    },

    pipelineAsync: async (streams) => await pipeline(...streams),

    compressFile: async (src, dest) => await pipeline(fs.createReadStream(src), zlib.createGzip(), fs.createWriteStream(dest)),
    
    decompressFile: async (src, dest) => await pipeline(fs.createReadStream(dest), zlib.createGunzip(), fs.createWriteStream(src))
};