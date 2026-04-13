const { Server } = require("socket.io");
const { verifyAccessToken } = require("../services/token.service");
const User = require("../models/user.model");

let ioInstance = null;

async function socketAuth(socket, next) {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub).select("-password");
    if (!user || !user.isActive) {
      return next(new Error("Unauthorized"));
    }

    socket.user = user;
    return next();
  } catch (error) {
    return next(new Error("Unauthorized"));
  }
}

function initializeSocket(server) {
  if (ioInstance) {
    return ioInstance;
  }

  ioInstance = new Server(server, {
    cors: { origin: "*" },
  });

  ioInstance.use(socketAuth);

  ioInstance.on("connection", (socket) => {
    socket.join(`role:${socket.user.role}`);
    socket.join(`user:${socket.user._id}`);

    socket.emit("socket.ready", {
      userId: socket.user._id,
      role: socket.user.role,
    });
  });

  // TODO: Gan domain event listeners de broadcast realtime theo room role.
  // Goi ham attachDomainEventListeners(ioInstance) khi hoan thien.

  return ioInstance;
}

function getIo() {
  return ioInstance;
}

async function closeSocket() {
  if (ioInstance) {
    await ioInstance.close();
    ioInstance = null;
  }
}

module.exports = {
  initializeSocket,
  getIo,
  closeSocket,
};
