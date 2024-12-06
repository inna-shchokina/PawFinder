import mongoose from 'mongoose';

const questionnaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
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
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Questionnaire', questionnaireSchema);