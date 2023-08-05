import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../mongodb"; // Create the 'mongodb' connection here.
import { getSession } from "next-auth/react";

export async function useAuth() {
  const session = await getSession();
  return session;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        // Add your authentication logic here (e.g., check user in MongoDB).
        // If the user doesn't exist, you can register them.
        // For simplicity, we'll just create a new user with the provided credentials.
        const { db } = await connectToDatabase();
        const collection = db.collection("Users");
        const newUser = {
          username,
          password,
        };
        const result = await collection.insertOne(newUser);
        if (result.insertedCount === 1) {
          return Promise.resolve({ ...newUser, id: result.insertedId });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  database: "mongodb://atlas-sql-64cd4887933a1812d94c283e-d0csj.a.query.mongodb.net/pyTest?ssl=true&authSource=admin",
});
