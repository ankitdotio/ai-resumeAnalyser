import mongoose, { Mongoose } from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "TOKEN IS REQUIRED TO BLACKLIST"],
    },
  },
  {
    timestamps: true,
  },
);

export const blacklistTokenModel = mongoose.model(
  "blacklistTokens",
  blacklistTokenSchema,
);
