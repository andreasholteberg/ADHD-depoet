import { SituationCard } from '../types';

export const SITUATIONS: SituationCard[] = [
  {
    id: 'skjerm-av',
    situation: 'Skjermen skal av',
    category: 'Skjerm',
    firstStep: 'Gå litt ned i tempo, pust ut, og gjør deg klar til å gå fysisk inn i rommet. Ikke rop fra kjøkkenet.',
    underTheHood: 'Barnets hjerne er lystbetont hyperfokusert og låst i overgang. Barnet er genuint tidsblindt akkurat nå – spillet danner deres hele virkelighet.',
    immediateAction: 'Gå inn to minutter før tiden er ute. Sett deg rolig ved siden av barnet, se på skjermen og vis ekte interesse for spillet i ett minutt. Koble deg på relasjonen først.',
    sentenceToSay: 'Jeg ser at du er midt i noe spennende her, og det er skikkelig vanskelig å stoppe. Men nå skal vi spise. Setter du spillet på pause, eller skal jeg hjelpe deg?',
    repairAfterward: 'Hvis det endte i et sammenstøt: gå tilbake etterpå med en kort reparasjon uten et anklagende "men". "Det ble for mye støy i gangen. Det er jeg lei meg for."',
    situationTags: ['skjerm', 'spill', 'overgang']
  },
  {
    id: 'paakledning',
    situation: 'Barnet nekter å kle på seg',
    category: 'Morgenstress',
    firstStep: 'Stopp opp bittelitt. Senk dine egne skuldre. Det blir ikke kortere tid av at du også går i alarm.',
    underTheHood: 'Barnet kan være fullstendig overveldet av morgenen, kravet om skolen eller fysisk ubehag ved klærne (stive sømmer, feil passform).',
    immediateAction: 'Fjern unødvendige valg. Legg fram to par sokker eller plagg i stedet for en hel skuff. Gjør det første steget sammen: hjelp to å holde buksebeinet.',
    sentenceToSay: 'Dette ble skikkelig tungt for spede bein i dag. Jeg hjelper deg i gang. Vi tar ett buksebein først, så klarer du det neste.',
    repairAfterward: 'Hvis du dro plagget over hodet på dem i sinne: si unnskyld når dere er i bilen. "Jeg ble stresset for klokka og glemte å lytte. Slik skal jeg ikke gjøre."',
    situationTags: ['morgen', 'overgang', 'morgenstress']
  },
  {
    id: 'legging-laaser',
    situation: 'Legging låser seg',
    category: 'Legging',
    firstStep: 'Sitt tungt på sengekanten. Pust dypt og rolig ned i magen. Barnet speiler din ubevisste rastløshet.',
    underTheHood: 'Søvn betyr å slippe all kontroll. For et barn med en rullende motor betyr stillhet at alle tanker og bekymringer plutselig bråker høyest.',
    immediateAction: 'Slå av alt lys i fellesområdene tidlig. Bli værende i sengen hos dem. Lån dem ditt eget rolige og sovende nervesystem.',
    sentenceToSay: 'Nå skal du slippe å ordne noe mer i dag. Jeg passer på rommet og sitter her til du har sovnet helt.',
    repairAfterward: 'Hvis du stormet ut og smekket med døren: gå inn igjen etter ti minutter. Stryk dem på ryggen og hvisk: "Jeg ble sliten, men jeg er her fortsatt. Du er trygg."',
    situationTags: ['legging', 'kveld', 'soevn']
  },
  {
    id: 'morgenstress',
    situation: 'Morgenstress',
    category: 'Morgenstress',
    firstStep: 'Gjør dine egne bevegelser ti prosent langsommere. Farten din smitter over på hele huset.',
    underTheHood: 'Morgener krever enormt mye eksekutiv struktur (organisere, huske, prioritere). Når barnet ikke har disse veiene ferdig, låser det seg.',
    immediateAction: 'Rigg kvelden i forveien: sekk ferdig, klær valgt. Om morgenen, gi kun én beskjed av gangen, direkte i øyehøyde, aldri fellesbeskjeder i luften.',
    sentenceToSay: 'Nå skal vi pusse tenner først, så tar vi på skoene. Bare én ting om gangen.',
    repairAfterward: 'Hvis det ble kjeft og mas hele veien til skolen: gi dem en god klem ved porten. "Morgenen ble hard. Vi to er fortsatt et lag, ha en fin dag."',
    situationTags: ['morgen', 'stress', 'morgenstress']
  },
  {
    id: 'overgang-skole',
    situation: 'Vanskelig overgang',
    category: 'Overganger',
    firstStep: 'Stans egen fremdrift. Ikke press på med fysisk kraft med en gang. Ta et sekunds tenkepause.',
    underTheHood: 'Overganger krever at en pågående impuls stanses brått for å starte en ny. For et uferdig styringssystem er dette mentale sporet kjempe-skandale.',
    immediateAction: 'Vær den emosjonelle broen. Gi et tydelig tidsanker i god tid, og gjør det første skrittet fysisk sammen med barnet.',
    sentenceToSay: 'Om ti minutter skal vi dra. Jeg blir med deg og rydder denne ene legofiguren, så gjør vi oss klare.',
    repairAfterward: 'Når dere har kommet fram, anerkjenn innsatsen: "Det var skikkelig vanskelig å avslutte leken i sted. Takk for at du ble med til slutt."',
    situationTags: ['overgang', 'skole']
  },
  {
    id: 'barnet-eksploderer',
    situation: 'Barnet eksploderer',
    category: 'Barnet eksploderer',
    firstStep: 'Stopp ordene dine. Gå tilbake et stykke for å fjerne det sensoriske trykket. Gjør deg mentalt stødig som en vegg.',
    underTheHood: 'Hjernen er i overlevelses-alarm. Tenkehjernen er midlertidig helt utkoblet. Logiske argumenter eller trusler øker bare faren.',
    immediateAction: 'Pass på fysisk trygghet (stopp slag eller flytt farlige gjenstander). Hold avstand dersom de ikke tåler berøring. Pust dypere for å samregulere.',
    sentenceToSay: 'Stopp. Jeg lar deg ikke slå, vi må passe på hverandre. Men jeg blir her hos deg til stormen har lagt seg.',
    repairAfterward: 'Vent til pulsen er normal for dere begge: "Det ble skikkelig voldsomt i kroppen din i sted. Jeg er lei meg for at jeg ble skarp, jeg passer på deg."',
    situationTags: ['sinne', 'eksplosjon', 'regulering']
  },
  {
    id: 'stille-trekker',
    situation: 'Barnet trekker seg unna',
    category: 'Barnet trekker seg unna',
    firstStep: 'Vær varsom. Ikke press med krav om at de må snakke med en gang. Vis rolig tålmodighet.',
    underTheHood: 'Den stille motoren: barnet jobber hardt innover, maskerer overbelastning, eller gjemmer seg i dyp skam fordi de opplever at de feiler.',
    immediateAction: 'Sitt rolig i samme rom uten å stille direkte spørsmål. Gjør noe annet (f.eks rydde eller lese) slik at nærværet ditt ikke krever noe svar.',
    sentenceToSay: 'Jeg ser at du trenger litt fred akkurat nå, og det er helt i orden. Jeg sitter her borte på stolen hvis du har lyst til å komme bort.',
    repairAfterward: 'Når døren åpner seg bittelitt: "Det er godt å bare sitte sammen med deg igjen. Du trenger ikke å forklare noe."',
    situationTags: ['stille', 'avvisning', 'regulering']
  },
  {
    id: 'koker-selv',
    situation: 'Jeg kjenner at jeg koker',
    category: 'Egen regulering',
    firstStep: 'NAVNGI det tilstanden inni deg med en gang. Første alarmsignal er ditt håndtak.',
    underTheHood: 'Du er sliten, overbelastet og bærer et nervesystem som går i biologisk alarm. Det er ikke din skyld – det kalles beredskapskroppen.',
    immediateAction: 'Ta et fysisk skritt unna situasjonen hvis mulig. Kjenn føttene flatt i gulvet. Si fra til barnet at din egen motor går for fort.',
    sentenceToSay: 'Nå går min motor også altfor fort. Jeg må ta ett minutt pause på kjøkkenet for å puste litt, så kommer jeg tilbake.',
    repairAfterward: 'Når roen er der: "Jeg ble veldig frustrert i sted. Det var mitt ansvar å styre stemmen min, og det klarte jeg ikke. Vi prøver igjen."',
    situationTags: ['koker', 'egen-alarm', 'alarm', 'regulering']
  },
  {
    id: 'jeg-ropte',
    situation: 'Jeg ropte høyt (og muren ble hard)',
    category: 'Jeg ropte igjen',
    firstStep: 'Ta et øyeblikk alene i kveld før du sover. Tilgi deg selv – slitasjen din er reell. Men ta ansvaret.',
    underTheHood: 'For et barn representerer et urimelig utbrudd fra forelderen eine stor relasjonell trussel. Barnet tror raskt: "Jeg er feil, kanskje er jeg ikke elsket."',
    immediateAction: 'Vent til roen er tilbake hos dere begge. Gå inn, sett deg ned i øyehøyde og gjennomfør en ren reparasjon uten å nevne barnets skyld.',
    sentenceToSay: 'Det ble altfor voldsomt i gangen tidligere. Jeg er lei meg for at jeg hevet stemmen og ropte, det var min motor som ble for rask. Det var mitt ansvar.',
    repairAfterward: 'Ligg litt sammen med dem på sengen. Bekreft relasjonen: "Vi to er fortsatt et lag. Det tåler at det blir tøft noen ganger."',
    situationTags: ['ropte', 'reparasjon']
  },
  {
    id: 'skolemelding',
    situation: 'Vanskelig melding fra skolen',
    category: 'Skole',
    firstStep: 'Sveip vekk meldingen i ti minutter. Ikke svar i umiddelbar defensiv alarm midt i arbeidstiden.',
    underTheHood: 'Skolen er en tøff motorvei for barnet. Meldingen utløser en akutt frykt hos deg for barnets utenforskap og fremtid, som fort blir til irritasjon på barnet.',
    immediateAction: 'Skriv et emosjonelt nøytralt, men mottakelig svar til skolen. Hjemme, la barnet lande helt før dere åpner samtalen – ikke forvandle hjemmet til en rettssal.',
    sentenceToSay: 'Takk for beskjed læreren, jeg ser at dette ble en hard dag for dere. Jeg tar en rolig prat med ham i kveld, og så kommer jeg tilbake til dere.',
    repairAfterward: 'Hjemme, etter middag: "Læreren skrev at det ble litt vanskelig i timen i dag. Hvordan kjennes kroppen din ut nå? Vi skal finne en måte."',
    situationTags: ['skole', 'melding']
  },
  {
    id: 'lekser-laas',
    situation: 'Lekser låser seg helt',
    category: 'Lekser',
    firstStep: 'Legg fra deg blyanten. Stopp å forklare mattestykket for femte gang. Ordene preller av når de er låst.',
    underTheHood: 'Lekser krever ekstrem styring, fokus og voksende arbeidsminne etter en lang, utmattende skoledag. Kapasiteten til å tåle frustrasjon er helt tom.',
    immediateAction: 'Anerkjenn ubehaget umiddelbart. Sett deg helt inntil barnet, ta en pause i ti minutter, eller avslutt leksene for dagen med et smil.',
    sentenceToSay: 'Jeg ser at denne matten ble skikkelig frustrerende merkelag i dag. Hjernen din er sliten etter skolen, og det er helt greit. Vi tar en slurk vann og legger den bort nå.',
    repairAfterward: 'Skriv en kort, vennlig e-post til læreren: "Oppgavene i dag ble for tunge for kapasiteten etter skolen, så vi valgte å stoppe for å verne om roen."',
    situationTags: ['lekser', 'skole', 'stress']
  },
  {
    id: 'soesken-krig',
    situation: 'Søskenkonflikt i stua',
    category: 'Søsken',
    firstStep: 'Pust rolig. Hold hendene dine myke. Ikke gå inn som en sint dommer som skal fordele skyld med en gang.',
    underTheHood: 'Søskenkonflikter handler ofte om kamp om forelderens oppmerksomhet, eller at et hode i alarm raskt mister tålmodigheten til å dele og forhandle.',
    immediateAction: 'Skill barna fysisk med milde, men bestemte bevegelser. Gi begge rom til å roe nervesystemet sitt før du ber om forklaringer.',
    sentenceToSay: 'Nå går motorene for fort her for begge to. Vi tar en liten pause i hver våre hjørner, så snakker vi om hva som skjedde når pulsen har sunket.',
    repairAfterward: 'Etterpå: "Det er tøft å dele på plassen i dag. Takk for at dere roet dere ned til slutt. Vi finner en lek dere kan gjøre hver for dere."',
    situationTags: ['soesken', 'deling']
  },
  
  // ==========================================
  // UNGDOMSKORT (13-16 ÅR) - NYTT INNHOLD
  // ==========================================
  {
    id: 'ung-lukker-doer',
    situation: 'Ungdommen lukker døren / rømmer unna',
    category: 'Ungdom',
    firstStep: 'Ikke følg etter med en gang. Pust. Ungdommen din flykter ikke fra deg – men fra en følelse som ble for stor.',
    underTheHood: 'Tilbaketrekning er ofte regulering, ikke avvisning. En lukket dør betyr som regel "jeg orker ikke bli sett akkurat nå" – ikke "jeg vil aldri ha deg der".',
    immediateAction: 'Gi rom, men la døren stå på gløtt eller gi et kort signal om at du er tilgjengelig, helt uten krav eller forventning om umiddelbar respons.',
    sentenceToSay: 'Jeg er her hvis du vil. Ingen krav eller mas. Jeg lager litt kveldsmat nå og setter det på kjøkkenet.',
    repairAfterward: 'Når roen har lagt seg, kom rolig tilbake med nysgjerrighet i stedet for et avhør: "Det kjentes litt tøft i sted. Jeg er her for deg."',
    situationTags: ['ungdom', 'stille', 'avvisning', 'overgang']
  },
  {
    id: 'ung-redd-aktivitet',
    situation: 'Jeg er redd for hva ungdommen min holder på med',
    category: 'Ungdom',
    firstStep: 'Frykt får oss til å kreve svar med en gang. Men panikk lukker den døren du mest av alt trenger å holde åpen. Pust ut først.',
    underTheHood: 'Destruktive valg er nesten alltid et forsøk på å regulere en indre smerte – ikke et plutselig moralsk forfall. Prøv å spørre "hvorfor smerten?", ikke bare "hvorfor gjerningen?".',
    immediateAction: 'Hold kontakten før du kommer med tøffe korreksjoner. Vis at du ser dem og vil være der, uten å felle en endelig og hard dom i øyeblikket.',
    sentenceToSay: 'Jeg ser at noe er skikkelig tungt og vanskelig nå. Jeg er bekymret og redd for deg, men jeg kommer aldri til å gi deg opp.',
    repairAfterward: 'Dette skal du ikke bære helt alene. Ved rus, selvskading eller dyp bekymring: Kontakt fastlege/BUP, Alarmtelefonen 116 111, eller legevakt/akutt på 113/116 117.',
    contactEmergency: true,
    situationTags: ['ungdom', 'frykt', 'overgrep', 'rus']
  },
  {
    id: 'ung-eksploderer',
    situation: 'Ungdommen eksploderer: «Jeg hater deg, stikk!»',
    category: 'Ungdom',
    firstStep: 'Ordene er skyhøye og knallharde. De er smerte i en rustning, ikke en dom over deg som person. Prøv å ikke svelge agnet akkurat nå.',
    underTheHood: 'Et eksplosivt tenåringssystem har mistet kontrollen. Det eldre nervesystemet roper i ren alarm. «Stikk» betyr ofte «jeg er desperat redd for at du faktisk snur ryggen til og forsvinner».',
    immediateAction: 'Ikke møt piggtråden med dine egne pigger. Senk volumet og tonefallet markant, ta et skritt rolig tilbake, men ikke forsvinn helt ut av huset.',
    sentenceToSay: 'Du har fullstendig lov til å være fly forbanna på meg. Jeg går ikke min vei. Vi snakkes når begge har fått herjet fra seg litt.',
    repairAfterward: 'Reparasjon gjelder i aller høyeste grad tenåringer også: eie din egen andel av raseriet uten et "men". Det er aldri for sent å reparere.',
    situationTags: ['ungdom', 'sinne', 'eksplosjon']
  },
  {
    id: 'ung-bestemmer-ikke',
    situation: '«Du bestemmer ikke over meg» – kamp om grenser',
    category: 'Ungdom',
    firstStep: 'Dette føles umiddelbart som en direkte maktkamp. Men går du inn for å vinne konflikten, taper dere begge relasjonen. Pust godt før du svarer.',
    underTheHood: 'Å dytte bort grenser er tenåringers biologiske hovedoppgave. Bak «du bestemmer ikke» ligger et skjult spørsmål: «ser du at jeg holder på å bli en som kan tåle litt mer frihet?»',
    immediateAction: 'Hold fast i selve grensen, men gi helt slipp på maktkampen. Du kan være myk og stødig på samme tid. Aldri forhandle mens dere begge er i rød sone.',
    sentenceToSay: 'Jeg skjønner kjempegodt at du vil styre dette selv og ønsker mer frihet. Det er naturlig. Akkurat i kveld blir det slik som jeg sa, så kan vi se på rammene sammen i morgen.',
    repairAfterward: 'Involver ungdommen på dagtid: gi reell medvirkning på regler. Grenser de selv har vært med på å utforme brytes langt sjeldnere.',
    situationTags: ['ungdom', 'grenser', 'maktkamp']
  },
  {
    id: 'ung-skjerm-natt',
    situation: 'Skjerm og gaming hele natten – kommer ikke til ro',
    category: 'Ungdom',
    firstStep: 'Klokka ruller, du er dødssliten og raseriet bygger seg opp til å nappe ut routerkontakten. Stopp litt – en natt-konflikt koster enormt mye og gir sjelden ro.',
    underTheHood: 'En overstimulert hjerne frykter ofte selve stillheten: å legge fra seg skjermen betyr å være mutters alene med alle de urolige tankene. Skjermen fungerer som en pauseknapp for indre uro.',
    immediateAction: 'Bygg en vennlig bro fremfor en veto-vegg. Gå rolig inn, vis interesse for spillet i ti sekunder, og hjelp dem med en rullende nedtrapping i stedet for bråstopp.',
    sentenceToSay: 'Jeg skjønner dette er en viktig runde. Skal vi finne et naturlig stoppunkt sammen så du rekker å hvile litt før morgendagen?',
    repairAfterward: 'Lag avtaler om skjermbruk på ettermiddagen når dere begge har overskudd, ikke klokken to om natten når hjernene er utslitte.',
    situationTags: ['ungdom', 'skjerm', 'soevn', 'kveld']
  },
  {
    id: 'ung-skolevegring',
    situation: 'Vil ikke på skolen / skolevegring om morgenen',
    category: 'Ungdom',
    firstStep: 'Frykten for fravær og fremtid vil hamre løs på deg og skape stress. Men å presse hardere på en dør som allerede er låst gjør den bare mer uknuselig. Pust rolig.',
    underTheHood: 'Å «ikke ville» på skolen handler nesten aldri om latskap eller ulydighet – det er i realiteten å ikke klare på grunn av lammende sosial frykt, dyp skam eller total utmattelse.',
    immediateAction: 'Senk kravene akkurat for denne morgenen. Et mikroskopisk mål (bare kle på seg, eller være med den første timen) er uendelig mye bedre enn en total låsing.',
    sentenceToSay: 'Jeg ser at dette kjennes helt uoverkommelig i dag. Vi trenger ikke løse hele skoleåret akkurat nå. Hva er den aller minste tingen vi kan prøve på sammen i dag?',
    repairAfterward: 'Langvarig skolevegring skal dere aldri stå i alene. Ta kontakt med skolen for et samarbeidsmøte, og involver fastlege eller PP-tjeneste tidlig.',
    contactEmergency: true,
    situationTags: ['ungdom', 'skole', 'stille']
  },
  {
    id: 'ung-forakt',
    situation: 'Forakt og nedvurdering – «Du skjønner ingenting!»',
    category: 'Ungdom',
    firstStep: 'Forakt stikker dypt i en forelders hjerte. Men husk at forakt nesten alltid er et forsvarsskjold rundt sårbarhet eller usikkerhet. Ikke ta rustningen på deg som din egen.',
    underTheHood: 'Å gjøre deg mindre er tenåringens ubevisste og keitete forsøk på å føle seg mer stødig i en stor og skummel verden. Det handler nesten aldri egentlig om din faktiske intelligens.',
    immediateAction: 'Ikke gå i skyttergraven med logiske forsvarstaler, og ikke gå til motangrep med spott. Stå stødig, rolig og verdig uten å la deg trykke ned.',
    sentenceToSay: 'Du har lov til å være dundrende uenig med meg. Men jeg snakker ordentlig til deg, og jeg vil at vi beholder en grei tone mellom oss også.',
    repairAfterward: 'Hvis du selv mistet tonen og snakket nedlatende tilbake: Reparer din del helt rent. Grensen for anstendig språk gjelder begge veier.',
    situationTags: ['ungdom', 'forakt', 'fornaermelse']
  },
  {
    id: 'ung-alt-fint',
    situation: '«Alt er helt fint» – men du ser at noe raser under',
    category: 'Ungdom',
    firstStep: 'Når vi blir bekymret, ønsker vi å grave, utspørre og løse problemet med en gang. Men utspørring lukker dører. Ta det helt med ro.',
    underTheHood: '«Alt er fint» betyr ofte «jeg orker ikke bære din redsel i tillegg til min egen uro akkurat nå». Tillit og fortvilelse deles gjennom bittesmå gliper, ikke store avhør.',
    immediateAction: 'Ikke krev at dere må ha "den dype samtalen". Tilby et nærvær som er helt fritt for betingelser – sitt i rommet, gjør en ting sammen, eller bare vær tyst.',
    sentenceToSay: 'Du trenger overhodet ikke å fortelle meg noe som helst akkurat nå. Men jeg er her for deg hvis du skulle trenge det, uansett hva det gjelder.',
    repairAfterward: 'Ta godt imot de bittesmå hverdagsåpningene som kommer senere – ofte i bilen, under sengekanten, eller mens du egentlig gjør noe helt annet.',
    situationTags: ['ungdom', 'maskering', 'stille']
  },
  {
    id: 'ung-nedfor',
    situation: 'Ungdommen er dypt nedfor: «Ingenting er vits uansett»',
    category: 'Ungdom',
    firstStep: 'Slike ord vekker et kaldt gufs av frykt i deg. Men tenåringen din trenger ikke din panikk eller dine kjappe løsninger nå. De trenger en som tåler mørket.',
    underTheHood: 'Tunge, depressive tanker er fulle av klaustrofobisk skam. Å oppleve at en voksen hører på dette uten å gå i stykker eller bagatellisere det, virker ekstremt lindrende og tryggende.',
    immediateAction: 'Bli værende hos dem. Lytt genuint, valider smerten helt uten å skynde deg med å rydde den vekk med overdreven positivitet.',
    sentenceToSay: 'Det høres utrolig tungt ut å bære på dette alene. Jeg er ufattelig glad for at du forteller det til meg. Du skal slippe å stå i dette alene.',
    repairAfterward: 'Vedvarende mutthet eller mistanke om dyp depresjon krever profesjonell vurdering. Ta kontakt med fastlege eller BUP, ved akutt fare/selvskading ring Alarmtelefonen 116 111 eller 113.',
    contactEmergency: true,
    situationTags: ['ungdom', 'nedfor', 'frykt']
  }
];
