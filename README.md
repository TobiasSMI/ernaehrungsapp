# Ernährungs-Tagebuch Web-App

Eine minimalistische Webanwendung zur täglichen Erfassung von Ess- und Gewohnheitsdaten nach dem Vorbild handschriftlicher Protokolle – optimal für Mobile-First-Nutzung, gebaut mit Python, Flask und SQLite.

---

## Features

- **Tagesprotokoll**  
  Erfassung von Frühstück, Mittagessen, Abendessen, Snacks und Getränken mit Portionenwahl und Ampelbewertung
- **Komfortabel mobil**  
  Fingerfreundlich, große Buttons, schöne Farben, nutzerzentriertes Design
- **Checkboxen für Arbeitstag, Cheat Day, Sport, Gewohnheiten**
- **Notizfeld** zum freien Eintrag
- **Basis-Auswertung** in Planung

## Tech Stack

- **Frontend:** pures HTML5, CSS3, mobile-optimiertes UI (kein Framework)
- **Backend:** Python 3, [Flask](https://flask.palletsprojects.com/)
- **Datenbank:** SQLite3
- **Templates:** Flask/Jinja2

## Projektstatus

**Früher Prototyp – “Work in Progress”**  
Das Projekt befindet sich in der grundlegenden Entwicklungsphase.  
Es ist eine solide Demo/Spielwiese im Heimnetz und ein technisches Grundgerüst.  
Noch keine Benutzerverwaltung, noch kein Deployment für das öffentliche Internet, keine Garantie auf Bugfreiheit.

## Installation

1. Repository klonen:
    ```
    git clone https://github.com/dein-benutzername/ernaehrungsapp.git
    cd ernaehrungsapp
    ```
2. Virtuelle Umgebung (empfohlen) und Abhängigkeiten:
    ```
    python -m venv .venv
    source .venv/bin/activate      # Windows: .venv\Scripts\activate
    pip install flask
    ```
3. App starten:
    ```
    python app.py
    ```
4. Im Browser aufrufen:
    ```
    http://localhost:5000/daily
    ```
    oder im Heimnetz mit IP-Adresse:  
    ```
    http://<LAN-IP>:5000/daily
    ```

## Roadmap

- Monatsprotokoll und grafische Auswertungen
- Authentifizierung, Nutzerverwaltung (optional)
- Noch mehr UI/UX-Optimierung und Animationen, einfachere Navigationn

## Lizenz

MIT License

---

