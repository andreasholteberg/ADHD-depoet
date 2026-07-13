const dailySubjects = [
  'Dagens pusterom',
  'En liten ting, hvis du vil',
  'Ett lite sekund i dag',
  'En setning du kan ta med deg',
];

const dailyBodies = [
  'God morgen. Ingen krav i dag, bare en liten ting hvis du har rom: ta en pustepause og legg merke til skuldrene dine. En setning til lomma: "Du trenger ikke yte eller fikse alt i kveld, bare kom som du er."',
  'Hei. Du skal ikke prestere i dag. Hvis det er en dag for en liten ting, er det denne: legg merke til ditt forste alarmtegn. Og glemmer du det, har du ikke mislyktes.',
  'God morgen. Et lite holdepunkt for dagen: ga inn to minutter for skjermen skal av. Hvis det smeller, kan du reparere. Vi er her, uansett hvordan dagen blir.',
];

function pick<T>(items: T[]): T {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export function buildDailyMessage(baseUrl: string): { subject: string; text: string; variantKey: string } {
  const subject = pick(dailySubjects);
  const body = pick(dailyBodies);
  return {
    subject,
    text: `${body}\n\nApne Depoet: ${baseUrl}\n\nDu kan melde deg av her: ${baseUrl}/api/unsubscribe`,
    variantKey: subject,
  };
}
