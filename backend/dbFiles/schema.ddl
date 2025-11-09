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

CREATE TABLE helpers (
    id text PRIMARY KEY DEFAULT 'HELP' || LPAD(FLOOR(RANDOM() * 100000)::text, 5, '0'),
    phone text NOT NULL,
    name text NOT NULL,
    location text NOT NULL,
    occupation text NOT NULL, -- e.g., "FR" or "C"
    lat double precision NOT NULL,
    lon double precision NOT NULL,
    report_count integer DEFAULT 0,
    created_at timestamp DEFAULT now()
);
