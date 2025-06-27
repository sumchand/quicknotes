// src/utils/db.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'myAppDb';

if (!uri) {
  throw new Error('❌ MONGODB_URI is not defined in environment variables');
}

// Reuse Mongo connection across hot reloads in development
const cached = globalThis as unknown as {
  mongoClient?: MongoClient;
  db?: Db;
};

export async function connectToDatabase(): Promise<Db> {
  if (cached.db) {
    return cached.db;
  }

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);

  cached.mongoClient = client;
  cached.db = db;

  console.log(`✅ Connected to MongoDB: ${db.databaseName}`);
  return db;
}
