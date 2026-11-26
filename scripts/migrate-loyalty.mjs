import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const sql = neon(url);
const text = readFileSync(new URL("../db/loyalty.sql", import.meta.url), "utf8");
const statements = text
  .split(";")
  .map((part) =>
    part
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n")
      .trim(),
  )
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
  console.log("ok:", statement.slice(0, 60).replace(/\s+/g, " "));
}

const tables = await sql`
  select table_name
  from information_schema.tables
  where table_schema = 'public'
    and table_name like 'loyalty_%'
  order by table_name
`;
console.log("tables:", tables.map((row) => row.table_name).join(", "));
process.exit(0);
