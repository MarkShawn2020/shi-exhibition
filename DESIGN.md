
### Prompt für die Website-Gestaltung

**Rolle:** Du bist ein Experte für UI/UX- und Webdesign mit einem scharfen Auge für minimalistische, zeitgenössische und brutalistisch inspirierte Ästhetik.

**Aufgabe:** Erstelle ein Designkonzept für eine Website für ein kreatives Studio (z. B. Architektur, Design oder Kunst). Das Design sollte stark von der Website dorsa.cc inspiriert sein und deren Kernprinzipien in Bezug auf Stil, Layout, Farbpalette, Typografie und Benutzererfahrung widerspiegeln. Das Ergebnis sollte professionell, avantgardistisch und inhaltsorientiert sein.

---

**1. Allgemeiner Design-Stil und Thema:**
*   **Ästhetik:** Minimalistisch mit brutalistischen Einflüssen. Das Design sollte kühn, strukturiert und zweckmäßig sein. Vermeide unnötige Verzierungen, Farbverläufe oder komplexe Schatten. Der Fokus liegt auf Typografie, Raster und hochwertigen visuellen Inhalten.
*   **Stimmung:** Professionell, technisch, präzise, modern und intellektuell.

**2. Layout und Struktur:**
*   **Homepage-Layout:**
    *   **Header:** Ein persistenter, am oberen Rand fixierter Header. Er sollte in drei Spalten aufgeteilt sein:
        *   **Links:** Der Name der Website/des Studios.
        *   **Mitte:** Eine dynamische Digitaluhr, die kontinuierlich die Zeit anzeigt (Stunden:Minuten:Sekunden:Zentisekunden). Dies ist ein zentrales, dynamisches Element.
        *   **Rechts:** Ein minimalistisches Menü-Icon (z. B. ein einfaches "Menü"-Symbol oder ein Burger-Icon).
    *   **Hauptinhalt:** Der Hauptbereich der Startseite sollte eine bildschirmfüllende, responsive Bildergalerie im "Justified Grid"- oder "Masonry"-Stil sein. Die Bilder sollten Kante an Kante ohne Ränder angeordnet sein. Jedes Bild in der Galerie ist ein Link zu einer Projektseite.
*   **Navigationsmodell (UX):**
    *   Die Hauptnavigation erfolgt über **Overlays**. Klicks auf das Menü-Icon oder Projekteinträge sollten keine neue Seite laden. Stattdessen soll sich ein Overlay-Panel von der Seite (z. B. von rechts für das Menü, von links für Projekte) über den bestehenden Inhalt schieben.
    *   Der Inhalt hinter dem Overlay sollte einen leichten **Weichzeichner-Effekt** (`backdrop-filter: blur(...)`) aufweisen, um den Fokus auf den Vordergrund zu lenken.
*   **Projekt-Index (Menü-Overlay):**
    *   Das Menü-Overlay ist ein Vollbild-Index aller Projekte.
    *   Das Layout sollte tabellarisch und sauber sein, mit Spalten für: Projektnummer, Projekttitel, Kategorie und Ort/Jahr.
    *   Der Text sollte gut lesbar sein, wobei die Projekttitel die primären klickbaren Elemente sind.
*   **Projektseiten (Detail-Overlay):**
    *   Jede Projektseite öffnet sich in einem eigenen Overlay.
    *   Am oberen Rand befindet sich der Projekttitel und eine "Schließen"-Schaltfläche.
    *   Darunter folgt ein zweispaltiger Bereich: eine schmale Spalte für Metadaten (Kategorie, Jahr, Ort, Mitarbeiter) und eine breitere Spalte für die Projektbeschreibung.
    *   Unterhalb des Textbereichs wird eine vertikale Galerie mit Projektbildern und -videos angezeigt.

**3. Farbpalette:**
*   **Hintergrund:** Ein sehr dunkles Grau, fast Schwarz (`#1e1e1e` oder `#000000`) für den Haupt-Website-Hintergrund.
*   **Vordergrund (Overlays):** Ein reines Weiß (`#ffffff`) als Hintergrund für die Overlays (Projekt-Index, Projektseiten, Infoseite).
*   **Primärer Text:** Weißer Text (`#ffffff`) auf dunklem Hintergrund und schwarzer Text (`#000000`) auf weißem Hintergrund.
*   **Akzentfarbe:** Eine sehr helle, fast neongrüne/gelbe Farbe (`#ddff00`). Diese wird sparsam, aber wirkungsvoll für Links im Projekt-Index, Hervorhebungen und interaktive Elemente verwendet, um einen hohen Kontrast zu schaffen.

**4. Typografie:**
*   **Schriftart:** Verwende eine einzige, hochwertige, variable serifenlose Schriftart (z. B. Diatype Variable, Helvetica Now Variable, Inter). Die Schriftart ist ein zentrales Gestaltungselement.
*   **Hierarchie:**
    *   **Überschriften (H1, H2):** Groß (`ca. 2rem`), mit normaler Schriftstärke (`font-weight: 400`). Sie sollen präsent, aber nicht übermäßig fett sein.
    *   **Fließtext:** Kleinere Schriftgröße (`ca. 1.1rem`), aber mit einer leicht erhöhten Schriftstärke (`font-weight: 500`), um die Lesbarkeit auf den kontrastreichen Hintergründen zu gewährleisten.
    *   **Index/Listen:** Klare, serifenlose Schrift, wobei Links die Akzentfarbe verwenden.
*   **Stil:** Die Typografie sollte sauber, konsistent und gut ausgerichtet sein.

**5. Interaktive Elemente und Animationen:**
*   **Hover-Effekte:** Dezent. Links können beim Überfahren leicht an Deckkraft verlieren oder die Akzentfarbe annehmen.
*   **Übergänge:** Die Übergänge für das Öffnen und Schließen der Overlays sollten sanft und schnell sein (z. B. `slide-in-from-left` oder `slide-in-from-right` mit einer Dauer von ca. 0,1 Sekunden).
*   **Bilder:** Bilder können einen dezenten Zoom-Effekt beim Überfahren haben, um Interaktivität anzudeuten.

Erstelle basierend auf diesen Richtlinien ein visuelles Konzept und eine detaillierte Beschreibung der Website.
