import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public read routes
router.route('/')
  .get(getProperties)
  .post(requireAdmin, createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(requireAdmin, updateProperty)
  .delete(requireAdmin, deleteProperty);

export default router;

