import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Property description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Property price is required'],
      min: [0, 'Price cannot be negative'],
    },
    location: {
      type: String,
      required: [true, 'Property locality/location is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: ['Apartment', 'Villa', 'House', 'Plot'],
    },
    listingType: {
      type: String,
      required: [true, 'Listing type is required'],
      enum: ['Sale', 'Rent', 'For Sale', 'For Rent'],
      set: (val) => {
        if (val === 'For Sale') return 'Sale';
        if (val === 'For Rent') return 'Rent';
        return val;
      }
    },
    bedrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bedrooms count cannot be negative'],
    },
    bathrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bathrooms count cannot be negative'],
    },
    area: {
      type: Number,
      required: [true, 'Property area (sqft) is required'],
      min: [0, 'Area cannot be negative'],
    },
    images: {
      type: [String],
      required: [true, 'At least one property image URL is required'],
      validate: [
        (val) => val.length > 0,
        'Property must have at least one image URL',
      ],
    },
    amenities: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
      required: [true, 'Assigned agent is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Search indexes for performant queries
propertySchema.index({ city: 1, propertyType: 1, listingType: 1, price: 1 });
propertySchema.index({ title: 'text', description: 'text', location: 'text', city: 'text' });

const Property = mongoose.model('Property', propertySchema);
export default Property;
