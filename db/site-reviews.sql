-- Reseñas enviadas desde la web (Neon)
create table if not exists site_reviews (
  id uuid primary key,
  name text not null,
  text text not null,
  rating int not null check (rating between 1 and 5),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists site_reviews_published_idx
  on site_reviews (published, created_at desc);
