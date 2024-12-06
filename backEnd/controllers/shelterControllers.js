import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Shelter from "../models/SheltersModel.js";
import { CustomError } from "../utils/errorHandler.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { query } from "express";

export const getShelters = async (req, res, next) => {
  try {
    let positionRequested = {};
    if (req.query.long && req.query.lang) {
      console.log(req.query);
      positionRequested = {
        position: {
          coordinates: [Number(req.query.long), Number(req.query.lang)],
          type: "Point",
        },
      };
      console.log(positionRequested);
    }
    const shelters = await Shelter.find(positionRequested);
    res.json(shelters);
  } catch (error) {
    next(new CustomError("Failed to retrieve shelters", 500));
  }
};

export const getShelterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const shelter = await Shelter.findById(id);
    if (!shelter) {
      throw new CustomError("Shelter not found", 404);
    }
    res.json(shelter);
  } catch (error) {
    next(new CustomError("Failed to retrieve shelter", 500));
  }
};

// export const createShelter = async (req, res, next) => {
//     const shelterData = req.body;
//     try {
//         const shelter = await Shelter.create(shelterData);
//         res.status(201).json(shelter);

//     } catch (error) {
//         console.error("Error creating shelter:", error);
//         next(new CustomError('Failed to create shelter', 500));
//     }
// };

// Create new shelter
export const createShelter = async (req, res, next) => {
  try {
    const { email, password, registrationNumber, userType, ...restOfBody } =
      req.body;

    const existingShelter = await Shelter.findOne({ email });
    if (existingShelter) {
      throw new CustomError("Shelter already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const shelter = new Shelter({
      email,
      password: hashedPassword,
      registrationNumber,
      userType: "shelter",
      ...restOfBody,
    });

    await shelter.save();

    const token = jwt.sign({ shelterId: shelter._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(201).json({
      message: "Shelter created successfully",
      shelter: { ...shelter.toObject(), password: undefined },
    });
  } catch (error) {
    next(new CustomError(error.message || "Failed to create shelter", 400));
  }
};

export const updateShelter = async (req, res, next) => {
  const { id } = req.params;
  const shelterData = req.body;
  try {
    const shelter = await Shelter.findById(id);
    if (!shelter) {
      throw new CustomError("Shelter not found", 404);
    }
    Object.assign(shelter, shelterData);
    await shelter.save();
    res.json(shelter);
  } catch (error) {
    next(new CustomError("Failed to update shelter", 500));
  }
};

export const deleteShelter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const shelter = await Shelter.findById(id);
    if (!shelter) {
      throw new CustomError("Shelter not found", 404);
    }
    await shelter.deleteOne();
    res.json({ message: "Shelter deleted successfully" });
  } catch (error) {
    next(new CustomError("Failed to delete shelter", 500));
  }
};
