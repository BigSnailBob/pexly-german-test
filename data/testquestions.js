// ---------------------------------------------------------------
// Grammar questions (40 multiple-choice questions, 4 difficulty levels)
// Each level has 10 questions. correctAnswerIndex is 0-based.
// Source: German Grammar Test.xlsx
// ---------------------------------------------------------------

export const grammarQuestions = [
  // Level 1 — basic
  {
    id: 1,
    level: 1,
    question: "Markus __________ gestern einen wichtigen Termin mit einem Kunden gehabt.",
    options: ["hat", "ist", "hatte"],
    correctAnswerIndex: 0
  },
  {
    id: 2,
    level: 1,
    question: "Silvi arbeitet als __________ im Büro und kümmert sich um die Bestellungen.",
    options: ["Kundendienst", "Bürokraft", "Geschäftsführer"],
    correctAnswerIndex: 1
  },
  {
    id: 3,
    level: 1,
    question: "Entschuldigung, mein Paket ist noch nicht angekommen. Können Sie mir helfen?",
    options: [
      "Ja, ich überprüfe das sofort für Sie.",
      "Nein, ich kann das nicht tun.",
      "Bestellen Sie ein neues Produkt."
    ],
    correctAnswerIndex: 0
  },
  {
    id: 4,
    level: 1,
    question: "Wir __________ jeden Tag viele E-Mails von Kunden.",
    options: ["schicken", "bekommen", "verkaufen"],
    correctAnswerIndex: 1
  },
  {
    id: 5,
    level: 1,
    question: "Der Kunde wartet schon __________ eine Stunde auf den Rückruf.",
    options: ["seit", "in", "um"],
    correctAnswerIndex: 0
  },
  {
    id: 6,
    level: 1,
    question: "Der Chef hat mir heute ein __________ über meine gute Arbeit gegeben.",
    options: ["Rechnung", "Lob", "E-Mail"],
    correctAnswerIndex: 1
  },
  {
    id: 7,
    level: 1,
    question: "Silvi __________ die Rechnungen für die Kunden jede Woche.",
    options: ["schickst", "schicken", "schickt"],
    correctAnswerIndex: 2
  },
  {
    id: 8,
    level: 1,
    question: "Wir __________ die Bestellung innerhalb von 3 Tagen.",
    options: ["liefern", "öffnen", "bekommen"],
    correctAnswerIndex: 0
  },
  {
    id: 9,
    level: 1,
    question: "Markus arbeitet __________ einem großen Online-Shop.",
    options: ["bei", "auf", "für"],
    correctAnswerIndex: 0
  },
  {
    id: 10,
    level: 1,
    question: "Die Mitarbeiter __________ heute länger arbeiten, weil viele Bestellungen da sind.",
    options: ["muss", "müssen", "müssen wir"],
    correctAnswerIndex: 1
  },

  // Level 2 — intermediate
  {
    id: 11,
    level: 2,
    question: "Markus möchte seinen Urlaub _________, weil er eine wichtige Präsentation vorbereiten muss.",
    options: ["planen", "verschieben", "genießen"],
    correctAnswerIndex: 1
  },
  {
    id: 12,
    level: 2,
    question: "Der Chef hat __________ ein neues Projekt vorgestellt.",
    options: ["ihnen", "ihn", "sie"],
    correctAnswerIndex: 0
  },
  {
    id: 13,
    level: 2,
    question: "Gestern __________ die Bestellungen schneller bearbeitet werden.",
    options: ["müssten", "müssen", "mussten"],
    correctAnswerIndex: 2
  },
  {
    id: 14,
    level: 2,
    question: "Wenn die Lieferung verspätet ist, __________ wir den Kunden sofort informieren.",
    options: ["könnten", "sollen", "werden"],
    correctAnswerIndex: 1
  },
  {
    id: 15,
    level: 2,
    question: "Die Firma hat seit Jahren Erfahrung __________ dem Verkauf von Elektronik.",
    options: ["auf", "mit", "bei"],
    correctAnswerIndex: 1
  },
  {
    id: 16,
    level: 2,
    question: "Wir haben das Problem schnell gelöst, __________ war der Kunde sehr zufrieden.",
    options: ["sondern", "obwohl", "deshalb"],
    correctAnswerIndex: 2
  },
  {
    id: 17,
    level: 2,
    question: "Silvi __________ die Präsentation nächste Woche halten.",
    options: ["wird", "würde", "hätte"],
    correctAnswerIndex: 0
  },
  {
    id: 18,
    level: 2,
    question: "Der Kunde hat seine Bestellung _________, weil die Lieferung zu spät war.",
    options: ["bestellt", "bezahlt", "storniert"],
    correctAnswerIndex: 2
  },
  {
    id: 19,
    level: 2,
    question: "Der Kunde hat sich __________ die schlechte Qualität der Produkte beschwert.",
    options: ["über", "auf", "für"],
    correctAnswerIndex: 0
  },
  {
    id: 20,
    level: 2,
    question: "Im Kundenservice __________ die Mitarbeiter immer freundlich und geduldig sein.",
    options: ["können", "müssen", "dürfen"],
    correctAnswerIndex: 1
  },

  // Level 3 — upper intermediate
  {
    id: 21,
    level: 3,
    question: "Die Marketingabteilung hat einen Bericht __________ die aktuelle Markttrends erstellt, um die Strategie anzupassen.",
    options: ["über", "für", "zu", "mit"],
    correctAnswerIndex: 0
  },
  {
    id: 22,
    level: 3,
    question: "Falls es zu einem technischen Problem kommt, __________ Sie bitte unseren Support kontaktieren.",
    options: ["sollen", "werden", "sollten", "könnten"],
    correctAnswerIndex: 2
  },
  {
    id: 23,
    level: 3,
    question: "Herr Fischer, welche __________ bringen Sie für den Job mit und wo sehen Sie Ihre persönlichen _________?",
    options: [
      "Argumente … Vorteile",
      "Qualifikationen … Stärken",
      "Sachen … Schwächen",
      "Zeugnisse … Fehler"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 24,
    level: 3,
    question: "Nachdem wir alle Optionen geprüft haben, hoffen wir __________ wir schnell eine effektive Lösung für das Problem finden werden.",
    options: ["dass", "auf", "weil", "ob"],
    correctAnswerIndex: 0
  },
  {
    id: 25,
    level: 3,
    question: "Die Mitarbeiter __________ regelmäßig _____ Schulungen teil, um ihre Fähigkeiten zu verbessern.",
    options: [
      "nehmen … —",
      "nehmen … an",
      "nehmen … zu",
      "nehmen … für"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 26,
    level: 3,
    question: "In unserem Büro gibt es _________, die für den Kundenservice zuständig sind.",
    options: [
      "mehrere Abteilungen",
      "mehrere Abteilungs",
      "mehreren Abteilungs",
      "mehreren Abteilungen"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 27,
    level: 3,
    question: "Der Vertrag __________ von beiden Parteien unterschrieben werden, bevor er gültig ist.",
    options: ["muss", "kann", "durf", "soll"],
    correctAnswerIndex: 0
  },
  {
    id: 28,
    level: 3,
    question: "Der Kundenservice sollte __________ sicherstellen, dass alle Anfragen innerhalb von 24 Stunden beantwortet werden.",
    options: [
      "möglichst",
      "so schnell wie möglich",
      "möglichst viele",
      "so wenig wie möglich"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 29,
    level: 3,
    question: "Falls ich die Möglichkeit _________, würde ich das neue Projekt leiten.",
    options: ["hätte", "hätte gehabt", "haben"],
    correctAnswerIndex: 0
  },
  {
    id: 30,
    level: 3,
    question: "Stefan geht __________ nicht oft ins Büro, __________ erledigt er seine Aufgaben immer pünktlich.",
    options: [
      "entweder … oder",
      "nicht nur … sondern auch",
      "weder … noch",
      "zwar … aber"
    ],
    correctAnswerIndex: 3
  },

  // Level 4 — advanced
  {
    id: 31,
    level: 4,
    question: "Welchen Arbeitsbereich bevorzugst du am meisten? Ach, weißt du – ich liebe _____________ Arbeitsumgebungen und eine entspannte Atmosphäre. Für mich kommt nur _____________ Arbeitsstil infrage. Ein flexibles Arbeitsumfeld wäre mein nächstes Ziel.",
    options: [
      "effiziente … traditioneller",
      "anregende … nachhaltiger",
      "anregende … effizienter",
      "produktive … standardisierter"
    ],
    correctAnswerIndex: 2
  },
  {
    id: 32,
    level: 4,
    question: "„In der Arbeitswelt muss sich ein Unternehmen den Marktbedingungen anpassen.\" Das bedeutet:",
    options: [
      "Das Unternehmen ist gezwungen, sich den Marktbedingungen anzupassen.",
      "Das Unternehmen hat das Recht, sich den Marktbedingungen anzupassen.",
      "Das Unternehmen ist imstande, sich den Marktbedingungen anzupassen.",
      "Das Unternehmen hat die Chance, sich den Marktbedingungen anzupassen."
    ],
    correctAnswerIndex: 0
  },
  {
    id: 33,
    level: 4,
    question: "In unserem Team gibt es verschiedene Einstellungen zu Präsentationen. Während einige Mitarbeiter gerne Präsentationen halten, _____________.",
    options: [
      "tun andere es nur ungern.",
      "tun andere nur es ungern.",
      "es tun andere nur ungern.",
      "andere tun es nur ungern."
    ],
    correctAnswerIndex: 3
  },
  {
    id: 34,
    level: 4,
    question: "Es scheint, als würde der Manager ständig neue Projekte an mich weitergeben. Kürzlich hat er mir wieder zusätzliche Aufgaben _____________, obwohl ich bereits viele Überstunden geleistet habe.",
    options: ["aufgedrückt", "aufgelegt", "aufgesetzt", "aufgeschoben"],
    correctAnswerIndex: 0
  },
  {
    id: 35,
    level: 4,
    question: "Der Personalcoach empfahl mir, ich _____________ vor dem Beginn meines neuen Projekts ein Workshop zur Entwicklung meiner Fähigkeiten belegen.",
    options: ["müsse", "dürfe", "solle", "könne"],
    correctAnswerIndex: 2
  },
  {
    id: 36,
    level: 4,
    question: "Sie arbeitet tatsächlich nur ihrem kleinen Kind _____________ von zu Hause aus, um mehr Zeit mit ihm zu verbringen.",
    options: ["entsprechend", "willen", "zuliebe", "zugunsten"],
    correctAnswerIndex: 2
  },
  {
    id: 37,
    level: 4,
    question: "Der Teamleiter hat während des letzten Meetings _____________ auf die aktualisierten Verfahrensweisen hingewiesen, um sicherzustellen, dass keine Missverständnisse entstehen.",
    options: ["ausdrücklich", "deutlich", "beiläufig", "allgemein"],
    correctAnswerIndex: 0
  },
  {
    id: 38,
    level: 4,
    question: "Die Mitarbeiter _____________ erklärt, warum Kundenfeedback für den Erfolg des Unternehmens entscheidend ist.",
    options: ["bekommen", "bekommt", "werden", "wird"],
    correctAnswerIndex: 0
  },
  {
    id: 39,
    level: 4,
    question: "Das Management-Team bemüht sich _____________ die Optimierung unserer Kundenservice-Prozesse.",
    options: ["an", "auf", "für", "um"],
    correctAnswerIndex: 3
  },
  {
    id: 40,
    level: 4,
    question: "Viele Mitarbeiter berichten von den Vorteilen, _____________ Stehen zu arbeiten, wie weniger Rückenschmerzen und erhöhte Energie.",
    options: ["im", "beim", "am", "um"],
    correctAnswerIndex: 0
  }
];

// ---------------------------------------------------------------
// Open-ended customer service scenarios (evaluated by AI)
// ---------------------------------------------------------------

export const scenarioQuestions = [
  {
    id: 1,
    question: "Ein Kunde ruft an und ist sehr verärgert, weil seine Bestellung mit zwei Wochen Verspätung eingetroffen ist. Er droht damit, eine negative Bewertung zu hinterlassen und nie wieder bei uns zu bestellen. Wie würden Sie auf diese Situation reagieren?"
  },
  {
    id: 2,
    question: "Eine Kundin schreibt Ihnen eine E-Mail und beschwert sich über ein defektes Produkt, hat aber die Garantiefrist um drei Tage überschritten. Wie gehen Sie mit dieser Anfrage um?"
  },
  {
    id: 3,
    question: "Ein Kunde verlangt, sofort mit Ihrem Vorgesetzten zu sprechen, noch bevor Sie die Möglichkeit hatten, sein Problem zu verstehen. Wie reagieren Sie darauf?"
  },
  {
    id: 4,
    question: "Sie haben einen Fehler gemacht und einem Kunden falsche Informationen über ein Produkt gegeben. Der Kunde hat daraufhin etwas Falsches gekauft. Wie würden Sie diese Situation klären?"
  },
  {
    id: 5,
    question: "Ein Kunde fordert einen Rabatt, den Sie laut Unternehmensrichtlinien nicht gewähren dürfen. Er besteht darauf und behauptet, ein anderer Mitarbeiter habe ihm diesen versprochen. Als Sie ihm höflich erklären, dass Sie den Rabatt nicht geben können, wirft er Ihnen vor, unhöflich zu sein. Wie gehen Sie mit dieser Situation um?"
  }
];

// ---------------------------------------------------------------
// CEFR level lookup based on grammar score (0–40)
// ---------------------------------------------------------------

export function getCefrLevelFromGrammarScore(score) {
  if (score <= 19) return "A2";
  if (score <= 23) return "B1.1";
  if (score <= 27) return "B1.2";
  if (score <= 31) return "B2.1";
  if (score <= 35) return "B2.2";
  return "C1";
}