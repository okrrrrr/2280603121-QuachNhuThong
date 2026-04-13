/**
 * Module xử lý dữ liệu nhị phân với Buffer
 * @module BufferOperations
 */

module.exports = {
    /** Tạo buffer với kích thước xác định (đã xóa dữ liệu cũ) */
    createBuffer: (size) => Buffer.alloc(size),

    /** Tạo buffer từ string với encoding (utf8, base64, hex...) */
    fromString: (str, encoding = 'utf8') => Buffer.from(str, encoding),

    /** Chuyển buffer ngược lại thành string */
    toString: (buffer, encoding = 'utf8') => buffer.toString(encoding),

    /** Nối nhiều buffers thành một */
    concat: (buffers) => Buffer.concat(buffers),

    /** So sánh hai buffers (0: bằng, 1: buf1 > buf2, -1: buf1 < buf2) */
    compare: (buf1, buf2) => Buffer.compare(buf1, buf2),

    /** Copy nội dung từ buffer nguồn sang đích */
    copy: (source, target) => source.copy(target),

    /** Cắt buffer (tạo view mới, không copy dữ liệu) */
    slice: (buffer, start, end) => buffer.subarray(start, end)
};