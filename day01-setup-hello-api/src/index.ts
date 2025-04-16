import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/hello", (_req, res) => {
    res.json({
        message: "hello",
        status: "ok"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});