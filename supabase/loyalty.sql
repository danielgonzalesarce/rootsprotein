-- Raíces Roots — schema for Supabase (optional; local JSON works without this)

create table if not exists loyalty_customers (
  id uuid primary key,
  phone text not null unique,
  name text not null,
  pin_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists loyalty_stamps (
  id uuid primary key,
  customer_id uuid not null references loyalty_customers (id) on delete cascade,
  created_at timestamptz not null default now(),
  source text not null default 'qr'
);

create table if not exists loyalty_redemptions (
  id uuid primary key,
  customer_id uuid not null references loyalty_customers (id) on delete cascade,
  stamps_used int not null default 8,
  created_at timestamptz not null default now()
);

create index if not exists loyalty_stamps_customer_idx on loyalty_stamps (customer_id, created_at);
create index if not exists loyalty_redemptions_customer_idx on loyalty_redemptions (customer_id, created_at);
