const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const { connectDB, disconnectDB } = require("../src/config/db");
const User = require("../src/models/user.model");

jest.setTimeout(30000);
const TEST_MONGO_URI = process.env.TEST_MONGO_URI || "mongodb://127.0.0.1:27017/node_auth_test";

let adminToken;
let passengerToken;
let passengerId;

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

    // Tạo account Admin System
    const admin = await User.create({
        name: "Admin System",
        email: "sysadmin@metro.vn",
        password: pw,
        role: "admin"
    });

    // Tạo account Hành khách
    const passenger = await User.create({
        name: "Regular Passenger",
        email: "customer@metro.vn",
        password: pw,
        role: "passenger"
    });
    passengerId = passenger._id;

    // Đăng nhập lấy mã token (Bearer Token)
    const getTokens = async (email) => request(app).post("/api/auth/login").send({ email, password: "password123" });

    adminToken = (await getTokens("sysadmin@metro.vn")).body.data.accessToken;
    passengerToken = (await getTokens("customer@metro.vn")).body.data.accessToken;
});

describe("Các API dùng quản lý người dùng", () => {

    describe("Thông tin cá nhân (GET /api/users/me)", () => {
        test("PASS: Truy xuất thông tin cá nhân của chính mình thành công", async () => {
            const res = await request(app)
                .get("/api/users/me")
                .set("Authorization", `Bearer ${passengerToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data.user.email).toBe("customer@metro.vn");
        });

        test("FAIL: Trả về lỗi 401 nếu truy cập mà không có mã xác thực", async () => {
            const res = await request(app).get("/api/users/me");
            expect(res.statusCode).toBe(401);
        });
    });

    describe("Quản lý danh sách người dùng (GET /api/users)", () => {
        test("PASS: Quản trị viên có quyền xem danh sách tất cả nhân viên & khách hàng", async () => {
            const res = await request(app)
                .get("/api/users")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data.users)).toBe(true);
            expect(res.body.data.users.length).toBe(2);
        });

        test("FAIL: Hành khách không được phép truy cập danh sách người dùng hệ thống", async () => {
            const res = await request(app)
                .get("/api/users")
                .set("Authorization", `Bearer ${passengerToken}`);

            expect(res.statusCode).toBe(403);
        });
    });

    describe("Cập nhật vai trò (PATCH /api/users/:id/role)", () => {
        test("PASS: Quản trị viên nâng cấp quyền hạn cho người dùng thành công", async () => {
            const res = await request(app)
                .patch(`/api/users/${passengerId}/role`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ role: "staff" });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.user.role).toBe("staff");

            const updatedUser = await User.findById(passengerId);
            expect(updatedUser.role).toBe("staff");
        });

        test("ERROR: Trả về lỗi 400 nếu vai trò (role) không nằm trong danh sách cho phép", async () => {
            const res = await request(app)
                .patch(`/api/users/${passengerId}/role`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ role: "super_hacker" });

            expect(res.statusCode).toBe(400);
        });

        test("ERROR: Trả về lỗi 404 nếu mã định danh người dùng không tồn tại", async () => {
            const fakeId = "60d5ecb84d1f2a0015f12345";
            const res = await request(app)
                .patch(`/api/users/${fakeId}/role`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ role: "admin" });

            expect(res.statusCode).toBe(404);
        });

        test("FAIL: Từ chối quyền cập nhật nếu người thực hiện không phải là Admin", async () => {
            const res = await request(app)
                .patch(`/api/users/${passengerId}/role`)
                .set("Authorization", `Bearer ${passengerToken}`)
                .send({ role: "admin" });

            expect(res.statusCode).toBe(403);
        });
    });
});
