import express from "express";

const app = express();

// Add middlewares
app.use(express.json());


// GET
app.get("/");
// PUT
// POST
// DELETE

app.listen(5000, () => console.log("Server Open"));