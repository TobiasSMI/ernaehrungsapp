from flask import Flask, request, render_template, redirect
import sqlite3
import os

app = Flask(__name__)

DB_FILE = "nutrition.db"

def get_db():
    con = sqlite3.connect(DB_FILE)
    con.execute("PRAGMA foreign_keys = ON;")
    return con

def init_db():
    schema = """
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS daily_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        workday INTEGER NOT NULL DEFAULT 0,
        cheat_day INTEGER NOT NULL DEFAULT 0,
        weight_kg REAL,
        waist_cm REAL,
        body_fat_pct REAL,
        mood INTEGER,
        sleep_quality INTEGER,
        breath_ex INTEGER NOT NULL DEFAULT 0,
        ab_massage INTEGER NOT NULL DEFAULT 0,
        gratitude INTEGER NOT NULL DEFAULT 0,
        notes TEXT
    );
    """
    con = sqlite3.connect(DB_FILE)
    con.executescript(schema)
    con.commit()
    con.close()

@app.route("/daily", methods=["GET", "POST"])
def daily():
    if request.method == "POST":
        data = request.form
        con = get_db()
        con.execute("""
            INSERT INTO daily_entries (date, workday, cheat_day, weight_kg, waist_cm, body_fat_pct,
                mood, sleep_quality, breath_ex, ab_massage, gratitude, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("date"),
            int("workday" in data),
            int("cheat_day" in data),
            data.get("weight_kg") or None,
            data.get("waist_cm") or None,
            data.get("body_fat_pct") or None,
            data.get("mood") or None,
            data.get("sleep_quality") or None,
            int("breath_ex" in data),
            int("ab_massage" in data),
            int("gratitude" in data),
            data.get("notes") or None,
        ))
        con.commit()
        con.close()
        return redirect("/daily")
    return render_template("daily.html")

@app.route("/")
def index():
    return redirect("/daily")

if __name__ == "__main__":
    if not os.path.exists(DB_FILE):
        init_db()
    app.run(debug=True, host="0.0.0.0")
