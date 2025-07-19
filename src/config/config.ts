import dotenv from "dotenv";
dotenv.config();

interface EnvVars {
  NODE_ENV: string;
  PORT: string | number;
  MONGO_URI: string;
  JWT_SECRET: string;
  ACCESS_KEY: string;
  SECRET_KEY: string;
  JWT_REFRESH_SECRET: string;
}

const envVars: EnvVars = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URL || "mongodb://localhost:27017/loginSection",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  ACCESS_KEY: process.env.ACCESS_KEY || "key_not_available",
  SECRET_KEY: process.env.SECRET_KEY || "key_not_available",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh_secret",
};

export default envVars;
