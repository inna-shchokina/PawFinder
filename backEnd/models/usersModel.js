import mongoose from "mongoose";

const petPreferencesSchema = new mongoose.Schema({
  petType: {
    type: String,
    enum: ['cat', 'dog', 'both'],
    required: true
  },
  maxDistance: {
    type: Number,
    min: 0,
    required: true
  },
  ageRange: {
    min: {
      type: Number,
      min: 0,
      required: true
    },
    max: {
      type: Number,
      min: 0,
      required: true
    }
  },
  size: [{
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  }],
  gender: [{
    type: String,
    enum: ['male', 'male_neutered', 'female', 'female_spayed'],
    required: true
  }],
  character: [{
    type: String,
    enum: [
      'playful_energetic',
      'calm_gentle',
      'shy_reserved',
      'independent_confident',
      'affectionate_cuddly',
      'social_friendly'
    ],
    required: true
  }]
}, { _id: false });

const questionnaireSchema = new mongoose.Schema({
  housingSituation: {
    type: String,
    enum: [
      'apartment_shared_entrance',
      'apartment_separate_entrance',
      'house',
      'mostly_outdoors'
    ],
    required: true
  },
  dailyAloneHours: {
    type: Number,
    required: true
  },
  workplaceAccommodation: {
    type: String,
    enum: ['yes', 'no', 'not_necessary'],
    required: true
  },
  householdComposition: {
    type: String,
    required: true
  },
  hasPetExperience: {
    type: Boolean,
    required: true
  },
  currentPets: {
    hasPets: {
      type: Boolean,
      required: true
    },
    petDetails: {
      type: String,
      required: function() { 
        return this.currentPets.hasPets === true;
      }
    }
  },
  previousAdoption: {
    hasAdopted: {
      type: Boolean,
      required: true
    }
  },
  petSurrender: {
    hasSurrendered: {
      type: Boolean,
      required: true
    }
  },
  additionalInformation: {
    type: String,
    required: false
  }
}, { _id: false });

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function() { return !this.googleId; },
    },
    fullName: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['user', 'admin', 'shelter'],
      default: 'user',
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    petPreferences: petPreferencesSchema,
    questionnaire: questionnaireSchema,
    adoptionApplications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    myFavorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  {
    collection: "Users",
    versionKey: false,
    timestamps: true,
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  }
);

export default mongoose.model("User", userSchema, "Users");