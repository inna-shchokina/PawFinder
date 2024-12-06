import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';
import { CustomError } from '../utils/errorHandler.js';

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    next(new CustomError('Failed to retrieve users', 404));
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json(user);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to retrieve user', 404));
  }
};

// Create new user
export const createUser = async (req, res, next) => {
  try {
    const { email, password, fullName, userType, ...restOfBody } = req.body;

    console.log('1. Original password:', password);
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError('User already exists', 400);
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('2. Hashed password:', hashedPassword);

    
    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      userType,
      ...restOfBody
    });

    console.log('3. User object before save:', user);

    
    await user.save();

    console.log('4. Saved user:', user);

    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    
    res.status(201).json({
      message: 'User created successfully',
      user: { ...user.toObject(), password: undefined }
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to create user', 400));
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    
    res.status(200).json(user);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to update user', 400));
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json({ 
      success: true,
      message: 'User deleted successfully',
      deletedUser: { 
        email: user.email, 
        fullName: user.fullName 
      }
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to delete user', 400));
  }
};

// Get userFavorites
export const getFav = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("myFavorites");
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    res.status(200).json(user.myFavorites);
  } catch (error) {
    next(new CustomError(error.message || "Failed to fetch favorites", 400));
  }
};

// Update userFavorites
export const updateFav = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new CustomError('User not found', 404));
    }
    if (req.body.petId) {
      if (!user.myFavorites.includes(req.body.myFavoriteId)) {
        user.myFavorites.push(req.body.petId);
      }
    }

    const updatedUser = await user.save();
    // Remove sensitive fields before responding
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to update user', 400));
  }
};

// Delete from userFavorites
export const deleteFav = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new CustomError('User not found', 404));
    }
    const { petId } = req.body;
    if (petId && user.myFavorites.includes(petId)) {
      user.myFavorites = user.myFavorites.filter((id) => id.toString() !== petId);
    } else {
      return next(new CustomError('Pet not found in favorites', 404));
    }
    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to delete favorite', 400));
  }
};

// Get userApplications
export const getApplication = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("adoptionApplications");
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    res.status(200).json(user.adoptionApplications);
  } catch (error) {
    next(new CustomError(error.message || "Failed to fetch applications", 400));
  }
};

// Update userApplications
export const updateApplication = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    const { petId } = req.body;
    if (petId) {
      if (!user.adoptionApplications.includes(petId)) {
        user.adoptionApplications.push(petId);
      }
    }
    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Application updated successfully",
      adoptionApplications: userResponse.adoptionApplications,
    });
  } catch (error) {
    next(new CustomError(error.message || "Failed to update application", 400));
  }
};

// Delete userApplications
export const deleteApplication = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    const { petId } = req.body;

    if (petId && user.adoptionApplications.includes(petId)) {
      user.adoptionApplications = user.adoptionApplications.filter(
        (id) => id.toString() !== petId
      );
    } else {
      return next(new CustomError("Pet not found in applications", 404));
    }
    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    next(new CustomError(error.message || "Failed to delete application", 400));
  }
};