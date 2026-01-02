const app = require("./app");
const connectDB = require("./config/db");

const port = process.env.PORT || 3000;

// connect to MongoDB first
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
