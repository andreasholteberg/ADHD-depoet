import { Course, LanguageCard } from '../types';
import { LANGUAGE_CARDS } from './languageCards';

export const PUBLIC_COURSES: Course[] = [
  {
    id: 'gratis-inngang',
    title: 'Kapasitet før vilje',
    description: 'Et nytt blikk på de vanskeligste øyeblikkene: kanskje handler det om kapasitet, ikke vilje. En smak av stemmen – og en første, liten lettelse du kan kjenne med en gang.',
    badge: 'Gratis inngang',
    modules: [
      {
        id: 'gratis-1',
        courseId: 'gratis-inngang',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'gratis-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        title: 'Drypp 1: Når det ikke handler om vilje',
        videoText: 'Kanskje står dere på kjøkkenet. Du har dårlig tid. Barnet ditt skal legge fra seg et spill. Det er egentlig alt. Og likevel vet du allerede at dette kan bli vanskelig.\n\nAtferd handler ofte om kapasitet lenge før det handler om vilje. Barnet som raser fordi spillet er over, har ikke lagt en plan for å ødelegge kvelden din. Det som skjedde, er at evnen til å håndtere akkurat den overgangen – skuffelsen, bråstoppen – brast der og da. Ikke fordi han ikke vil. Fordi han ikke fikk det til akkurat nå.\n\nDu kan slutte å forsøke å kjefte frem en kapasitet som ikke er der ennå. Det går nemlig ikke. Ikke fordi du gjør det feil, men fordi det ikke er sånn det virker.\n\nÅ se dette nå er ikke en regning for alle gangene du så det annerledes. Skam sier: du er feil. Ansvar sier: dette må jeg se nærmere på. Vi skal holde oss til det siste.',
        screenText: 'Atferd handler ofte om kapasitet før vilje. Ikke "han vil ikke", men "han får det ikke til akkurat nå". Det fjerner ikke grensene. Det endrer rekkefølgen – og gir deg et sekund mer å handle klokt i.',
        reflectionQuestions: [
          'Tenk på én konkret konflikt fra den siste uka. Hvor var dere, og hva handlet det om?',
          'Da det smalt, hva var din første tanke? (F.eks: "Han gjør det med vilje", "Han hører ikke etter" eller "Jeg feiler")',
          'Hva kjenner du igjen hos ditt barn? (Smeller høyt, eller låser seg helt stille?)',
          'Hvis du ser den samme episoden gjennom "kapasitet" – hva kan ha vært i ferd med å bli for mye for barnet akkurat der?'
        ],
        microExercise: 'Velg én konflikt som gjentar seg hos dere. Neste gang den nærmer seg, gjør bare én ting: still deg selv spørsmålet før du svarer – "kan det være at han ikke får det til akkurat nå, ikke at han ikke vil?" Du trenger ikke gjøre noe annerledes. Bare still spørsmålet.',
        weeklyGoal: 'Prøve å stille meg selv ett spørsmål i et vanskelig øyeblikk: kapasitet eller vilje?',
        languageCards: [
          'Kanskje handler dette om at han ikke kan akkurat nå – ikke at han ikke vil.',
          'Det er ikke vilje. Det er kapasitet som har kjørt seg fast.',
          'Han gjør så godt han kan med det han har akkurat nå.',
          'Jeg kan ikke kjefte frem en kapasitet som ikke er der ennå.'
        ],
        situationCardId: 'skjerm-av',
        depotExports: {
          todayAction: 'Innsjekk: Still spørsmålet "kapasitet eller vilje?" i én situasjon i dag.',
          languageCards: [
            'Kanskje handler dette om at han ikke kan akkurat nå – ikke at han ikke vil.',
            'Jeg kan ikke kjefte frem en kapasitet som ikke er der ennå.'
          ],
          situationCardId: 'skjerm-av',
          sundayQuestion: 'Hvor så jeg kapasitet i stedet for vilje denne uken, og hva gjorde det med stemningen?',
          weeklyGoal: 'Det er nok å spørre: Er det kapasitet eller vilje akkurat nå?',
          returnMessage: 'Velkommen tilbake. Du har ikke gått glipp av noe, og du skal ikke ta igjen noe. Vi starter herfra i dag.'
        }
      },
      {
        id: 'gratis-2',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'gratis-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'gratis-inngang',
        title: 'Drypp 2: Noen ganger begynner det i deg',
        videoText: 'Kanskje står dere i gangen. Barnet ditt skal ta på sko. Det er egentlig alt. Men du har dårlig tid. Og før barnet i det hele tatt har gjort noe galt, kjenner du det allerede: kjeven strammer seg, stemmen din er litt kortere enn vanlig, skuldrene har krøpet opp mot ørene.\n\nVi snakker så ofte om hva barnet gjør. Men noen ganger begynner det ikke med barnet. Noen ganger begynner det i deg. Og hvis du akkurat nå kjente et lite stikk – vent litt. For dette er ikke en anklage.\n\nKroppen din har et alarmsystem. Det er bygget for å beskytte deg, og det slår på lenge før du rekker å tenke. Når du er sliten, har sovet for lite, eller har stått i for mye for lenge – slår det på fortere.\n\nAt det begynner i deg, betyr ikke at du er problemet. Det betyr bare at her – i din egen kropp – finnes det faktisk et håndtak. Det er ett av få steder du har noe å si.',
        screenText: 'Noen ganger begynner det i deg – ikke som skyld, men som det ene stedet du har et håndtak. Kroppen sier fra først. Å kjenne ditt tidligste tegn gir deg et sekund tilbake.',
        reflectionQuestions: [
          'Tenk på sist det glapp. Var noe i deg allerede spent – før barnet "gjorde noe"?',
          'Hvor i kroppen starter det hos deg? (Kjeve, bryst, skuldre, mage, vet ikke?)',
          'Når er eller var vinduet ditt smalest i dag?',
          'Hva pleier å være det aller første fysiske tegnet før tanken kommer?'
        ],
        microExercise: 'Denne uka: legg merke til ditt aller tidligste tegn én gang. Ikke gjør noe med det. Bare si innvendig: "der er det."',
        weeklyGoal: 'Merk mitt tidligste tegn én gang uten å endre det.',
        languageCards: [
          'Dette er beredskapen min. Jeg trenger et sekund.',
          'Det begynte i meg denne gangen. Det er greit å vite.',
          'Jeg er ikke reaksjonen min.',
          'Gi meg et øyeblikk, så er jeg her.'
        ],
        situationCardId: 'koker-selv',
        depotExports: {
          todayAction: 'Legg merke til ditt tidligste tegn i kroppen i dag. Bare si "der er det".',
          languageCards: [
            'Dette er beredskapen min. Jeg trenger et sekund.',
            'Jeg er ikke reaksjonen min.'
          ],
          situationCardId: 'koker-selv',
          sundayQuestion: 'Når var vinduet mitt størst denne uka – og hva gjorde det mulig?',
          weeklyGoal: 'Legg merke til ditt tidligste tegn i kroppen.',
          returnMessage: 'Velkommen tilbake. Du har ikke gått glipp av noe. Vi starter herfra i dag med å ta et sekund.'
        }
      },
      {
        id: 'gratis-3',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'gratis-3',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'gratis-inngang',
        title: 'Drypp 3: Når det glipper',
        videoText: 'Det er kveld. Det er stille nå. Du går kanskje forbi rommet der barnet ditt sover, og så kommer det – minnet om i morges. Den skarpe stemmen i gangen. Ordene som ble hardere enn du mente.\n\nNesten alle foreldre kjenner denne kvelden. Tankene som maler det samme spørsmålet: har jeg ødelagt noe?\n\nSå la meg si det viktigste først. Det som former et barn, er ikke at det aldri smeller. Vi kommer alle til å smelle. Det som former et barn, er hva som skjer etterpå. Om bruddet får stå alene – eller om noen kommer tilbake.\n\nBarnet ditt trenger ikke en perfekt voksen. Det er et umulig prosjekt. Det trenger en som tør å komme tilbake. Å komme tilbake er ikke å be om unnskyldning for å ha satt en grense. Det er å ta ansvar for tonen din – ikke for alt.\n\nDet er aldri for sent å komme tilbake. Heller ikke i kveld.',
        screenText: 'Det som former et barn er ikke at det aldri smeller – det er at noen kommer tilbake etterpå. Reparasjon er én ærlig setning, uten "men". Det er aldri for sent.',
        reflectionQuestions: [
          'Tenk på sist det ble et brudd mellom dere. Hva skjedde etterpå – ble det stående eller fant dere tilbake?',
          'Hva er vanskeligst for deg etter et krasj? (Å innrømme din del, eller å tåle barnets reaksjon?)',
          'Hva sier du vanligvis til deg selv på kvelden etter en tung dag?',
          'Kjenner du forskjellen mellom å beklage tonen din og å beklage selve grensen – og hvor går den for deg?',
          'Hva ville endret seg for deg hvis du virkelig stolte på at det aldri er for sent å komme tilbake?'
        ],
        microExercise: 'Neste gang det glipper: vent til roen er tilbake hos dere begge, gå inn, og si én ærlig setning – uten "men". F.eks: "Det ble større enn jeg mente. Unnskyld for at jeg ropte. Det er ikke din skyld."',
        weeklyGoal: 'Når det glipper, kommer jeg tilbake med én ærlig setning uten "men".',
        languageCards: [
          'Det ble større enn jeg ville. Det er ikke din skyld.',
          'Jeg er lei for at jeg hevet stemmen.',
          'Vi to er fortsatt et lag.',
          'Det er aldri for sent å komme tilbake.'
        ],
        situationCardId: 'jeg-ropte',
        depotExports: {
          todayAction: 'Hvis det glapp i dag: gå tilbake med én ærlig setning før leggetid.',
          languageCards: [
            'Det ble større enn jeg ville. Det er ikke din skyld.',
            'Det er aldri for sent å komme tilbake.'
          ],
          situationCardId: 'jeg-ropte',
          sundayQuestion: 'Hva reparerte vi denne uka – og hvordan kjentes det etterpå?',
          weeklyGoal: 'Når det glipper, går jeg tilbake med én ren setning.',
          returnMessage: 'Velkommen tilbake. Det er aldri for sent å komme tilbake – heller ikke til øvingsrommet.'
        }
      }
    ]
  },
];

