import type { IcoonNaam } from "@/components/Iconen";

/**
 * De doelgroepen achter het menu "Voor wie": sectoren en bedrijfsvormen, elk met een eigen pagina (src/app/sectoren en
 * src/app/bedrijfsvormen, opgebouwd door src/components/Doelgroep.tsx). Opzet naar het voorbeeld van moneybird.nl: kop
 * en beeld, drie redenen, wat de bot doet, een citaat en drie vragen. Beelden staan in public/beeld/voorwie (Nano Banana), de dashboards in public/schermen/voorwie (sjabloon in de scratchpad, dashboard.mjs).
 */
export type Doelgroep = {
  slug: string;
  naam: string;
  icoon: IcoonNaam;
  /** Eén regel voor het menu en het overzicht. */
  kort: string;
  kop: string;
  intro: string;
  beeld: string;
  alt: string;
  /** Dashboard van de app met regels die bij dit beroep passen (public/schermen/voorwie), schuin getoond. */
  scherm: string;
  schermTekst: string;
  waarom: { kop: string; tekst: string }[];
  doet: { icoon: IcoonNaam; kop: string; tekst: string }[];
  citaat: { tekst: string; naam: string; rol: string };
  vragen: [string, string][];
};

export const SECTOREN: Doelgroep[] = [
  {
    slug: "creatieve-beroepen", naam: "Creatieve beroepen", icoon: "palet",
    kort: "Voor makers, kunstenaars en ontwerpers met een eigen stijl.",
    kop: "Boekhouden voor creatieve beroepen. Zonder dat het je creativiteit kost.",
    intro: "Materiaal, opdrachten, een expositie hier en een workshop daar. De bot boekt het allemaal ’s nachts, zodat jij overdag kunt maken.",
    beeld: "/beeld/voorwie/creatieve-beroepen.jpg", alt: "Sieradenmaker aan een lichte werkbank",
    scherm: "/schermen/voorwie/creatieve-beroepen.png", schermTekst: "Verkoop aan een galerie, zilver van de groothandel en de Mollie-uitbetaling van je webshop: allemaal al geboekt als je je atelier binnenstapt.",
    waarom: [
      { kop: "Meer tijd voor je vak", tekst: "Bonnen van materiaal fotografeer je in de winkel. De rest, van btw tot afschrijving, doet de bot." },
      { kop: "Een professionele indruk", tekst: "Offertes en facturen in je eigen stijl, met iDEAL-link. Herinneringen gaan vanzelf." },
      { kop: "Rust in je hoofd", tekst: "Je ziet elke dag wat je kunt reserveren voor de belasting. Geen verrassingen in maart." },
    ],
    doet: [
      { icoon: "bon", kop: "Materiaalkosten direct geboekt", tekst: "Klei, verf, zilver of stof: fotografeer de bon en hij hangt aan de juiste bankregel." },
      { icoon: "factuur", kop: "Offerte wordt factuur", tekst: "Een akkoord op je offerte is met één tik een factuur. Aanbetalingen kunnen ook." },
      { icoon: "activa", kop: "Apparatuur als investering", tekst: "Een oven, pers of camera boven € 450 schrijft de bot af over vijf jaar, met de investeringsaftrek erbij." },
      { icoon: "btw", kop: "Btw op kunst en workshops", tekst: "9% of 21%, verlegd naar een galerie in België: de bot kiest het juiste tarief per regel." },
    ],
    citaat: { tekst: "Ik maak sieraden, geen spreadsheets. Sinds de bot mijn bonnen doet, kijk ik één keer per kwartaal of het klopt.", naam: "Noor", rol: "sieradenontwerper" },
    vragen: [
      ["Hoe boek ik materiaal dat ik ook privé gebruik?", "Je geeft bij de bon aan welk deel zakelijk is. De bot boekt dat deel en onthoudt de verdeling voor de volgende keer."],
      ["Kan ik een aanbetaling factureren?", "Ja. Je maakt een factuur voor een deel van het bedrag; de rest volgt bij levering. Beide hangen aan dezelfde opdracht."],
      ["Hoe zit het met de btw op kunst?", "Eigen kunstwerken vallen vaak onder 9%, workshops onder 21%. De bot past het juiste tarief toe en legt uit waarom."],
    ],
  },
  {
    slug: "bouw-en-installatietechniek", naam: "Bouw en installatietechniek", icoon: "helm",
    kort: "Voor bouwers en installateurs die liever op de klus staan dan achter de laptop.",
    kop: "Boekhouding voor de bouw. Geregeld vanuit de bus.",
    intro: "Bonnen van de groothandel, btw verlegd aan de aannemer, materiaal op de factuur: de bot regelt het ’s nachts. Jij fotografeert alleen de bon.",
    beeld: "/beeld/voorwie/bouw-en-installatietechniek.jpg", alt: "Installateur met een tablet bij zijn bus",
    scherm: "/schermen/voorwie/bouw-en-installatietechniek.png", schermTekst: "De factuur aan de aannemer met btw verlegd, de bonnen van de Technische Unie en de diesel van de bus: geboekt voordat je de eerste klus begint.",
    waarom: [
      { kop: "Bonnen vanuit de bus", tekst: "Groothandel, tankstation, bouwmarkt: foto maken en klaar. De bot leest bedrag en btw." },
      { kop: "Btw verlegd zonder nadenken", tekst: "Werk je voor een aannemer, dan zet de bot de btw-verlegd-regel vanzelf op de factuur en in je aangifte." },
      { kop: "Weten wat een klus opleverde", tekst: "Per project zie je uren, materiaal en marge. Zo weet je bij de volgende offerte wat je moet rekenen." },
    ],
    doet: [
      { icoon: "bon", kop: "Groothandelsbonnen herkend", tekst: "Technische Unie, Hornbach of de bouwmarkt om de hoek: elke bon hangt aan de juiste bankregel." },
      { icoon: "btw", kop: "Btw-verlegging automatisch", tekst: "Onderaanneming of werk aan onroerend goed: de bot herkent wanneer btw verlegd moet worden." },
      { icoon: "km", kop: "Kilometers en de bus", tekst: "Zakelijke ritten bijhouden en de btw op je bus terugvragen, met de jaarlijkse privécorrectie erbij." },
      { icoon: "factuur", kop: "Uren en materiaal op één factuur", tekst: "Met voorrijkosten en iDEAL-link. Te laat betaald? De herinnering gaat vanzelf." },
    ],
    citaat: { tekst: "Ik doe mijn administratie in de bus, tussen twee klussen. Bon fotograferen, verder niks.", naam: "Ruben", rol: "elektricien" },
    vragen: [
      ["Wanneer moet ik de btw verleggen?", "Werk je als onderaannemer voor een aannemer, of aan onroerend goed voor een ondernemer, dan verleg je de btw. De bot ziet dat aan je klant en regelt het."],
      ["Kan ik de btw op mijn bus terugkrijgen?", "Ja. De bot trekt de btw op aankoop, brandstof en onderhoud af en corrigeert één keer per jaar voor privégebruik."],
      ["Hoe werkt het met meerdere klussen tegelijk?", "Elke bon en factuur hangt aan een project. Je ziet per klus wat erin is gegaan en wat eruit kwam."],
    ],
  },
  {
    slug: "saas", naam: "SaaS", icoon: "code",
    kort: "Voor softwareondernemers die abonnementen verkopen.",
    kop: "Boekhouding voor SaaS. Abonnementen, Stripe en btw in de hele EU.",
    intro: "Honderden kleine betalingen per maand, klanten in tien landen en jaarabonnementen vooruitbetaald. De bot splitst, verdeelt en boekt het elke nacht.",
    beeld: "/beeld/voorwie/saas.jpg", alt: "Softwareondernemer aan een bureau met twee schermen",
    scherm: "/schermen/voorwie/saas.png", schermTekst: "De Stripe-uitbetaling van vannacht is al uitgesplitst in abonnementen, fees en terugbetalingen, en AWS en Vercel staan als kosten in de boeken.",
    waarom: [
      { kop: "Stripe-uitbetalingen uitgesplitst", tekst: "Eén uitbetaling van Stripe of Mollie wordt vanzelf honderden omzetregels, inclusief fees en terugbetalingen." },
      { kop: "Btw per land goed", tekst: "Consumenten in de EU gaan via de OSS-regeling; de bot houdt per land het tarief bij en zet de aangifte klaar." },
      { kop: "Terugkerende omzet zonder spreadsheet", tekst: "Je ziet wat er maandelijks binnenkomt, wie opzegt en wat er netto overblijft. Elke ochtend bijgewerkt." },
    ],
    doet: [
      { icoon: "koppel", kop: "Stripe, Mollie en Paddle gekoppeld", tekst: "Uitbetalingen worden per transactie gematcht met orders, fees apart geboekt." },
      { icoon: "btw", kop: "OSS-aangifte klaar", tekst: "Btw per EU-land voor consumenten, verlegd voor zakelijke klanten met btw-nummer." },
      { icoon: "jaar", kop: "Jaarabonnementen netjes verdeeld", tekst: "Vooruitontvangen omzet verdeelt de bot over de maanden waarin je levert." },
      { icoon: "bon", kop: "Software-abonnementen als kosten", tekst: "AWS, Vercel, Figma: elke maandelijkse afschrijving wordt herkend en geboekt." },
    ],
    citaat: { tekst: "Stripe en mijn bank praten met elkaar. Ik weet elke ochtend precies wat er netto is overgebleven.", naam: "Daan", rol: "oprichter van een planningstool" },
    vragen: [
      ["Hoe gaat de bot om met Stripe-fees?", "Elke uitbetaling splitst hij in omzet, fees en eventuele terugbetalingen. De fees staan als kosten in je boekhouding."],
      ["Moet ik btw rekenen aan klanten in Duitsland?", "Aan consumenten wel, tegen het Duitse tarief via de OSS-regeling. Aan bedrijven met btw-nummer verleg je de btw. De bot doet beide."],
      ["Kan ik jaarabonnementen spreiden?", "Ja. De bot zet vooruitontvangen bedragen op de balans en boekt elke maand het deel dat je hebt geleverd."],
    ],
  },
  {
    slug: "trainers-en-coaches", naam: "Trainers en coaches", icoon: "coach",
    kort: "Voor trainers en coaches die anderen verder helpen.",
    kop: "Boekhouding voor trainers en coaches. Zodat jij je op mensen kunt richten.",
    intro: "Sessies, trajecten en groepstrainingen, soms met btw-vrijstelling en soms niet. De bot factureert, herinnert en boekt, elke nacht.",
    beeld: "/beeld/voorwie/trainers-en-coaches.jpg", alt: "Coach met een kleine groep voor een whiteboard",
    scherm: "/schermen/voorwie/trainers-en-coaches.png", schermTekst: "Termijnen van trajecten, de zaalhuur en je treinkaartjes: geboekt. En de bot ziet welke factuur een herinnering nodig heeft.",
    waarom: [
      { kop: "Trajecten factureren", tekst: "Een traject van tien sessies factureer je vooraf, per sessie of in termijnen. De bot houdt bij wat is betaald." },
      { kop: "Btw of vrijgesteld", tekst: "Beroepsonderwijs kan btw-vrij zijn, coaching niet. De bot past per factuur het juiste tarief toe en legt uit waarom." },
      { kop: "Locaties en reiskosten", tekst: "Zaalhuur, kilometers naar een klant en je laptop: alles komt vanzelf als kosten mee." },
    ],
    doet: [
      { icoon: "factuur", kop: "Facturen voor sessies en trajecten", tekst: "Met iDEAL-link, zodat klanten direct betalen. Herinneringen gaan automatisch." },
      { icoon: "uren", kop: "Uren per klant", tekst: "Je registreert sessies per klant en zet ze met één tik op de factuur." },
      { icoon: "btw", kop: "Btw-vrijstelling onderwijs", tekst: "Sta je in het CRKBO-register, dan factureer je zonder btw. De bot houdt vrijgestelde en belaste omzet uit elkaar." },
      { icoon: "km", kop: "Kilometers naar de klant", tekst: "Zakelijke ritten zet de bot als aftrek in je aangifte." },
    ],
    citaat: { tekst: "Ik train groepen op locatie. Mijn facturen gaan vanaf mijn telefoon, de rest zie ik niet eens meer.", naam: "Els", rol: "trainer en coach" },
    vragen: [
      ["Moet ik btw rekenen over coaching?", "Meestal wel, 21%. Beroepsopleidingen via het CRKBO-register zijn vrijgesteld. De bot houdt beide stromen apart in je aangifte."],
      ["Kan ik een traject in termijnen factureren?", "Ja. Je maakt een termijnschema en de bot stuurt elke termijn vanzelf, met een herinnering als dat nodig is."],
      ["Hoe boek ik zaalhuur?", "De factuur van de locatie mail je door of fotografeer je. De bot boekt hem als kosten en pakt de btw terug."],
    ],
  },
  {
    slug: "webshops-en-e-commerce", naam: "Webshops en e-commerce", icoon: "winkelwagen",
    kort: "Voor webshops die liever verkopen dan administreren.",
    kop: "Boekhouding voor webshops. Elke uitbetaling uitgesplitst, elke retour tegengeboekt.",
    intro: "Shopify, Bol, Mollie en je bank praten met elkaar. De bot verdeelt uitbetalingen per order en per btw-land, elke nacht.",
    beeld: "/beeld/voorwie/webshops-en-e-commerce.jpg", alt: "Webshopeigenaar pakt een bestelling in",
    scherm: "/schermen/voorwie/webshops-en-e-commerce.png", schermTekst: "Shopify, Bol en Mollie uitgesplitst per order, retouren tegengeboekt en de inkoopfactuur van je leverancier aan de betaling gehangen.",
    waarom: [
      { kop: "Uitbetalingen per order", tekst: "Een uitbetaling van Shopify of Bol wordt vanzelf gesplitst in orders, verzendkosten, commissie en retouren." },
      { kop: "Btw per land", tekst: "Verkoop je in de EU, dan houdt de bot per land het tarief bij voor de OSS-aangifte." },
      { kop: "Weten wat er netto overblijft", tekst: "Omzet min inkoop, verzending en commissie: elke ochtend zie je je marge." },
    ],
    doet: [
      { icoon: "koppel", kop: "Shopify, WooCommerce, Bol en Mollie", tekst: "Orders en uitbetalingen worden automatisch gematcht, inclusief fees." },
      { icoon: "btw", kop: "OSS-aangifte voor de EU", tekst: "Btw per land voor consumenten buiten Nederland, in één aangifte." },
      { icoon: "bon", kop: "Retouren automatisch tegengeboekt", tekst: "Een retour wordt een creditregel, inclusief de btw. Geen handwerk." },
      { icoon: "activa", kop: "Voorraad en inkoop", tekst: "Inkoopfacturen van leveranciers mail je door; de bot boekt ze en koppelt ze aan de betaling." },
    ],
    citaat: { tekst: "Bol-uitbetalingen, retouren, verzendkosten: alles klopt in de ochtend. Ik check alleen nog de twijfelgevallen.", naam: "Mehmet", rol: "webshop in fietsonderdelen" },
    vragen: [
      ["Hoe worden Bol-uitbetalingen geboekt?", "Per uitbetaling splitst de bot omzet, commissie, verzendkosten en retouren, en koppelt alles aan de bankregel."],
      ["Wat is de OSS-regeling?", "Verkoop je meer dan € 10.000 per jaar aan consumenten in andere EU-landen, dan reken je hun btw-tarief en geef je dat via één aangifte op. De bot zet die klaar."],
      ["Kan ik meerdere verkoopkanalen koppelen?", "Ja, zoveel als je wilt. Elke uitbetaling wordt apart gematcht met de orders van dat kanaal."],
    ],
  },
  {
    slug: "grafisch-ontwerp", naam: "Grafisch ontwerp", icoon: "pen",
    kort: "Voor ontwerpers die merken en ideeën vorm geven.",
    kop: "Boekhouding voor grafisch ontwerpers. Net zo strak als je werk.",
    intro: "Uren per project, een offerte die een factuur wordt en abonnementen op je ontwerpsoftware als kosten. De bot houdt het bij, jij ontwerpt.",
    beeld: "/beeld/voorwie/grafisch-ontwerp.jpg", alt: "Grafisch ontwerper aan een tekentablet",
    scherm: "/schermen/voorwie/grafisch-ontwerp.png", schermTekst: "Een betaalde huisstijl, je Adobe-abonnement en een factuur aan een Duits bureau met btw verlegd: alles staat er als je je koffie inschenkt.",
    waarom: [
      { kop: "Offerte wordt factuur", tekst: "Een akkoord op je offerte is met één tik een factuur, in je eigen huisstijl." },
      { kop: "Uren per project", tekst: "Je ziet per klant hoeveel uur erin ging en wat het opleverde. Handig voor de volgende offerte." },
      { kop: "Software vanzelf als kosten", tekst: "Adobe, Figma, fonts en stockbeeld: elke maandelijkse afschrijving wordt herkend en geboekt." },
    ],
    doet: [
      { icoon: "offerte", kop: "Offertes in je huisstijl", tekst: "Met je eigen logo en kleuren, online te accepteren." },
      { icoon: "uren", kop: "Uren bijhouden", tekst: "Per klant en project, en met één tik naar de factuur." },
      { icoon: "btw", kop: "Btw verlegd naar klanten in de EU", tekst: "Werk je voor een bureau in Berlijn, dan verlegt de bot de btw en zet hij de ICP-opgaaf klaar." },
      { icoon: "activa", kop: "Apparatuur afschrijven", tekst: "Een nieuwe Mac of tekentablet boekt de bot als investering, met de aftrek erbij." },
    ],
    citaat: { tekst: "Mijn btw-aangifte kostte me altijd een avond. Nu lees ik ’m na en klik op klaar.", naam: "Sanne", rol: "grafisch ontwerper" },
    vragen: [
      ["Kan ik mijn offerte omzetten naar een factuur?", "Ja. Zodra de klant akkoord geeft, maak je er met één tik een factuur van. Alles staat al ingevuld."],
      ["Hoe boek ik een stockfoto of font?", "Als kosten. De bot herkent de afschrijving en pakt de btw terug, ook bij buitenlandse leveranciers."],
      ["Wat als een klant niet betaalt?", "De bot stuurt op dag 7, 21 en 35 een herinnering. Jij hoeft er niet achteraan."],
    ],
  },
  {
    slug: "horeca", naam: "Horeca", icoon: "bestek",
    kort: "Voor horecaondernemers met weinig tijd en veel bonnen.",
    kop: "Boekhouding voor horeca. Kassa, leveranciers en bonnen, elke nacht bijgewerkt.",
    intro: "Dagomzet uit de kassa, facturen van de brouwer en de groothandel, en twee btw-tarieven door elkaar. De bot boekt het terwijl jij slaapt.",
    beeld: "/beeld/voorwie/horeca.jpg", alt: "Eigenaar van een lunchroom achter de bar",
    scherm: "/schermen/voorwie/horeca.png", schermTekst: "De pinuitbetaling van zaterdag gesplitst in 9% en 21%, de Sligro-factuur aan de bankregel gehangen. De bot vraagt alleen nog naar die ene bon van Hanos.",
    waarom: [
      { kop: "Dagomzet uit de kassa", tekst: "Pin, contant en fooi: de bot verwerkt je dagstaten en matcht ze met de stortingen op de bank." },
      { kop: "9% en 21% uit elkaar", tekst: "Eten laag, alcohol hoog: de bot verdeelt de btw per bon en per dagomzet." },
      { kop: "Leveranciers zonder stapel", tekst: "Facturen van de groothandel komen per mail binnen en worden vanzelf geboekt." },
    ],
    doet: [
      { icoon: "koppel", kop: "Kassa en pin gekoppeld", tekst: "Dagomzet en pinuitbetalingen worden gematcht met de bank." },
      { icoon: "btw", kop: "Twee btw-tarieven", tekst: "Keuken 9%, bar 21%, en de bot weet welke regel waar hoort." },
      { icoon: "bon", kop: "Leveranciersfacturen per mail", tekst: "Stuur facturen door naar je eigen bonnenadres; de bot doet de rest." },
      { icoon: "ib", kop: "Marge per week", tekst: "Inkoop tegenover omzet, elke week. Zo zie je of je prijzen nog kloppen." },
    ],
    citaat: { tekst: "Na sluitingstijd deed ik vroeger de bonnen. Nu maak ik er een foto van en ga ik naar huis.", naam: "Jasper", rol: "eigenaar van een lunchroom" },
    vragen: [
      ["Hoe verwerk ik mijn dagomzet?", "Je koppelt je kassa of mailt de dagstaat. De bot boekt omzet per btw-tarief en matcht de pinstortingen."],
      ["Wat met fooien?", "Fooien die voor het personeel zijn, zijn geen omzet. De bot houdt ze apart als je dat aangeeft op de dagstaat."],
      ["Kan ik personeel verlonen?", "Nee, loonadministratie zit er niet in. Werk je alleen of met je partner in een vof, dan past het precies."],
    ],
  },
  {
    slug: "adviesbureaus", naam: "Adviesbureaus", icoon: "advies",
    kort: "Voor adviseurs die klanten helpen en hun eigen administratie simpel houden.",
    kop: "Boekhouding voor adviesbureaus. Uren, facturen en btw, zonder omkijken.",
    intro: "Je verkoopt tijd en kennis. De bot zet je uren op de factuur, houdt bij wie te laat betaalt en zet elk kwartaal de btw-aangifte klaar.",
    beeld: "/beeld/voorwie/adviesbureaus.jpg", alt: "Adviseur in gesprek met een klant",
    scherm: "/schermen/voorwie/adviesbureaus.png", schermTekst: "Je maandfactuur aan de gemeente, de treinreizen en een factuur aan een klant in Brussel met btw verlegd. En de bot weet wie te laat is.",
    waarom: [
      { kop: "Uren naar factuur", tekst: "Per klant en project, met één tik op de factuur. Ook bij vaste maandbedragen." },
      { kop: "Snel betaald krijgen", tekst: "iDEAL-link op de factuur en automatische herinneringen. Je ziet wie altijd te laat is." },
      { kop: "Weten hoe je ervoor staat", tekst: "Omzet, kosten en wat je moet reserveren voor de inkomstenbelasting. Elke ochtend bijgewerkt." },
    ],
    doet: [
      { icoon: "uren", kop: "Urenregistratie per klant", tekst: "Je uren staan direct klaar voor de factuur." },
      { icoon: "factuur", kop: "Facturen en voorschotten", tekst: "Vaste bedragen, nacalculatie of een voorschot: de bot houdt bij wat openstaat." },
      { icoon: "btw", kop: "Btw verlegd binnen de EU", tekst: "Klant in België of Duitsland? De bot verlegt de btw en vult de ICP-opgaaf." },
      { icoon: "km", kop: "Reiskosten", tekst: "Kilometers naar de klant en treinkaartjes worden aftrek." },
    ],
    citaat: { tekst: "Ik vraag gewoon aan de bot wat ik moet reserveren voor de inkomstenbelasting. Antwoord in één zin.", naam: "Els", rol: "organisatieadviseur" },
    vragen: [
      ["Kan ik een vast maandbedrag factureren?", "Ja. Je zet een terugkerende factuur klaar en de bot stuurt hem elke maand, met een herinnering als dat nodig is."],
      ["Hoe verwerk ik kosten die ik doorbelast?", "Je zet ze als regel op de factuur. De bot boekt de inkoop en de doorbelasting los van elkaar, met de juiste btw."],
      ["Werkt dit ook met een partner in een vof?", "Ja. Beide vennoten zien dezelfde boekhouding en de winstverdeling staat aan het eind van het jaar klaar."],
    ],
  },
  {
    slug: "content-creators", naam: "Content creators", icoon: "smartphone",
    kort: "Voor makers die content maken, delen en verkopen.",
    kop: "Boekhouding voor content creators. YouTube, merkdeals en affiliate, allemaal geboekt.",
    intro: "Uitbetalingen van YouTube, TikTok en Patreon, een merkdeal in dollars en apparatuur die je afschrijft. De bot weet wat waar hoort.",
    beeld: "/beeld/voorwie/content-creators.jpg", alt: "Content creator filmt een video aan haar bureau",
    scherm: "/schermen/voorwie/content-creators.png", schermTekst: "AdSense in dollars omgerekend, Patreon als verlegde omzet geboekt en je nieuwe camera als investering: de bot sorteert het terwijl jij slaapt.",
    waarom: [
      { kop: "Alle platformen op één plek", tekst: "AdSense, TikTok, Patreon en affiliate: elke uitbetaling wordt herkend en als omzet geboekt." },
      { kop: "Merkdeals factureren", tekst: "Een factuur in je eigen stijl, in euro’s of dollars, met iDEAL-link of IBAN." },
      { kop: "Apparatuur afschrijven", tekst: "Camera, lampen en een nieuwe laptop: de bot boekt ze als investering met aftrek." },
    ],
    doet: [
      { icoon: "koppel", kop: "Platformuitbetalingen herkend", tekst: "Buitenlandse uitbetalingen in dollars worden omgerekend en als btw-verlegde omzet geboekt." },
      { icoon: "factuur", kop: "Facturen voor merkdeals", tekst: "Ook voor merken in het buitenland, met de juiste btw-behandeling." },
      { icoon: "activa", kop: "Apparatuur als investering", tekst: "Boven € 450 schrijft de bot af; daaronder zijn het gewoon kosten." },
      { icoon: "bon", kop: "Props en reizen", tekst: "Bonnen van alles wat je voor een video koopt, fotografeer je en klaar." },
    ],
    citaat: { tekst: "AdSense in dollars, een merkdeal in euro’s en Patreon ertussendoor. De bot sorteert het, ik film.", naam: "Lina", rol: "youtuber en podcaster" },
    vragen: [
      ["Hoe zit het met btw op YouTube-inkomsten?", "Google betaalt vanuit Ierland. Dat is btw-verlegde omzet: je rekent geen btw, maar geeft het wel op. De bot doet dat automatisch."],
      ["Moet ik btw rekenen aan een merk in de VS?", "Nee. Diensten aan bedrijven buiten de EU zijn zonder btw. De bot zet het goed op de factuur en in de aangifte."],
      ["Kan ik gratis producten van merken boeken?", "Producten die je krijgt in ruil voor content zijn omzet in natura. De bot helpt je de waarde te boeken."],
    ],
  },
];

