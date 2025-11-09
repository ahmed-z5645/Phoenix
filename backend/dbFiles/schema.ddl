CREATE TABLE incidents (
  id text PRIMARY KEY DEFAULT 'INC' || LPAD(FLOOR(RANDOM() * 100000)::text, 5, '0'),
  type text NOT NULL,
  name text,
  location text,
  lat double precision,
  lon double precision,
  status text,
  created_at timestamp DEFAULT now()
);
