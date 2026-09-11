import dotenv from 'dotenv';
import { connectDB, closeDB } from '../config/db.js';
import Agent from '../models/Agent.js';
import Property from '../models/Property.js';
import Inquiry from '../models/Inquiry.js';
import { sampleAgents, sampleProperties } from './seedData.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('[SEED] Clearing existing data...');
    await Agent.deleteMany({});
    await Property.deleteMany({});
    await Inquiry.deleteMany({});

    console.log('[SEED] Inserting agents...');
    const createdAgents = await Agent.insertMany(sampleAgents);
    console.log(`[SEED] Successfully created ${createdAgents.length} agents.`);

    console.log('[SEED] Inserting properties...');
    const propertiesWithAgent = sampleProperties.map((prop) => {
      const agentObj = createdAgents[prop.agentIndex] || createdAgents[0];
      const { agentIndex, ...propData } = prop;
      return {
        ...propData,
        agent: agentObj._id,
      };
    });

    const createdProperties = await Property.insertMany(propertiesWithAgent);
    console.log(`[SEED] Successfully created ${createdProperties.length} properties.`);

    console.log('[SEED] Database Seeding Complete!');
    return { agents: createdAgents, properties: createdProperties };
  } catch (error) {
    console.error(`[SEED] Database seeding failed: ${error.message}`);
    throw error;
  }
};

// Execute if run directly from node CLI
if (process.argv[1] && process.argv[1].includes('seedRunner.js')) {
  seedDatabase()
    .then(() => closeDB())
    .catch(() => process.exit(1));
}
