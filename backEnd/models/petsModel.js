import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  animalType: {
    type: String,
    enum: ['cat', 'dog'],
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  petStory: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  adopted: {
    type: Boolean,
    default: false
  },
  vaccinated: {
    type: Boolean,
    default: false
  },
  neutered: {
    type: Boolean,
    default: false
  },
  microchipped: {
    type: Boolean,
    default: false
  },
  temperament: {
    type: String
  },
  sociableWithOtherPets: {
    type: Boolean
  },
  sociableWithKids: {
    type: Boolean
  },
  pictures: {
    type: [String]
  },
  energyLevel: {
    type: String,
    enum: ['low', 'moderate', 'high']
  },
  exerciseNeeds: {
    type: String
  },
  coatType: {
    type: String,
    enum: ['short', 'medium', 'long']
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large']
  },
  hasPark: {
    type: Boolean,
    default: false,
    required: function() { return this.animalType === 'dog'; }
  },
  livesIndoors: {
    type: Boolean,
    default: false,
    required: function() { return this.animalType === 'cat'; }
  },
  specialNeeds: {
    type: Boolean,
    default: false
  },
  healthConditions: {
    type: [String],
    required: function() { return this.specialNeeds === true; }
  }
}, {
  collection: 'Pets',
  versionKey: false,
  timestamps: true
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;