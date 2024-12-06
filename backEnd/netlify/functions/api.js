import express from "express";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";

import authRoutes from "../../routes/authRoutes.js";
import petRoutes from "../../routes/petsRoutes.js";
import matchingRoutes from "../../routes/matchingRoutes.js";
import usersRouter from "../../routes/usersRoutes.js";
import shelterRoutes from "../../routes/sheltersRoutes.js";

import { errorHandler } from "../../utils/errorHandler.js";
import "../../config/passport.js";

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRouter);
app.use("/api/pets", petRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/matching", matchingRoutes);

app.use(errorHandler);

export const handler = serverless(app);