import mongoose, { Document, Schema, CallbackError } from "mongoose";
import { generatePasswordHash, comparePassword } from "../utils/hash";

// Interface to define the structure of a User document
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  is_deleted: boolean;
  refreshToken: string | null;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the schema
const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await generatePasswordHash(this.password);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return comparePassword(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