export const BEDRIJFSVORMEN: Doelgroep[] = [
  {
    slug: "zzp", naam: "ZZP", icoon: "gebruiker",
    kort: "Voor zzp’ers en freelancers die vanaf dag één alles strak willen hebben.",
    kop: "Boekhouding voor zzp’ers. Vanaf dag één strak geregeld.",
    intro: "Bank koppelen, bonnen fotograferen en facturen sturen. De bot doet de rest: elke nacht boeken, elk kwartaal de btw en aan het eind van het jaar je aangifte.",
    beeld: "/beeld/voorwie/zzp.jpg", alt: "Freelancer met een laptop aan de keukentafel",
    scherm: "/schermen/voorwie/zzp.png", schermTekst: "Een betaalde factuur, de bon van de bouwmarkt en de diesel: geboekt. Alleen die lunch bij Het Hoekje wil hij even van je horen.",
    waarom: [
      { kop: "Snel betaald krijgen", tekst: "Facturen met iDEAL-link en herinneringen die vanzelf gaan." },
      { kop: "Weten hoe je ervoor staat", tekst: "Winst, btw en wat je opzij moet zetten, elke ochtend bijgewerkt." },
      { kop: "Fiscale rust", tekst: "Zelfstandigenaftrek, startersaftrek en het urencriterium: de bot houdt het bij en zegt wat je moet doen." },
    ],
    doet: [
      { icoon: "factuur", kop: "Facturen en offertes", tekst: "In je eigen stijl, met online betalen." },
      { icoon: "uren", kop: "Urenregistratie", tekst: "Voor je facturen en voor het urencriterium van 1.225 uur." },
      { icoon: "btw", kop: "Btw-aangifte", tekst: "Elk kwartaal klaar, jij leest na en dient in." },
      { icoon: "ib", kop: "Inkomstenbelasting", tekst: "Het hele jaar zie je wat je moet reserveren, met alle aftrekposten erbij." },
    ],
    citaat: { tekst: "Bonnetje fotograferen en vergeten. Dat is eerlijk gezegd alles wat ik nog doe.", naam: "Jeroen", rol: "timmerman" },
    vragen: [
      ["Heb ik nog een boekhouder nodig?", "Voor de meeste zzp’ers niet. De bot boekt alles en legt elke keuze uit. Wil je toch een check, dan geef je je boekhouder toegang."],
      ["Kan ik kosten verdelen die deels privé zijn?", "Ja. Je geeft per bon het zakelijke deel aan; de bot onthoudt dat voor volgende keren."],
      ["Wat gebeurt er met mijn gegevens?", "Die staan versleuteld op servers in de EU. De bankkoppeling is alleen-lezen: niemand kan geld overmaken, ook de bot niet."],
    ],
  },
  {
    slug: "bv-en-holding", naam: "BV en Holding", icoon: "gebouw",
    kort: "Voor dga’s met een bv, of een holding met een werkmaatschappij eronder.",
    kop: "Boekhouding voor je bv en holding. Meerdere administraties, één overzicht.",
    intro: "Een holding boven een werkmaatschappij, een managementfee ertussen en vennootschapsbelasting aan het eind. De bot houdt elke bv apart bij en ziet ze samen.",
    beeld: "/beeld/voorwie/bv-en-holding.jpg", alt: "Twee zakenpartners bekijken cijfers op een laptop",
    scherm: "/schermen/voorwie/bv-en-holding.png", schermTekst: "De managementfee staat aan beide kanten geboekt, de rekening-courant is bijgewerkt en de voorlopige aanslag vpb is afgeboekt. Beide bv’s in één overzicht.",
    waarom: [
      { kop: "Elke bv een eigen boekhouding", tekst: "Holding en werkmaatschappij apart, met één login. De managementfee wordt aan beide kanten geboekt." },
      { kop: "Vennootschapsbelasting in beeld", tekst: "Je ziet het hele jaar wat je bv moet reserveren, met de tariefschijven erbij." },
      { kop: "Rekening-courant bijgehouden", tekst: "Geld tussen jou en je bv zet de bot vanzelf op de rekening-courant, met rente." },
    ],
    doet: [
      { icoon: "bank", kop: "Meerdere administraties", tekst: "Per bv een boekhouding; de bot boekt onderlinge betalingen aan beide kanten." },
      { icoon: "factuur", kop: "Managementfee en facturen", tekst: "Terugkerende managementfee tussen holding en werkmaatschappij, vanzelf verstuurd en geboekt." },
      { icoon: "jaar", kop: "Jaarrekening voor de KVK", tekst: "De publicatiestukken staan aan het eind van het jaar klaar om te deponeren." },
      { icoon: "btw", kop: "Fiscale eenheid btw", tekst: "Eén btw-aangifte voor meerdere bv’s als je een fiscale eenheid hebt." },
    ],
    citaat: { tekst: "Mijn holding en werkmaatschappij staan naast elkaar. Eén blik en ik weet hoe beide ervoor staan.", naam: "Tim", rol: "dga van een marketingbureau" },
    vragen: [
      ["Kan ik meerdere bv’s beheren?", "Ja. Elke bv heeft een eigen administratie, met één login. Betalingen tussen je bv’s worden aan beide kanten geboekt."],
      ["Hoe werkt de rekening-courant?", "Privéopnames en stortingen tussen jou en je bv zet de bot op de rekening-courant en hij rekent de rente uit."],
      ["Doet de bot ook de loonadministratie van de dga?", "Nee. Je dga-salaris voer je in als journaalpost; de loonstrook zelf komt uit een salarispakket."],
    ],
  },
  {
    slug: "vof", naam: "VOF", icoon: "handen",
    kort: "Voor vennoten die samen een bedrijf runnen.",
    kop: "Boekhouding voor je vof. Samen werken, winst eerlijk verdeeld.",
    intro: "Twee of meer vennoten, één administratie, en aan het eind van het jaar ieder zijn deel van de winst. De bot boekt gezamenlijk en rekent per vennoot uit.",
    beeld: "/beeld/voorwie/vof.jpg", alt: "Twee vennoten in hun bakkerij",
    scherm: "/schermen/voorwie/vof.png", schermTekst: "Jullie dagomzet, de meelfactuur en de privéopnames van Bram en Eva, elk op de eigen kapitaalrekening. Zo klopt de winstverdeling het hele jaar.",
    waarom: [
      { kop: "Eén boekhouding, meerdere vennoten", tekst: "Iedere vennoot ziet dezelfde cijfers en kan bonnen en facturen toevoegen." },
      { kop: "Winstverdeling klaar", tekst: "Volgens jullie afspraak, met de kapitaalrekening per vennoot bijgewerkt." },
      { kop: "Ieder een eigen aangifte", tekst: "De bot zet per vennoot het winstdeel klaar voor de inkomstenbelasting, met de ondernemersaftrek erbij." },
    ],
    doet: [
      { icoon: "klanten", kop: "Meerdere gebruikers", tekst: "Elke vennoot een eigen login, dezelfde boekhouding." },
      { icoon: "ib", kop: "Winstverdeling en kapitaal", tekst: "Privéopnames en stortingen per vennoot, en de verdeling volgens het contract." },
      { icoon: "btw", kop: "Eén btw-aangifte", tekst: "De vof is één btw-ondernemer; de bot zet elk kwartaal de aangifte klaar." },
      { icoon: "jaar", kop: "Jaarrekening per vennoot", tekst: "Balans en winst van de vof, plus het aandeel van elke vennoot." },
    ],
    citaat: { tekst: "Mijn compagnon doet de inkoop, ik de verkoop. De bot houdt van ons allebei bij wat we eruit halen.", naam: "Anouk en Bas", rol: "vennoten van een kinderkledingwinkel" },
    vragen: [
      ["Hoe wordt de winst verdeeld?", "Je legt de verdeling één keer vast, bijvoorbeeld 50/50 of met een arbeidsvergoeding vooraf. De bot rekent aan het eind van het jaar per vennoot uit."],
      ["Kan elke vennoot de boekhouding zien?", "Ja. Elke vennoot heeft een eigen login en ziet alles. Bonnen fotografeert ieder zelf."],
      ["Doet elke vennoot een eigen aangifte?", "Ja. De vof doet de btw-aangifte, elke vennoot zijn eigen inkomstenbelasting. De bot zet beide klaar."],
    ],
  },
];

