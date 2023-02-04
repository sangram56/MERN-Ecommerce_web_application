const mongoose = require("mongoose");

const myDataBase = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = myDataBase;
