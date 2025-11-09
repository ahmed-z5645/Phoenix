create table incidents (
  id text primary key,
  type text not null,
  name text,
  location text,
  coords text,
  status text,
  timestamp timestamptz default now()
);
