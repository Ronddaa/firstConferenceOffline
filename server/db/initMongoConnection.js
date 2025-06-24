import mongoose from "mongoose";
import env from "../utils/env.js";

const initMongoConnection = async () => {
  try {
    const user = env("MONGODB_USER");
    const password = env("MONGODB_PASSWORD");
    const host = env("MONGODB_HOST");
    const db = env("MONGODB_DB");

    const uri = `mongodb+srv://${user}:${encodeURIComponent(
      password
    )}@${host}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(uri);
    console.log("Mongo connection successfully established!");
  } catch (error) {
    console.error("Error while setting up mongo connection", error);
    throw error;
  }
};

export default initMongoConnection;
