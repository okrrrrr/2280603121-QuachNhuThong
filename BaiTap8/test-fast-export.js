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
    const memBefore = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log("Memory before: " + memBefore.toFixed(2) + " MB");

    const start = Date.now();
    let count = 0;
    let peakMem = memBefore;

    const cursor = Record.find({}).limit(5000).lean().cursor({ batchSize: 500 });

    for await (const doc of cursor) {
      count++;
      const currentMem = process.memoryUsage().heapUsed / 1024 / 1024;
      if (currentMem > peakMem) peakMem = currentMem;
    }

    const elapsed = Date.now() - start;
    console.log("Memory peak (stream): " + peakMem.toFixed(2) + " MB");
    console.log("Delta: " + (peakMem - memBefore).toFixed(2) + " MB");
    console.log("Time: " + elapsed + "ms");
    console.log("Records processed: " + count);

    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
