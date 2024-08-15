const redis = require("redis");

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on("error", (err) => {
  console.log(process.env.REDIS_URL);
  console.error("Redis Client Error", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.connect().catch(console.error);

exports.cache = async (req, res, next) => {
  const key = "__express__" + req.originalUrl || req.url;
  console.log("Cache key:", key);

  try {
    const cachedResponse = await client.get(key);

    if (cachedResponse) {
      console.log("Cache hit:", key);
      return res.send(JSON.parse(cachedResponse));
    } else {
      console.log("Cache miss:", key);

      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body), { EX: 3600 }, (err) => {
          if (err) {
            console.error("Redis SET error:", err);
          }
        });
        res.sendResponse(body);
      };
      next();
    }
  } catch (err) {
    console.error("Redis GET error:", err);
    next();
  }
};
