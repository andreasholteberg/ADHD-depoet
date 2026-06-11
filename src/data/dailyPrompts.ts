import { DailyPrompt, LanguageCard } from '../types';
import { LANGUAGE_CARDS } from './languageCards';

export const DAILY_PROMPTS: Record<string, DailyPrompt[]> = {
  'Skjerm': [
    {
      id: 'p-skjerm-1',
      theme: 'Overgang fra spill og video',
      validationText: 'Det er nok å begynne lite. Du kan ikke kjefte frem en kapasitet som ikke er der ennå.',
      microAction: 'Gå inn to minutter før skjermen skal av. Sett deg helt rolig i øyehøyde og spør om ett ekte spørsmål om spillet – før du gir noen beskjed.',
      languageCard: {
        text: 'Jeg ser at du er dypt inne i dette, men nå skal vi spise. Setter du det på pause, eller skal jeg hjelpe deg over?',
        category: 'Skjerm'
      },
      reflectionQuestion: 'Merket du om den relasjonelle oppkoblingen gjorde barnet bittelitt mer mottakelig for bremsebeskjeden?'
    },
    {
      id: 'p-skjerm-2',
      theme: 'Å avstå fra å rope beskjeder',
      validationText: 'Luften i huset blir lettere når vi fjerner de skarpe ropene på tvers av rommene.',
      microAction: 'I dag øver du på å avstå helt fra å rope skjermvarsler fra kjøkkenet. Gå fysisk inn og rør dem rolig på ryggen i stedet.',
      languageCard: {
        text: 'Nå skal vi over til neste aktivitet. Jeg er her hos deg.',
        category: 'Skjerm'
      },
      reflectionQuestion: 'Ble du selv mindre stresset av å gå bort til dem i stedet for å rope ut i tomrommet?'
    }
  ],
  'Morgen': [
    {
      id: 'p-morgen-1',
      theme: 'Ti prosent langsommere',
      validationText: 'Det blir ikke kortere tid av at du også går i alarm. Morgenen setter farten for hele kroppen.',
      microAction: 'Gjør dine egne fysiske bevegelser ti prosent langsommere i dag under frokosten og tannpussen. Snakk et hakk lavere enn vanlig.',
      languageCard: {
        text: 'Dette ble en tung morgen. Jeg hjelper deg i gang. Én ting først.',
        category: 'Morgen'
      },
      reflectionQuestion: 'La du merke til hvordan ditt kroppslige tempo smittet over på stemningen i rommet?'
    },
    {
      id: 'p-morgen-2',
      theme: 'Fjerne ett valg',
      validationText: 'Et overmøblert mentalt skrivebord tåler ikke tette valgsituasjoner om morgenen.',
      microAction: 'Fjern én valgmestringsstasjon i morgen tidlig. Legg fram nøyaktig ett ferdig klesantrekk og ta bort overflødige frokostalternativer.',
      languageCard: {
        text: 'I dag har jeg gjort det enkelt. Her er klærne som ligger klare.',
        category: 'Morgen'
      },
      reflectionQuestion: 'Førte det to færre stoppesteder og mindre forhandling før ytterdøra?'
    }
  ],
  'Legging': [
    {
      id: 'p-legging-1',
      theme: 'Sengekanten som havn',
      validationText: 'Du trenger ikke å si det riktige. Du trenger bare å ikke være en trussel.',
      microAction: 'Sitt helt stille på sengekanten i tre minutter i kveldstiden. Pust tungt og rolig, og la hendene dine hvile åpne uten å faste mobilen eller gi irettesettelser.',
      languageCard: {
        text: 'Nå skal du slippe å ordne eller løse noe mer i dag. Jeg passer på hele rommet.',
        category: 'Legging'
      },
      reflectionQuestion: 'Føltes det vanskelig å "bare bli" uten å dytte situasjonen fremover?'
    },
    {
      id: 'p-legging-2',
      theme: 'Uroen etter dagen',
      validationText: 'Søvn er å slippe taket. For et urolig nervesystem er stillheten der alle tanker begynner å bråke.',
      microAction: 'La alle fellesområdene få et dempet, varmt lys før leggingen starter. Demp støydose og tempo en halvtime før badet.',
      languageCard: {
        text: 'Dagen i dag er ferdig. Vi lar alt ligge og tar kvelden sammen.',
        category: 'Legging'
      },
      reflectionQuestion: 'Ble det lettere for barnet å lande når hele husets puls ble skrudd ned i forveien?'
    }
  ],
  'Overganger': [
    {
      id: 'p-overgang-1',
      theme: 'Bygge den fysiske broen',
      validationText: 'Et uferdig styringssystem klarer ikke å bremse en impuls for å starte en ny automatisk.',
      microAction: 'Når dere skal rydde eller skifte aktivitet i dag, gjør den aller første lille bevegelsen fysisk sammen. Hold i lekekassen sammen.',
      languageCard: {
        text: 'Jeg hjelper deg i gang. Vi tar denne ene saken sammen først.',
        category: 'Overganger'
      },
      reflectionQuestion: 'Gikk oppstarten lettere når du var fysisk til stede og koblet på?'
    }
  ],
  'Min egen reaksjon': [
    {
      id: 'p-reaksjon-1',
      theme: 'Beredskaps-oppdagelsen',
      validationText: 'Du er ikke reaksjonen din. Beredskapskroppen er ikke hvem du er.',
      microAction: 'I dag skal du ikke prøve å endre noe temperament. Bare merk ditt aller tidligste kroppslige alarmtegn én gang. Hev tanken innvendig: "der er det."',
      languageCard: {
        text: 'Dette er beredskapen min som svarer. Jeg trenger et sekund.',
        category: 'Når jeg selv er i alarm'
      },
      reflectionQuestion: 'Hvordan kjentes det å skille seg bittelitt fra selve sinnet eller frustrasjonen?'
    }
  ],

  // ==========================================
  // UNGDOMS-PROMPTS (20 STK) - NYTT INNHOLD
  // ==========================================
  'Ungdom': [
    {
      id: 'p-ung-1',
      theme: 'Deling uten krav',
      validationText: 'Kontakt går begge veier. Hvis en tenåring rømmer, kan vi åpne en dør ved å dele litt av vår egen hverdags-sårbarhet og realitet først.',
      microAction: 'Del en liten ting fra din egen dag i dag – noe helt ubetydelig, pussig eller litt rart – helt uten å forvente et svar eller stille spørsmål etterpå.',
      languageCard: {
        text: 'Du vil ikke tro hva som skjedde i dag... Men du trenger ikke svare, ville bare fortelle.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'La du merke til om din upretensiøse deling gjorde den relasjonelle luften i gangen bittelitt lettere?'
    },
    {
      id: 'p-ung-2',
      theme: 'Reell medvirkning',
      validationText: 'Medvirkning bygger ekte ansvar og evne til samarbeid. Å bli diktert over dytter ungdommen rett inn i motstanden.',
      microAction: 'La tenåringen din ta ett fullt valg om for eksempel middag eller planer i ettermiddag som du vanligvis tar alene uten å rådføre deg.',
      languageCard: {
        text: 'Hva tenker du egentlig selv om dette? Jeg vil gjerne rydde plass til din mening her.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Klarte du å beholde milde bremser og gi reell plass til deres løsning?'
    },
    {
      id: 'p-ung-3',
      theme: 'Anerkjennelse uten men',
      validationText: 'Tunge skuldre på en tenåring bæres etter uendelig mange bittesmå korreksjoner. Ros med et påhengende «men» sletter rosen.',
      microAction: 'Legg merke til en eneste ting de gjør greit eller bra i dag, si det høyt og varmt, og stans der – ikke legg til et eneste ord om noe uferdig.',
      languageCard: {
        text: 'Takk for at du kom og satt her sammen med oss, det satt jeg skikkelig stor pris på.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Klarte du å motstå fristelsen til å trekke inn gårsdagens rydding eller karakterer?'
    },
    {
      id: 'p-ung-4',
      theme: 'Aktiv lytting og myk makt',
      validationText: 'Maktkamper med ungdommer skaper aldri reelle vinnere. Å gi dem rett på ett punkt bekrefter bare at du lytter genuint.',
      microAction: 'Hvis det blir en diskusjon ellers i dag: si høyt: «Du har faktisk et veldig godt poeng der, du kan ha helt rett», og senk skulderne.',
      languageCard: {
        text: 'Der har du faktisk helt rett. Det hadde jeg ikke sett helt på den måten før.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'La du merke til hvordan raseriet eller motstanden sank når du ikke forsvarte ditt eget tårn?'
    },
    {
      id: 'p-ung-5',
      theme: 'Skoledagens frihavn',
      validationText: 'Skolen er en lang dagsmarsj på en krevende sosial motorvei. Atferd og mutthet ved dørstokken er ofte regulering, ikke ulydighet.',
      microAction: 'La de første tretti minuttene etter at ungdommen kommer hjem i dag være helt fri for saklige spørsmål, leksemas, logistikk eller plikter. Bare lytt og ønsk velkommen.',
      languageCard: {
        text: 'Heisann! Så koselig å høre døra gå. Maten er klar hvis du vil spise litt, ta den tiden du trenger.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Føltes ytterdørsområdet roligere når du sparte logistikken og kjeftet til middagen var over?'
    },
    {
      id: 'p-ung-6',
      theme: 'Kontakt før korreksjon',
      validationText: 'Uventede og varme meldinger uten skjulte krav eller påminnelser fungerer som bittesmå klosser i relasjonsbroen.',
      microAction: 'Send en kort SMS eller Snap midt på dagen til ungdommen – kun med ønske om en god dag, helt uten spørsmål om matpakker, penger eller gjøremål.',
      languageCard: {
        text: 'Håper du har en kjempefin dag på skolen i dag! Gleder meg til å se deg etterpå.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Kjente du på frykten for å ikke få svar, eller klarte du å bare gi uten forbehold?'
    },
    {
      id: 'p-ung-7',
      theme: 'Velg dine kamper med omhu',
      validationText: 'Alt må ikke oppdages, og alt må overhodet ikke pareres. Mye av tenåringers spisse ord er stress og umoden regulering som går forbi.',
      microAction: 'Bestem deg på forhånd for å la én provoserende slengbemerkning eller et sukk gli fullstendig ukommentert forbi i dag. Ta en utpust selv.',
      languageCard: {
        text: '(Til deg selv): Ordene hans er smerte i en uferdig rustning, ikke en dom over min verdighet.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Merker du hvor mye energi nervesystemet ditt sparte på å la den ene piggen passere uten kamp?'
    },
    {
      id: 'p-ung-8',
      theme: 'Låne ungdommens kunnskap',
      validationText: 'Tenåringer bærer ofte en følelse av å ikke lykkes med foreldrenes voksenkrav. Å la dem være kilden til visdom snur rollen varmt.',
      microAction: 'Spør ungdommen din om et bittelite råd i dag – enten det gjelder teknologi, musikkvalg, spill, eller en kjekk gave. Vis ekte og nysgjerrig interesse.',
      languageCard: {
        text: 'Du som er så god på dette her, kan du vise meg litt hvordan jeg gjør det?',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Merker du hvordan tenåringens verdighet og skuldre løftet seg når de fikk bidra med visdom?'
    },
    {
      id: 'p-ung-9',
      theme: 'Tidligste alarmsignal',
      validationText: 'To rasende beredskapskropper i samme kjøkken gjør situasjonen uhåndterlig. Ditt eget alarmsignal er ditt sanntidshåndtak.',
      microAction: 'Hold øye med ditt eget system i dag. Gjenkjenn klamme hender eller stram kjeve når ungdommen slenger med dørene. Navngi det inni deg.',
      languageCard: {
        text: 'Nå går min motor for fort. Jeg trenger ett rolig sekund før jeg svarer.',
        category: 'Når jeg selv er i alarm'
      },
      reflectionQuestion: 'Klarte du å ta en dyp og langsom utpust før du åpnet døren igjen?'
    },
    {
      id: 'p-ung-10',
      theme: 'Kontakt uten agenda',
      validationText: 'Uforpliktende og forventningsløst samvær er den sikreste og mest dyrebare formen for tillitsoppbygging vi har til ungdommer.',
      microAction: 'Sitt rolig i samme rom som tenåringen i ti minutter i kveld. Ikke ta opp logistikk eller lekser – bare bla i en bok eller fikle med strikketøy.',
      languageCard: {
        text: 'Jeg sitter bare litt her borte hos deg, du trenger ikke ordne eller si noe.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Merker du hvor sterkt du ble trukket mot å snakke om ting som må fikses eller ordnes?'
    },
    {
      id: 'p-ung-11',
      theme: 'Slamrende dører og skam',
      validationText: 'Tenåringer bærer dyp skam etter raserianfall. Når den voksne tar ansvaret for sin egen tone, løftes skammen av skjøre skuldre.',
      microAction: 'Hvis pulsen løp løpsk i går eller i morges: Gå rolig inn i kveld med én ren reparasjonssetning – helt fri for bortforklarende "men".',
      languageCard: {
        text: 'Det ble altfor høyt raserier i gangen i morges. Jeg er skikkelig lei meg for at jeg ropte, det var min motor som løp løpsk og var mitt ansvar.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Klarte du å nekte deg selv å legge til et anklagende "men du dultet borti meg også"?'
    },
    {
      id: 'p-ung-12',
      theme: 'Nysgjerrighet, aldri avhør',
      validationText: 'Interesse og kjærlighet for det ungdommen genuint bryr seg om – spill, musikk, eller venner – danner relasjonens dypeste lim.',
      microAction: 'Still ett genuint og åpent spørsmål om noe de faktisk elsker å drive med i dag, uten å bringe inn din egen skepsis til tidsbruk.',
      languageCard: {
        text: 'Kan du ikke fortelle meg litt om hvordan det runden fungerer? Jeg vil gjerne forstå.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Føltes det som en seier å bare lytte nysgjerrig uten å moralisere over skjermtider?'
    },
    {
      id: 'p-ung-13',
      theme: 'Omsorg over kontroll',
      validationText: 'Dersom vi mase-korrigerer hundre bagateller i løpet av en dag, blir den generelle støyen så høy at ungdommen slutter å høre lyden av oss.',
      microAction: 'Se en bagatellmessig ting i kveld – f.eks. rotete sko eller skoletaske på feil sted – og la den ligge fullstendig i fred for å ta vare på hverdagsroen.',
      languageCard: {
        text: '(Til deg selv): Nå lar jeg rotet ligge. Relasjonen vår er uendelig mye viktigere enn en perfekt gang akkurat i kveld.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Klarte du å la saken ligge uten å rulle passiv-aggressivt med øynene eller rykke i kjeven?'
    },
    {
      id: 'p-ung-14',
      theme: 'Ydmyk hverdags-takk',
      validationText: 'Mennesker løfter hodet og opplever dyp verdighet av å bli genuint og ærlig takket for små hverdagsbidrag.',
      microAction: 'Si en ekte og varm takk for noe lite ungdommen gjorde i dag – selv om det bare var å ta tøfler på eller lukke vinduet.',
      languageCard: {
        text: 'Takk for at du husket på det, det hjalp meg skikkelig i en travel morgen.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Merker du hvordan et ukomplisert takk kan glatte ut friksjonen i rommet?'
    },
    {
      id: 'p-ung-15',
      theme: 'Mentalisering under dørsprekken',
      validationText: 'Det er ekstremt sårende å føle seg avvist av tenåringens dype mutthet. Men fravær er som regel biologisk selvregulering, aldri personlig sverting.',
      microAction: 'Neste gang tenåringen din avviser blikket ditt eller lukker soveromsdøren i dag, tenk bevisst: «Her foregår selvregulering, ikke avsky mot meg.»',
      languageCard: {
        text: '(Til deg selv): Hun hater ikke meg. Hun verner bare om det smale og utsatte vinduet sitt akkurat nå.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Føltes tilbaketrekningen litt mindre vond å bære når du forsto den som forebyggende nødbrems?'
    },
    {
      id: 'p-ung-16',
      theme: 'Tåle tenåringens mørke',
      validationText: 'Å bli møtt med vettskremt panikk eller kjappe og rasjonelle fiksingsplaner når man er nedfor, kjennes klaustrofobisk og ensomt.',
      microAction: 'Hvis tenåringen virker litt mutt eller nedstemt i ettermiddag: bare bli sittende i nærheten uten å prøve to lokke frem falske smil eller kjappe løsninger.',
      languageCard: {
        text: 'Det er helt lov å ha en dyster dag. Jeg blir her sammen med deg uansett.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Klarte du å roe din egen akutte frykt for deres psykiske helse bittelitt?'
    },
    {
      id: 'p-ung-17',
      theme: 'Rolig portvakt i gangen',
      validationText: 'Lister over gjøremål og beskjeder slynget mot en ungdom som nettopp har kommet inn døren, skyver hjernen rett i alarmberedskap.',
      microAction: 'Når tenåringen din kommer hjem fra skolen eller fritid i dag, gi kun et varmt hei, og spar absolutt alle lekseforhandlinger til etter middag.',
      languageCard: {
        text: 'Velkommen hjem! Så koselig å se deg igjen.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Merker du hvordan middagen ble mindre anspent når dørstokken ble holdt ren for logistikkmas?'
    },
    {
      id: 'p-ung-18',
      theme: 'Verne pusterommet ved krisemelding',
      validationText: 'Meldinger og anmerkninger fra lærere utløser hos foreldre en dyp redsel for fremtiden som fort omsettes til kjefting hjemme.',
      microAction: 'Dersom det tikker inn en kjedelig anmerkning eller leksemelding i dag, vent med å ta det opp til kvelden. La ikke hjemmet bli en kronisk rettssal.',
      languageCard: {
        text: 'Den saken der ordner vi helt rolig etterpå. Spis middagen din og ta det med ro.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Syntes tenåringen det var trygt og uventet at du bevarte roen fremfor å eksplodere på meldingen?'
    },
    {
      id: 'p-ung-19',
      theme: 'Menneskeverdi uten betingelser',
      validationText: 'Kjærligheten vår må fremstå mutters urokkelig og uavhengig av faglige karakterer, sosiale suksesser eller personlig ryddighet.',
      microAction: 'Si en kort setning i gangen eller under kveldsmaten i dag som bekrefter at de har verdi for deg akkurat som de er.',
      languageCard: {
        text: 'Jeg er så utrolig takknemlig for at akkurat du bor her sammen med meg.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Møtte de den uforbeholdne setningen med et lite blikk av lettelse under håret?'
    },
    {
      id: 'p-ung-20',
      theme: 'Lånte bremser før søvnen',
      validationText: 'Stillheten i mørket på kvelden gjør at all tenåringsuro og tankespinn setter i gang for fullt. Et fredelig nærvær her er lindrende.',
      microAction: 'Besøk soverommet til tenåringen din en kort tur før du legger deg i kveld. Smil, stryk dem gjerne rolig på ryggen om det tåles, og si god natt.',
      languageCard: {
        text: 'God natt. Sov godt, jeg er her ute hele natten uansett, og vi to er et solid lag.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Føltes den lille kveldsfreden beroligende på hjertet ditt også?'
    }
  ]
};

export const DEFAULT_PROMPT: DailyPrompt = {
  id: 'p-general-1',
  theme: 'Varm og lavterskel tilstedeværelse',
  validationText: 'Du har rett til å være sliten. Omsorg handler ikke om perfeksjon, men om relasjon.',
  microAction: 'Prøv å fjerne ett rop, ett mas eller én unødvendig korreksjon i kveld. La noe ligge ufikset.',
  languageCard: {
    text: 'Du trenger ikke løse alt akkurat nå. Bare kom og sitt litt her.',
    category: 'Generell'
  },
  reflectionQuestion: 'Hvordan kjentes det å la en liten uprioritert situasjon passere uten reaksjon?'
};

export function getPromptForUser(focus: string | null): DailyPrompt {
  const currentFocus = focus || 'Skjerm';
  const list = DAILY_PROMPTS[currentFocus];
  if (list && list.length > 0) {
    // Elegant deterministic date-based rotation
    const day = new Date().getDate();
    const index = day % list.length;
    return list[index];
  }
  return DEFAULT_PROMPT;
}

/**
 * Stabil, reell kort-ID for dagens språkkort.
 * Gjenbruker språkbankens ID hvis teksten finnes der, ellers en avledet daglig-ID.
 */
export function getDailyCardId(prompt: DailyPrompt): string {
  const match = LANGUAGE_CARDS.find((c) => c.text === prompt.languageCard.text);
  return match ? match.id : `daily-${prompt.id}`;
}

/**
 * Alle daglige språkkort som IKKE allerede finnes i språkbanken,
 * som fullverdige LanguageCard-objekter. Brukes så lagrede daglige kort
 * faktisk kan vises igjen i Språkbanken.
 */
export const DAILY_LANGUAGE_CARDS: LanguageCard[] = [
  ...Object.values(DAILY_PROMPTS).flat(),
  DEFAULT_PROMPT,
]
  .filter((p) => !LANGUAGE_CARDS.some((c) => c.text === p.languageCard.text))
  .map((p) => ({
    id: `daily-${p.id}`,
    category: p.languageCard.category,
    text: p.languageCard.text,
    sourceModule: 'I dag',
  }));
