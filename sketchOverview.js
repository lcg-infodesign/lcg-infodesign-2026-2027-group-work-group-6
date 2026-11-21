//array colori per le età
let coloriEta = [
  "#52B5D5",
  "#8383F7",
  "#EA336C",
  "#F2A8DF",
  "#EC612A",
  "#F6C543",
  "#54B8A0"
];

//array colori per sfondo pezzi puzzle
let coloriPuzzle = [
  "#C4E2EB",
  "#D3D3F6",
  "#F2BBCC",
  "#F4DEEE",
  "#F2C9B8",
  "#F5E7C0",
  "#C5E3DC"
];

//array fasce d'età
let fasceEta = [
  "18 - 24",
  "25 - 34",
  "35 - 44",
  "45 - 54",
  "55 - 64",
  "65 - 74",
  "75 +"
];

//salvo a quantti px voglio lasciare di margine laterale
let marginePagina = 47;
//gutter
let spazioColonne = 20;

let larghezzaColonna;
let xSinistra;  //serve per indicare la posizione orizzontale di titolo
let ySinistra;
let larghezzaSinistra;  //salva le colonne da sinistra usate


function setup() {

  let canvas = createCanvas(windowWidth, windowHeight - 62);  //-62 perchè l'header viene creato prima, quindi la pagina inizia più sotto

  canvas.style("display", "block");  //canvas = elemento tipo blocco

  noStroke();

  //griglia di 12 colonne
  larghezzaColonna = (width - 2 * marginePagina - 11 * spazioColonne) / 12;


  //variabili che useremo per scrivere il testo
  xSinistra = marginePagina;
  ySinistra = 15;

  //9 colonne per titolo
  larghezzaSinistra = 9 * larghezzaColonna + 8 * spazioColonne;

}


function draw() {

  background("#F1F1F1");
  textFont("Instrument Sans");
  textAlign(LEFT, TOP);

  //titolo
  fill("#1E1E1E");

  textSize(46);
  textStyle(BOLD);
  textLeading(50);

  text(
    "Chi si prende cura degli\naltri e per quanto tempo?",
    xSinistra,
    ySinistra
  );

  //sottotitolo
  fill("#444444");
  textSize(22);
  textStyle(ITALIC);

  let ySottotitolo = ySinistra + 107;

  //Italia creo una variabile perchè mi serve poi calcolare lo sppazio che il testo occupa in larghezza
  let testoItalia = "Italia, ";
  text(testoItalia, xSinistra, ySottotitolo);
  
  //2024 grassetto
  let xAnno = xSinistra + textWidth(testoItalia); //funzione che calcola la larghezza del testo
  textStyle(BOLDITALIC);

  text("2024", xAnno, ySottotitolo);

  //dopo 2024
  let xTesto = xAnno + textWidth("2024");
  textStyle(ITALIC);

  text(
    ". Intensità dell’aiuto informale per genere e fasce d’età.", xTesto, ySottotitolo
  );

}