export const PUBLIC_COURSE_LANGUAGE_CARDS: LanguageCard[] = (() => {
  const byText = new Map<string, LanguageCard>();
  for (const course of PUBLIC_COURSES) {
    for (const mod of course.modules) {
      mod.depotExports.languageCards.forEach((text, idx) => {
        if (LANGUAGE_CARDS.some((c) => c.text === text)) return;
        if (byText.has(text)) return;
        byText.set(text, {
          id: `course-${mod.id}-${idx + 1}`,
          category: 'Fra kursene',
          text,
          sourceModule: mod.title,
        });
      });
    }
  }
  return [...byText.values()];
})();

/**
 * Oversetter depot-eksportens kortreferanser (id eller tekst) til stabile kort-id-er.
 * Ukjente referanser hoppes stille over – vi lagrer aldri usynlige oppføringer.
 */
export function resolvePublicDepotCardRefs(refs: string[]): string[] {
  const out: string[] = [];
  for (const ref of refs) {
    const byId =
      LANGUAGE_CARDS.find((c) => c.id === ref) || PUBLIC_COURSE_LANGUAGE_CARDS.find((c) => c.id === ref);
    if (byId) {
      if (!out.includes(byId.id)) out.push(byId.id);
      continue;
    }
    const byText =
      LANGUAGE_CARDS.find((c) => c.text === ref) || PUBLIC_COURSE_LANGUAGE_CARDS.find((c) => c.text === ref);
    if (byText && !out.includes(byText.id)) out.push(byText.id);
  }
  return out;
}
