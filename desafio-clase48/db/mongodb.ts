import { MongoClient } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

const client = new MongoClient()

await client.connect('mongodb+srv://Gonzalo:gonza123456@cluster0.ldyb1.mongodb.net/ecommerce?retryWrites=true&w=majority')

const db = client.database('ecommerce')

export default await db