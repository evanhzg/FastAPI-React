import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-browser-sdk";

const stitchAppId = "application-0-lnwgr";
const stitchClient = Stitch.initializeDefaultAppClient(stitchAppId);

export const connectToDatabase = async () => {
  try {
    const user = await stitchClient.auth.loginWithCredential(new AnonymousCredential());
    const mongoClient = stitchClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
    const db = mongoClient.db("pyTest");
    return { stitchClient, db };
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};