/** Vragen op de overzichtspagina's. */
export const SECTOREN_VRAGEN: [string, string][] = [
  ["Staat mijn sector er niet bij?", "Geen probleem. De bot leert van jouw boekingen en werkt voor elke eenmanszaak of vof. De sectoren hierboven zijn de voorbeelden die we het vaakst zien."],
  ["Verschilt de software per sector?", "Nee. Het is dezelfde boekhouding voor iedereen; de bot past zich aan jouw bonnen, klanten en btw-situatie aan."],
  ["Kan ik eerst gratis proberen?", "Ja, 30 dagen en zonder creditcard. Daarna vanaf € 15 per maand."],
];
export const BEDRIJFSVORMEN_VRAGEN: [string, string][] = [
  ["Welke bedrijfsvorm past bij mij?", "Start je alleen, dan is een eenmanszaak het simpelst. Met een partner wordt het een vof. Een bv is interessant bij hogere winsten of als je je aansprakelijkheid wilt beperken."],
  ["Kan ik overstappen als mijn bedrijfsvorm verandert?", "Ja. Je neemt je historie mee en de bot zet de nieuwe structuur klaar."],
  ["Kan ik eerst gratis proberen?", "Ja, 30 dagen en zonder creditcard. Daarna vanaf € 15 per maand."],
];

export function vindSector(slug: string) { return SECTOREN.find((s) => s.slug === slug); }
export function vindBedrijfsvorm(slug: string) { return BEDRIJFSVORMEN.find((b) => b.slug === slug); }
