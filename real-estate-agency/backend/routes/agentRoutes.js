import express from 'express';
import { getAgents, getAgentById } from '../controllers/agentController.js';

const router = express.Router();

router.route('/')
  .get(getAgents);

router.route('/:id')
  .get(getAgentById);

export default router;
