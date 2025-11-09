create table incidents (
  id text primary key default 'INC' || lpad(floor(random()*100000)::text, 5, '0'),
  type text not null,
  name text,
  location text,
  coords text,
  status text,
  created_at timestamp default now()
);
