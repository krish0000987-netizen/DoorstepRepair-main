import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { storage } from "../server/storage";
import bcrypt from "bcryptjs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("--- Admin User Creation Utility ---");

  try {
    const username = await question("Enter admin username: ");
    const password = await question("Enter admin password: ");

    if (!username || !password) {
      console.error("Error: Username and password are required.");
      process.exit(1);
    }

    // Check if user already exists
    const existingAdmin = await storage.getAdminByUsername(username);

    if (existingAdmin) {
      const confirm = await question(
        `Admin '${username}' already exists. Delete and create new? (y/n): `
      );
      if (confirm.toLowerCase() === "y") {
        await storage.deleteAdmin(username);
        console.log(`Deleted existing admin: ${username}`);
      } else {
        console.log("Aborted.");
        process.exit(0);
      }
    }

    // Hash password and create admin
    const passwordHash = await bcrypt.hash(password, 10);
    await storage.createAdmin({
      username,
      passwordHash,
    });

    console.log(`Successfully created admin user: ${username}`);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    rl.close();
    process.exit(0);
  }
}

main();
