import { DailyPrompt, LanguageCard } from '../types';
import { LANGUAGE_CARDS } from './languageCards';
import { pickDailyPrompt } from '../lib/promptRotation';

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
      reflectionQuestion: 'Hva la du merke til – i barnet eller i deg – da du satte deg ned først?'
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
      reflectionQuestion: 'Hvordan var det for deg å gå bort i stedet for å rope?'
    },
    {
      id: 'p-skjerm-3',
      theme: 'Varsel i kroppshøyde',
      validationText: '«Fem minutter igjen» ropt fra kjøkkenet finnes ikke i kroppen til et tidsblindt barn. Varselet teller først når det lander der barnet er.',
      microAction: 'Gi dagens skjermvarsel helt nært: gå inn, vent på et blikk eller legg en hånd lett på skulderen – og knytt det til spillet, «etter denne runden», i stedet for til klokka.',
      languageCard: {
        text: 'Etter denne runden er det mat. Jeg kommer og hjelper deg over.',
        category: 'Skjerm'
      },
      reflectionQuestion: 'Hvordan landet varselet denne gangen – og hvor var du da du ga det?'
    },
    {
      id: 'p-skjerm-4',
      theme: 'Interesse uten agenda',
      validationText: 'Interessen din virker sterkest når den ikke er et verktøy. Et ekte spørsmål om spillet midt på dagen bygger broen lenge før den trengs.',
      microAction: 'Still ett nysgjerrig spørsmål om spillet eller videoen i dag – på et tidspunkt der skjermen ikke skal av. Uten å nevne tid eller regler etterpå.',
      languageCard: {
        text: 'Hva er det kuleste du har fått til der inne? Jeg vil gjerne se.',
        category: 'Skjerm'
      },
      reflectionQuestion: 'Hva fikk du vite – om spillet, eller om barnet?'
    },
    {
      id: 'p-skjerm-5',
      theme: 'Avtalen lages i ro',
      validationText: 'Midt i konflikten er det ingen som lager gode avtaler. Det beste autovernet rundt skjerm bygges på dagtid, når ingen har noe å forsvare.',
      microAction: 'Finn fem rolige minutter i dag og lag én liten skjermavtale sammen: når, hva som skjer rett etterpå, og hvordan varselet skal gis. La barnet velge én av delene.',
      languageCard: {
        text: 'Skal vi lage en plan sammen for hvordan vi avslutter – sånn at det ikke blir kjeft av det?',
        category: 'Skjerm'
      },
      reflectionQuestion: 'Hvilken del av avtalen valgte barnet – og hva tenkte du om valget?'
    },
    {
      id: 'p-skjerm-6',
      theme: 'Når avtalen ryker',
      validationText: 'En avtale som ryker, er ikke bevis på at avtalen var feil – eller at barnet ga blaffen. Det betyr som regel bare at overgangen var større enn planen.',
      microAction: 'Hvis skjermavtalen ryker i dag: hold grensen rolig, men dropp rettssaken. Etterpå, når det er stille, kan dere se på avtalen sammen: «hva gjorde den vanskelig i dag?»',
      languageCard: {
        text: 'Avtalen røk i dag. Det betyr ikke at vi dropper den – det betyr at vi ser på den sammen.',
        category: 'Skjerm'
      },
      reflectionQuestion: 'Hva var annerledes i dag, den dagen avtalen ikke holdt?'
    },
    {
      id: 'p-skjerm-7',
      theme: 'Skjerm som landing',
      validationText: 'Etter en lang dag bruker mange barn skjermen til å lande – ikke til å rømme. Det er ikke et nederlag. Det er regulering, i den formen barnet ditt har tilgang til.',
      microAction: 'Neste gang barnet setter seg med skjermen rett etter skolen: vent en liten stund før du sier noe som helst om tid. La landingen være landing.',
      languageCard: {
        text: '(Til deg selv): Barnet rømmer ikke. Det lander.',
        category: 'Skjerm'
      },
      reflectionQuestion: 'Hvordan så barnet ut etter landingen – og hvordan var det for deg å vente?'
    },
    {
      id: 'p-skjerm-8',
      theme: 'Din egen skjerm som modell',
      validationText: 'Voksne lander også på skjerm – det er ikke hykleri, det er menneskelig. Men barna lærer mest av det vi gjør når vi tror de ikke ser.',
      microAction: 'Velg ett fast øyeblikk i dag der mobilen din ligger i et annet rom – middagen, leggingen eller hentingen. Si det gjerne høyt: «Nå legger jeg bort min også.»',
      languageCard: {
        text: 'Nå legger jeg bort min også. Så er det bare oss.',
        category: 'Skjerm'
      },
      reflectionQuestion: 'Hva merket du i deg selv da mobilen lå et annet sted?'
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
      reflectionQuestion: 'Hva skjedde med stemningen i rommet – om noe – da du senket ditt eget tempo?'
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
      reflectionQuestion: 'Hvordan ble morgenen med ett valg mindre – uansett hvordan den endte?'
    },
    {
      id: 'p-morgen-3',
      theme: 'Kvelden som morgenens venn',
      validationText: 'Noe av morgenens friksjon kan fjernes kvelden i forveien. Klær lagt frem, bag pakket, frokostbordet halvklart – det er ikke perfeksjonisme, det er én konflikt fjernet mens alle er rolige.',
      microAction: 'Legg frem ett komplett klesantrekk til barnet og sett skolesekken ved døra i kveld – før du setter deg ned. To minutter nå kan gi ti roligere minutter i morgen.',
      languageCard: {
        text: 'Klærne ligger klare. Det er ett sted vi slipper å diskutere i morgen tidlig.',
        category: 'Morgen'
      },
      reflectionQuestion: 'Hva la du merke til i morgenen etter – uansett om forberedelsen hjalp eller ikke?'
    },
    {
      id: 'p-morgen-4',
      theme: 'Én ting av gangen',
      validationText: '«Stå opp, spis, ta på deg og finn skoene» høres ut som en setning. For et barn med lite tilgjengelig kapasitet rett fra natten er det fire separate krav som kolliderer. Den første instruksjonen forsvinner i lyden av de tre neste.',
      microAction: 'Gi bare én beskjed om gangen denne morgenen. Vent til den første er i gang – ikke ferdig, bare startet – før du sier det neste. Det øker sjansen for at det første faktisk lander, og at det neste kan komme etterpå. Tål stillheten mellom.',
      languageCard: {
        text: 'Én ting nå: ta på deg buksene. Jeg er rett her.',
        category: 'Morgen'
      },
      reflectionQuestion: 'Hva skjedde med tempoet da du ventet mellom hvert ledd?'
    },
    {
      id: 'p-morgen-5',
      theme: 'Stillhet i stedet for mas',
      validationText: 'Når du har sagt det to ganger og ingenting skjer, sier kroppen «si det igjen, bare høyere». Det er ikke du som er feil – det er beredskapen som prøver seg. Men ordet nummer sju hjelper sjelden mer enn nummer to.',
      microAction: 'Neste gang du merker at du er i ferd med å gjenta en beskjed for tredje gang: stopp. Gå nærmere med rolig kropp. Stå ved siden av barnet, ikke over det – og la nærværet gjøre jobben uten ord.',
      languageCard: {
        text: '(Til deg selv): Å si det en gang til vil ikke hjelpe. Å gå nærmere kan.',
        category: 'Morgen'
      },
      reflectionQuestion: 'Hva la du merke til da du lot det være stille?'
    },
    {
      id: 'p-morgen-6',
      theme: 'Når bussen faktisk går',
      validationText: 'Noen morgener er klokka logikk og barnet ditt svarer ikke på det samme systemet. Alarmen din er forståelig – bussen venter ikke. Men det skarpeste du sier i de siste minuttene reiser med dem hele dagen.',
      microAction: 'Hvis morgenen blir kamp mot klokka i dag: velg å få dem ut av døra som ett mål, og la samtalen om hvordan det gikk bli et annet. «Vi snakker etterpå» er ikke å gi opp – det er å prioritere riktig.',
      languageCard: {
        text: 'Nå tar vi døra først. Vi snakker etterpå.',
        category: 'Morgen'
      },
      reflectionQuestion: 'Hva valgte du å la ligge til etterpå – og hva gjenstår fra den morgenen?'
    },
    {
      id: 'p-morgen-7',
      theme: 'Reparasjon i bildøra',
      validationText: 'Det som skjedde for ti minutter siden henger fortsatt mellom dere. Bildøra er en uventet god plass å legge det fra seg – ikke med en lang samtale, men med én setning som sier at dere fortsatt er et lag.',
      microAction: 'Si én setning i bilen eller i døra til skolen – ikke en redegjørelse, bare en landing. «Det ble en tøff start. Den tonen var min.» Og la den stå alene uten forklaring.',
      languageCard: {
        text: 'Det ble en tøff start i dag. Den tonen var min. Vi starter herfra.',
        category: 'Morgen'
      },
      reflectionQuestion: 'Hva sa du – eller fikk ikke sagt – i den overgangen?'
    },
    {
      id: 'p-morgen-8',
      theme: 'Senkede morgenkrav på tomme dager',
      validationText: 'På dager uten buss og ringetone har dere lov til å la morgenen komme i sitt eget tempo. Pysjamasen til ti er ikke en planleggingsfeil – det er et nervesystem som får lande uten press.',
      microAction: 'Velg én «morgen-ting» som kan vente til formiddagen i dag – dusjen, klærne, frokostryddingen, eller beskjeden du egentlig hadde tenkt å gi. Si det gjerne høyt: «Det trenger vi ikke ta ennå.»',
      languageCard: {
        text: 'I dag er det ingen som haster oss. Vi tar det i vårt tempo.',
        category: 'Morgen'
      },
      reflectionQuestion: 'Hva fikk du og barnet til i det saktere morgentempoet?'
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
      reflectionQuestion: 'Hva la du merke til ved leggingen i kveld – i barnet, eller i deg selv?'
    },
    {
      id: 'p-legging-3',
      theme: 'Overgangsvarsel før pysj',
      validationText: 'Legging er ikke én overgang – det er en rekke av dem. Bad, pysj, tannpuss, seng. For et nervesystem som ikke har en god intern klokke, er hvert ledd en ny overraskelse hvis ingen sier fra i tide.',
      microAction: 'Gi ett konkret varsel ti minutter før pysjstart i kveld – knyttet til noe konkret i stedet for klokka. «Etter denne episoden begynner vi kveldsrunden» er lettere å ta imot enn «klokka åtte er det leggetid».',
      languageCard: {
        text: 'Om litt begynner vi kveldsrunden. Du har god tid.',
        category: 'Legging'
      },
      reflectionQuestion: 'Hvordan tok barnet imot varselet – og hva la du merke til i selve overgangen?'
    },
    {
      id: 'p-legging-4',
      theme: 'Skjermslutt før soverommet',
      validationText: 'Det er ikke bare skjermlyset som holder hjernen i gang. Det er tilstanden etterpå – det aktiverte nervesystemet som ikke vet at det er på vei til å sove. Soverommet tåler dårlig å arve den tilstanden direkte.',
      microAction: 'Legg inn én rolig aktivitet mellom skjermavslutning og soverommet i kveld – noen minutter med noe som ikke krever noe: legge kort, tegne, eller bare ligge på gulvet. Buffersonen trenger ikke å vare lenge.',
      languageCard: {
        text: 'Nå er skjermen ferdig for i kveld. Vi lander litt før senga.',
        category: 'Legging'
      },
      reflectionQuestion: 'Hva fungerte som buffer mellom skjermen og senga – og hva skjedde i soverommet etterpå?'
    },
    {
      id: 'p-legging-5',
      theme: 'Kroppstung nærhet uten ord',
      validationText: 'Et urolig nervesystem hører ikke alltid på ord om kvelden. Men kroppen lytter til tyngde, varme og nærhet – for dem som vil ha det. Noen ganger er en hånd tungt på ryggen mer regulerende enn alt vi prøver å si.',
      microAction: 'Hvis barnet liker kroppslig nærhet: tilby en tung, rolig hånd på ryggen, eller spør om du skal legge deg litt nærmere. Bli litt lenger enn du først tenker, så lenge barnet vil. Hvis barnet sier nei, er avstand også omsorg.',
      languageCard: {
        text: '(Ingen ord nødvendig – bare bli.)',
        category: 'Legging'
      },
      reflectionQuestion: 'Hva kjente du i barnet – og i deg selv – da du ble stille og nær?'
    },
    {
      id: 'p-legging-6',
      theme: 'Tankekvern på puta',
      validationText: 'For mange barn begynner tankene å bråke akkurat når kroppen legger seg. «Jeg kan ikke sove, jeg tenker på alt» er ikke en unnskyldning – det er et nervesystem som ikke får sluppet taket ennå. Det er noe å hjelpe med, ikke noe å diskutere.',
      microAction: 'Hvis tankene bråker hos barnet i kveld: gi dem én liten beholder for dem. «Fortell meg én ting du tenker på, så holder jeg på den til i morgen.» Én ting, ikke alt. La resten vente.',
      languageCard: {
        text: 'Jeg tar vare på den tanken til i morgen. Nå trenger du ikke huske den.',
        category: 'Legging'
      },
      reflectionQuestion: 'Hva valgte barnet å gi fra seg – og hva holdt det på?'
    },
    {
      id: 'p-legging-7',
      theme: 'Når leggingen ryker helt',
      validationText: 'Noen kvelder ryker leggingen helt. Ikke fordi noen sviktet, men fordi et overtrett nervesystem noen ganger ikke har overganger igjen. Da er det feil kamp å kreve søvn.',
      microAction: 'Hvis leggingen kollapser i kveld: hold ett mål – barnet skal ligge i et dempet rom. Ikke krev søvn, ikke krev ro. Bare ligge. Det er nok for i kveld.',
      languageCard: {
        text: 'Du trenger ikke sove. Du trenger bare å ligge.',
        category: 'Legging'
      },
      reflectionQuestion: 'Hva fikk du til å holde fast i – uansett hva som skjedde den kvelden?'
    },
    {
      id: 'p-legging-8',
      theme: 'Forelderens egen kveldstank',
      validationText: 'Når barnet endelig sover, er det ikke alltid stille. Kveldens regnskap begynner gjerne akkurat da – hva som gikk galt, hva du burde gjort, hva som venter i morgen. Det er beredskapskroppen din som ikke vet at vakten er over.',
      microAction: 'I kveld, når barnet er lagt: velg én ting du ikke skal tenke på før i morgen. Si det gjerne rett ut i rommet: «Det får vente til i morgen.» Ikke fordi det løser seg, men fordi natten ikke er rett tid for regnskap.',
      languageCard: {
        text: '(Til deg selv): Dagen er ferdig. Resten får vente.',
        category: 'Legging'
      },
      reflectionQuestion: 'Hva valgte du å la vente – og hvordan var det?'
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
      reflectionQuestion: 'Hvordan var det å starte sammen – for barnet, og for deg?'
    },
    {
      id: 'p-overgang-2',
      theme: 'Forvarsel i god tid',
      validationText: 'Et overgangsvarsel som ropes mens barnet er dypt inne i noe, finnes ikke for barnet. Det er sagt, men det er ikke hørt. Varselet teller fra det sekundet barnet faktisk registrerte det.',
      microAction: 'Gi to varsler i stedet for ett i den neste store overgangen: ett ti minutter før, ett fem minutter før. Gå nær nok til at du ser at det første landet – ikke krev øyekontakt, se heller etter et lite tegn: et nikk, et «mhm», eller bare at kroppen stopper et sekund.',
      languageCard: {
        text: 'Ti minutter til. Jeg gir deg et til om fem.',
        category: 'Overganger'
      },
      reflectionQuestion: 'Hva la du merke til da du ga to varsler i stedet for ett?'
    },
    {
      id: 'p-overgang-3',
      theme: 'Bli ferdig-ritualer',
      validationText: 'Det som er vanskelig er ikke alltid det neste stedet de skal. Det er å forlate dette stedet. Et lite avslutningsritual – en handling som sier «ferdig» – gir hjernen det den trenger for å slippe.',
      microAction: 'Finn én liten handling som kan markere at aktiviteten er avsluttet: si «vi avslutter nå», legg ned en brikke, ta et siste blikk, eller tast «lagre». Gjør den samme lille handlingen konsekvent – det trenger ikke ta mer enn fem sekunder.',
      languageCard: {
        text: 'Vi tar én siste runde, og så avslutter vi ordentlig.',
        category: 'Overganger'
      },
      reflectionQuestion: 'Hva skjedde i overgangen da dere hadde noe å avslutte med?'
    },
    {
      id: 'p-overgang-4',
      theme: 'Fysisk følge i stedet for rope',
      validationText: 'En beskjed ropt fra kjøkkenet eksisterer ikke i barnets kropp inne på rommet. Det er ikke trass – det er avstand. Å møte barnet der det er og gå de første skrittene sammen er noe annet enn å si hva de skal gjøre.',
      microAction: 'I den neste overgangen i dag: gå til barnet, vent et sekund, og gå de første skrittene sammen – den aller første lille bevegelsen bort fra det de holdt på med.',
      languageCard: {
        text: 'Jeg kommer og henter deg. Vi går over sammen.',
        category: 'Overganger'
      },
      reflectionQuestion: 'Hva var annerledes i overgangen da du fulgte de første skrittene?'
    },
    {
      id: 'p-overgang-5',
      theme: 'Overganger ut av huset',
      validationText: 'Å komme seg ut av huset er ikke én ting – det er sko, jakke, bag og klokke på én gang. For en kropp som bare kan holde på én ting av gangen, er det nok til at hele utgangen stopper opp.',
      microAction: 'Lag én fast rekkefølge for utgangssekvensen og prøv den konsekvent i noen dager: sko først, så jakke, så bag, så dør. Ikke den raskeste rekkefølgen – den mest forutsigbare.',
      languageCard: {
        text: 'Sko først. Så jakke. Så er vi klare.',
        category: 'Overganger'
      },
      reflectionQuestion: 'Hva skjedde da utgangen hadde en fast rekkefølge?'
    },
    {
      id: 'p-overgang-6',
      theme: 'Inn fra lek',
      validationText: 'Inn fra lek er en av de tyngste overgangene i dagen. Ute er det fri bevegelse, høyt tempo og ingen instruksjoner. Inne er det ro, struktur og forventninger. Kroppen trenger litt tid mellom de to stedene.',
      microAction: 'Neste gang barnet kommer inn fra lek: gi det to til tre minutter uten krav. Ingen spørsmål om hva de vil gjøre, ingen oppgaver, ingen overgang videre ennå. La innkomsten være innkomst.',
      languageCard: {
        text: 'Kom inn. Bare vær litt her først – ingenting nå.',
        category: 'Overganger'
      },
      reflectionQuestion: 'Hva la du merke til hos barnet etter de første minuttene inne, sammenlignet med å gå rett til neste ting?'
    },
    {
      id: 'p-overgang-7',
      theme: 'Aktivitetsbytte med timer',
      validationText: 'En nedtellingstimer tar en del av konfrontasjonen ut av overgangen. Det er ikke du som sier at tiden er ute – det er timeren. Det er en liten men reell forskjell for et barn som trenger å se hva som skjer, før det skjer.',
      microAction: 'Bruk en synlig nedtellingstimer til én overgang i dag – på telefon, kjøkkenur eller Time Timer. La barnet starte timeren selv hvis mulig, og avtal på forhånd hva som skjer når den ringer: ett konkret neste steg, ikke en liste. Hvis timer pleier å stresse barnet, bruk et roligere visuelt tegn i stedet – en brikke som flyttes, et bilde som snues.',
      languageCard: {
        text: 'Du starter timeren, så vet vi begge når det er tid.',
        category: 'Overganger'
      },
      reflectionQuestion: 'Hva skjedde med overgangen da det var timeren som sa fra – ikke du?'
    },
    {
      id: 'p-overgang-8',
      theme: 'Når overgangen kollapser',
      validationText: 'Noen overganger kollapser uansett hva du gjør. Det er ikke bevis på at du har gjort noe feil, og det er ikke bevis på at barnet er umulig. Det er et nervesystem som nådde taket – og det kan ikke forhandles bort der og da.',
      microAction: 'Hvis overgangen kollapser i dag: velg ett av to. Gi litt mer tid hvis rammene tillater det. Eller hold én enkel grense uten debatt og reparér kontakten etterpå. Begge er gyldige valg.',
      languageCard: {
        text: 'Vi er ikke ferdige, men vi tar en pause fra dette nå.',
        category: 'Overganger'
      },
      reflectionQuestion: 'Hva valgte du å gjøre da overgangen gikk i lås – og hva la du merke til etterpå?'
    }
  ],
  'Skole': [
    {
      id: 'p-skole-1',
      theme: 'Melding fra læreren uten hjemme-rettssak',
      validationText: 'Meldingen fra læreren sitter i deg resten av dagen. Når barnet kommer inn døra, er det lett å ta det opp med én gang – men barnet som kommer hjem, er allerede tømt av dagen. Samtalen kan vente til barnet har landet.',
      microAction: 'Hvis det kom en melding fra skolen i dag – og det ikke handler om noe som må tas med én gang – vent til etter middag med samtalen. La hjemkomsten være hjemkomst. Én setning holder: «Jeg fikk beskjed fra læreren. Vi snakker om det litt senere.»',
      languageCard: {
        text: 'Jeg fikk beskjed fra læreren. Vi snakker om det etterpå – ikke nå.',
        category: 'Skole'
      },
      reflectionQuestion: 'Hva skjedde med atmosfæren hjemme da du lot meldingen ligge til etter middag?'
    },
    {
      id: 'p-skole-2',
      theme: 'Leksestart i mikrodoser',
      validationText: 'Etter en lang dag på skolen er lekser det vanskeligste barnet kan møte. Ikke fordi det er lat, men fordi kapasiteten er brukt opp. En tømt hjerne lærer lite – den overlever bare.',
      microAction: 'Avtal én oppgave i dag, ikke leksehaugen. Fem minutter med ett regnestykke eller fem linjer å lese. Legg boken bort etterpå – uten diskusjon om resten.',
      languageCard: {
        text: 'Én oppgave i dag. Så er vi ferdige for i kveld.',
        category: 'Skole'
      },
      reflectionQuestion: 'Hva la du merke til hos barnet etter den ene oppgaven – sammenlignet med å ta alt på én gang?'
    },
    {
      id: 'p-skole-3',
      theme: 'Skolevegringsmorgen',
      validationText: 'Magen som gjør vondt på skoledagen er ikke alltid unnskyldning. For mange barn er det angst i kroppen, og den er like virkelig som en forkjølelse. Du vet ikke alltid om det er en begynnelse eller en engangsting – og det er greit å ikke vite.',
      microAction: 'Hvis barnet ikke vil på skolen i dag: hold fast i ett steg, ikke alt på én gang. Klærne på, og se hva som skjer. Eller: si til skolen at dere er på vei, bare litt sent. Én beslutning om gangen.',
      languageCard: {
        text: 'Magen sier nei i dag. Vi tar ett steg og sjekker underveis.',
        category: 'Skole'
      },
      reflectionQuestion: 'Hva valgte du å holde fast i – og hva fikk ligge?'
    },
    {
      id: 'p-skole-4',
      theme: 'Møte med skolen som lag',
      validationText: 'Møter med skolen om barnets utfordringer kan kjennes som en rettssak der du er vitne og anklaget på én gang. Men læreren ser barnet fra ett sted, og du ser det fra et annet. Ingen av dere ser hele bildet alene.',
      microAction: 'Før neste skolesamtale: skriv ned én ting barnet mestrer hjemme som skolen kanskje ikke ser, og én ting du trenger hjelp til fra dem. Ta begge med som ditt innspill – ikke som et forsvar, men som et bidrag.',
      languageCard: {
        text: 'Jeg er her for å finne ut hva vi kan gjøre sammen for barnet.',
        category: 'Skole'
      },
      reflectionQuestion: 'Hva tok du med deg fra møtet – og hva overrasket deg?'
    },
    {
      id: 'p-skole-5',
      theme: 'Skoleslitasje etter skoletid',
      validationText: 'Mange barn holder det fullstendig samlet på skolen og slipper alt det øyeblikket de er hjemme. Det er ikke utakknemlighet – det er tillit. Ofte er hjemmet stedet barnet endelig slipper taket, fordi det er trygt nok der.',
      microAction: 'Neste gang ettermiddagen eksploderer uten tilsynelatende grunn: si én setning innvendig: «Barnet holdt det sammen hele dagen. Det er trygt nok her til å slippe.» Ikke løs det – bare tolk det annerledes i det øyeblikket.',
      languageCard: {
        text: '(Til deg selv): De slapp seg ned her fordi dette er det trygge stedet.',
        category: 'Skole'
      },
      reflectionQuestion: 'Hva ble annerledes da du tolket ettermiddagseksplosjon som tillit i stedet for trass?'
    },
    {
      id: 'p-skole-6',
      theme: 'Ros for oppmøte',
      validationText: 'For et barn som strever med å regulere seg, er det å dukke opp på skolen noen dager mer enn nok. Før karakteren. Før alt som må rettes. Bare det å ha kommet seg dit og blitt der.',
      microAction: 'Legg merke til én konkret ting ved oppmøtet i dag – at barnet gikk inn, at det ble der en hel dag, at det prøvde på nytt etter en hard dag i går. Nevn den ene tingen høyt. Ikke en liste – bare den ene.',
      languageCard: {
        text: 'Du dukket opp i dag. Det teller.',
        category: 'Skole'
      },
      reflectionQuestion: 'Hva la du merke til da du nevnte oppmøtet i stedet for det som gikk galt?'
    },
    {
      id: 'p-skole-7',
      theme: 'Helg uten skoleprat',
      validationText: 'Å bruke hele helgen til å snakke om hva som skjedde på fredag eller hva som venter på mandag gir hverken deg eller barnet den pausen dere trenger.',
      microAction: 'Velg én skolefri lomme i helgen – noen timer, eller gjerne en hel dag, der skolen ikke er tema: ingen lekser, ingen samtaler om forrige uke, ingen forberedelser. Si det gjerne høyt: «Nå er vi ikke i skolemodus.»',
      languageCard: {
        text: 'Nå er vi ikke i skolemodus. Det er helg.',
        category: 'Skole'
      },
      reflectionQuestion: 'Hva skjedde med stemningen da skolen fikk et reelt opphold i helgen?'
    }
  ],
  'Søsken': [
    {
      id: 'p-søsken-1',
      theme: 'Megling uten dommerrolle',
      validationText: '«Hvem begynte?» er det vanskeligste spørsmålet i søskenkonflikt – og det minst nyttige. Du fikk ikke med deg begynnelsen. Det de begge kan se er at du avbryter eskaleringen der den er, ikke at du dømmer der du ikke var.',
      microAction: 'Neste gang det blusser opp: avbryt uten å spørre hvem som begynte. Separer dem med én rolig setning og la rommet mellom dem gjøre litt av jobben. Resten kan dere sortere sammen når alle er roligere.',
      languageCard: {
        text: 'Stopp. Vi trenger ikke finne ut hvem som begynte nå.',
        category: 'Søsken'
      },
      reflectionQuestion: 'Hva skjedde da du avbrøt uten å spille dommer?'
    },
    {
      id: 'p-søsken-2',
      theme: 'Den som «alltid får»',
      validationText: 'Søskenet til et barn med store reguleringsbehov ser at reglene bøyes, at grenser flyttes og at du av og til er et annet sted selv om du er i rommet. Den opplevelsen er ekte. Den fortjener å bli sett – ikke forklart bort.',
      microAction: 'Si én anerkjennende setning til søskenet i dag – ikke som forklaring, bare som bekreftelse. «Jeg ser at dette er annerledes for deg» er nok til å begynne.',
      languageCard: {
        text: 'Jeg ser at det kan kjennes urettferdig. Du betyr ikke mindre.',
        category: 'Søsken'
      },
      reflectionQuestion: 'Hva la du merke til hos søskenet da du anerkjente opplevelsen uten å forklare den bort?'
    },
    {
      id: 'p-søsken-3',
      theme: 'Verne søsken under storm',
      validationText: 'Når ett barn er i full eskalering, kjenner søsknene i rommet det også i kroppen. De ser, hører og registrerer det. Å flytte dem rolig bort er ikke å ignorere dem – det er å verne dem.',
      microAction: 'Neste gang ett barn er i full eskalering: flytt søskenet ut av rommet rolig, uten drama. Et enkelt «kom med meg» er nok. Resten tar du etterpå.',
      languageCard: {
        text: 'Bli med meg. Du trenger ikke være midt i dette.',
        category: 'Søsken'
      },
      reflectionQuestion: 'Hva la du merke til hos søskenet etterpå?'
    },
    {
      id: 'p-søsken-4',
      theme: 'En-til-en-tid i minidoser',
      validationText: 'I en hverdag der mye energi går til ett barns regulering, kan søsken sitte igjen med inntrykket av å være barnet som klarer seg selv. Det er ikke sikkert de klager – men de merker det. Ti minutter alene med deg uten agenda kan bety mer enn du regner med.',
      microAction: 'Sett av ti minutter med søskenet i dag – uten den andre til stede, uten telefon, uten oppgave. La det barnet velge hva dere gjør. Det trenger ikke hete noe spesielt.',
      languageCard: {
        text: 'Bare oss to nå. Hva vil du?',
        category: 'Søsken'
      },
      reflectionQuestion: 'Hva skjedde i de ti minuttene – og hva merket du etterpå?'
    },
    {
      id: 'p-søsken-5',
      theme: 'Rettferdig er ikke likt',
      validationText: '«Det er ikke rettferdig» er sjelden et krav om å få det samme. Det er et rop om å bli sett. Rettferdig betyr ikke likt – det betyr at hvert barn får det akkurat de trenger.',
      microAction: 'Neste gang «det er ikke rettferdig» dukker opp: si én setning som anerkjenner opplevelsen uten å rettferdiggjøre fordelingen. «Jeg skjønner at det kjennes slik» er et godt sted å begynne.',
      languageCard: {
        text: 'Jeg skjønner at det kjennes urettferdig. Jeg prøver å gi dere det dere trenger – ikke alltid det samme.',
        category: 'Søsken'
      },
      reflectionQuestion: 'Hva svarte barnet – og hva tror du de egentlig spurte om?'
    },
    {
      id: 'p-søsken-6',
      theme: 'Reparasjon mellom søsken',
      validationText: '«Si unnskyld» som første grep etter en søskenkonflikt lærer barnet å si de riktige ordene i feil øyeblikk. Ekte reparasjon begynner ikke med en setning – den begynner med at begge er rolige nok til å se hverandre igjen.',
      microAction: 'Etter neste søskenkonflikt: vent til begge er rolige, og hjelp dem å si én ting om hva som skjedde for dem selv – ikke hva den andre gjorde galt. «Jeg ble sint fordi…» i stedet for «du er alltid sånn».',
      languageCard: {
        text: 'Når dere er rolige igjen, kan dere si én ting hver om hva som skjedde.',
        category: 'Søsken'
      },
      reflectionQuestion: 'Hva skjedde mellom søsknene da de fikk litt tid og hjelp til reparasjonen?'
    },
    {
      id: 'p-søsken-7',
      theme: 'Når det er tyngre med det ene barnet',
      validationText: 'Mange foreldre kjenner en stille skam over at de noen dager liker å være med det ene barnet mer enn det andre. Det er ikke mangel på kjærlighet. Det er utmattelse som har fått en retning – og det er en forskjell som er verdt å kjenne på.',
      microAction: 'Gi deg selv lov til å erkjenne det du kjenner, uten å dømme deg for det. Ikke høyt – bare innvendig. «Det er tyngre med dette barnet for øyeblikket» er ikke en dom. Det er informasjon du kan bruke.',
      languageCard: {
        text: '(Til deg selv): Kjærligheten er lik. Kapasiteten er ikke alltid det.',
        category: 'Søsken'
      },
      reflectionQuestion: 'Hva skjedde da du lot tanken være der uten å jage den bort?'
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
    },
    {
      id: 'p-reaksjon-2',
      theme: 'Pusten som brems',
      validationText: 'Når alarmen går, blir pusten kort uten at du har valgt det. Det er ikke svakhet – det er beredskapskroppen som gjør jobben sin.',
      microAction: 'Én gang i dag, når du kjenner at det strammer seg: ta én lang utpust før du sier noe. Bare den ene. Innpusten ordner seg selv.',
      languageCard: {
        text: 'Én utpust først. Så snakker jeg.',
        category: 'Når jeg selv er i alarm'
      },
      reflectionQuestion: 'Hva la du merke til – i pusten, eller i det du sa etterpå?'
    },
    {
      id: 'p-reaksjon-3',
      theme: '«Det begynte i meg» – uten dom',
      validationText: 'Noen ganger begynner det ikke med barnet. Det er ikke en anklage – det er det ene stedet du faktisk har et håndtak.',
      microAction: 'Hvis noe glipper i dag, prøv å si innvendig etterpå: «Det begynte i meg denne gangen.» Ikke som dom – som informasjon.',
      languageCard: {
        text: 'Det var motoren min som gikk for fort nå. Ikke din feil.',
        category: 'Når jeg selv er i alarm'
      },
      reflectionQuestion: 'Hvordan var det å si «det begynte i meg» – uten å legge til noe mer?'
    },
    {
      id: 'p-reaksjon-4',
      theme: 'Reparasjon med deg selv',
      validationText: 'Etter et glipp snakker mange av oss til oss selv i en tone vi aldri ville brukt mot barnet. Skam sier «jeg er feil». Ansvar sier «dette må jeg se nærmere på».',
      microAction: 'Hvis det glapp i dag eller i går: si én setning til deg selv som du kunne sagt til barnet. For eksempel: «Det ble for mye. Det betyr ikke at jeg er for lite.»',
      languageCard: {
        text: 'Jeg glapp. Det betyr ikke at jeg er glippen.',
        category: 'Reparasjon til meg selv'
      },
      reflectionQuestion: 'Hvilken tone bruker du mot deg selv etterpå – og hvor kjenner du den igjen fra?'
    },
    {
      id: 'p-reaksjon-5',
      theme: 'Tomme dager: senk kravet, ikke deg selv',
      validationText: 'Når tanken er tom, blir toleransevinduet trangt. Det er ikke en karakterbrist – det er biologi. Ingen kan låne bort en ro de ikke har.',
      microAction: 'Velg én ting i kveld som ikke skal gjøres: matpakkene, ryddingen, leksemaset. Si det gjerne høyt: «Den lar vi ligge i dag.»',
      languageCard: {
        text: 'I kveld senker vi kravene, ikke hverandre.',
        category: 'Generell'
      },
      reflectionQuestion: 'Hva ble annerledes – om noe – da én ting fikk ligge?'
    },
    {
      id: 'p-reaksjon-6',
      theme: 'Beredskap etter en lang dag',
      validationText: 'Mange av oss møter ettermiddagen med dagen fortsatt i kroppen – etter jobb, etter en natt med for lite søvn, eller etter timer med omsorg ingen så. Alarmen din spør ikke hvor belastningen kom fra. Den er bare på.',
      microAction: 'Før neste overgang til barnet i dag – enten du kommer inn døra, eller bare ut av en lang time: stopp i tre pust. Kjenn føttene mot gulvet. Du skal ikke inn for å rydde opp – du skal bare være sammen.',
      languageCard: {
        text: 'Jeg vil bare lande i to minutter, så er jeg helt her.',
        category: 'Når jeg selv er i alarm'
      },
      reflectionQuestion: 'Hvordan var den første overgangen til barnet i dag?'
    },
    {
      id: 'p-reaksjon-7',
      theme: 'Barnets storm og din egen',
      validationText: 'To alarmer i samme rom kjennes som én stor. Men barnets storm og din egen er to forskjellige værsystemer – og du kan bare styre det ene.',
      microAction: 'Neste gang det stormer: spør deg selv stille «hvor mye av dette er mitt?». Du trenger ikke svaret – bare spørsmålet senker tempoet et hakk.',
      languageCard: {
        text: 'Dette er barnets storm. Jeg trenger ikke gjøre den til min.',
        category: 'Når jeg selv er i alarm'
      },
      reflectionQuestion: 'Hva la du merke til da du stilte deg selv spørsmålet?'
    },
    {
      id: 'p-reaksjon-8',
      theme: 'Kvelden uten rettssak',
      validationText: 'Kvelden er beredskapskroppens favorittid for regnskap. Men du kan ikke dømme deg til en bedre morgendag. Du kan bare se én ting nærmere – uten dom.',
      microAction: 'Når dagens repriser starter i kveld: velg ett øyeblikk og spør «hva trengte jeg der?» i stedet for «hva er galt med meg?». Ett øyeblikk er nok.',
      languageCard: {
        text: 'Dagen er over. Jeg ser på den i morgen, i dagslys.',
        category: 'Reparasjon til meg selv'
      },
      reflectionQuestion: 'Hvilket øyeblikk valgte du – og hva trengte du der?'
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
      reflectionQuestion: 'Hvordan var det å dele noe uten å vente på svar?'
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
      reflectionQuestion: 'Hva gjorde det med samtalen å gi valget helt fra deg?'
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
      reflectionQuestion: 'Hvor sterk var fristelsen til å legge til et «men» – og hva gjorde du med den?'
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
      reflectionQuestion: 'Hva skjedde i samtalen da du ga rom i stedet for å forsvare?'
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
      reflectionQuestion: 'Hvordan var den første halvtimen – for ungdommen, og for deg?'
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
      reflectionQuestion: 'Hvordan var det å sende noe uten å vente på svar?'
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
      reflectionQuestion: 'Hva merket du i kroppen din da du lot den passere?'
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
      reflectionQuestion: 'Hva så du i ungdommen da du ba om hjelp – og hva kjente du selv?'
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
      reflectionQuestion: 'Når på dagen merket du ditt eget alarmsignal tydeligst?'
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
      reflectionQuestion: 'Hvordan kjentes det å la unnskyldningen stå helt alene, uten et «men»?'
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
      reflectionQuestion: 'Hva lærte du om det de driver med – eller om dem?'
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
      reflectionQuestion: 'Hva kostet det deg å la den ligge – og hva fikk du igjen?'
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
      reflectionQuestion: 'Hvordan ble takken tatt imot – og hvordan var det å gi den?'
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
      reflectionQuestion: 'Hva gjorde den tanken med måten du sto utenfor døren på?'
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
      reflectionQuestion: 'Hva kjente du på selv mens du ble sittende?'
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
      reflectionQuestion: 'Hvordan ble møtet i gangen i dag, sammenlignet med en vanlig dag?'
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
      reflectionQuestion: 'Hva gjorde ventetiden med din egen reaksjon på meldingen?'
    },
    {
      id: 'p-ung-19',
      theme: 'Menneskeverdi uten betingelser',
      validationText: 'Kjærligheten vår skal være urokkelig – uavhengig av karakterer, sosiale seire eller ryddige rom.',
      microAction: 'Si en kort setning i gangen eller under kveldsmaten i dag som bekrefter at de har verdi for deg akkurat som de er.',
      languageCard: {
        text: 'Jeg er så utrolig takknemlig for at akkurat du bor her sammen med meg.',
        category: 'Ungdom'
      },
      reflectionQuestion: 'Hvordan var det å si setningen uten betingelser knyttet til den?'
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
      reflectionQuestion: 'Hvordan var det lille kveldsbesøket – for dem, og for deg?'
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
    // Usett-prioritert, datostabil rotasjon (se lib/promptRotation)
    return pickDailyPrompt(currentFocus, list);
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
