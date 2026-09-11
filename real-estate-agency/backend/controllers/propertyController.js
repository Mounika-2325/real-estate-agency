import Property from '../models/Property.js';
import Agent from '../models/Agent.js';
import mongoose from 'mongoose';

// @desc    Get all properties with filtering, search & sorting
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res, next) => {
  try {
    const {
      search,
      location,
      city,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      bedrooms,
      sort,
    } = req.query;

    const query = {};

    // Filter by city
    if (city && city.trim() !== '') {
      query.city = { $regex: new RegExp(`^${city.trim()}$`, 'i') };
    }

    // Filter by propertyType
    if (propertyType && propertyType.trim() !== '' && propertyType !== 'All') {
      query.propertyType = propertyType.trim();
    }

    // Filter by listingType (Sale or Rent)
    if (listingType && listingType.trim() !== '' && listingType !== 'All') {
      let type = listingType.trim();
      if (type.toLowerCase() === 'sale' || type.toLowerCase() === 'for sale') {
        query.listingType = { $in: ['Sale', 'For Sale'] };
      } else if (type.toLowerCase() === 'rent' || type.toLowerCase() === 'for rent') {
        query.listingType = { $in: ['Rent', 'For Rent'] };
      } else {
        query.listingType = type;
      }
    }

    // Filter by minimum price
    if (minPrice && !isNaN(Number(minPrice))) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }

    // Filter by maximum price
    if (maxPrice && !isNaN(Number(maxPrice))) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    // Filter by bedrooms
    if (bedrooms && !isNaN(Number(bedrooms)) && Number(bedrooms) > 0) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    // General keyword search (title, location, city, description)
    const searchTerm = search || location;
    if (searchTerm && searchTerm.trim() !== '') {
      const regex = new RegExp(searchTerm.trim(), 'i');
      query.$or = [
        { title: regex },
        { location: regex },
        { city: regex },
        { description: regex },
      ];
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // default: newest first
    if (sort === 'price_asc') {
      sortOptions = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOptions = { price: -1 };
    } else if (sort === 'newest') {
      sortOptions = { createdAt: -1 };
    }

    const properties = await Property.find(query)
      .populate('agent', 'name email phone photo designation')
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error(`Invalid Property ID format: ${id}`);
    }

    const property = await Property.findById(id).populate('agent');

    if (!property) {
      res.status(404);
      throw new Error('Property not found');
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new property
// @route   POST /api/properties
// @access  Public (in demo)
export const createProperty = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      location,
      city,
      state,
      propertyType,
      listingType,
      bedrooms,
      bathrooms,
      area,
      images,
      amenities,
      features,
      agent,
    } = req.body;

    // Check if agent exists
    if (agent) {
      if (!mongoose.Types.ObjectId.isValid(agent)) {
        res.status(400);
        throw new Error(`Invalid Agent ID format: ${agent}`);
      }
      const agentExists = await Agent.findById(agent);
      if (!agentExists) {
        res.status(404);
        throw new Error('Assigned agent not found');
      }
    }

    const property = await Property.create({
      title,
      description,
      price,
      location,
      city,
      state,
      propertyType,
      listingType,
      bedrooms: bedrooms || 0,
      bathrooms: bathrooms || 0,
      area,
      images,
      amenities: amenities || [],
      features: features || [],
      agent,
    });

    const populatedProperty = await property.populate('agent');

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: populatedProperty,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property by ID
// @route   PUT /api/properties/:id
// @access  Public (in demo)
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error(`Invalid Property ID format: ${id}`);
    }

    let property = await Property.findById(id);

    if (!property) {
      res.status(404);
      throw new Error('Property not found');
    }

    property = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate('agent');

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property by ID
// @route   DELETE /api/properties/:id
// @access  Public (in demo)
export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error(`Invalid Property ID format: ${id}`);
    }

    const property = await Property.findById(id);

    if (!property) {
      res.status(404);
      throw new Error('Property not found');
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
