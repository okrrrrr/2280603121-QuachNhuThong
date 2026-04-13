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

    const batch1 = [
      {
        passengerId: "P001",
        passengerName: "User 1",
        stationCode: "ST01",
        entryStation: "A",
        exitStation: "B",
        tripDate: new Date(),
        fare: 10,
        paymentMethod: "card",
        status: "completed",
      },
      {
        passengerId: "P002",
        passengerName: "User 2",
        stationCode: "ST01",
        entryStation: "A",
        exitStation: "B",
        tripDate: new Date(),
        fare: 10,
        paymentMethod: "card",
        status: "completed",
      },
    ];
    const batch2 = [
      {
        passengerId: "P001",
        passengerName: "User 1 Updated",
        stationCode: "ST02",
        entryStation: "C",
        exitStation: "D",
        tripDate: new Date(),
        fare: 15,
        paymentMethod: "cash",
        status: "completed",
      },
      {
        passengerId: "P003",
        passengerName: "User 3",
        stationCode: "ST01",
        entryStation: "A",
        exitStation: "B",
        tripDate: new Date(),
        fare: 10,
        paymentMethod: "card",
        status: "completed",
      },
    ];

    console.log("=== Batch 1 (2 records) ===");
    const r1 = await Record.insertMany(batch1, { ordered: true });
    console.log("Inserted: " + r1.length);

    console.log("=== Batch 2 (P001 is DUPLICATE) ===");
    try {
      const r2 = await Record.insertMany(batch2, { ordered: true });
      console.log("Inserted: " + r2.length);
    } catch (err) {
      console.log("ERROR: " + err.message);
      console.log("FAILED - ordered:true dừng cả batch!");
    }

    const count = await Record.countDocuments();
    console.log("Total in DB: " + count);

    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
