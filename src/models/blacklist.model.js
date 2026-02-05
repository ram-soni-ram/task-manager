import { mongoose } from "../config/db.config.js";

const blacklistSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true, index: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

blacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Blacklist = mongoose.model("Blacklist", blacklistSchema);
export default Blacklist;
