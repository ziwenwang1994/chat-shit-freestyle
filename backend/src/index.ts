import app from "./app.js";
import { connectToDB } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => console.log("Server Open & Connected to DB"));
  })
  .catch((err) => console.error(err));
