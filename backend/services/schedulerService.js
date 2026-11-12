import cron from 'node-cron';
import { storage } from './storageService.js';

export const initScheduler = () => {
  // Check every 60 seconds
  cron.schedule('* * * * *', () => {
    storage.checkScheduledPosts();
  });
  console.log('[TechPulse Scheduler] Automated background publication daemon initialized.');
};
