const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const { connectDB, disconnectDB } = require("../src/config/db");
const User = require("../src/models/user.model");

jest.setTimeout(30000);
const TEST_MONGO_URI = process.env.TEST_MONGO_URI || "mongodb://127.0.0.1:27017/node_auth_test";

let adminToken, staffToken, inspectorToken, passengerToken;

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    process.env.ACCESS_TOKEN_SECRET = "metro_access_premium_key_2024";
    process.env.REFRESH_TOKEN_SECRET = "metro_refresh_secure_key_2024";
    await connectDB(TEST_MONGO_URI);
});

afterAll(async () => {
    await disconnectDB();
});

beforeEach(async () => {
    await User.deleteMany({});
    const pw = await bcrypt.hash("password123", 10);

    await User.create({ name: "Admin Metro", email: "admin@metro.vn", password: pw, role: "admin" });
    await User.create({ name: "Staff Station", email: "staff@metro.vn", password: pw, role: "staff" });
    await User.create({ name: "Inspector Line 1", email: "inspector@metro.vn", password: pw, role: "inspector" });
    await User.create({ name: "Passenger Metro", email: "passenger@metro.vn", password: pw, role: "passenger" });

    // Đăng nhập để lấy Token
    const getRes = async (email) => request(app).post("/api/auth/login").send({ email, password: "password123" });

    adminToken = (await getRes("admin@metro.vn")).body.data.accessToken;
    staffToken = (await getRes("staff@metro.vn")).body.data.accessToken;
    inspectorToken = (await getRes("inspector@metro.vn")).body.data.accessToken;
    passengerToken = (await getRes("passenger@metro.vn")).body.data.accessToken;
});

describe("Các API dịch vụ Metro", () => {
    describe("Check-in: Xác nhận vào trạm (POST /api/metro/tickets/:ticketCode/validate-entry)", () => {
        test("PASS: Nhân viên ga (staff) có quyền cho phép hành khách vào trạm", async () => {
            const res = await request(app)
                .post("/api/metro/tickets/METRO_TICKET_001/validate-entry")
                .set("Authorization", `Bearer ${staffToken}`)
                .send({ stationCode: "STATION_BENTHANH" });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.result).toBe("ALLOW_ENTRY");
            expect(res.body.data.ticketCode).toBe("METRO_TICKET_001");
        });

        test("PASS: Quản trị viên (admin) cũng có quyền xác nhận vé tại cổng", async () => {
            const res = await request(app)
                .post("/api/metro/tickets/METRO_TICKET_002/validate-entry")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ stationCode: "STATION_SUOITIEN" });

            expect(res.statusCode).toBe(200);
        });

        test("FAIL: Hành khách (passenger) không được tự ý kích hoạt cổng vào", async () => {
            const res = await request(app)
                .post("/api/metro/tickets/METRO_TICKET_003/validate-entry")
                .set("Authorization", `Bearer ${passengerToken}`)
                .send({ stationCode: "STATION_BENTHANH" });

            expect(res.statusCode).toBe(403);
        });

        test("ERROR: Trả về lỗi 400 nếu dữ liệu trạm (stationCode) bị thiếu", async () => {
            const res = await request(app)
                .post("/api/metro/tickets/METRO_TICKET_001/validate-entry")
                .set("Authorization", `Bearer ${staffToken}`)
                .send({});

            expect(res.statusCode).toBe(400);
        });
    });

    describe("Inspection: Kiểm tra thủ công (POST /api/metro/tickets/:ticketCode/manual-inspection)", () => {
        test("PASS: Kiểm tra viên (inspector) có quyền lập biên bản vi phạm", async () => {
            const res = await request(app)
                .post("/api/metro/tickets/METRO_ERR_777/manual-inspection")
                .set("Authorization", `Bearer ${inspectorToken}`)
                .send({ reason: "Vé không hợp lệ hoặc đã hết hạn" });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.status).toBe("PENDING_SUPERVISOR_REVIEW");
            expect(res.body.data.reason).toBe("Vé không hợp lệ hoặc đã hết hạn");
        });

        test("PASS: Quản trị viên (admin) có quyền can thiệp lập biên bản", async () => {
            const res = await request(app)
                .post("/api/metro/tickets/METRO_ERR_888/manual-inspection")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ reason: "Kiểm tra định kỳ từ Admin" });

            expect(res.statusCode).toBe(200);
        });

        test("FAIL: Nhân viên ga (staff) không có thẩm quyền lập biên bản thanh tra", async () => {
            const res = await request(app)
                .post("/api/metro/tickets/METRO_ERR_999/manual-inspection")
                .set("Authorization", `Bearer ${staffToken}`)
                .send({ reason: "Nhân viên ga cố ý lập biên bản" });

            expect(res.statusCode).toBe(403);
        });

        test("ERROR: Trả về lỗi 400 nếu thiếu lý do kiểm tra (reason)", async () => {
            const res = await request(app)
                .post("/api/metro/tickets/METRO_ERR_001/manual-inspection")
                .set("Authorization", `Bearer ${inspectorToken}`)
                .send({});

            expect(res.statusCode).toBe(400);
        });
    });
});
