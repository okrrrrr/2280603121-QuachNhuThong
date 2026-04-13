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
    const docs = [];
    for (let i = 0; i < 200; i++) {
      docs.push({
        passengerId: "P-FAST-" + i,
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
    await Record.insertMany(docs, { batchSize: 200 });
    const fastTime = Date.now() - start;
    console.log("FAST (insertMany 200 records): " + fastTime + "ms");
    console.log("Speed: " + Math.round(200 / (fastTime / 1000)) + " records/sec");
    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
