import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const rows = await sql`
  select phone, name, created_at
  from loyalty_customers
  order by created_at desc
  limit 20
`;
for (const row of rows) {
  console.log(`${row.phone}  |  ${row.name}  |  ${row.created_at}`);
}
process.exit(0);
