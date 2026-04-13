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
    const totalPages = 100;

    console.log("CURSOR-BASED PAGINATION (_id gt):");

    let lastId = null;
    for (let page = 1; page <= totalPages; page++) {
      const query = lastId ? { _id: { $gt: lastId } } : {};
      const start = Date.now();
      const results = await Record.find(query).sort({ _id: 1 }).limit(pageSize).lean();
      const elapsed = Date.now() - start;
      if (page <= 10 || page === 50 || page === 100) {
        console.log("  Page " + page + ": " + elapsed + "ms");
      }
      lastId = results.length > 0 ? results[results.length - 1]._id : null;
    }

    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
