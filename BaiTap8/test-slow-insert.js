require("dotenv").config();
const mongoose = require("mongoose");
require("./backend/src/models/passengerRecord.model");
const Record = mongoose.model("PassengerRecord");

const connectOpts = { serverSelectionTimeoutMS: 10_000 };

mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/metroticket_bulk",
    connectOpts
  )
  .then(async () => {
    await Record.deleteMany({});

    const start = Date.now();
    for (let i = 0; i < 200; i++) {
      await Record.create({
        passengerId: "P-SLOW-" + i,
        passengerName: "Test User " + i,
        stationCode: "ST01",
        entryStation: "Station A",
        exitStation: "Station B",
        tripDate: new Date(),
        fare: 10,
        paymentMethod: "card",
        status: "completed",
      });
    }
    const slowTime = Date.now() - start;
    console.log("SLOW (insert 200 records one-by-one): " + slowTime + "ms");
    console.log("Speed: " + Math.round(200 / (slowTime / 1000)) + " records/sec");
    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
