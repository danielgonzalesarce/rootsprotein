import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const rows = await sql`select count(*)::int as total from loyalty_customers`;
const stamps = await sql`select count(*)::int as total from loyalty_stamps`;
console.log("neon customers", rows[0].total);
console.log("neon stamps", stamps[0].total);
process.exit(0);
