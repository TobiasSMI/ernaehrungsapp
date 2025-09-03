PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS daily_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    workday INTEGER NOT NULL DEFAULT 0 CHECK (workday IN (0,1)),
    cheat_day INTEGER NOT NULL DEFAULT 0 CHECK (cheat_day IN (0,1)),
    weight_kg REAL,
    waist_cm REAL,
    body_fat_pct REAL,
    mood INTEGER,
    sleep_quality INTEGER,
    breath_ex INTEGER NOT NULL DEFAULT 0 CHECK (breath_ex IN (0,1)),
    ab_massage INTEGER NOT NULL DEFAULT 0 CHECK (ab_massage IN (0,1)),
    gratitude INTEGER NOT NULL DEFAULT 0 CHECK (gratitude IN (0,1)),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS intake_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    daily_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    time_local TEXT,
    amount REAL,
    unit TEXT,
    food TEXT,
    hunger_before INTEGER,
    hunger_after INTEGER,
    hours_since_last REAL,
    motive TEXT,
    FOREIGN KEY (daily_id) REFERENCES daily_entries(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    daily_id INTEGER NOT NULL,
    kind TEXT NOT NULL,
    description TEXT,
    minutes INTEGER NOT NULL,
    FOREIGN KEY (daily_id) REFERENCES daily_entries(id) ON DELETE CASCADE
);
