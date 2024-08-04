const { Queue } = require('bullmq');
const { redisClient } = require('./redis');
const { QUEUE_USER_SCORE_UPDATE } = require('../constants/bullmq');

const queueUserScoreUpdate = new Queue(QUEUE_USER_SCORE_UPDATE, {
  connection: redisClient,
});

/**
 * Function to publish events to the queue
 */
function publishEvent(data) {
    quizQueue.add(QUEUE_USER_SCORE_UPDATE, data, {
        removeOnComplete: true,
        removeOnFail: 100
    });
}

const addJobToQueue = (queue, jobName, data) => {
  try {
    queue.add(jobName, data, { removeOnComplete: true });
    return true;
  } catch (error) {
    console.log(`[addJobToQueue][Job name: ${jobName}] Error: `, error);
    throw error;
  }
};

module.exports = {
  queueUserScoreUpdate,
  publishEvent,
  addJobToQueue,
};
