import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import "./config/passport.js";
import petRoutes from "./routes/petsRoutes.js";
import matchingRoutes from "./routes/matchingRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import connectDB from "./db/mongoDB.js";
import usersRouter from "./routes/usersRoutes.js";
import shelterRoutes from "./routes/sheltersRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRouter);
app.use("/api/pets", petRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/matching", matchingRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 1337;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
