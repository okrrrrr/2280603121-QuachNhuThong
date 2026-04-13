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
    const pageSize = 100;
    const pages = [1, 10, 50, 100];

    console.log("OFFSET-BASED PAGINATION (skip/limit):");
    for (const page of pages) {
      const start = Date.now();
      const results = await Record.find({})
        .sort({ _id: 1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean();
      const elapsed = Date.now() - start;
      console.log(
        "  Page " + page + ": " + elapsed + "ms (skipped " + (page - 1) * pageSize + " docs)"
      );
    }

    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
