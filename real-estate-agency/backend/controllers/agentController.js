import Agent from '../models/Agent.js';
import mongoose from 'mongoose';

// @desc    Get all agents
// @route   GET /api/agents
// @access  Public
export const getAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: agents.length,
      data: agents,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get agent by ID
// @route   GET /api/agents/:id
// @access  Public
export const getAgentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error(`Invalid Agent ID format: ${id}`);
    }

    const agent = await Agent.findById(id);

    if (!agent) {
      res.status(404);
      throw new Error('Agent not found');
    }

    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    next(error);
  }
};
