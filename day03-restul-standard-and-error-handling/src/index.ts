import express from "express";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/error";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware for parsing JSON

// Mount the task routes under the /tasks path
app.use("/tasks", taskRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
