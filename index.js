const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis"); 
const cors = require("cors"); 

const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  //host: REDIS_URL,
  //port: REDIS_PORT,
  legacyMode: true,
  url: `redis://${REDIS_URL}:${REDIS_PORT}`
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.connect().catch(console.error);

const store = new RedisStore({
  client: redisClient,  
});

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.enable("trust proxy"); // Required for secure cookies in production
app.use(cors({
  origin: "*", // Adjust this to your frontend URL in production
  credentials: true, // Allow cookies to be sent with requests
}));

app.use(
  session({
    store: store,
    secret: SESSION_SECRET,    
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    },
  })
);

app.use(express.json());
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/api/v1", (req, res) => {
  res.send("<h2>Hello Theree zuhahahah</h2>");
  console.log("Session ID:", req.session.id);
});
