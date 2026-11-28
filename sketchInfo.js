let coloriCard = [
  "#C5E3DC", 
  "#F5E7C0", 
  "#F2C9B8", 
  "#F4DEEE", 
  "#D3D3F6"  
];

// contenuti delle cinque card
let etichette = [
  "IL PROGETTO",
  "LA FONTE",
  "DENTRO IL DATABASE",
  "IL NOSTRO METODO",
  "LE FONTI"
];

let titoli = [
  "Prendersi cura è un lavoro, anche quando non viene riconosciuto.",
  "Da dove partono i nostri dati?",
  "Tante variabili, un’unica rete di aiuto.",
  "Dai dati alle visualizzazioni: rendere confrontabili le informazioni.",
  "Ogni dato ha una provenienza."
];

let paragrafi = [
  "Abbiamo scelto di occuparci del caregiving informale in Italia perché è un fenomeno diffuso, ma ancora poco conosciuto e poco valorizzato. A differenza delle professioni di cura, è un lavoro gratuito e spesso svolto all’interno di relazioni familiari o affettive, raramente riconosciuto come tale. Ci interessava capire chi presta questo tipo di aiuto, a chi viene rivolto e quanto tempo richiede, per restituire visibilità a questa dimensione fondamentale della società, ma ancora poco raccontata.",

  "Il progetto nasce dall’analisi dei dati statistici ISTAT relativi all’aiuto informale in Italia. Il nostro punto di partenza è la rilevazione sulle persone che prestano gratuitamente aiuto ad altre persone, dentro o fuori dal proprio nucleo familiare. Abbiamo scelto questa fonte perché offre una base comune e coerente da cui osservare il fenomeno, mettendo in relazione caratteristiche di chi presta aiuto, i destinatari, le attività svolte e il tempo dedicato. Le tavole statistiche sono poi state rielaborate da noi per costruire le visualizzazioni.",

  "Il database raccoglie informazioni che descrivono il caregiving attraverso diverse dimensioni. Tra le variabili principali che abbiamo preso in considerazione troviamo età e genere di chi presta aiuto; a queste si aggiungono le relazioni con i destinatari, le attività, i territori, il tempo e il coinvolgimento di altre forme di supporto. Ogni informazione ci aiuta a leggere il fenomeno da un punto di vista diverso, intrecciando dati e relazioni per osservare come prende forma la rete di cura.",

  "Abbiamo selezionato, ordinato e riorganizzato le tavole per renderle leggibili e confrontabili. Il riferimento principale è la tavola 6, da cui abbiamo ricavato la distribuzione per genere e fasce d'età, mentre dalla tavola 17 abbiamo estratto il dato relativo alle persone che prestano aiuto per meno di 20 ore settimanali e quelle che ne dedicano 20 o più, ricalcolando le percentuali sul totale delle persone che hanno risposto al sondaggio, così da rendere più immediato il confronto tra gruppi. Per il grafico delle bolle abbiamo incrociato la distribuzione delle ore con la quota di caregiver ricavata dalla tavola 12, costruendo un confronto basato sull'intero campione.",

  "Le visualizzazioni si basano sulle tavole ISTAT della rilevazione ISTAT: Tavole 2, 3, 6, 12, 13, 14, 17 e 18. Queste tabelle costituiscono la base di partenza per leggere e interpretare il fenomeno del caregiving. Il nostro lavoro di analisi e riorganizzazione ha permesso di costruire il database di progetto e realizzare le visualizzazioni, facendo emergere le relazioni tra variabili. I valori originali restano la fonte dei dati; le trasformazioni sono parte del nostro processo di lavoro."
];

// colori e variabili generali
let coloreSfondo = "#F1F1F1";
let coloreTesto = "#1E1E1E";
let coloreSecondario = "#444444";

let marginePagina = 45;
let larghezzaCard;
let altezzaPagina;

let posizioneCard = [];
let altezzaCard = [];

let dimensioneTitolo;
let dimensioneSottotitolo;
let dimensioneEtichetta;
let dimensioneTitoloCard;
let dimensioneTesto;

let interlineaTesto = 22;
let interlineaTitolo = 30;

let margineInterno = 42;


// creo il canvas e preparo la pagina
function setup() {

  createCanvas(windowWidth, 1200);

  textFont("Instrument Sans");

  calcolaImpaginazione();

  resizeCanvas(windowWidth, altezzaPagina);

}


