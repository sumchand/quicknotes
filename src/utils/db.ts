import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'myAppDb';

if (!uri) {
  throw new Error('❌ MONGODB_URI is not defined');
}

// Avoid sharing across edge/runtime contexts in Vercel
let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
  // Always create new client — required in serverless like Vercel
  client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);
  console.log(`✅ Connected to MongoDB: ${dbName}`);
  return db;
}
