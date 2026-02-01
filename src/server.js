import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import morgan from "morgan";
import bookRoutes from "./routes/book.routes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import AppError from "./utils/AppError.js";

const app = express();
const PORT = ENV.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/books", bookRoutes);


app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

//  Global error handler
app.use(globalErrorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`👀 Server is running on port ${PORT}`);
});
