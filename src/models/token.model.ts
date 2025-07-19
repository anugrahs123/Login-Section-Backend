import mongoose, { Document, Schema } from "mongoose";

export interface IRefreshToken extends Document {
  token: string;
  user: mongoose.Schema.Types.ObjectId;
  expires: Date;
  createdAt: Date;
  revoked?: boolean;
  isExpired: boolean;
  isActive: boolean;
}

const refreshTokenSchema: Schema<IRefreshToken> = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  revoked: Date,
});

// Virtual fields
refreshTokenSchema.virtual("isExpired").get(function (this: IRefreshToken) {
  return Date.now() >= this.expires.getTime();
});

refreshTokenSchema.virtual("isActive").get(function (this: IRefreshToken) {
  return !this.revoked && !this.isExpired;
});

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;
