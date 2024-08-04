const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

async function scanAndDelete(pattern) {
  const stream = await redisClient.scanStream({
    match: pattern,
    count: 10000,
  });

  stream.on('data', (keys) => {
    if (keys.length) {
      const pipeline = redisClient.pipeline();
      keys.forEach((key) => {
        pipeline.del(key);
      });
      pipeline.exec();
    }
  });

  stream.on('end', () => {
    console.log('clear cache done with parttern ', pattern);
  });
}

module.exports = { redisClient, scanAndDelete };