// funzione per calcolare le dimensioni della pagina
function calcolaImpaginazione() {

  // controllo se lo schermo è desktop o mobile
  if (width >= 1100) {

    larghezzaCard = min(620, (width - 180) / 2);

    dimensioneTitolo = 50;
    dimensioneSottotitolo = 22;
    dimensioneTitoloCard = 25;
    dimensioneTesto = 16;

  } else {

    larghezzaCard = width - 90;

    dimensioneTitolo = min(42, width * 0.085);
    dimensioneSottotitolo = 18;
    dimensioneTitoloCard = 23;
    dimensioneTesto = 15;

  }

  dimensioneEtichetta = 12;

  // preparo i font per calcolare le righe
  textFont("Instrument Sans");
  textStyle(BOLD);
  textSize(dimensioneTitolo);

  let righeTitolo = calcolaRighe(
    "Leggere i dati, riconoscere la cura.",
    width - 2 * marginePagina
  );

  // calcolo l'altezza del titolo
  let altezzaTitolo = righeTitolo.length * (dimensioneTitolo + 2);

  // calcolo le righe del sottotitolo
  textStyle(ITALIC);
  textSize(dimensioneSottotitolo);

  let righeSottotitolo = calcolaRighe(
    "Un percorso tra numeri e visualizzazioni per esplorare le caratteristiche dei caregiver, le persone assistite e le diverse forme di aiuto.",
    width - 2 * marginePagina
  );

  let altezzaSottotitolo =
    righeSottotitolo.length * (dimensioneSottotitolo + 5);

  // posizione iniziale delle card
  let yIniziale = 80 + altezzaTitolo + altezzaSottotitolo + 65;

  posizioneCard = [];
  altezzaCard = [];

  // calcolo dimensioni e posizione delle cinque card
  for (let i = 0; i < 5; i++) {

    // larghezza disponibile per i testi
    let larghezzaTesto = larghezzaCard - 2 * margineInterno;

    // calcolo le righe del titolo interno
    textStyle(BOLD);
    textSize(dimensioneTitoloCard);

    let righeTitoloCard = calcolaRighe(
      titoli[i],
      larghezzaTesto
    );

    // calcolo le righe del paragrafo
    textStyle(NORMAL);
    textSize(dimensioneTesto);

    let righeParagrafo = calcolaRighe(
      paragrafi[i],
      larghezzaTesto
    );

    // calcolo altezza necessaria per ogni card
    let spazioEtichetta = 18;
    let spazioTitolo = righeTitoloCard.length * interlineaTitolo;
    let spazioParagrafo = righeParagrafo.length * interlineaTesto;

    let altezza =
      margineInterno +
      spazioEtichetta +
      15 +
      spazioTitolo +
      17 +
      spazioParagrafo +
      margineInterno;

    // altezza minima delle card
    altezza = max(altezza, 270);

    altezzaCard[i] = altezza;

    // calcolo posizione orizzontale
    let x;

    if (width >= 1100) {

      if (i % 2 === 0) {
        x = marginePagina;
      } else {
        x = width - marginePagina - larghezzaCard;
      }

    } else {

      x = marginePagina;

    }

    // salvo posizione della card
    posizioneCard[i] = {
      x: x,
      y: yIniziale
    };

    // spazio tra una card e la successiva
    yIniziale += altezza + 65;

  }

  // calcolo spazio per footer e margine finale
  altezzaPagina = yIniziale + 100;

}


// funzione per andare a capo automaticamente
function calcolaRighe(testo, larghezzaMassima) {

  let parole = testo.split(" ");
  let righe = [];
  let riga = "";

  for (let i = 0; i < parole.length; i++) {

    let prova = riga + parole[i] + " ";

    if (textWidth(prova) > larghezzaMassima && riga !== "") {

      righe.push(riga.trim());
      riga = parole[i] + " ";

    } else {

      riga = prova;

    }

  }

  if (riga !== "") {
    righe.push(riga.trim());
  }

  return righe;

}


// disegno principale della pagina
function draw() {

  background(coloreSfondo);

  textFont("Instrument Sans");
  textAlign(LEFT, TOP);
  noStroke();

  // titolo principale
  fill(coloreTesto);
  textStyle(BOLD);
  textSize(dimensioneTitolo);

  let righeTitolo = calcolaRighe(
    "Leggere i dati, riconoscere la cura.",
    width - 2 * marginePagina
  );

  let yTitolo = 80;

  for (let i = 0; i < righeTitolo.length; i++) {

    text(
      righeTitolo[i],
      marginePagina,
      yTitolo + i * (dimensioneTitolo + 2)
    );

  }

  // sottotitolo
  fill(coloreSecondario);
  textStyle(ITALIC);
  textSize(dimensioneSottotitolo);

  let righeSottotitolo = calcolaRighe(
    "Un percorso tra numeri e visualizzazioni per esplorare le caratteristiche dei caregiver, le persone assistite e le diverse forme di aiuto.",
    width - 2 * marginePagina
  );

  let ySottotitolo =
    yTitolo + righeTitolo.length * (dimensioneTitolo + 2) + 12;

  for (let i = 0; i < righeSottotitolo.length; i++) {

    text(
      righeSottotitolo[i],
      marginePagina,
      ySottotitolo + i * (dimensioneSottotitolo + 5)
    );

  }

  // disegno le cinque card
  for (let i = 0; i < 5; i++) {

    disegnaCard(
      posizioneCard[i].x,
      posizioneCard[i].y,
      larghezzaCard,
      altezzaCard[i],
      coloriCard[i],
      etichette[i],
      titoli[i],
      paragrafi[i],
      i
    );

  }

  // footer
  fill(coloreSecondario);
  textStyle(NORMAL);
  textSize(11);
  textAlign(LEFT, TOP);

  text(
    "Politecnico di Milano | Corso di laurea in Design della comunicazione | Information Design | Anno accademico 26/27",
    marginePagina,
    altezzaPagina - 65
  );

}


