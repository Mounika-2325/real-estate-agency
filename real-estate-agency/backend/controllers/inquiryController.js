import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';
import mongoose from 'mongoose';

// @desc    Submit a user inquiry / contact form
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, property } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      res.status(400);
      throw new Error('Please fill in all required fields (name, email, phone, subject, message)');
    }

    let validPropertyId = null;
    if (property) {
      if (mongoose.Types.ObjectId.isValid(property)) {
        const propExists = await Property.findById(property);
        if (propExists) {
          validPropertyId = property;
        }
      }
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      property: validPropertyId,
    });

    const populatedInquiry = await Inquiry.findById(inquiry._id).populate('property', 'title location price city');

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! Our agent will get back to you shortly.',
      data: populatedInquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all submitted inquiries
// @route   GET /api/inquiries
// @access  Public (for development/testing)
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('property', 'title location price city propertyType')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};
