import { Course } from '../types';

export const COURSES: Course[] = [
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
          'Hva sier du vanligvis til deg selv på kvelden etter en tung dag?'
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
  {
    id: 'startkurs',
    title: 'Regulering før retning',
    description: 'En roligere vei gjennom de øyeblikkene som gjør vondt. Lær å regulere deg selv først, og lån barnet din ro i situasjonen.',
    badge: 'Anbefalt startkurs',
    modules: [
      {
        id: 'start-1',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'start-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'startkurs',
        title: 'Modul 1: Din egen beredskapskropp',
        videoText: 'Kanskje står dere på badet. Tannpuss. Du har egentlig bare bedt om én liten ting. Og du hadde lovet deg selv at i kveld skulle du være den rolige. Så kommer det et nei du ikke hadde regnet med – og noe brister på innsiden før du rekker å tenke.\n\nDet du kjente i kroppen der, er ikke et tegn på at du mangler omsorg. Det er et nervesystem som gjør akkurat det det er bygget for å gjøre når det oppfatter fare. Høy lyd, et låst ansikt – kroppen tolker det som trussel og utløser beredskapskroppen.\n\nOg her er det viktigste: du er ikke reaksjonen din. Beredskapskroppen er ikke hvem du er. Den er noe som skjer i deg.\n\nMålet er ikke å aldri bli sint. Målet er bare å kjenne din egen alarm litt – så du kan møte den, i stedet for å være den.',
        screenText: 'Reaksjonen din er kroppens biologiske alarm, ikke din karakter. Du er ikke reaksjonen din. Denne uka: legg merke til alarmen i kroppen din.',
        reflectionQuestions: [
          'Hva var det aller første du kjente i kroppen sist det glapp?',
          'Hvor starter det vanligvis? (F.eks. i kjeven, skuldrene, pusten eller magen)',
          'Er det bestemte tider på døgnet der toleransevinduet ditt er smalest?'
        ],
        microExercise: 'Neste gang du kjenner alarmen, stopp og si rolig innvendig: "Dette er beredskapen min. Jeg trenger et sekund." Du skal ikke tvinge deg selv til å bli rolig, bare navngi tilstanden.',
        weeklyGoal: 'Jeg legger merke til mitt tidligste alarmtegn én gang om dagen.',
        languageCards: [
          'Dette er beredskapen min som svarer. Jeg trenger et sekund.',
          'Jeg er ikke reaksjonen min.',
          'Dette handler om at jeg er sliten – ikke om at jeg gjør feil.',
          'Gi meg et øyeblikk, så er jeg her.'
        ],
        situationCardId: 'koker-selv',
        depotExports: {
          todayAction: 'Innsjekk: Hvor er toleransevinduet ditt akkurat nå?',
          languageCards: ['Dette er beredskapen min som svarer. Jeg trenger et sekund.'],
          situationCardId: 'koker-selv',
          sundayQuestion: 'Når var vinduet mitt størst denne uka, og hva gjorde det mulig?',
          weeklyGoal: 'Legg merke til ditt tidligste alarmtegn uten å dømme det.',
          returnMessage: 'Velkommen tilbake. Du skal ikke ta igjen noe. Vi starter herfra i dag.'
        }
      },
      {
        id: 'start-2',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'start-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'startkurs',
        title: 'Modul 2: Det lille sekundet',
        videoText: 'Kanskje er det morgen og dere skal ut. Barnet ditt sitter på gulvet med én sokk på, og kommer seg ikke videre. Du kjenner kjeven stramme seg – og denne gangen merker du det. Det er en seier.\n\nMen å merke det er én ting. Å gjøre noe annet enn det du pleier, akkurat i det sekundet – det er noe helt annet. Det er så lett å fyke rett forbi det.\n\nSå hva gjør man egentlig med et sånt sekund? Ikke noe stort. Faktisk bare én liten ting som sier til kroppen din, helt uten ord: det er ingen fare her. Bare mye følelser.\n\nDet kan være å senke stemmen et eneste hakk. Å kjenne føttene dypt mot gulvet. Én rolig, dyp utpust. Å la hendene få slippe litt taket. Velg én. Ikke fem. Én.\n\nMålet er ikke å bli rolig, men å gjøre én ting litt langsommere. Og det er nok.',
        screenText: 'Du har funnet sekundet. Nå handler det om å gjøre én bitteliten tings forskjell. Ikke bli rolig på kommando – bare gjør én bevegelse eller setning litt langsommere.',
        reflectionQuestions: [
          'Hva er din gamle reflekshandling når det koker? (Heve stemmen, ta over fysisk, trekke deg og bli kald, gi etter kjipt?)',
          'Hvilken av disse små handlingene tror du nervesystemet ditt vil respondere best på? (Senke stemmen, bevisste føtter i gulvet, dyp utpust, slippe skuldrene?)',
          'Hva tror du blir det vanskeligste med å huske den i øyeblikket?'
        ],
        microExercise: 'Velg din ENE lille ting fra listen. Neste gang du kjenner alarmen blusse opp, utfør denne ene tingen før du gir en beskjed eller svarer. Bare én ting, litt langsommere.',
        weeklyGoal: 'Jeg prøver min ene lille ting i ett øyeblikk der jeg kjenner alarmen.',
        languageCards: [
          'Ett sekund. Føttene i gulvet.',
          'Jeg trenger ikke å bli rolig. Jeg trenger bare å gjøre én ting langsommere.',
          'Ingen fare her. Bare mye følelser.',
          'Jeg tar et sekund, så er jeg her.'
        ],
        situationCardId: 'koker-selv',
        depotExports: {
          todayAction: 'Øv på din ene lille ting akkurat nå: senk skuldrene eller ta en lang utpust.',
          languageCards: [
            'Jeg trenger ikke å bli rolig. Jeg trenger bare å gjøre én ting langsommere.',
            'Ingen fare her. Bare mye følelser.'
          ],
          situationCardId: 'koker-selv',
          sundayQuestion: 'Hvilken liten ting ga kroppen min mest ro denne uka?',
          weeklyGoal: 'Gjøre én liten ting langsommere når alarmen er der.',
          returnMessage: 'Velkommen tilbake. Du har ikke mistet noe. Velg din ene lille ting i dag.'
        }
      },
      {
        id: 'start-3',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'start-3',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'startkurs',
        title: 'Modul 3: Lånte bremser',
        videoText: 'Du har gjort din ene lille ting. Du er ikke helt kapret. Men barnet ditt er det – fullstendig. Det skriker, kanskje kaster det noe, kanskje låser det seg helt.\n\nOg nå står du der med et valg: forklare, korrigere, sette grensen med en gang – eller noe annet?\n\nNår barnet mister kontrollen, har det koblet ut den tenkende delen av hjernen. Å rope felles regler gjør bare at det preller av. Det barnet trenger i det øyeblikket, er en voksen som blir i kaoset, og låner barnet sine egne bremser. En stødig vegg som ikke raser sammen under sammenstøtet.\n\nFørst kontakt, så retning.\n\nDette koster. Å ta imot et barns storm uten å sende den tilbake er noe av det tyngste som finnes. Du kommer ikke til å klare det hver gang. Det gjør deg bare til et menneske med et nervesystem.',
        screenText: 'Når barnet mister sine egne bremser, hjelper ikke teorier eller krav. Senk ditt eget tempo, si én lav setning og bare vær der. Først kontakt, så retning.',
        reflectionQuestions: [
          'Hva pleier å skje hvis du prøver å resonnere eller forklare midt i et intenst utbrudd?',
          'Hva slags kontakt tror du barnet ditt tåler best på sitt verste? (Rolige ord, fysisk berring, eller bare at du sitter i nærheten?)',
          'Hva oppleves som vanskeligst med å "bare bli" uten å måtte løse situasjonen der og da?'
        ],
        microExercise: 'Neste gang barnet mister kontrollen: før du fokuserer på regler, senk tempoet hørbart, si én dyp og lav setning: "Det er for mye akkurat nå. Jeg er her." Og bli der – ikke for å stoppe utbruddet, men for at barnet ikke skal være alene.',
        weeklyGoal: 'I ett øyeblikk der barnet mister kontrollen, prøver jeg å bli i stedet for å forklare.',
        languageCards: [
          'Det er for mye akkurat nå. Jeg er her.',
          'Du har lov til å være sint. Jeg blir her sammen med deg.',
          'Vi snakker etterpå. Nå er jeg bare her.',
          'Jeg trenger ikke å løse dette nå. Jeg trenger bare å bli.'
        ],
        situationCardId: 'barnet-eksploderer',
        depotExports: {
          todayAction: 'Hvis barnet mister kontrollen i dag: gjør deg selv litt tyngre, ta en utpust, si "Jeg er her."',
          languageCards: [
            'Det er for mye akkurat nå. Jeg er her.',
            'Jeg trenger ikke å løse dette nå. Jeg trenger bare å bli.'
          ],
          situationCardId: 'barnet-eksploderer',
          sundayQuestion: 'Når klarte jeg å bli denne uka – og hva gjorde det med oss?',
          weeklyGoal: 'Bli i kaoset uten å forklare eller kreve umiddelbare svar.',
          returnMessage: 'Velkommen tilbake. Å bli i stormen krever mye. Vi øver videre i dag med lave skuldre.'
        }
      },
      {
        id: 'start-4',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'start-4',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'startkurs',
        title: 'Modul 4: Når dine egne bremser er slitne',
        videoText: 'Noen dager har vi rett og slett ingenting å gi bort. Du har kanskje sovet tre timer, klesvasken hoper seg opp, og det raser under panseret på deg selv. Da er det en umulig oppgave å være barnets ytre regulering.\n\nDet er i disse øyeblikkene vi må fjerne skammen og koble på selvmedfølelsen. Du er ikke en robot. Det er biologisk uunngåelig at toleranseområdet ditt blir trangt når du er tom.\n\nÅ ta vare på seg selv er det første steget for å kunne ta vare på noen andre. Hvis du merker at det koker, øv på å ta et skritt tilbake fysisk, eller ta en pause. Si fra høyt: "Motorer går for fort nå. Vi må stoppe litt."',
        screenText: 'Når du er tom for bremsevæske selv, kan du ikke samregulere barnet. Slipp skammen, reduser kravene for kvelden, og ta et bevisst skritt tilbake.',
        reflectionQuestions: [
          'Hvordan merker du at reservetanken din er helt tom?',
          'Hvilke krav eller forventninger kan du faktisk fjerne på en slik dag for å skåne dere begge?',
          'Hvordan føles det å si: "Jeg er sliten nå, og det er helt greit"?'
        ],
        microExercise: 'Neste gang du kjenner at du koker over og mangler overskudd, gjør ett minimalt grep: reduser kravene for kvelden. Bestill ferdigmat, la klesvasken ligge, og fortell både deg selv og barnet at i dag tar vi det helt rolig.',
        weeklyGoal: 'Jeg tar ett bevisst skritt tilbake eller senker et krav når jeg merker at reservetanken min er tom.',
        languageCards: [
          'Jeg er sliten akkurat nå. Det er greit.',
          'Nå går min motor også for fort. Vi tar en liten pause.',
          'Dette er ikke en krise, bare en sliten kveld.',
          'Jeg gjør så godt jeg kan med det overskuddet jeg har.'
        ],
        situationCardId: 'koker-selv',
        depotExports: {
          todayAction: 'Senk ett krav til deg selv eller barnet i kveld. La det ligge som ikke er strengt nødvendig.',
          languageCards: ['Nå går min motor også for fort. Vi tar en liten pause.'],
          situationCardId: 'koker-selv',
          sundayQuestion: 'Hvor klarte jeg å senke kravene for meg selv denne uka?',
          weeklyGoal: 'Tillat deg selv å ha tette grenser og mindre kapasitet enn vanlig.',
          returnMessage: 'Velkommen tilbake. Du gjør en utrolig jobb. Vi starter på nytt i dag.'
        }
      },
      {
        id: 'start-5',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'start-5',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'startkurs',
        title: 'Modul 5: Reparasjon',
        videoText: 'Langsiktig retning handler ikke om å aldri gjøre feil. Svaret på "mister jeg barnet mitt?" ligger i returen. Hver gang vi voksne rydder opp etter et krasj uten å skylde det på barnets oppførsel, reparerer vi relasjonen og styrker barnets tillitskart.\n\nReparasjon betyr å skille barnets verdi fra dets atferd. Du forteller dem at uansett hvordan det stormet, er kjærligheten der. Det lærer barnet at stormer kan tåles, og at de ikke er ødelagte på innsiden.',
        screenText: 'Det som heler relasjonen er ikke fraværet av brudd, men den modige returen. Gå tilbake med én ren setning uten anklagende "men".',
        reflectionQuestions: [
          'Hva stopper deg oftest fra å gå tilbake og reparere med en gang?',
          'Hvordan har du det vanligvis i timene etter at en konflikt har roet seg?',
          'Hvilke ord tror du barnet ditt mest av alt trenger å høre fra deg i kveld?'
        ],
        microExercise: 'Hvis det blir et brudd i dag, vent til pulsen er normal for dere begge. Gå så inn og si de tre elementene rydde-setningen består av: ta ansvar for din reaksjon, valider deres overbelastning, og bekreft at alt er trygt nå.',
        weeklyGoal: 'Jeg øver på én ren reparasjon uten forbehold eller mot-anklager denne uken.',
        languageCards: [
          'Det ble for voldsomt i sted. Jeg er lei for at jeg ropte. Det var mitt ansvar.',
          'Du er trygg hos meg, også når det blir vanskelig.',
          'Vi to hører fortsatt sammen.',
          'Jeg tåler at du ble sint.'
        ],
        situationCardId: 'jeg-ropte',
        depotExports: {
          todayAction: 'Hvis dere hadde en tøff situasjon i dag: ta initativet til en liten og rolig reparasjon før kvelden.',
          languageCards: ['Det ble for voldsomt i sted. Jeg er lei for at jeg ropte. Det var mitt ansvar.'],
          situationCardId: 'jeg-ropte',
          sundayQuestion: 'Hvilken forskjell gjorde det siste reparasjons-øyeblikket hos oss denne uka?',
          weeklyGoal: 'Gå tilbake og rydd opp uten å forklare unna dine egne reaksjoner.',
          returnMessage: 'Velkommen tilbake. Det er aldri for sent å starte på nytt. Vi møtes her i dag.'
        }
      }
    ]
  },
  {
    id: 'førersetet-hoved',
    title: 'Førersetet: Øvingsprogrammet',
    description: 'Bokens og kursrekkens samlede læringsreise – ryggraden i Førersetet, steg for steg fra blikk til selvforståelse, samregulering, hverdagsstruktur, reparasjon og det lange løpet.',
    badge: 'Hovedprogram',
    modules: [
      {
        id: 'hoved-1',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'hoved-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'førersetet-hoved',
        title: 'Modul 1: Blikket – kapasitet før vilje',
        videoText: 'Det er en helt vanlig tirsdag ettermiddag. Du rører i pastasausen, kaster et blikk på klokka, og kjenner den lette strammingen i brystet – om tretti minutter skal dere ut. Tiåringen din sitter dypt oppslukt i et spill. Du har gitt beskjed, to ganger, rolig. Og idet du sier at nå er tiden ute, snur rommet. Nettbrettet smelles i bordet, stemmen heves til et brøl: «Du ødelegger alltid alt!»\n\nI et slikt øyeblikk trekker hjernen vår den enkleste konklusjonen: han vil ikke. Han tøyer grensene med vilje. Men her ligger kanskje den største misforståelsen mellom disse barna og den voksne verden. For atferd handler ofte om kapasitet, lenge før det handler om vilje.\n\nTenk på barnet ditt som et kjøretøy med en kraftig motor – energi, kreativitet, hyperfokus – men med styring og bremser som ennå ikke er dimensjonert for farten. Det vi fagfolk kaller eksekutive funksjoner, og som du kan tenke på som barnets indre styringssystem, henger hos noen barn rett og slett etter. Arbeidsminnet er lite og glatt, så beskjeder faller av. Tiden finnes i to soner: «nå» og «ikke nå». Og mellom en følelse og en handling mangler ofte den lille støtdemperen som lar resten av oss vente.\n\nDet er ikke det at barnet ikke vet reglene. Barnet kan gjenfortelle dem for deg. Problemet er at kunnskapen ikke er koblet inn i handlingen idet impulsen treffer. Det er i dette gapet – mellom det barnet vet og det barnet får til i øyeblikket – at hverdagens tyngste konflikter oppstår.\n\nDette er inngangsporten til hele Førersetet-blikket, og alt vi gjør videre hviler på det. Når vi klarer å oversette barnets atferd fra et spørsmål om vilje til et spørsmål om kapasitet, skjer det et lite skifte. Du kan ikke moralisere frem et ferdig styringssystem, og du kan ikke kjefte frem en bremsekapasitet som ikke er der ennå. Skam sier: du er feil. Ansvar sier: dette må jeg se nærmere på. Det betyr ikke at vi fjerner krav eller grenser – det betyr at vi tilpasser dem til den kapasiteten barnet faktisk har, ikke den vi skulle ønske det hadde. Det er der reisen begynner.',
        screenText: 'Atferd handler ofte om kapasitet lenge før det handler om vilje. Barnet har en kraftig motor og et styringssystem som ennå henger etter – det vet reglene, men får dem ikke koblet inn i handlingen i øyeblikket. Tilpass kravet til kapasiteten, ikke omvendt.',
        reflectionQuestions: [
          'Hvilke situasjoner tolker du oftest som ulydighet eller vrangvilje?',
          'Hvor ser du at barnet ditt tross alt strekker seg langt – og hvor mye energi tror du det egentlig bruker?',
          'Tenk på én tilbakevendende konflikt: hva av det handler om vilje, og hva kan handle om kapasitet som har kjørt seg fast?',
          'Hvor merker du gapet mellom det barnet vet og det barnet får til i øyeblikket?',
          'Hva ville endret seg i tonen din hvis du så atferden som «får ikke til akkurat nå» i stedet for «vil ikke»?'
        ],
        microExercise: 'Velg én konflikt som gjentar seg hos dere. Neste gang den nærmer seg, still deg selv ett spørsmål før du svarer: «Hva her handler om vilje – og hva kan handle om kapasitet som har kjørt seg fast?» Du trenger ikke løse noe. Spørsmålet alene gir deg et sekund bredere vei.',
        weeklyGoal: 'Oversette én konflikt om dagen fra «vil ikke» til «får ikke til akkurat nå».',
        languageCards: [
          'Kanskje handler dette om kapasitet, ikke vilje.',
          'Han gjør så godt han kan med det han har akkurat nå.',
          'Jeg kan ikke kjefte frem en kapasitet som ikke er der ennå.',
          'Hva trenger han fra meg for å få det til?'
        ],
        situationCardId: 'skjerm-av',
        depotExports: {
          todayAction: 'Oversett én konflikt i dag fra «vil ikke» til «får ikke til akkurat nå» – bare i ditt eget hode.',
          languageCards: [
            'Kanskje handler dette om kapasitet, ikke vilje.',
            'Han gjør så godt han kan med det han har akkurat nå.'
          ],
          situationCardId: 'skjerm-av',
          sundayQuestion: 'Hvor så jeg kapasitet i stedet for vilje denne uka – og hva gjorde det med stemningen mellom oss?',
          weeklyGoal: 'Se kapasitet der jeg pleier å se vilje.',
          returnMessage: 'Velkommen tilbake. Du har ikke gått glipp av noe. Vi starter med ett nytt blikk i dag.'
        }
      },
      {
        id: 'hoved-2',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'hoved-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'førersetet-hoved',
        title: 'Modul 2: Føreren – din egen beredskapskropp',
        videoText: 'Det skulle vært en helt vanlig kveldsrutine. Et spørsmål om å pusse tenner blir møtt med «NEI», som blir til rop, som blir til at noe kastes i veggen. Og du, som hadde lovet deg selv å være den rolige, kjenner at noe brister på innsiden. Du hever stemmen, sier ting du ikke mener. Etterpå sitter du igjen med en skamfull selvkritikk: har jeg ødelagt barnet mitt?\n\nI forrige modul snudde vi blikket på barnet: fra vilje til kapasitet. Nå skal vi snu det samme blikket innover, mot oss selv. For den voksne er ikke reaksjonen sin. Det du kjenner i kroppen når barnet smelter ned, er ikke et tegn på at du mangler omsorg. Det er et nervesystem som gjør nøyaktig det det er bygget for å gjøre når det oppfatter fare.\n\nVi kaller det beredskapskroppen. Når barnet roper, slår eller skjeller, registrerer ikke de eldste lagene i hjernen din «dette er mitt overbelastede barn som trenger hjelp». De registrerer høy lyd, brå bevegelse, et intenst ansikt – fare – og slår på alarmen. Pulsen øker, oppmerksomheten snevres inn, og verden smalner til to valg: angripe eller trekke deg. Psykologer kaller sonen der vi har tilgang til hele oss selv for toleransevinduet. Når alarmen tar over, lukkes det vinduet, og den rolige, kloke delen av deg kobles midlertidig ut.\n\nOg vi reagerer sjelden bare på det som skjer her og nå. Vi navigerer etter kart som ble tegnet da vi selv var barn. Hvis du vokste opp der sterke følelser var farlige, kan barnets sinne vekke et gammelt ekko i deg. Hvis du vokste opp i kaos, kan barnets uro vekke et desperat behov for kontroll. Barna våre trykker, med sin rå og ufiltrerte væremåte, på nøyaktig de knappene vi lærte å skamme oss over.\n\nHer er det avgjørende skillet, og det bærer hele resten av programmet: forskjellen på skyld og ansvar. Det er ikke din skyld at kroppen din går i alarm under press – det er biologi. Men du har ansvaret for å bli kjent med din egen alarm, så du slipper å legge din egen bagasje over på barnets skuldre. Skyld er tilbakeskuende og lammer. Ansvar er fremoverlent og gjør bevegelse mulig. Og det leder oss til selve grunnsteinen i alt videre arbeid: regulering før retning. Du kan ikke låne barnet en ro du ikke selv har. Derfor begynner vi her – med å merke når alarmen er i ferd med å ta rattet, før den gjør det.',
        screenText: 'Du er ikke reaksjonen din. Beredskapskroppen er det som skjer i deg når alarmen tar over og toleransevinduet lukkes – ofte farget av gamle kart fra din egen oppvekst. Det er ikke din skyld, men ditt ansvar å merke den. Regulering før retning: du kan ikke låne bort en ro du ikke selv har.',
        reflectionQuestions: [
          'Hva er din kropps aller tidligste tegn på at handlingsrommet ditt er i ferd med å smalne?',
          'Hva gjør deg mest redd eller sint i konflikt med barnet ditt?',
          'Kjenner du igjen et gammelt kart fra din egen oppvekst – en frykt for kaos, eller for sterke følelser?',
          'Når på døgnet er toleransevinduet ditt smalest?',
          'Hva sier du til deg selv etterpå når du har mistet det – og hvordan ville du sagt det til en venn?'
        ],
        microExercise: 'Neste gang du kjenner at noe varmer raskt i ansiktet eller at pulsen tar et hopp midt i en låsning, si til deg selv: «Dette er beredskapen min som svarer. Jeg trenger et sekund.» Du skal ikke bli rolig på kommando. Det at du setter ord på det, gir kroppen et lite øyeblikk til å puste.',
        weeklyGoal: 'Merke mitt eget tidligste alarmtegn én gang om dagen, uten å endre det.',
        languageCards: [
          'Dette er beredskapen min som svarer. Jeg trenger et sekund.',
          'Jeg er ikke reaksjonen min.',
          'Dette handler om at jeg er sliten – ikke om at jeg er feil.',
          'Nå går min motor også for fort. Vi tar en pause begge to.'
        ],
        situationCardId: 'koker-selv',
        depotExports: {
          todayAction: 'Innsjekk: hvor er vinduet ditt i dag? Og merk ett tidlig alarmtegn i kroppen.',
          languageCards: [
            'Dette er beredskapen min som svarer. Jeg trenger et sekund.',
            'Jeg er ikke reaksjonen min.'
          ],
          situationCardId: 'koker-selv',
          sundayQuestion: 'Når var vinduet mitt størst denne uka – og hva gjorde det mulig?',
          weeklyGoal: 'Merke mitt tidligste alarmtegn én gang om dagen.',
          returnMessage: 'Velkommen tilbake. Å bli kjent med sin egen alarm tar tid. Vi merker ett tegn i dag.'
        }
      },
      {
        id: 'hoved-3',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'hoved-3',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'førersetet-hoved',
        title: 'Modul 3: Lånte bremser – samregulering',
        videoText: 'Lyden fra ytterdøren går opp en ettermiddag. Et hardt smell, og påfølgende stillhet. Du hadde kanskje sett for deg en hyggelig ettermiddag, kanskje til og med laget favorittmiddagen. Men idet du ber barnet henge opp jakken, smeller det. Jakken kastes i veggen, ordene er kvasse og urettferdige: du maser alltid, alt er din skyld, middagen er dritt uansett.\n\nVi har sett at barnet har et styringssystem som henger etter (modul 1), og at din egen beredskapskropp kan slå inn når det smeller (modul 2). Nå møtes de to. For atferden i gangen er ikke et ønske om å ødelegge ettermiddagen din. Det er et reguleringssystem som kneler. En hel skoledag er et maraton for et barn med forsinkede bremser, og når de endelig kommer hjem – til det stedet de vet er trygt – slipper de taket. Bremsekraften er rett og slett tom.\n\nOg her ligger et av de viktigste prinsippene i hele Førersetet, og kjernen i denne modulen: regulering utvikles i relasjoner. Mennesker er ikke skapt for å håndtere overveldende følelser alene. Helt fra vi er spedbarn er vi avhengige av at et annet menneske låner oss sin ro, slik at vi kan finne vår egen. Når barnet ditt mister kontrollen – enten det er fire eller fjorten – har det midlertidig mistet tilgangen til sine egne indre bremser. Da trenger det ikke en dommer eller en veileder som står over det. Det trenger en voksen som tør å tre inn i kaoset og være et midlertidig, ytre styringssystem. Det er dette boken kaller å låne ut bremsene. Fagfolk kaller det samregulering.\n\nOg her er det viktig å si tydelig hva dette ikke er: det er ikke et triks. Det finnes ingen magisk setning som får barnet til å roe seg hvis du bare sier den riktig. Samregulering er en relasjonell støtte – at du møter barnets kaos med din egen forankrede ro, før du forklarer, krever eller gir retning. Møter du barnets panikk med ditt eget høyspente nervesystem, oppfatter kroppen deres deg som en trussel, uansett hvor rett du har i sak. Derfor: først kontakt, så retning. Det er ikke myk ettergivelse. Det er nevrobiologisk realisme. Grensen forsvinner ikke – den bæres bare i en annen rekkefølge: først ro nok til kontakt, deretter retning barnet faktisk kan ta imot.\n\nBarnet trenger ikke en perfekt rolig voksen. Det finnes ikke. Det trenger en voksen som klarer å bli litt lenger i rommet enn alarmen har lyst til. Som senker tempoet, puster litt dypere, og blir værende – ikke for å løse noe, men for å være en trygg, forutsigbar havn til stormen mister drivstoffet sitt. Det koster, og du kommer til å bli dratt inn i kaoset noen ganger selv. Det gjør deg ikke til en dårlig forelder. Det gjør deg til et menneske. Men hver gang du klarer å bli litt lenger, låner du barnet noe det ennå ikke har selv.',
        screenText: 'Når barnet mister kontrollen, har det mistet tilgangen til sine egne bremser. Regulering utvikles i relasjoner – du blir et midlertidig, ytre styringssystem. Først kontakt, så retning. Ikke et triks, men relasjonell støtte: å bli litt lenger i rommet enn alarmen har lyst til.',
        reflectionQuestions: [
          'Hvor i hverdagen kjenner du igjen at bremsekraften til barnet er tom – etter skolen, ved leksene, om kvelden?',
          'Hva pleier å skje i deg når du prøver å forklare eller korrigere mens barnet er i full alarm?',
          'Hvilken type kontakt vet du at barnet ditt tåler når det er på sitt verste – ord, berøring, eller bare nærvær?',
          'Hva gjør det vanskelig å bli værende litt lenger i rommet enn alarmen din har lyst til?',
          'Kjenner du forskjellen på «først kontakt, så retning» og det å gi etter – og hvor går den grensen for deg?'
        ],
        microExercise: 'Neste gang barnet mister kontrollen: før du forklarer eller korrigerer noe, senk ditt eget tempo og bli værende et øyeblikk lenger enn alarmen har lyst til. Du trenger ikke de riktige ordene. Bare vær en rolig havn til det verste har lagt seg. Først da kommer retningen.',
        weeklyGoal: 'Møte ett sammenbrudd med kontakt før korrigering – bli litt lenger i rommet.',
        languageCards: [
          'Det er for mye akkurat nå. Jeg er her.',
          'Du har lov til å være sint. Jeg blir her sammen med deg.',
          'Vi snakker om det etterpå. Nå er jeg bare her.',
          'Først kontakt, så retning.'
        ],
        situationCardId: 'barnet-eksploderer',
        depotExports: {
          todayAction: 'Hvis barnet mister kontrollen i dag: bli værende, senk tempoet, og gi kontakt før du gir retning.',
          languageCards: [
            'Det er for mye akkurat nå. Jeg er her.',
            'Først kontakt, så retning.'
          ],
          situationCardId: 'barnet-eksploderer',
          sundayQuestion: 'Når klarte jeg å bli litt lenger i rommet enn alarmen ville denne uka – og hva gjorde det med barnet?',
          weeklyGoal: 'Kontakt før korrigering, i ett sammenbrudd.',
          returnMessage: 'Velkommen tilbake. Å låne bort ro er noe av det tyngste som finnes. Vi øver videre, i dag.'
        }
      },
      {
        id: 'hoved-4',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'hoved-4',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'førersetet-hoved',
        title: 'Modul 4: Autovern – struktur som omsorg',
        videoText: 'Tenk på en helt vanlig ettermiddag. Et skifte fra skole til SFO, en beskjed som må gjentas tre ganger, en liten konflikt med en venn, en voksen som ber barnet skynde seg, og så lekser rett etter middag. Hver for seg er det håndterbart. Men for noen barn legger det seg lag på lag, til systemet plutselig ikke klarer å holde sammen – og det smeller, tilsynelatende ut av ingenting.\n\nTil nå har vi sett på bilen: barnets kapasitet, din egen alarm, og hvordan du kan låne bort ro når det krasjer. Nå skal vi løfte blikket fra bilen og over på veien. For et barn med en kraftig motor og forsinkede bremser kan kjøre ganske fint på en bred, strak motorvei. Problemet er at hverdagen sjelden er det. Den er mer som en svingete fjellvei, full av kryss og brå svinger. Da hjelper det ikke bare å gripe etter rattet hver gang det glipper. Vi må sette opp autovern.\n\nMange foreldre har et anstrengt forhold til ordet struktur. Det smaker av rigiditet, av et kaldt og strengt foreldreskap. Men for et barn med en kaotisk indre verden er det motsatt: når den indre verdenen er kaotisk, trenger barnet at den ytre verdenen er forutsigbar. Struktur er ikke kontroll. Den er en form for omsorg. Den sier til barnet, uten ord: «Du trenger ikke å holde alt sammen alene. Jeg har lagt noen rammer rundt det.» Et godt autovern er emosjonelt nøytralt. Det står bare der, stødig, og hindrer at bilen havner i grøfta når svingen blir for skarp. Båret med varme kjennes det ikke kaldt – det kjennes som en lettelse.\n\nOg her er forskjellen på forståelse og ettergivenhet: vi fjerner ikke kravene fordi barnet strever. Vi bygger rammer som gjør det mulig for barnet å møte kravene uten å bruke opp all bremsekraften på veien dit. Noen barn trenger ikke flere beskjeder. De trenger en hverdag som hjelper dem før det smeller. Det handler om å redusere antall valg når kapasiteten er lav – klærne lagt frem kvelden før, sekken på fast plass – og om å flytte informasjonen ut av barnets overfylte hode og inn i omgivelsene, som en enkel visuell sjekkliste eller et tydelig oppstartssignal. Vi slutter ikke å lære barnet å ta ansvar. Vi gjør det mulig å lykkes med det.\n\nDu trenger ikke rigge om hele hverdagen, og dette skal ikke bli et belønningssystem eller en militær timeplan. For en sliten forelder holder det å spørre: Hvilket ett veikryss kan vi gjøre litt mindre skarpt? Ett valg mindre om morgenen. Ett tydeligere sted for sekken. Ett første steg dere starter sammen. Autovern er ikke enda et krav om perfeksjon – det er ment å gi deg mer pusterom, ikke mindre. Og det vakreste er at det virker innover også: autovernet på utsiden bygger, langsomt og umerkelig, et stillas på innsiden av barnet. Den ytre forutsigbarheten blir til slutt en indre.',
        screenText: 'Struktur er ikke kontroll – det er en form for omsorg. «Du trenger ikke holde alt sammen alene; jeg har lagt noen rammer rundt det.» Reduser antall valg når kapasiteten er lav, og flytt informasjon ut av barnets hode og inn i omgivelsene. Gjør ett veikryss litt mindre skarpt. Autovern utenpå bygger et stillas inni.',
        reflectionQuestions: [
          'Hvor i hverdagen hoper belastningen seg opp lag på lag for barnet ditt før det smeller?',
          'Hva i deg kjenner motstand mot ordet «struktur» – og endrer det seg hvis du tenker «omsorg» i stedet?',
          'Hvor mange valg må barnet ditt ta i løpet av en typisk morgen – og hvilket ett kunne du fjernet?',
          'Hvilken informasjon bærer barnet i hodet som heller kunne ligget synlig i omgivelsene?',
          'Hvilket ett veikryss ville gitt mest pusterom om det ble litt mindre skarpt?'
        ],
        microExercise: 'Velg ett veikryss i hverdagen deres som ofte smeller. Gjør én liten ting for å gjøre det mindre skarpt – fjern ett valg, legg noe frem kvelden før, eller flytt en beskjed ut av barnets hode og inn i en synlig huskelapp. Bare ett. Det handler ikke om å rigge om alt, men om å redusere belastningen ett sted.',
        weeklyGoal: 'Gjøre ett veikryss litt mindre skarpt – ett valg færre, eller én ting flyttet ut av barnets hode.',
        languageCards: [
          'Du trenger ikke holde alt sammen alene. Jeg har lagt noen rammer rundt det.',
          'Klærne ligger klare. Du trenger bare å ta dem på.',
          'Først dette, så det neste. Jeg hjelper deg i gang.',
          'Vi gjør det forutsigbart, så du slipper å finne ut av alt selv.'
        ],
        situationCardId: 'overgang-skole',
        depotExports: {
          todayAction: 'Velg ett veikryss i dag og gjør det litt mindre skarpt – ett valg færre, eller én ting flyttet ut av barnets hode.',
          languageCards: [
            'Du trenger ikke holde alt sammen alene. Jeg har lagt noen rammer rundt det.',
            'Klærne ligger klare. Du trenger bare å ta dem på.'
          ],
          situationCardId: 'overgang-skole',
          sundayQuestion: 'Hvilket veikryss ble litt mindre skarpt denne uka – og hva gjorde det med belastningen?',
          weeklyGoal: 'Gjøre ett veikryss litt mindre skarpt.',
          returnMessage: 'Velkommen tilbake. Du skal ikke rigge om hele hverdagen. Vi gjør ett veikryss litt mykere i dag.'
        }
      },
      {
        id: 'hoved-5',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'hoved-5',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'førersetet-hoved',
        title: 'Modul 5: Krasj og reparasjon – V.A.R.M.',
        videoText: 'Det startet med noe lite. En iPad som skulle skrus av, en jakke som måtte på. Og så eskalerer det ut av alle proporsjoner. Barnet blir ikke bare frustrert – det er som om hele systemet kortslutter. Ting kastes, slag treffer det som står nærmest, ordene er fulle av et raseri du nesten ikke kjenner igjen. Bilen har ikke sneiet autovernet. Den har krasjet tvers gjennom det. Og når roen endelig senker seg, sitter du igjen på kjøkkenstolen, dirrende og full av skyld: Hvorfor klarte jeg ikke å holde meg rolig? Er det noe galt med barnet mitt – eller med meg?\n\nFørst det viktigste: dette betyr ikke at du har feilet. Selv med alle autovern på plass, selv når du har gjort alt riktig, vil det smelle. Det finnes en myte om at hvis vi bare er tålmodige og pedagogiske nok, vil barna alltid samarbeide. Slik er ikke virkeligheten. Men vi trenger å skille to ting som ser like ut: trass og emosjonell nedsmelting. Trass er kommunikasjon – barnet har fortsatt kontakt med tenkehjernen, tester en grense, markerer sin vilje. En nedsmelting er noe helt annet: kapasiteten er sprengt, og den tenkende delen av hjernen har midlertidig koblet seg fra. Barnet ser ut som en liten tyrann, men er i virkeligheten livredd – det har mistet kontrollen over seg selv, og det finnes knapt noe mer skremmende for et menneske.\n\nI selve krasjet er ikke målet å løse noe. Kriser er ikke tidspunktet for læring; det er tidspunktet for skadebegrensning. Barnet trenger ikke argumenter eller en mild terapeutstemme akkurat da. Det trenger at du er en urokkelig, men ikke-dømmende vegg det kan krasje inn i uten at veggen raser sammen. Som en huskehjelp – ikke en metode med fasit – bruker jeg noen ganger ordet V.A.R.M.: Vurdere sikkerheten (sørg for at ingen blir skadet), Avvente (hold tilbake ordene, et barn i alarm har ikke plass til mer språk), Romme (tål trykket uten å sende det tilbake – «dette handler ikke om meg, det er bremsene som har sviktet»), og Møte (når kroppen slipper taket og blikket mykner, beveg deg nærmere). Grensen forsvinner ikke underveis: det er alltid lov å være sint, men ikke lov å slå.\n\nOg så kommer det som kanskje er det aller viktigste i hele Førersetet. For det som former barnet, er ikke om det krasjer – vi krasjer alle. Det som bygger selve grunnmuren i barnets selvfølelse, er det som skjer etterpå: reparasjonen. Etter et utbrudd sitter barnet ofte igjen med en ulmende skam som hvisker at det er ødelagt, en byrde, ikke verdt å elske når det er vanskelig. Hvis vi forlater rommet i sinne eller krever at barnet skal komme krypende først, bekrefter vi nettopp den frykten. Å reparere er å ta ansvar for å løfte skammen av barnets skuldre – og det er den voksnes jobb å bygge broen tilbake, hver eneste gang. Gjennom årene i rusbehandling møtte jeg mange voksne med vonde barndommer, og det som hadde skadet dem dypest, var sjelden konfliktene i seg selv. Det var at krasjene aldri ble reparert – at ingen kom inn etterpå og sa: «Det ble feil i sted, jeg mistet det også, men vi to er fortsatt et lag.»\n\nReparasjon er ikke et manus for den perfekte unnskyldningen, og det betyr ikke at du tar ansvar for alt. Du eier din del – tonen, at du hevet stemmen, at du skremte – ikke barnets handlinger, og du gir ikke slipp på grensen. Det kan høres så enkelt ut som: «Det som skjedde i sted, ble større enn jeg ville. Jeg er lei for at jeg hevet stemmen. Det er ikke din skyld.» Uten et anklagende «… men du hørte jo ikke etter». Du trenger ikke å forklare. Selve det at en voksen kommer tilbake med ydmykhet i stedet for krav, er reparasjonen. Og hvis du kjenner at du kjefter mer enn du reparerer noen dager: vær snill med deg selv. Du er ikke en maskin. Hver gang du forsøker å komme tilbake, holder du likevel retningen.',
        screenText: 'Det former ikke barnet at det aldri krasjer – alle krasjer. Det som bygger selvfølelsen, er at en voksen kommer tilbake etterpå. I krasjet: skadebegrensning, ikke læring (V.A.R.M. som huskehjelp). Etterpå: eie din del – tonen, ikke alt – og bygg broen tilbake. Grensen består; skammen løftes av barnets skuldre.',
        reflectionQuestions: [
          'Kjenner du forskjellen på når barnet ditt er trassig og når det er i en ekte nedsmelting – og hva endrer det for hvordan du møter det?',
          'Hva er vanskeligst for deg når du skal reparere – å innrømme din egen del, å tåle barnets reaksjon, eller å la samtalen ende uten en konklusjon?',
          'Hva pleier å skje i deg i selve krasjet – blir du dratt med inn i stormen, eller klarer du å bli veggen?',
          'Hvilken del er din å eie etter en konflikt – tonen, stemmen, bruddet – og hvor går grensen mot å ta ansvar for alt?',
          'Hva ble reparert, eller ikke reparert, i din egen oppvekst – og hvordan farger det deg nå?'
        ],
        microExercise: 'Neste gang dere har hatt et krasj, vent til din egen puls har roet seg. Gå så inn til barnet med én kort, ærlig setning som eier din del: «Det som skjedde i sted, ble større enn jeg ville. Jeg er lei for at jeg hevet stemmen. Det er ikke din skyld.» Ikke forklar mer. Det at du kommer tilbake, er reparasjonen.',
        weeklyGoal: 'Komme tilbake og reparere ett krasj – eie min del, uten å ta ansvar for alt.',
        languageCards: [
          'Det som skjedde i sted, ble større enn jeg ville. Det er ikke din skyld.',
          'Det er alltid lov å være sint. Det er ikke lov å slå.',
          'Det ble vanskelig for deg. Vi kom oss gjennom det, og jeg er her.',
          'Vi to er fortsatt et lag.'
        ],
        situationCardId: 'jeg-ropte',
        depotExports: {
          todayAction: 'Hvis det smeller i dag: vær veggen i krasjet, og kom tilbake etterpå med én ærlig setning som eier din del.',
          languageCards: [
            'Det som skjedde i sted, ble større enn jeg ville. Det er ikke din skyld.',
            'Det er alltid lov å være sint. Det er ikke lov å slå.'
          ],
          situationCardId: 'jeg-ropte',
          sundayQuestion: 'Hvilket krasj klarte jeg å reparere denne uka – og hva gjorde det med oss etterpå?',
          weeklyGoal: 'Reparere ett krasj – eie min del.',
          returnMessage: 'Velkommen tilbake. Det finnes ingen utløpsdato på reparasjon. Vi bygger broen tilbake, i dag.'
        }
      },
      {
        id: 'hoved-6',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'hoved-6',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'førersetet-hoved',
        title: 'Modul 6: Motorveien og trafikkdirigenten – skole og system',
        videoText: 'Det kommer et lite pling fra telefonen midt i arbeidsdagen. Skolens app. Allerede før du har lest, strammer det seg i magen. «Det har vært en svært krevende dag. Han nektet å starte på oppgavene, forstyrret de andre, og da jeg ba ham roe seg, kalte han meg stygge ting og forlot klasserommet.» Varmen stiger i ansiktet – skam, fortvilelse, et instinkt om å forsvare. Og under alt: frykten for at han er i ferd med å falle utenfor.\n\nFor å finne en vei ut av denne følelsen, må vi løfte blikket fra den enkelte episoden. Skolen er nemlig selve motorveien vi har snakket om: en bred, høyt trafikkert struktur designet for en bestemt fremdrift. Den forutsetter at barn kan holde jevn fart over lang tid, tåle monotone strekninger, skifte fil når klokken ringer, og bremse sine egne impulser på signal. For de fleste barn går det relativt greit. Men for et barn med kraftig motor og forsinket styringssystem er en helt vanlig beskjed – «legg bort matteboka, finn norskboka, slå opp på siden fra i går, les og svar på de to første spørsmålene» – en formidabel hinderløype. Ordene glir av den glatte mentale tavlen, og barnet sitter igjen med én brutal sikkerhet: nok en gang mistet jeg tråden, mens alle de andre forsto.\n\nDet er i gapet mellom skolens forventning og barnets faktiske kapasitet at den vanskelige atferden nesten alltid oppstår. Å ikke mestre oppleves ikke bare som en faglig utfordring, men som et angrep på egen verdi. Og fordi barnet sjelden kan rekke opp hånden og si «arbeidsminnet mitt sviktet akkurat nå, og jeg er skamfull», velger det den strategien som ligger nærmest. Noen retter energien utover og blir klassens bråkmaker – det er bedre å være rebellen enn å være den dumme. Andre gjør det motsatte og forsvinner stille: blikket blir fjernt, hånden ligger urørt over arket, og på karakterkortet står det «må være mer aktiv i timene». Det stille barnet er ofte like overbelastet som det som kaster boka i veggen – bare lenger fra hjelp.\n\nBarnet ditt beveger seg gjennom skole, fritid, helse og systemer fylt av voksne som ikke alltid leser samme kart. Her må du innta en rolle du aldri ba om: trafikkdirigenten. Du ba om å bli mamma eller pappa – ikke saksbehandler eller koordinator. Men trafikkdirigenten står i krysset mellom barnets indre verden, familiens behov og systemene rundt, og oversetter: barnets kapasitet til skolen, skolens krav tilbake til barnet. Det handler ikke om å bære hele systemet alene eller å vinne en kamp. Det handler om å holde barnet synlig og prosessen samlet – å hjelpe de voksne rundt barnet til å se det samme barnet, ikke bare den samme saken. Og hjemme er den viktigste oversettelsen denne: vi skal ikke være skolens kontrollører på hjemmebane. Hvis dagen allerede var krav og nederlag, trenger hjemmet å være stedet barnet får regulere seg – ikke en ny runde med de samme kravene fra de menneskene det har aller nærmest.\n\nDet fine er at det samme prinsippet du har øvd på med barnet, gjelder her: først regulere relasjonen, så gi retning. I møterommet er det lett å tro du må velge mellom å forsvare barnet eller gi systemet rett. Men det finnes et tredje alternativ. Når en lærer forteller om en vanskelig episode, senker det guarden hvis du møter henne først: «Jeg forstår virkelig at dette var krevende for deg å stå i.» Fagfolk er også mennesker i et stort, presset system, med sitt eget toleransevindu. Når alliansen er der, kan oversetterjobben begynne: «Vi vil ikke frita ham for ansvar, men når han reagerer slik, handler det ofte om overbelastning og at bremsene sviktet. Kan vi sammen finne ett punkt i dagen der vi senker friksjonen før det smeller?» Systemer kan svikte, misforstå og mangle ressurser, og noen ganger må du heve stemmen og søke støtte. Men du gjør det uten å gjøre skolen til fiende. Målet er ikke et barn som glir friksjonsfritt inn i alle A4-bokser. Målet er at barnet overlever motorveien med krefter igjen til å finne sin egen vei.',
        screenText: 'Skolen er motorveien – stor og krevende for alle, ikke et tegn på vond vilje. Den vanskelige atferden oppstår i gapet mellom systemets krav og barnets kapasitet, og viser seg som bråk eller som stille forsvinning. Du kan bli trafikkdirigenten: oversette barnets kapasitet til systemet og holde barnet synlig. Valider fagpersonen først, oversett barnet etterpå. Du skal ikke bære systemet alene.',
        reflectionQuestions: [
          'Hvilke meldinger eller situasjoner fra skolen utløser raskest beredskapen i kroppen din?',
          'Kjenner du igjen barnet ditt mer som det som bråker, eller som det som forsvinner stille – og hva trenger akkurat ditt barn at de voksne forstår?',
          'Hvilken rolle er lettest for deg å havne i på møter – forsvar, tilbaketrekning, eller alliansebygging?',
          'Hvor blir hjemmet en forlengelse av skolens krav, og hvor klarer dere å la det være en havn?',
          'Hvem rundt deg kunne du tatt med inn i et møte som en støttende stemme, så du ikke står alene?'
        ],
        microExercise: 'Velg én voksen rundt barnet ditt – en lærer, en trener, en besteforelder – og øv på trafikkdirigentens første bevegelse: anerkjenn deres opplevelse før du oversetter barnets. «Jeg skjønner at dette er krevende for deg også. Kan jeg fortelle litt om hva som ofte skjer på innsiden av ham når det smeller?» Bare én samtale, én bro.',
        weeklyGoal: 'Møte én voksen rundt barnet som alliert – validere først, oversette barnet etterpå.',
        languageCards: [
          'Jeg forstår at dette var krevende for deg også.',
          'Vi vil ikke frita ham for ansvar – vi vil forstå hva som skjer før vi finner tiltak.',
          'Kan vi sammen finne ett punkt i dagen der vi senker friksjonen før det smeller?',
          'Hjemme får han lande. Vi tar ikke skoledagen om igjen her.'
        ],
        situationCardId: 'skolemelding',
        depotExports: {
          todayAction: 'Møt én voksen rundt barnet som alliert i dag: anerkjenn deres opplevelse før du oversetter barnets kapasitet.',
          languageCards: [
            'Jeg forstår at dette var krevende for deg også.',
            'Jeg trenger å snakke med ham når han har landet litt, så kommer jeg tilbake.'
          ],
          situationCardId: 'skolemelding',
          sundayQuestion: 'Hvor klarte jeg å være oversetter i stedet for forsvarer eller kontrollør denne uka?',
          weeklyGoal: 'Validere én fagperson først, oversette barnet etterpå.',
          returnMessage: 'Velkommen tilbake. Du skal ikke bære systemet alene. Vi tar én bro av gangen, i dag.'
        }
      },
      {
        id: 'hoved-7',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'hoved-7',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'førersetet-hoved',
        title: 'Modul 7: De mørke veikryssene',
        videoText: 'Det finnes en frykt få foreldre sier høyt. Den våkner ofte sent på kvelden, idet tenåringsdøren har gått i lås, eller idet du ser at noe på rommet ikke er som det skal. Kanskje har du funnet noe som ikke burde være der. Kanskje kom det en bekymringsmelding om økende fravær eller mistanke om rus. Kanskje er det bare en dyp magefølelse av at barnet ditt er i ferd med å glippe. Den som en gang krøp opp i fanget ditt for å få trøst, svarer deg nå med avvisning, eller et sinne som fyller hele rommet.\n\nLa det være sagt med en gang: dette betyr ikke at barn med reguleringsvansker er på vei hit. De aller fleste er ikke det. Dette er ikke en prognose. Det er en beredskap for de mørke veikryssene – for når det har gått langt, når skam og utenforskap har fått tid til å feste seg, og når strategiene barnet bruker for å holde seg oppe, begynner å skade mer enn de lindrer. Det vi har kalt skam gjennom hele dette programmet, blir her noe mer enn en følelse om en handling. Det blir en identitet barnet forsøker å overleve: «Jeg er feil.»\n\nOg her er kanskje den viktigste innsikten når vi skal forstå hvorfor noen havner i grøfta: avhengighet, selvskading og farlig risikoatferd handler nesten aldri primært om jakten på rusen eller spenningen i seg selv. Det handler om jakten på regulering. For et menneske som mangler indre bremser og opplever verden som overveldende, kan et rusmiddel eller en farlig handling bli den første pauseknappen som får den øredøvende støyen i hodet til å stilne et øyeblikk. Det gjør det ikke mindre farlig. Men det flytter spørsmålet vårt fra «hvorfor gjør du dette mot meg?» til «hvor stor er smerten du prøver å døyve?» Vi kan ikke kjefte bort et dypt utenforskap eller en avhengighet.\n\nNettopp derfor er det viktigste budskapet i denne modulen dette: når det handler om rus, selvskading, vold eller farlige miljøer, skal ingen forelder stå alene i mørket og forsøke å være hele autovernet selv. Dette skal ikke håndteres alene, og det skal ikke vente. Hvis det er akutt fare for liv og helse, er trygghet den første oppgaven – ikke den perfekte samtalen – og da ringer du 113. Når det ikke er akutt, men situasjonen kjennes for stor for familien alene, finnes det flere åpninger: fastlegen er ofte et godt første steg og kan henvise videre til barne- og ungdomspsykiatrisk poliklinikk (BUP). Legevakten (116 117) er åpen utenom kontortid. Alarmtelefonen for barn og unge (116 111) er åpen for både ungdom og foreldre. Mental Helses hjelpetelefon (116 123) kan være et sted å lufte din egen frykt midt på natten. Å hente hjelp utenfra er ikke å gi opp barnet. Det er å utvide ringen av voksne som kan holde fast når du ikke kan bære hele vekten alene.\n\nNår hjelpen først er på vei, gjelder fortsatt det du har øvd på gjennom hele programmet, bare ved det aller mørkeste krysset. Først må du regulere din egen beredskapskropp nok til å tåle din egen redsel uten å kaste den ufiltrert over på barnet. Bak en hard, avvisende rustning finnes det nesten alltid et livredd, lengtende barn. Atferden er ikke barnet. Du kan ikke heise noen opp av et mørkt hull ved å stå trygt på kanten og rope instrukser ned. Du må klatre ned, sette deg ved siden av dem i mørket, og bli. Noen ganger må det begynne kortere enn du tror: «Jeg ser at noe er galt.» «Jeg er redd for deg.» «Jeg kommer ikke til å gi deg opp.» Det er ikke hele samtalen. Det er bare en dør som får stå på gløtt.\n\nDette er ikke å akseptere den destruktive atferden. Du kan holde en fast, beskyttende grense og en grenseløs kjærlighet i samme setning: «Jeg kommer aldri til å akseptere at du skader deg selv, men jeg kommer heller aldri til å slutte å elske deg.» Du blir det autovernet de selv har meid ned. Og det er aldri, noensinne, for sent å reparere en relasjon. Dette er ikke en sprint med én riktig replikk. Det er å bli værende med en tydeligere kurs: Jeg ser alvoret. Jeg setter grenser. Jeg henter hjelp når det trengs. Og jeg lar deg ikke bli alene med skammen.',
        screenText: 'Dette er ikke en prognose, men en beredskap for de mørke veikryssene. Destruktive mønstre handler om jakten på regulering, ikke om rusen i seg selv. Det viktigste: ingen forelder skal stå alene i mørket. Ved akutt fare, ring 113; ellers fastlege/BUP, legevakt 116 117, Alarmtelefonen for barn og unge 116 111, Mental Helse 116 123. Å hente hjelp er å utvide ringen, ikke å gi opp barnet.',
        reflectionQuestions: [
          'Hvilke ord har du sluttet å bruke i din egen frykt, som du kanskje burde si igjen?',
          'Hvor går grensen for deg mellom det du kan bære hjemme, og det du trenger å hente hjelp til utenfra?',
          'Hva skjer i din egen kropp når frykten for å miste barnet slår inn – og hvordan farger det måten du møter dem på?',
          'Hvis du tenker på atferden som et forsøk på å døyve smerte, endrer det noe i hvordan du ser barnet ditt?',
          'Hvem kunne vært med på å utvide ringen av voksne rundt barnet ditt akkurat nå?'
        ],
        microExercise: 'Hvis du allerede er bekymret, gjør ikke noe stort. Ta ett lite skritt: si én av disse setningene høyt til ungdommen din – uten å koble den til et krav, og uten å vente på svar. «Jeg ser at noe er galt.» «Jeg er redd for deg.» «Jeg kommer ikke til å gi deg opp.» La setningen ligge i rommet og gjøre sin egen jobb. Og hvis frykten handler om akutt fare eller noe som er større enn familien alene, er ett av hjelpenumrene et sted å begynne – du trenger ikke vite hva du skal si før du ringer.',
        weeklyGoal: 'Holde én dør på gløtt – og hente inn én voksen til om vekten er for tung å bære alene.',
        languageCards: [
          'Jeg ser at noe er galt. Jeg er redd for deg.',
          'Jeg kommer ikke til å gi deg opp.',
          'Jeg aksepterer ikke at du skader deg selv, men jeg slutter aldri å elske deg.',
          'Atferden er ikke barnet. Det er smerten som snakker.'
        ],
        situationCardId: 'ung-redd-aktivitet',
        depotExports: {
          todayAction: 'Hvis du er bekymret i dag: si én åpen setning uten krav – «Jeg ser at noe er galt. Jeg kommer ikke til å gi deg opp.» Og vurder om vekten er for tung til å bære alene.',
          languageCards: [
            'Jeg ser at noe er galt. Jeg er redd for deg.',
            'Jeg kommer ikke til å gi deg opp.'
          ],
          situationCardId: 'ung-redd-aktivitet',
          sundayQuestion: 'Hvor klarte jeg å holde en dør på gløtt denne uka – og trenger jeg å hente inn flere voksne rundt barnet?',
          weeklyGoal: 'Holde én dør på gløtt – og utvide ringen om det trengs.',
          returnMessage: 'Velkommen tilbake. Ved de mørke veikryssene er ikke oppgaven å være sterk alene. Vi henter mer lys, ett skritt i dag.'
        }
      },
      {
        id: 'hoved-8',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'hoved-8',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'førersetet-hoved',
        title: 'Modul 8: Kjørestilen – det lange løpet',
        videoText: 'Noen kvelder, når dagens lyder endelig har stilnet, blir du stående i døråpningen og se barnet ditt sove. I halvmørket, mens det puster tungt og jevnt under dynen, melder de store spørsmålene seg av seg selv. Kanskje kjenner du et stikk over den skarpe irettesettelsen i gangen i morges, eller en verkende utmattelse etter nok en ettermiddag med forhandlinger og tårer. Og så den gnagende tvilen nesten alle foreldre kjenner: Har jeg gjort nok? Gjør jeg det riktig? Hvilke spor etterlater jeg egentlig i dette mennesket?\n\nHer er noe som kan ta litt av vekten av de skuldrene. Barn lagrer i liten grad minner om reglene vi innførte eller de kloke ordene vi sa. Det som brenner seg fast i nervesystemet og blir med dem inn i voksenlivet, er den emosjonelle melodien i hjemmet – hvordan det føltes å være i rommet sammen med deg. Tenk på din egen barndom: husker du foreldrenes nøyaktige argumentrekke, eller husker du om skuldrene deres var hevet eller senket, om stemmen var hard eller dyp, om du kjente deg trygg eller alene? Barn husker ikke om vi var feilfrie saksbehandlere i livene deres. De husker med brutal presisjon om vi var der sammen med dem da livet kjentes mørkt.\n\nDet er dette hele dette programmet til slutt handler om. Vi begynte med å bytte blikk: fra vilje til kapasitet. Vi vendte blikket innover, mot din egen beredskapskropp. Vi øvde på å låne barnet ro når dets egne bremser sviktet, og på å bygge autovern som omsorg før det smalt. Vi så at krasj ikke ødelegger alt – at reparasjonen er det som bygger grunnmuren. Vi gikk ut av huset og ble trafikkdirigent mellom barnet og systemet, og vi turte å se de mørke veikryssene i øynene uten å stå der alene. Ingen av disse er teknikker med en fasit. De er trekk ved en måte å være sammen med barnet på, gjentatt over tid.\n\nFor det er ikke enkelthendelsene som former barnet. Det er mønsteret. Den gjentatte erfaringen av å bli møtt – sett, tålt, og hentet tilbake til – flytter langsomt inn i barnet og blir til barnets egen indre stemme. Måten du så på dem da de var uregulerte og krevende, blir måten de etter hvert ser på seg selv. Det er dette som er kjørestilen som setter spor: ikke den perfekte oppdragelsen, ikke den feilfrie rekken av riktige valg, men den langsomme, gjentatte erfaringen av å høre til. Målet er aldri en perfekt forelder eller et perfekt barn. Målet er en kjørestil barnet kan lene seg mot lenge nok til at noe av den blir deres egen.\n\nOg noe av det viktigste du kan gjøre på den lange veien, er å la fantasien om det perfekte barnet ligge, og heller se det virkelige barnet foran deg. Det er ikke å gi opp håpet. Det er en form for ydmykhet som frigjør kapasiteten du trenger for å være til stede. Hvis frykten for alt som er feil og farlig blir det eneste kompasset, mister vi livskraften på veien. Så løft av og til blikket forbi diagnosen, forbi den utmattende atferden og de tunge møtene, og let bevisst etter de gylne øyeblikkene: den ville kreativiteten i motoren deres, det smittende engasjementet når de forteller om noe de elsker, den uventede varmen når de føler seg trygge.\n\nDu trenger ikke gå herfra med en ny manual under armen. Det holder at du tar med deg en retning. Dere kommer fortsatt til å krasje i autovernet, miste balansen og kjenne på avmakt. Men så lenge dere alltid, uansett hvor hardt det smeller, leter etter veien tilbake til hverandre, er dere fortsatt i bevegelse. Og frem til den dagen barnet ditt selv sitter bak rattet, er arbeidet du gjør i det stille – i slit, i kjærlighet, i utholdenhet – med på å forme mennesket som en dag skal kjøre videre alene. Det usynlige arbeidet du gjør, har en verdi som strekker seg langt forbi morgendagen.',
        screenText: 'Barn lagrer ikke regler og argumenter – de lagrer hvordan det føltes å være i rommet med deg. Det er ikke enkelthendelsene, men mønsteret over tid som blir barnets indre stemme. Målet er ikke en perfekt forelder eller et perfekt barn, men en kjørestil barnet kan lene seg mot. Du trenger ikke en ny manual. Det holder at du tar med deg en retning.',
        reflectionQuestions: [
          'Hva husker du selv best fra din egen barndom – ordene som ble sagt, eller hvordan det føltes å være i rommet?',
          'Hvilken «emosjonell melodi» tror du preger hjemmet deres på en helt vanlig dag?',
          'Hvilket av trekkene fra programmet – kapasitet, egen beredskap, lånte bremser, autovern, reparasjon, oversetter, de mørke veikryssene – sitter best, og hvilket vil du øve mer på?',
          'Hvor i hverdagen klarer du å se det virkelige barnet, og ikke bildet av det du så for deg?',
          'Når hadde dere sist et gyllent øyeblikk av ren kontakt – og hva gjorde det mulig?'
        ],
        microExercise: 'Finn ett øyeblikk denne uka som ikke er en sak – ikke lekser, ikke pålegg, ikke korreksjon. Sitt ved siden av barnet på sofaen i fem minutter uten å spørre om noe. Si god natt med en litt lavere stemme. Se på dem litt ekstra lenge over middagsbordet. Du trenger ikke å markere det eller si noe. La det bare være ett øyeblikk der barnet er et menneske som er elsket, ikke et prosjekt som skal følges opp.',
        weeklyGoal: 'Skape ett øyeblikk i uka som ikke er en sak – bare kontakt.',
        languageCards: [
          'Jeg ser deg. Jeg er glad i deg akkurat som du er.',
          'Du er ikke et problem som skal løses.',
          'Vi finner alltid veien tilbake til hverandre.',
          'Akkurat nå trenger du ikke å være noe annet enn deg.'
        ],
        depotExports: {
          todayAction: 'Skap ett øyeblikk i dag som ikke er en sak – fem minutter på sofaen, et lavere god natt, et blikk litt for lenge. Ingenting skal løses.',
          languageCards: [
            'Jeg ser deg. Jeg er glad i deg akkurat som du er.',
            'Du er ikke et problem som skal løses.'
          ],
          sundayQuestion: 'Når var jeg sammen med barnet uten at det var en sak denne uka – og hva gjorde det med oss?',
          weeklyGoal: 'Ett øyeblikk i uka som bare er kontakt.',
          returnMessage: 'Velkommen tilbake. Det er ikke de perfekte dagene som setter spor, men at du fortsetter å lete etter veien tilbake. Vi tar ett øyeblikk i dag.'
        }
      }
    ]
  },
  {
    id: 'skjerm-uten-krig',
    title: 'Skjerm uten krig',
    description: 'En roligere vei ut av skjermen – uten å rive barnet ut av en verden hjernen er låst fast i. Flytt fokus fra skjermtid-moral til selve overgangen.',
    badge: 'Nytt minikurs',
    modules: [
      {
        id: 'skjerm-1',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'skjerm-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'skjerm-uten-krig',
        title: 'Modul 1: Hvorfor det smeller',
        videoText: 'Du roper fra kjøkkenet: fem minutter igjen. Fem minutter senere: nå er maten på bordet. Ingen reaksjon.\n\nSå går du inn og tar brettet ut av hendene. Og rommet eksploderer – tårer, skrik, kanskje stygge ord. Og du står igjen og tenker: hvorfor blir det alltid sånn av noe så enkelt?\n\nDen scenen finnes i nesten alle hjem. Og det er lett å lese den som ren ulydighet – at barnet tøyer grensen med vilje. Men det skjer noe annet under der.\n\nNår barnet er dypt inne i et spill, er oppmerksomheten hyperfokusert. Spillet gir umiddelbar respons, mening og mestring, og belønningssystemet går for fullt. Det er ikke en tilstand man bare slår av på kommando.\n\nOg når du roper «fem minutter» – så finnes ikke fem minutter i kroppen til et barn som er tidsblindt. Når brettet plutselig røskes ut, oppleves det nesten som et fysisk angrep på virkeligheten. Raseriet is en logisk respons på et brått, uforståelig tap av kontroll.\n\nDette handler ikke om hvor mye skjerm barnet ditt har hatt. Du har ikke ødelagt noe. Vi skal ikke snakke om skjermtid-moral i det hele tatt.\n\nVi skal snakke om overgangen. Det er ikke skjermen som er fienden her. Det er broen ut av den som mangler.\n\nDenne uka skal du ikke endre noe ennå. Bare legge merke til én ting: at skjermslutt ikke er en ulydighet – det er en overgang, for en hjerne som er låst fast.\n\nBare det å se det sånn, gjør noe med tonen din når du går inn. Og tonen er halve historien.\n\nDet kommer fortsatt til å smelle iblant. I neste modul ser vi på hvordan du kan bygge den broen ut – så grensen blir mulig å følge.',
        screenText: 'Skjermslutt smeller fordi en hyperfokusert, tidsblind hjerne opplever det som et brått tap av kontroll – ikke som ulydighet. Det handler ikke om skjermtid. Det handler om overgangen.',
        reflectionQuestions: [
          'Tenk på sist skjermslutt smalt hos dere. Hva gjorde du – ropte, tok over, ga etter?',
          'Hva pleier å være tøffest? (F.eks: Å få oppmerksomheten, selve avslutningen eller raseriet etterpå?)',
          'Hvis du ser på det som en overgang og ikke en kamp – endrer det noe i hvordan du har lyst til å gå inn?'
        ],
        microExercise: 'Neste gang skjermen skal av: før du sier eller gjør noe, legg merke til – «dette er en hjerne som er låst fast, ikke en unge som er ulydig». Bare la den tanken farge tonen din.',
        weeklyGoal: 'Jeg legger merke til ett skjermøyeblikk som en overgang, ikke en kamp.',
        languageCards: [
          'Dette er ikke ulydighet. Det er en hjerne som er låst fast.',
          'Fem minutter finnes ikke i kroppen hans ennå.',
          'Det er ikke skjermen som er problemet. Det er overgangen.'
        ],
        situationCardId: 'skjerm-av',
        depotExports: {
          todayAction: 'Innsjekk: Se på skjermslutt som en overgang for en fastlåst hjerne, ikke ulydighet.',
          languageCards: [
            'Dette er ikke ulydighet. Det er en hjerne som er låst fast.',
            'Det er ikke skjermen som er problemet. Det er overgangen.'
          ],
          situationCardId: 'skjerm-av',
          sundayQuestion: 'Hvor mange skjermoverganger så du som en overgang i stedet for en kamp denne uken?',
          weeklyGoal: 'Jeg legger merke til ett skjermøyeblikk som en overgang, ikke en kamp.',
          returnMessage: 'Velkommen tilbake. Vi forebygger overbelastning rundt skjermslutt uten dårlig samvittighet.'
        }
      },
      {
        id: 'skjerm-2',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'skjerm-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        courseId: 'skjerm-uten-krig',
        title: 'Modul 2: Bygg broen, hold grensen',
        videoText: 'Samme kveld, samme spill. Men denne gangen prøver vi noe annet. I stedet for å rope fra kjøkkenet, går du inn noen minutter før tiden er ute.\n\nDu setter deg ned ved siden av barnet. Nært, men ikke invaderende. Og du ser på skjermen.\n\nJeg vet hvor provoserende dette kan høres ut når du er utslitt. Å sette seg ned og vise interesse for Minecraft er kanskje det aller siste som kjennes naturlig. Det forstår jeg godt.\n\nMen her er hvorfor det virker. Du stiller et ekte spørsmål: «Wow, hvordan klarte du å bygge det?» eller «Er du på et vanskelig niveau nå?»\n\nDette er ikke å gi etter, og ikke å belønne skjerm. Det er å anerkjenne barnets opplevelse. Idet barnet svarer, og dere deler et øyeblikk av felles oppmerksomhet, har du allerede hjulpet det å løsne en brøkdel fra spillets grep. Du bygger en bro ut – i stedet for å rive.\n\nGrensen forsvinner ikke. Målet er fortsatt at skjermen skal av. Forskjellen er at du ikke lenger river barnet ut av en verden hjernen er låst fast i – du bygger en liten bro, så grensen blir mulig å følge.\n\nFørst kontakt. Så retning. Det er hele grepet.\n\nNår du kjenner at dere har kontakt, kan du lede mot overgangen: «Jeg ser at du er midt i noe spennende. Setter du det på pause, eller skal jeg hjelpe deg med det?»\n\nDet er ikke en perfekt rolig overgang hver gang. Det er bare én bevegelse mykere enn å rope fra kjøkkenet.\n\nDet kommer fortsatt til å smelle iblant – broen gjør det mulig, ikke garantert. Det beste autovernet bygger du på dagtid, i ro: en forutsigbar nedtrapping dere avtaler når ingen er midt i en konflikt.',
        screenText: 'Du kan ikke vente at barnet bygger broen ut av skjermen selv – du må være broen. Gå inn, koble på med ett ekte spørsmål, og led så mot grensen. Først kontakt, så retning.',
        reflectionQuestions: [
          'Hva tror du blir vanskeligst for deg med å gå inn og koble på, framfor å rope fra kjøkkenet?',
          'Hva tror du barnet ditt svarer best på? (velg: spillet, en hånd på skulderen, litt varsel?)',
          'Når på dagen kunne dere avtalt en fast, forutsigbar skjermnedtrapping – i ro, ikke midt i konflikten?'
        ],
        microExercise: 'Velg ett skjermbytte. Gå inn to minutter før, sett deg ned, og still ett ekte spørsmål om det barnet holder på med – før du nevner at det skal slutte.',
        weeklyGoal: 'Jeg prøver å være broen i ett skjermbytte – gå inn, koble på, og så grensen.',
        languageCards: [
          'Wow, hvordan klarte du å bygge det? / Er du på et vanskelig nivå nå?',
          'Jeg ser at du er midt i noe spennende. Setter du det på pause, eller skal jeg hjelpe deg?',
          'Om to minutter hjelper jeg deg å lagre.'
        ],
        situationCardId: 'skjerm-av',
        depotExports: {
          todayAction: 'Innsjekk: Gå inn to minutter før skjermslutt og koble på med et ekte spørsmål.',
          languageCards: [
            'Wow, hvordan klarte du å bygge det? / Er du på et vanskelig nivå nå?',
            'Jeg ser at du er midt i noe spennende. Setter du det på pause, eller skal jeg hjelpe deg?'
          ],
          situationCardId: 'skjerm-av',
          sundayQuestion: 'Klarte du å bygge en liten bro ut av skjermen denne uken? Hva skjedde overgangen?',
          weeklyGoal: 'Jeg prøver å være broen i ett skjermbytte – gå inn, koble på, og så grensen.',
          returnMessage: 'Velkommen tilbake. Selv med broen vil det smelle iblant – da gjelder reparasjonen fra startkurset.'
        }
      }
    ]
  },
  {
    id: 'minikurs-naar-det-smeller',
    title: 'Når det smeller: V.A.R.M. og reparasjon',
    description: 'Noe å holde fast i når alt er på vei ut av kontroll – og en vei tilbake etterpå. For de øyeblikkene der barnet har mistet seg selv helt.',
    badge: 'Minikurs',
    modules: [
      {
        id: 'smeller-1',
        courseId: 'minikurs-naar-det-smeller',
        title: 'Modul 1: V.A.R.M. i krasjet',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'smeller-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Selv når du har bygget alle tenkelige autovern og forberedt hver overgang, vil det skje. Det smeller. Barnet ditt blir ikke bare frustrert – det er som om hele systemet kortslutter. Ting kastes, slag og spark treffer det som står nærmest, og blikket er mørkt og fjernt. Bilen har ikke bare sneiet autovernet. Den har krasjet tvers gjennom.\n\nI et slikt øyeblikk er ikke jobben å løse noe. Kriser er ikke tidspunktet for læring; det er tidspunktet for skadebegrensning. Du trenger ikke de riktige ordene. Du trenger å være en urokkelig, men ikke-dømmende vegg barnet kan krasje inn i – uten at veggen raser sammen.\n\nDet kan hjelpe å ha en enkel rekkefølge å holde fast i. Ikke en metode, bare en huskehjelp for hva som må komme først: V.A.R.M. Vurdere sikkerheten – se om noen er i fare, stopp et slag rolig hvis du må, beskytt barnet, deg selv og rommet. Avvente – hold ordene tilbake, for et barn i alarm har sjelden plass til mer språk. Romme – tål mer enn det som kjennes rimelig, ta imot trykket uten å sende det tilbake: dette handler ikke om meg, det er bremsene som har sviktet. Møte – når raseriet punkterer og skuldrene synker, er barnet på vei tilbake, og da kan du bevege deg nærmere, tilby et fang, noen få ord.\n\nDu kommer ikke til å gjøre dette perfekt. Ingen gjør det. Men hver gang du klarer å være litt mer rolig enn følelsene dine, sender kroppen din små signaler om trygghet ut i rommet.',
        screenText: 'Når det smeller, er ikke jobben å løse noe – det er skadebegrensning. V.A.R.M.: Vurdere sikkerheten, Avvente (hold ordene tilbake), Romme (tål trykket uten å sende det tilbake), Møte (når roen kommer tilbake).',
        reflectionQuestions: [
          'Tenk på sist det smalt helt. Hva gjorde du – forklarte, korrigerte, eller klarte du å bli?',
          'Hvilket av de fire stegene er vanskeligst for deg? (Vurdere, Avvente, Romme, Møte)',
          'Hva er vanskeligst å romme når barnet er på sitt verste – ordene, slagene, eller maktesløsheten?',
          'Hva tror barnet ditt tåler best i selve stormen – få ord, stille nærvær, eller litt avstand?'
        ],
        microExercise: 'Neste gang det smeller: legg bort ambisjonen om å løse det. Hold deg til ett steg – Avvente. Lukk munnen en stund, senk skuldrene, og la kroppen din vise at du ikke er en trussel. Det er nok for denne gangen.',
        weeklyGoal: 'I ett øyeblikk der det smeller, prøver jeg å romme i stedet for å forklare.',
        languageCards: [
          'Stopp. Jeg lar deg ikke slå. Jeg er her.',
          'Du har lov til å være sint. Jeg blir her sammen med deg.',
          'Vi snakker etterpå. Nå passer jeg på.',
          'Dette handler ikke om meg. Det er bremsene som har sviktet.'
        ],
        situationCardId: 'barnet-eksploderer',
        depotExports: {
          todayAction: 'Hvis det smeller i dag: hold deg til ett steg – avvente. Lukk munnen, senk skuldrene, bli.',
          languageCards: [
            'Stopp. Jeg lar deg ikke slå. Jeg er her.',
            'Vi snakker etterpå. Nå passer jeg på.'
          ],
          situationCardId: 'barnet-eksploderer',
          sundayQuestion: 'Når klarte jeg å romme stormen denne uken – og hva gjorde det med oss etterpå?',
          weeklyGoal: 'Romme i stedet for å forklare, i ett øyeblikk med storm.',
          returnMessage: 'Velkommen tilbake. Å romme en storm er noe av det tyngste som finnes. Vi øver videre, i dag.'
        }
      },
      {
        id: 'smeller-2',
        courseId: 'minikurs-naar-det-smeller',
        title: 'Modul 2: Reparasjon etterpå',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'smeller-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Når roen endelig vender tilbake etter at det har smalt, er den sjelden fredfull. Den dirrer av utmattelse og en knugende skyldfølelse. Og her er det viktigste: det som former et barn, er ikke at det aldri smeller. Vi krasjer alle. Det som former et barn, er hva som skjer etterpå – om bruddet får stå alene, eller om noen kommer tilbake.\n\nÅ reparere er ikke å krype, og det er ikke å be om unnskyldning for at du satte en grense. Det er å ta ansvar for din del – for tonen din, for at du hevet stemmen – ikke for alt. Og det begynner med å legge ned «men»-et. I det øyeblikket du sier «jeg skulle ikke ropt», uten å legge til «men du hørte jo ikke etter», får du komme bak muren barnet har bygget opp.\n\nSå når dere begge har roet dere, gå inn og eie din egen del i én ærlig setning. «Det ble større enn jeg ville. Jeg ropte, og det skulle jeg ikke. Det er ikke din skyld.» Du trenger ikke en lang samtale. Du trenger en voksen som kommer tilbake. Og hvis du vil si mer, kan du skille handlingen fra barnet: det ble for mye for deg – du er ikke vanskelig, det ble vanskelig.\n\nDu kommer ikke til å klare det hver gang, og noen kvelder orker du det ikke. Det er menneskelig. En reparasjon har ingen utløpsdato – du kan komme tilbake i morgen. Det er aldri for sent.',
        screenText: 'Det som former et barn er ikke at det aldri smeller – det er at noen kommer tilbake. Reparasjon starter med å eie din egen del, uten et «men». Det er aldri for sent.',
        reflectionQuestions: [
          'Tenk på sist det ble et brudd. Hva skjedde etterpå – kom noen tilbake, eller ble det stående?',
          'Hva er vanskeligst for deg i en reparasjon? (Å eie min del, å droppe «men», eller å tåle barnets reaksjon)',
          'Hva sier du til deg selv på kvelden etter en vanskelig dag?',
          'Er det et brudd – kanskje langt tilbake – du har lyst til å komme tilbake til?'
        ],
        microExercise: 'Neste gang det glipper: vent til pulsen har roet seg hos dere begge, gå inn, og eie din egen del i én ærlig setning – uten et «men». «Det ble større enn jeg ville. Det skulle jeg ikke.» Du trenger ikke si mer.',
        weeklyGoal: 'Når det glipper, kommer jeg tilbake og eier min del i én setning – uten «men».',
        languageCards: [
          'Det ble større enn jeg ville. Jeg ropte, og det skulle jeg ikke. Det er ikke din skyld.',
          'Det ble nok altfor mye for deg. Det er alltid lov å være sint.',
          'Vi to er fortsatt et lag.',
          'Det er aldri for sent å komme tilbake.'
        ],
        situationCardId: 'jeg-ropte',
        depotExports: {
          todayAction: 'Hvis det glapp i dag: gå tilbake og eie din del i én setning før leggetid – uten «men».',
          languageCards: [
            'Det ble større enn jeg ville. Det er ikke din skyld.',
            'Vi to er fortsatt et lag.'
          ],
          situationCardId: 'jeg-ropte',
          sundayQuestion: 'Hva reparerte vi denne uken – og er det et eldre brudd jeg vil komme tilbake til?',
          weeklyGoal: 'Kom tilbake og eie min del i én setning, uten «men».',
          returnMessage: 'Velkommen tilbake. Det er aldri for sent å komme tilbake – heller ikke her. Vi starter i dag.'
        }
      }
    ]
  },
  {
    id: 'minikurs-legging-morgen-overganger',
    title: 'Legging, morgen og overganger',
    description: 'Mindre kamp i dagens skarpeste veikryss – ved å gi overgangene et autovern som tåler uroen. For leggetiden, morgenen, og alle de små skiftene imellom.',
    badge: 'Minikurs',
    modules: [
      {
        id: 'legging-1',
        courseId: 'minikurs-legging-morgen-overganger',
        title: 'Modul 1: Veikrysset',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'legging-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Et veikryss er enhver overgang – fra lek til middag, fra ute til inne, fra skjerm til lekser. For oss voksne skjer slike skifter nesten automatisk. For barnet ditt er det en krevende operasjon.\n\nÅ skifte fra én ting til en annen krever at barnet stanser en pågående impuls, slipper taket i noe som kanskje kjennes trygt, orienterer seg mot noe nytt, og mobiliserer motivasjon for å begynne. For et uferdig styringssystem er dette mye å få til alene – og derfor smeller det så ofte akkurat i overgangene, uansett hvor mange tidsvarsler du har gitt.\n\nDet vi voksne kan gjøre, er å være broen. En beskjed ropt fra et annet rom er sjelden nok. Å gå inn, få kontakt, og lede barnet gjennom skiftet – det er det som gjør overgangen mulig. Og noen ganger er det første autovernet ikke det du setter opp for barnet, men det lille øyeblikket der du senker ditt eget tempo før beskjeden kommer.\n\nDu trenger ikke fikse hele hverdagen. Bare gjør ett veikryss litt mindre skarpt.',
        screenText: 'En overgang er en krevende mental operasjon for barnet – stanse, slippe, orientere, starte. Du kan være broen: gå inn, få kontakt, led gjennom skiftet. Gjør ett veikryss litt mindre skarpt.',
        reflectionQuestions: [
          'Hvilket veikryss i hverdagen deres er det mest forutsigbare smellet eller den mest forutsigbare låsningen?',
          'Hva pleier du å gjøre i dag – rope fra et annet rom, eller gå inn?',
          'Hva tror du barnet ditt trenger mest i en overgang – et varsel, en hånd, eller hjelp til å komme i gang?',
          'Hvilket ett veikryss kunne du gjort litt mindre skarpt i morgen?'
        ],
        microExercise: 'Velg ett veikryss i morgen som du vet pleier å koste mye. Gjør én liten ting før det smeller: gå inn to minutter tidligere og sett deg ned, eller si i forveien «om ti minutter går vi over til middag. Jeg kommer og henter deg.» Du trenger ikke fikse hele overgangen. Bare gjør én bevegelse mindre skarp.',
        weeklyGoal: 'Gjøre ett veikryss litt mindre skarpt – gå inn i stedet for å rope.',
        languageCards: [
          'Om ti minutter går vi over. Jeg kommer og henter deg.',
          'Jeg ser at du er midt i noe. Skal jeg hjelpe deg å avslutte?',
          'Vi tar dette skiftet sammen.'
        ],
        situationCardId: 'overgang-skole',
        depotExports: {
          todayAction: 'Velg ett veikryss i dag og gå inn to minutter tidligere – før det smeller.',
          languageCards: [
            'Om ti minutter går vi over. Jeg kommer og henter deg.',
            'Vi tar dette skiftet sammen.'
          ],
          situationCardId: 'overgang-skole',
          sundayQuestion: 'Hvilket veikryss ble litt mykere denne uken – og hva gjorde det mulig?',
          weeklyGoal: 'Gjøre ett veikryss litt mindre skarpt.',
          returnMessage: 'Velkommen tilbake. Du skal ikke ta igjen noe. Velg ett lite veikryss i dag.'
        }
      },
      {
        id: 'legging-2',
        courseId: 'minikurs-legging-morgen-overganger',
        title: 'Modul 2: Leggetid',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'legging-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Kvelden er kommet, og du kjenner det allerede: leggetiden kan bli det skarpeste veikrysset i hele dagen. Barnet finner på det ene etter det andre – et glass vann til, en historie til, et spørsmål til – og du kjenner tålmodigheten tynnes ut.\n\nDet er lett å lese dette som uthalingstaktikk. Men for et barn med en overaktiv motor er selve det å overgi seg til søvnen ofte skummelt: det betyr å slippe kontrollen, la tankene vandre fritt, og være alene med en kropp som fortsatt dirrer av dagens inntrykk. Når barnet søker ut mot deg på sengekanten, er det fordi tryggheten finnes hos deg.\n\nDet betyr ikke at leggetiden blir valgfri. Det betyr at veien inn i søvn må få et autovern som tåler uroen. Demp lyset, fjern skjermer som holder hjernen i høygir, og start nedtrappingen lenge før barnet faktisk skal ligge. Forutsigbarheten i seg selv skaper trygghet, og trygghet er det som lar kroppen roe ned.\n\nOg noen ganger, når uroen er for stor, krever dette veikrysset at du bare er der – sitter på sengekanten, stryker en hånd over ryggen, puster rolig, og låner barnet ditt eget hvilende nervesystem til det finner roen.',
        screenText: 'Leggetid er ofte dagens skarpeste veikryss – ikke uthaling, men frykt for å slippe kontrollen. Gi veien inn i søvn et autovern: demp lyset, start nedtrappingen tidlig, og lån barnet din egen ro på sengekanten.',
        reflectionQuestions: [
          'Hvordan er leggetiden hos dere – smeller den, eller drar den bare ut?',
          'Hva pleier du å tolke som uthaling? Og endrer det seg hvis du ser det som uro barnet ikke får regulert alene?',
          'Når begynner nedtrappingen hos dere i dag – og kunne den begynt litt tidligere?',
          'Hva roer barnet ditt mest på sengekanten – ord, berøring, eller bare at du er der?'
        ],
        microExercise: 'I kveld: start nedtrappingen ti minutter tidligere enn vanlig. Demp lyset, legg vekk skjermen, og sett deg på sengekanten et øyeblikk uten å mase. Bare vær der, og pust rolig. Du trenger ikke gjøre leggetiden perfekt – bare gi den litt mer forutsigbarhet.',
        weeklyGoal: 'Starte kveldens nedtrapping litt tidligere, og sitte litt på sengekanten.',
        languageCards: [
          'Dagen er over nå. Jeg er her mens du faller til ro.',
          'Du trenger ikke sove med en gang. Bare ligge, og puste.',
          'Jeg blir her litt.'
        ],
        situationCardId: 'legging-laaser',
        depotExports: {
          todayAction: 'Start kveldens nedtrapping ti minutter tidligere i dag, og demp lyset.',
          languageCards: [
            'Dagen er over nå. Jeg er her mens du faller til ro.',
            'Jeg blir her litt.'
          ],
          situationCardId: 'legging-laaser',
          sundayQuestion: 'Hvordan kjentes kveldene denne uken – og hva ga mest ro?',
          weeklyGoal: 'Gi veien inn i søvn et litt tydeligere autovern.',
          returnMessage: 'Velkommen tilbake. Tunge kvelder hører til. Vi starter med én rolig nedtrapping i dag.'
        }
      },
      {
        id: 'legging-3',
        courseId: 'minikurs-legging-morgen-overganger',
        title: 'Modul 3: Morgen',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'legging-3',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Det er morgen. Dere skal ut, klokka går, og barnet ditt sitter på gulvet med én sokk på og kommer seg ikke videre. Du kjenner stresset stige – og fristelsen til å mase, skynde på, ta over.\n\nMorgenen er full av små valg og overganger samtidig, og for et barn med et overbelastet arbeidsminne blir det fort for mye. Hver beskjed – finn sokkene, ta på genseren, husk gymbagen – krever at barnet holder informasjon fast mens det handler, og den informasjonen faller lett ned fra det glatte, overfylte skrivebordet i hodet.\n\nDet beste autovernet bygger du kvelden før, i ro: legg frem klærne, pakk sekken, gjør i stand det som kan gjøres. Om morgenen handler det om å fjerne valg, ikke legge til mas. Ett tydelig steg av gangen, gjerne med en enkel visuell huskeliste, slår en lang rekke beskjeder ropt over frokostbordet.\n\nOg når det likevel butter: senk ditt eget tempo først. Et barn som allerede er i ferd med å miste styringen, trenger ikke en voksen som også kjører ut i svingen.',
        screenText: 'Morgenen blir for mye fordi mange valg og overganger kommer samtidig, og arbeidsminnet svikter. Bygg autovernet kvelden før, fjern valg om morgenen, og ta ett steg av gangen. Senk ditt eget tempo først.',
        reflectionQuestions: [
          'Hvor i morgenrutinen butter det oftest hos dere?',
          'Hvor mange beskjeder gir du på rad om morgenen – og hva skjer hvis du gir én av gangen?',
          'Hva kunne dere gjort klart kvelden før, så morgenen har færre valg?',
          'Hva er ditt eget tidligste tegn på at du er i ferd med å begynne å mase?'
        ],
        microExercise: 'I kveld: legg frem klærne og pakk sekken sammen med barnet, i ro. I morgen tidlig: gi én beskjed av gangen, og fjern ett valg. Bare ett. Se om morgenen blir et lite hakk roligere.',
        weeklyGoal: 'Fjerne ett valg om morgenen, og forberede litt kvelden før.',
        languageCards: [
          'Vi tar én ting av gangen. Først sokkene.',
          'Klærne ligger klare. Du trenger bare å ta dem på.',
          'Vi har god tid nok. Jeg hjelper deg i gang.'
        ],
        situationCardId: 'morgenstress',
        depotExports: {
          todayAction: 'Forbered én ting til morgenen i kveld, og gi én beskjed av gangen i morgen.',
          languageCards: [
            'Vi tar én ting av gangen. Først sokkene.',
            'Klærne ligger klare. Du trenger bare å ta dem på.'
          ],
          situationCardId: 'morgenstress',
          sundayQuestion: 'Hvilken morgen ble litt roligere denne uken – og hva gjorde forskjellen?',
          weeklyGoal: 'Færre valg om morgenen, mer forberedt kvelden før.',
          returnMessage: 'Velkommen tilbake. Travle morgener hører til. Vi forbereder én liten ting i dag.'
        }
      }
    ]
  },
  {
    id: 'minikurs-staa-forskjellig',
    title: 'Når dere står forskjellig',
    description: 'Når dere voksne har ulikt tempo, ulik toleranse eller ulike gamle kart. Barnet trenger ikke at dere blir like – det trenger at dere blir litt mer forutsigbare sammen.',
    badge: 'Minikurs',
    modules: [
      {
        id: 'forskjellig-1',
        courseId: 'minikurs-staa-forskjellig',
        title: 'Modul 1: To voksne, to alarmsystemer',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'forskjellig-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Det er middag, og barnet deres holder på å koke over. Du kjenner at du strammer grepet – du vil ha ro, struktur, en grense nå. Og ved siden av deg kjenner den andre voksne det motsatte: en trang til å dempe alt fort, glatte over, gi etter. Og før dere vet ordet av det, drar dere i hver deres retning – midt foran barnet.\n\nDet er lett å tenke at den andre tar feil. At hvis han bare hadde gjort som meg, hadde det gått bedre. Men noe annet er ofte sant samtidig: dere ser ikke bare barnet. Dere ser barnet gjennom hvert deres eget system.\n\nVi bærer alle på gamle kart fra vår egen oppvekst. Den ene av dere kan ha lært at kaos er farlig, og griper etter kontroll når det blir uoversiktlig. Den andre kan ha lært at sinne og strenghet er skummelt, og glatter over for å unngå smerten. Begge prøver å skape trygghet. Begge vil vel. Dere reagerer bare fra to ulike alarmsystemer, ofte uten å vite det.\n\nDenne uka skal du ikke prøve å bli enig med den andre voksne, og ikke endre ham. Bare legg merke til hva som skjer i deg når han gjør noe du ville gjort annerledes. Det er der det begynner – ikke i å vinne diskusjonen, men i å kjenne din egen alarm før den tar over.',
        screenText: 'Uenighet mellom dere handler ofte om ulik alarm og ulike gamle kart – ikke vrangvilje. Dere ser barnet gjennom hvert deres eget system. Legg merke til din egen reaksjon før den tar over.',
        reflectionQuestions: [
          'Tenk på sist dere voksne dro i hver deres retning. Hva ville du gjort, og hva ville den andre gjort?',
          'Hva skjer i deg når den andre voksne gjør noe du ville gjort annerledes – strammer du deg, eller trekker du deg?',
          'Kjenner du igjen et gammelt kart hos deg selv – en frykt for kaos, eller en frykt for konflikt?',
          'Hva tror du den andre voksne egentlig prøver å beskytte når dere står forskjellig?'
        ],
        microExercise: 'Denne uka: neste gang den andre voksne gjør noe med barnet du ville gjort annerledes, legg merke til hva som skjer i deg – før du sier eller gjør noe. Bare merk din egen reaksjon. Du trenger ikke endre noe ennå.',
        weeklyGoal: 'Merke min egen reaksjon når den andre voksne gjør noe jeg ville gjort annerledes.',
        languageCards: [
          'Kan vi ta et sekund? Jeg kjenner at jeg blir stresset.',
          'Vi vil begge det beste for henne. Vi gjør det bare litt ulikt.',
          'La oss snakke om dette etterpå, når vi er roligere.',
          'Jeg trenger ikke ha rett nå. Jeg vil bare at det skal bli trygt for henne.'
        ],
        situationCardId: 'koker-selv',
        depotExports: {
          todayAction: 'Legg merke til din egen reaksjon én gang i dag når den andre voksne gjør noe du ville gjort annerledes.',
          languageCards: [
            'Kan vi ta et sekund? Jeg kjenner at jeg blir stresset.',
            'Vi vil begge det beste for henne. Vi gjør det bare litt ulikt.'
          ],
          situationCardId: 'koker-selv',
          sundayQuestion: 'Når kjente jeg min egen alarm i møte med den andre voksne denne uken – og hva gjorde jeg med den?',
          weeklyGoal: 'Merke min egen reaksjon før den tar over.',
          returnMessage: 'Velkommen tilbake. Å stå forskjellig er noe av det vanligste som finnes. Vi starter med ett lite blikk innover i dag.'
        }
      },
      {
        id: 'forskjellig-2',
        courseId: 'minikurs-staa-forskjellig',
        title: 'Modul 2: Barnet mellom to tempo',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'forskjellig-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Se for deg barnet midt i en nedsmelting. Den ene voksne sier «nå går du på rommet», den andre sier «nei, kom hit til meg». Og barnet blir stående og se fra den ene til den andre, mer forvirret enn før. To trygge havner som plutselig peker i hver sin retning.\n\nNår vi voksne sender motstridende signaler i affekt, blir verden et øyeblikk uforutsigbar for barnet. Og for et barn som allerede strever med å regulere seg, er uforutsigbarhet det motsatte av det det trenger. Det er ikke uenigheten i seg selv som er farlig – det er å stå midt mellom to voksne i affekt, uten å vite hvem som gjelder.\n\nHer er den gode nyheten: barnet trenger ikke at dere blir like. Det trenger ikke to identiske voksne. Det trenger at dere, i de varmeste øyeblikkene, blir litt mer forutsigbare sammen. Ikke full enighet – bare en felles minimumslinje i den ene situasjonen som oftest smeller.\n\nEn viktig ting underveis: hvis konfliktene mellom dere voksne blir skremmende, truende eller voldelige, eller hvis barnet ofte blir stående midt i en belastende voksenkonflikt, er det mer enn dette kurset skal bære alene. Da er familievernkontoret et godt sted å begynne. Og ved frykt for vold, eller for at noen ikke er trygge: Alarmtelefonen 116 111, eller 113 ved akutt fare. Å hente hjelp er omsorg, ikke svik.\n\nEllers: velg én slik situasjon. Ikke alt. Bare én. Og bli enige om det minste dere kan stå sammen om der – så barnet slipper å være den som bærer uroen mellom dere.',
        screenText: 'Barnet blir utrygt når voksne i affekt peker i hver sin retning. Det trenger ikke at dere blir like – bare litt mer forutsigbare sammen. Lag én felles minimumslinje i den situasjonen som oftest smeller.',
        reflectionQuestions: [
          'Har du sett barnet bli stående mellom dere to – og hva gjorde det med barnet?',
          'Hvilken situasjon er det dere voksne oftest står forskjellig i?',
          'Hva er det minste dere kunne blitt enige om i akkurat den situasjonen – ikke alt, bare én linje?',
          'Hva tror du barnet ditt trenger mest i et slikt øyeblikk – ikke at dere er enige, men at dere er forutsigbare?'
        ],
        microExercise: 'Velg én situasjon der dere voksne ofte står forskjellig. Bli enige om én felles minimumslinje for akkurat den – ikke full enighet, bare det minste dere begge kan stå for. Skriv den gjerne ned sammen, i ro.',
        weeklyGoal: 'Lage én felles minimumslinje i den situasjonen som oftest smeller.',
        languageCards: [
          'Vi to voksne snakker om dette senere. Nå er vi her for deg.',
          'Vi er litt uenige akkurat nå, men vi finner ut av det. Det er ikke din jobb.',
          'La oss ta dette utenfor rommet, ikke foran henne.'
        ],
        depotExports: {
          todayAction: 'Tenk ut den ene situasjonen der dere oftest står forskjellig – og hva som kunne vært en felles minimumslinje.',
          languageCards: [
            'Vi to voksne snakker om dette senere. Nå er vi her for deg.',
            'La oss ta dette utenfor rommet, ikke foran henne.'
          ],
          sundayQuestion: 'Var det et øyeblikk denne uken der vi skjermet barnet fra en voksenuenighet – og hvordan kjentes det?',
          weeklyGoal: 'Én felles minimumslinje i den situasjonen som oftest smeller.',
          returnMessage: 'Velkommen tilbake. Barnet trenger ikke at dere er enige – bare at dere finner tilbake til hverandre. Vi starter med én liten linje i dag.'
        }
      },
      {
        id: 'forskjellig-3',
        courseId: 'minikurs-staa-forskjellig',
        title: 'Modul 3: En liten avtale når dere er rolige',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'forskjellig-3',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Det er kveld. Barna sover, og dere to voksne sitter endelig i ro. Det er her, ikke midt i stormen, at den viktigste samtalen mellom dere kan begynne et helt annet sted enn i spørsmålet om hvem som hadde rett.\n\nFor dere kommer aldri til å bli enige om alt, og det er helt greit. Men dere kan lage små avtaler på forhånd, i ro, for de situasjonene dere vet kommer til å smelle. Ett lite autovern, avtalt når ingen er i affekt, er verdt mer enn ti diskusjoner midt i kaoset.\n\nIkke prøv å løse alt. Velg den ene situasjonen som oftest går galt mellom dere, og avtal én ting: én setning dere kan si til hverandre, én enkel rollefordeling – «du tar legging i kveld, jeg holder meg unna» – eller ett lite stopptegn dere kan bruke når en av dere kjenner at det koker. Noe så lite at dere faktisk husker det når det gjelder.\n\nOg når dere har stått forskjellig likevel – for det kommer dere til – så finnes det en vei tilbake også mellom dere voksne. Ikke for å fordele skyld, men for å spørre roligere: hva skjedde i meg da jeg strammet inn, og hva skjedde i deg da du glattet over? Hva trenger barnet at vi to samler oss om neste gang?',
        screenText: 'Lag små avtaler i ro, ikke i affekt. Velg den situasjonen som oftest smeller, og avtal én ting: en setning, en rollefordeling, eller et stopptegn. Og finn veien tilbake til hverandre etterpå – uten skyld.',
        reflectionQuestions: [
          'Når har dere to voksne tid til å snakke i ro – uten barna til stede?',
          'Hvilken ene situasjon ville dere fått mest igjen for å lage en liten avtale om?',
          'Hva slags avtale passer best for dere – en setning, en rollefordeling, eller et stopptegn?',
          'Hva kunne du sagt til den andre voksne etter at dere har stått forskjellig, for å finne tilbake?'
        ],
        microExercise: 'Finn et rolig øyeblikk med den andre voksne denne uka. Avtal én liten ting for den situasjonen som oftest smeller: én setning, én rollefordeling, eller ett stopptegn dere kan bruke neste gang. Bare én. Hold den så liten at dere husker den.',
        weeklyGoal: 'Avtale ett lite autovern med den andre voksne for den situasjonen som oftest smeller.',
        languageCards: [
          'Det ble rotete mellom oss i sted. Skal vi snakke om hva som skjedde?',
          'Jeg merket at jeg ble hard. Det handlet mer om meg enn om deg.',
          'Hva trenger hun at vi to samler oss om neste gang?',
          'Vi trenger ikke være enige. Vi trenger bare å være litt mer forutsigbare sammen.'
        ],
        depotExports: {
          todayAction: 'Finn fem rolige minutter med den andre voksne, og avtal én liten ting for den situasjonen som oftest smeller.',
          languageCards: [
            'Det ble rotete mellom oss i sted. Skal vi snakke om hva som skjedde?',
            'Vi trenger ikke være enige. Vi trenger bare å være litt mer forutsigbare sammen.'
          ],
          sundayQuestion: 'Hvilken liten avtale holdt vi denne uken – og hva ble litt lettere av den?',
          weeklyGoal: 'Ett lite autovern avtalt i ro, ikke i affekt.',
          returnMessage: 'Velkommen tilbake. Avtaler glipper, og det er menneskelig. Vi justerer én liten ting i dag.'
        }
      }
    ]
  },
  {
    id: 'minikurs-skolesamarbeid',
    title: 'Skolesamarbeid uten skyttergrav',
    description: 'Å møte skolen regulert, konkret og utholdende – tydelig uten å gå i skyttergrav. Barnet trenger at de voksne rundt det klarer å lage en felles retning, også når de ser situasjonen forskjellig.',
    badge: 'Minikurs',
    modules: [
      {
        id: 'skole-1',
        courseId: 'minikurs-skolesamarbeid',
        title: 'Modul 1: Før møtet – samle deg før du samler saken',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'skole-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Det kommer et lite pling fra telefonen midt i arbeidsdagen. Du kjenner igjen varselet fra skolens app, og allerede før du har åpnet det, strammer noe seg i magen. «Det har vært en krevende dag i dag...» Og du kjenner varmen stige – skam, fortvilelse, og en trang til å forsvare deg eller skrive tilbake med en gang.\n\nDet er en helt menneskelig refleks. Men hvis du går rett inn i et møte eller en melding med den følelsen som styring, er det lett å møte skolen som en utsending fra en kamp – ikke som en av de voksne som skal samarbeide om barnet ditt.\n\nDu skal ikke gjøre bekymringen din mindre enn den er. Den er gyldig. Men du trenger å gjøre den mulig å høre. Og det starter med å samle deg selv før du samler saken. La det første svaret få vente. Et kort «takk for at du sier fra, jeg trenger å snakke med ham når han har landet, så kommer jeg tilbake» er nok for nå.\n\nNår du har landet litt, kan du sortere. Ikke hele historien på én gang – det blir for mye for hvem som helst å ta imot. Bare tre konkrete observasjoner, og ett ønske for møtet. Hva er det du faktisk har sett, og hva håper du at dere sammen kan få til? Det er den saken som er mulig å samarbeide om.',
        screenText: 'Samle deg før du samler saken. Du skal ikke gjøre bekymringen mindre – men gjøre den mulig å høre. La det første svaret vente, og kom til møtet med tre konkrete observasjoner og ett ønske, ikke hele historien.',
        reflectionQuestions: [
          'Hvilke meldinger fra skolen utløser raskest beredskapen i kroppen din?',
          'Hva pleier å være din første reaksjon – forsvare barnet, forsvare deg selv, eller dempe alt for å være grei?',
          'Hvis du skulle valgt ut tre konkrete ting du faktisk har sett hjemme – hva ville de vært?',
          'Hva er det ene du mest håper at dere voksne kan få til for barnet?'
        ],
        microExercise: 'Før neste kontakt med skolen: skriv ned tre konkrete observasjoner (hva du faktisk har sett, ikke tolkninger) og ett ønske for møtet. Bare tre og én. Det gjør bekymringen din mulig å høre.',
        weeklyGoal: 'Sortere bekymringen til tre konkrete observasjoner og ett ønske før jeg tar kontakt med skolen.',
        languageCards: [
          'Takk for at du sier fra. Jeg trenger å snakke med ham når han har landet, så kommer jeg tilbake.',
          'Jeg ser dette litt annerledes hjemme. Kan vi sette oss ned og se på det sammen?',
          'Jeg er bekymret, og jeg vil gjerne samarbeide om hva vi gjør videre.'
        ],
        situationCardId: 'skolemelding',
        depotExports: {
          todayAction: 'Hvis det kommer en vanskelig melding fra skolen i dag: hold tilbake det første svaret, og skriv heller «jeg kommer tilbake når han har landet».',
          languageCards: [
            'Takk for at du sier fra. Jeg trenger å snakke med ham når han har landet, så kommer jeg tilbake.',
            'Jeg er bekymret, og jeg vil gjerne samarbeide om hva vi gjør videre.'
          ],
          situationCardId: 'skolemelding',
          sundayQuestion: 'Klarte jeg å samle meg før jeg samlet en sak denne uken – og hva gjorde det med tonen?',
          weeklyGoal: 'Tre observasjoner og ett ønske, før kontakt.',
          returnMessage: 'Velkommen tilbake. Å stå i skolesamarbeid er slitsomt arbeid. Vi starter med én liten sortering i dag.'
        }
      },
      {
        id: 'skole-2',
        courseId: 'minikurs-skolesamarbeid',
        title: 'Modul 2: I møtet – tydelig uten skyttergrav',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'skole-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Du sitter i møterommet. Lysstoffrørene summer, kaffen er lunken, og rundt bordet sitter mennesker med permer og alvorlige ansikter. Og du er der for å snakke om det kjæreste du har. Når skolen begynner å beskrive utfordringene – uro, nekt, konflikter – kjenner du beredskapskroppen våkne. Skammen kommer snikende, og med den trangen til enten å forsvare barnet hardt, eller å bli stille og medgjørlig.\n\nDet finnes en tredje vei mellom de to. Du kan møte skolen med anerkjennelse uten å gi fra deg tydeligheten. Hvis læreren forteller om en vanskelig situasjon, kan du si: «Jeg forstår virkelig at det var krevende for deg å stå i.» I det øyeblikket senker den andre guarden, og dere er ikke lenger motstandere.\n\nOg så kan du være tydelig – men konkret. For tydelighet virker best når den er konkret nok til at noen faktisk kan handle på den. Ikke hele historien, ikke alle bekymringene på én gang. Hold deg til én hovedbekymring og ett konkret spørsmål: «Hva gjør vi fra i morgen?» Det er vanskelig å gå i skyttergrav rundt et så enkelt, fremoverlent spørsmål.\n\nDu trenger ikke å være den som har alle svarene, og du trenger ikke å vinne møtet. Du trenger bare å holde barnet synlig i rommet, og be om noe lite og konkret som dere kan prøve sammen.',
        screenText: 'Det finnes en tredje vei mellom å forsvare hardt og å bli medgjørlig: anerkjenn skolen, og vær konkret. Tydelighet virker når den er konkret nok til å handle på. Hold deg til én hovedbekymring og ett spørsmål: «Hva gjør vi fra i morgen?»',
        reflectionQuestions: [
          'Hvilken rolle er det lettest for deg å havne i på møter – forsvar, tilbaketrekning, eller noe midt imellom?',
          'Hva er den ene hovedbekymringen du mest trenger at skolen forstår akkurat nå?',
          'Hva ville et lite, konkret tiltak vært – noe skolen faktisk kan gjøre fra i morgen?',
          'Hvordan kunne du anerkjent lærerens situasjon, uten å gi fra deg det barnet ditt trenger?'
        ],
        microExercise: 'På neste møte: før du legger frem alt, anerkjenn lærerens situasjon med én setning. Hold deg så til én hovedbekymring og ett konkret spørsmål: «Hva gjør vi fra i morgen?» Bare én bekymring, ett spørsmål.',
        weeklyGoal: 'Holde meg til én hovedbekymring og ett konkret spørsmål i møtet med skolen.',
        languageCards: [
          'Jeg forstår at dette er krevende for deg som lærer også.',
          'Vi ønsker ikke å frita ham for ansvar – men vi trenger å forstå hva som skjer før vi finner tiltak.',
          'Hva kan vi prøve fra i morgen? Og hvem følger opp?',
          'Kan vi bli enige om ett lite tiltak, og avtale når vi ser på det igjen?'
        ],
        depotExports: {
          todayAction: 'Hvis du har en samtale med skolen i dag: anerkjenn den andre med én setning, og still ett konkret spørsmål – «hva gjør vi fra i morgen?»',
          languageCards: [
            'Jeg forstår at dette er krevende for deg som lærer også.',
            'Hva kan vi prøve fra i morgen? Og hvem følger opp?'
          ],
          sundayQuestion: 'Klarte jeg å være tydelig uten å gå i skyttergrav denne uken – og hva skjedde da?',
          weeklyGoal: 'Én hovedbekymring, ett konkret spørsmål.',
          returnMessage: 'Velkommen tilbake. Møter er slitsomme. Vi starter med ett lite, konkret spørsmål i dag.'
        }
      },
      {
        id: 'skole-3',
        courseId: 'minikurs-skolesamarbeid',
        title: 'Modul 3: Etter møtet – fra prat til liten plan',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'skole-3',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Du kommer hjem etter møtet, lettet over at det er over. Men et sted inni deg ulmer en uro: ble det egentlig avtalt noe? Alle var hyggelige, alle nikket, men ingenting ble skrevet ned – og du vet av erfaring at hyggelige møter har en tendens til å forsvinne i hverdagens kaos.\n\nHer er en liten hemmelighet om systemer: muntlige avtaler i en krok i gangen forsvinner. Når en vikar tar over, når læreren slutter, eller når det blir travelt, er det bare det som står skrevet som blir stående. Så et godt møte er ikke et møte der alle var enige. Det er et møte som ender i ett lite, konkret neste steg.\n\nDu trenger ikke å bære hele systemet alene, og du trenger ikke å være den som passer på alt. Du trenger bare å be om én ting: en kort skriftlig oppsummering. Hva prøver vi, hvem gjør hva, og når ser vi på det igjen? En vennlig e-post i etterkant holder: «Takk for et godt møte. Slik jeg forstod det, ble vi enige om... Stemmer dette?»\n\nDet er ikke å være en mistroisk eller overkontrollerende forelder. Det er å gjøre de gode intensjonene om til noe dere kan lene dere mot når hverdagen igjen blir bråkete.\n\nOg noen ganger er det mer enn et møte og en oppsummering kan løse. Hvis barnet ikke er trygt på skolen, hvis fraværet blir alvorlig, hvis skolen ikke følger opp over tid, eller hvis det handler om alvorlig mobbing, vold, selvskading eller stor funksjonssvikt – da skal du ikke stå alene. Da kan du søke støtte fra dem som kan mer enn skolen alene: fastlege, helsesykepleier, PPT, BUP, eller kommunens systemer for skolemiljø og oppfølging, avhengig av hva saken handler om. Å hente inn flere rundt barnet er ikke å gi opp samarbeidet. Det er å utvide ringen av voksne som kan holde fast.',
        screenText: 'Et godt møte ender i ett lite neste steg, ikke i enighet. Be om en kort skriftlig oppsummering: hva prøver vi, hvem gjør hva, når evaluerer vi? En vennlig e-post i etterkant gjør gode intensjoner om til noe å lene seg mot.',
        reflectionQuestions: [
          'Når et møte er over – pleier det å bli til handling, eller forsvinner det?',
          'Hva er det ene neste steget du mest trenger at noen tar ansvar for?',
          'Hva ville du skrevet i en kort, vennlig oppsummerings-e-post etter et møte?',
          'Hvem rundt deg kunne du tatt med, eller lent deg på, hvis skolen ikke følger opp?'
        ],
        microExercise: 'Etter neste møte (eller for et møte dere allerede har hatt): send en kort, vennlig e-post som oppsummerer det dere ble enige om. «Takk for et godt møte. Slik jeg forstod det, ble vi enige om... Stemmer dette?» Det trenger ikke bevise at du har rett. Bare gi dere noe å lene dere mot.',
        weeklyGoal: 'Sende én kort, vennlig oppsummerings-e-post etter et møte med skolen.',
        languageCards: [
          'Takk for et godt møte. Slik jeg forstod det, ble vi enige om... Stemmer dette?',
          'Hva prøver vi, hvem gjør hva, og når ser vi på det igjen?',
          'Det vi avtalte ser ikke ut til å virke ennå. Kan vi justere litt?',
          'Jeg vil gjerne følge opp det vi snakket om. Kan vi ta en kort prat?'
        ],
        depotExports: {
          todayAction: 'Send en kort, vennlig oppsummering på e-post for et møte dere har hatt: hva prøver vi, hvem gjør hva, når ser vi på det igjen?',
          languageCards: [
            'Takk for et godt møte. Slik jeg forstod det, ble vi enige om... Stemmer dette?',
            'Det vi avtalte ser ikke ut til å virke ennå. Kan vi justere litt?'
          ],
          sundayQuestion: 'Ble et møte eller en samtale til ett lite, konkret neste steg denne uken?',
          weeklyGoal: 'Ett lite neste steg, skriftlig oppsummert.',
          returnMessage: 'Velkommen tilbake. Du skal ikke bære hele systemet alene. Vi tar ett lite neste steg i dag.'
        }
      }
    ]
  },
  {
    id: 'minikurs-redd-miste-barnet',
    title: 'Når du er redd for å miste barnet',
    description: 'En varsom, regulerende støtte for foreldre som er redde, skamfulle eller overveldet. Når frykten tar over, er første oppgave ikke å vinne hele saken – men å få nok fotfeste til å gjøre én klok ting om gangen.',
    badge: 'Minikurs',
    modules: [
      {
        id: 'redd-1',
        courseId: 'minikurs-redd-miste-barnet',
        title: 'Modul 1: Når alarmen sier «jeg mister barnet»',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'redd-1',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Det er sent på kvelden. Kanskje har døra til rommet gått i lås. Kanskje har du funnet noe som ikke burde være der, eller fått en melding du ikke klarer å riste av deg. Og det kommer en frykt som er annerledes enn all annen frykt: tanken på at du er i ferd med å miste barnet ditt.\n\nHvis du kjenner den, vil jeg si det rolig og tydelig: den frykten er menneskelig, og den er gyldig. Jeg skal ikke prøve å gjøre den mindre enn den er, og jeg skal ikke si at dette garantert går bra. Det ville vært uærlig.\n\nMen jeg vil si én ting om hva som skjer i deg akkurat nå. Når frykten for å miste barnet tar over, blir alt i deg alarm. Pulsen, tankene, trangen til å handle med en gang. Og i den alarmen kjennes det som om du må løse hele saken i hodet ditt, i kveld. Det er nesten umulig.\n\nFor frykten kan være ekte, men alarmen er ikke alltid et godt kart. Når den er på sitt høyeste, ser du gjerne bare det verste. Derfor er ikke første oppgave å vinne hele saken. Første oppgave er å lande nok til å se hva som faktisk er neste lille steg.\n\nSå akkurat nå trenger du ikke en plan for alt. Du trenger bare å få litt fotfeste. Kjenn føttene mot gulvet. Pust litt langsommere. Og hvis det hjelper, skriv ned tre ting: hva du faktisk vet, hva du frykter, og hva du trenger å avklare. Det er ofte mindre i «vet»-kolonnen enn alarmen sier – og det er der du kan begynne.',
        screenText: 'Når frykten for å miste barnet tar over, blir alt i deg alarm. Frykten kan være ekte, men alarmen er ikke alltid et godt kart. Første oppgave er ikke å vinne hele saken – det er å lande nok til å se neste lille steg.',
        reflectionQuestions: [
          'Hva skjer i kroppen din når frykten for å miste barnet melder seg?',
          'Når alarmen er på sitt høyeste – ser du flere muligheter, eller bare det verste?',
          'Hvis du skiller det du faktisk vet fra det du frykter – hva står i hver kolonne?',
          'Hva er det ene du trenger å avklare først, for å få litt fotfeste?'
        ],
        microExercise: 'Når frykten er som størst: kjenn føttene mot gulvet, pust litt langsommere, og skriv ned tre ting – hva du faktisk vet, hva du frykter, og hva du trenger å avklare. Ikke for å løse alt. Bare for å lande nok til å se neste lille steg.',
        weeklyGoal: 'Når frykten tar over, lande nok til å skille det jeg vet fra det jeg frykter.',
        languageCards: [
          'Akkurat nå er det alarm. Jeg trenger å lande litt før jeg gjør noe.',
          'Jeg trenger ikke løse alt i kveld. Bare se neste lille steg.',
          'Frykten er ekte. Men den er ikke hele bildet.',
          'Jeg ser at noe er vanskelig. Jeg er glad i deg.'
        ],
        situationCardId: 'ung-redd-aktivitet',
        depotExports: {
          todayAction: 'Hvis frykten melder seg i dag: kjenn føttene mot gulvet, pust langsommere, og skriv ned hva du faktisk vet kontra hva du frykter.',
          languageCards: [
            'Akkurat nå er det alarm. Jeg trenger å lande litt før jeg gjør noe.',
            'Jeg trenger ikke løse alt i kveld. Bare se neste lille steg.'
          ],
          situationCardId: 'ung-redd-aktivitet',
          sundayQuestion: 'Når frykten meldte seg denne uken – klarte jeg å lande nok til å se ett neste steg?',
          weeklyGoal: 'Lande nok til å skille det jeg vet fra det jeg frykter.',
          returnMessage: 'Velkommen tilbake. Når du er redd, er det modig bare å være her. Vi tar ett lite steg i dag.'
        }
      },
      {
        id: 'redd-2',
        courseId: 'minikurs-redd-miste-barnet',
        title: 'Modul 2: Skam, ansvar og det neste lille steget',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'redd-2',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Kanskje ligger du våken om natten, og tankene maler det samme om og om igjen. Alt du burde gjort annerledes. Alle tegnene du skulle sett. Og under det, den tyngste tanken av alle: dette er min skyld. Jeg har sviktet som forelder.\n\nDet er en av de vondeste følelsene et menneske kan bære. Og den fortjener å bli møtt rolig, ikke veid bort. Men det er én forskjell som kan gi deg litt pusterom akkurat nå: forskjellen mellom skam og ansvar.\n\nSkam sier: jeg er ødelagt, jeg er feil, det er noe galt med meg. Skam ser bakover, og den lammer. Ansvar spør noe helt annet: hva må jeg gjøre nå? Ansvar ser fremover, og det gjør bevegelse mulig. Det er ikke det samme å ta ansvar som å bære skyld for alt.\n\nDu trenger ikke forsvare hele livet ditt i dag. Du trenger ikke ha svaret på hvorfor det ble sånn. Du trenger bare å gjøre neste riktige ting. Og noen ganger er neste riktige ting bare dette: å la én annen voksen få vite hvordan du har det. En du stoler på. En som kan hjelpe deg å få oversikt, eller bare holde litt av vekten sammen med deg.\n\nSå velg én trygg person eller instans du kan kontakte. Ikke for å løse alt. Bare for at du ikke skal være den eneste som vet.',
        screenText: 'Skam sier «jeg er ødelagt» og lammer. Ansvar spør «hva må jeg gjøre nå?» og gjør bevegelse mulig. Du trenger ikke forsvare hele livet ditt i dag – bare gjøre neste riktige ting. Ofte er det å la én trygg person få vite hvordan du har det.',
        reflectionQuestions: [
          'Hva sier skammen til deg om natten – og hvordan er det å lese de ordene nå, i dagslys?',
          'Hvis du skiller skam fra ansvar: hva er det neste riktige du faktisk kan gjøre?',
          'Hvem er én voksen du stoler på nok til å la få vite hvordan du har det?',
          'Hva stopper deg fra å be om hjelp – og hva ville det kostet å ta ett lite skritt mot det?'
        ],
        microExercise: 'Velg én trygg person eller instans du kan kontakte for støtte eller oversikt – en venn, en fagperson, fastlegen. Du trenger ikke ha alt klart. Bare la én annen få vite hvordan du har det.',
        weeklyGoal: 'La én trygg person få vite hvordan jeg har det.',
        languageCards: [
          'Jeg er redd for barnet mitt, og jeg trenger noen å tenke høyt med.',
          'Jeg vet ikke helt hva jeg skal gjøre, og jeg vil gjerne ha hjelp til å få oversikt.',
          'Å be om hjelp er ikke å svikte. Det er å ta ansvar.',
          'Jeg trenger ikke forsvare hele livet mitt nå. Bare gjøre neste riktige ting.'
        ],
        depotExports: {
          todayAction: 'Send én melding eller ta én telefon til noen du stoler på – bare for å la dem vite hvordan du har det.',
          languageCards: [
            'Jeg er redd for barnet mitt, og jeg trenger noen å tenke høyt med.',
            'Å be om hjelp er ikke å svikte. Det er å ta ansvar.'
          ],
          sundayQuestion: 'Klarte jeg å skille skam fra ansvar denne uken – og tok jeg ett neste riktig steg?',
          weeklyGoal: 'La én trygg person få vite hvordan jeg har det.',
          returnMessage: 'Velkommen tilbake. Skammen lyver ofte om natten. Vi tar ett lite, riktig steg i dag.'
        }
      },
      {
        id: 'redd-3',
        courseId: 'minikurs-redd-miste-barnet',
        title: 'Modul 3: Ikke stå alene med det som er for stort',
        video: {
          status: 'script-ready',
          provider: 'bunny',
          videoKey: 'redd-3',
          bunnyLibraryId: null,
          bunnyVideoId: null,
          embedUrl: null,
          thumbnailUrl: null,
          durationSeconds: null,
          transcript: null
        },
        videoText: 'Når frykten for å miste barnet har vart en stund, sniker det seg ofte inn en følelse av å være helt alene med det. Som om alt hviler på deg, og som om du må holde hele vekten selv. Den følelsen er forståelig. Men den er ikke sann, og den er ikke trygg.\n\nFor noen situasjoner er rett og slett for store til at en redd forelder skal bære dem alene. Det er ikke et nederlag å erkjenne det. Det er det motsatte – det er å gjøre det som faktisk hjelper barnet ditt mest.\n\nDu trenger ikke ett menneske som kan løse alt. Du trenger en liten ring av voksne rundt deg og barnet. Tenk på det i tre deler: Hvem kan hjelpe deg med å regulere deg selv – en venn, en partner, noen som ser deg? Hvem kan hjelpe deg med fakta og oversikt – fastlegen, helsesykepleier, en fagperson? Og hvem kan hjelpe barnet ditt direkte – skolen, helsetjenesten, BUP, familievernet, eller andre rundt dere?\n\nOg så det viktigste, helt tydelig: hvis det er fare for vold, akutt krise, selvskading, alvorlig rus, psykose eller trusler – eller hvis barnet ditt rett og slett ikke er trygt – da skal dette ikke håndteres alene, og ikke vente. Ved akutt fare for liv og helse: ring 113. Ved alvorlig helsebekymring: fastlege eller legevakt 116 117. Alarmtelefonen for barn og unge er 116 111, og Mental Helse er 116 123, hele døgnet. Å ringe er ikke å miste barnet. Det er å hente flere hender til å holde fast.\n\nSå i dag, lag en liten liste. Tre navn eller tre numre. Ikke en plan for alt – bare ringen som gjør at du ikke står helt alene neste gang frykten kommer.',
        screenText: 'Noen situasjoner er for store til å bæres alene. Bygg en liten ring rundt deg og barnet: hvem hjelper deg å regulere deg, hvem hjelper med fakta, hvem hjelper barnet? Ved fare for liv og helse: 113. Å hente hjelp er å holde fast, ikke å gi slipp.',
        reflectionQuestions: [
          'Kjenner du på at du står alene med dette – og stemmer det egentlig?',
          'Hvem kan hjelpe deg å regulere deg selv når frykten tar over?',
          'Hvem kan hjelpe deg med fakta og oversikt – og hvem kan hjelpe barnet ditt direkte?',
          'Hva er det aller første navnet eller nummeret du ville satt på lista di?'
        ],
        microExercise: 'Lag en kort liste i dag: hvem kan hjelpe deg med regulering, hvem kan hjelpe med fakta og oversikt, og hvem kan hjelpe barnet? Tre navn eller tre numre er nok. Det er ringen som gjør at du ikke står alene.',
        weeklyGoal: 'Lage en liten liste over hvem som kan hjelpe – med regulering, med fakta, og med barnet.',
        languageCards: [
          'Jeg er bekymret for barnet mitt og trenger hjelp til å vite hva neste steg er.',
          'Kan vi avtale en samtale? Jeg vil gjerne ha noen å se på dette sammen med.',
          'Jeg kommer ikke til å gi deg opp. Vi henter hjelp sammen.',
          'Å hente hjelp er å holde fast, ikke å gi slipp.'
        ],
        depotExports: {
          todayAction: 'Lag en liten liste i dag: ett navn/nummer for regulering, ett for fakta og oversikt, ett som kan hjelpe barnet.',
          languageCards: [
            'Jeg er bekymret for barnet mitt og trenger hjelp til å vite hva neste steg er.',
            'Å hente hjelp er å holde fast, ikke å gi slipp.'
          ],
          sundayQuestion: 'Tok jeg ett skritt mot å ikke stå alene denne uken – og hvordan kjentes det?',
          weeklyGoal: 'En liten ring: hvem hjelper med regulering, fakta og barnet.',
          returnMessage: 'Velkommen tilbake. Du skal ikke bære det som er for stort alene. Vi finner ett navn til ringen i dag.'
        }
      }
    ]
  }
];