// funzione per disegnare una card a forma di puzzle


function disegnaCard(x, y, larghezza, altezza, coloreCard, etichetta, titolo, paragrafo, indice) {

  push();

  let ctx = drawingContext;

  let raggioAngoli = 28;
  let raggioLinguetta = 32.5;
  let centroLinguettaY = y + altezza / 2;
  let destra = x + larghezza;

  ctx.save();

  ctx.beginPath();

  if (indice % 2 === 0) {

    // Card con linguetta sul lato destro

    ctx.moveTo(x + raggioAngoli, y);

    ctx.lineTo(destra - raggioAngoli, y);
    ctx.quadraticCurveTo(
      destra, y,
      destra, y + raggioAngoli
    );

    ctx.lineTo(destra, centroLinguettaY - raggioLinguetta);

    // Semicerchio esterno destro
    ctx.arc(
      destra,
      centroLinguettaY,
      raggioLinguetta,
      -Math.PI / 2,
      Math.PI / 2
    );

    ctx.lineTo(destra, y + altezza - raggioAngoli);

    ctx.quadraticCurveTo(
      destra, y + altezza,
      destra - raggioAngoli, y + altezza
    );

    ctx.lineTo(x + raggioAngoli, y + altezza);

    ctx.quadraticCurveTo(
      x, y + altezza,
      x, y + altezza - raggioAngoli
    );

    ctx.lineTo(x, y + raggioAngoli);

    ctx.quadraticCurveTo(
      x, y,
      x + raggioAngoli, y
    );

  } else {

    // Card con linguetta sul lato sinistro

    ctx.moveTo(x + raggioAngoli, y);

    ctx.lineTo(destra - raggioAngoli, y);

    ctx.quadraticCurveTo(
      destra, y,
      destra, y + raggioAngoli
    );

    ctx.lineTo(destra, y + altezza - raggioAngoli);

    ctx.quadraticCurveTo(
      destra, y + altezza,
      destra - raggioAngoli, y + altezza
    );

    ctx.lineTo(x + raggioAngoli, y + altezza);

    ctx.quadraticCurveTo(
      x, y + altezza,
      x, y + altezza - raggioAngoli
    );

    ctx.lineTo(x, centroLinguettaY + raggioLinguetta);

    // Semicerchio esterno sinistro
    ctx.arc(
      x,
      centroLinguettaY,
      raggioLinguetta,
      Math.PI / 2,
      Math.PI * 3 / 2
    );

    ctx.lineTo(x, y + raggioAngoli);

    ctx.quadraticCurveTo(
      x, y,
      x + raggioAngoli, y
    );

  }

  ctx.closePath();

  // Un'unica ombra per tutta la sagoma
  ctx.fillStyle = coloreCard;
  ctx.shadowColor = "#AEAEC0";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 5;

  ctx.fill();

  ctx.restore();

  // Area interna dei testi
  let xTesto = x + margineInterno;
  let yTesto = y + margineInterno;

  let larghezzaTesto = larghezza - 2 * margineInterno;

  // Etichetta della card
  fill(coloreTesto);
  textStyle(BOLD);
  textSize(dimensioneEtichetta);
  textAlign(LEFT, TOP);

  text(
    etichetta,
    xTesto,
    yTesto
  );

  // Titolo della card
  textStyle(BOLD);
  textSize(dimensioneTitoloCard);

  let righeTitolo = calcolaRighe(
    titolo,
    larghezzaTesto
  );

  let yTitolo = yTesto + 33;

  for (let i = 0; i < righeTitolo.length; i++) {

    text(
      righeTitolo[i],
      xTesto,
      yTitolo + i * interlineaTitolo
    );

  }

  // Paragrafo descrittivo
  textStyle(NORMAL);
  textSize(dimensioneTesto);
  fill(coloreSecondario);

  let righeParagrafo = calcolaRighe(
    paragrafo,
    larghezzaTesto
  );

  let yParagrafo =
    yTitolo + righeTitolo.length * interlineaTitolo + 17;

  for (let i = 0; i < righeParagrafo.length; i++) {

    text(
      righeParagrafo[i],
      xTesto,
      yParagrafo + i * interlineaTesto
    );

  }

  pop();

}




// funzione per adattare la pagina quando cambia la finestra
function windowResized() {

  calcolaImpaginazione();

  resizeCanvas(
    windowWidth,
    altezzaPagina
  );

}
