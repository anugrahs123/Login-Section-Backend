import mongoose from "mongoose";
import User from "../models/user.model";
import { generatePasswordHash } from "../utils/hash";
import config from "../config/config";
import fs from "fs";

const seedUsers = async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to DB");

  const rawData = fs.readFileSync("./users.json", "utf-8");
  const users = JSON.parse(rawData);

  for (const userData of users) {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      console.log(
        `User with email ${userData.email} already exists. Skipping.`
      );
      continue;
    }

    const newUser = new User({
      ...userData,
    });

    await newUser.save();
    console.log(`Inserted user: ${userData.email}`);
  }

  console.log("Data entry complete.");
  await mongoose.disconnect();
};

seedUsers().catch((err) => {
  console.error("Data entry failed:", err);
  mongoose.disconnect();
});
