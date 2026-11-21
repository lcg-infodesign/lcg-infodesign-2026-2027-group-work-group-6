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
let marginePagina = 25;

//gutter
let spazioColonne = 15;

let larghezzaColonna;
let xSinistra;  //serve per indicare la posizione orizzontale di titolo
let ySinistra;


function setup() {

  let canvas = createCanvas(windowWidth, windowHeight - 62);  //-62 perchè l'header viene creato prima, quindi la pagina inizia più sotto

  canvas.style("display", "block");  //canvas = elemento tipo blocco

  noStroke();

  //griglia di 12 colonne
  larghezzaColonna = (width - 2 * marginePagina - 11 * spazioColonne) / 12;
  //variabili per scrivere il testo
  xSinistra = marginePagina;
  ySinistra = 25;

}


function draw() {

  background("#F1F1F1");

  //visualizzo la griglia
  stroke("#BDBDBD");
  strokeWeight(1);
  for (let i = 0; i < 12; i++) {

    let xColonna = marginePagina + i * (larghezzaColonna + spazioColonne);
    line(xColonna, 0, xColonna, 210);
    line(
      xColonna + larghezzaColonna,
      0,
      xColonna + larghezzaColonna,
      210
    );

  }

  noStroke();

  textFont("Instrument Sans");
  textAlign(LEFT, TOP);

  //titolo
  fill("#1E1E1E");
  textStyle(BOLD);
  textSize(50);
  textLeading(54);
  text(
    "Chi si prende cura degli altri\ne per quanto tempo?",
    xSinistra,
    ySinistra
  );

  //sottotitolo
  fill("#444444");
  textSize(28);
  textStyle(ITALIC);

  let ySottotitolo = ySinistra + 115;

  //Italia creo una variabile perchè mi serve poi calcolare lo sppazio che il testo occupa in larghezza
  let testoItalia = "Italia,";
  text(testoItalia, xSinistra, ySottotitolo);
  //2024 grassetto
  let xAnno = xSinistra + textWidth(testoItalia) + 6; //funzione che calcola la larghezza del testo
  textStyle(BOLDITALIC);
  text("2024", xAnno, ySottotitolo);
  //dopo 2024
  let xTesto = xAnno + textWidth("2024");
  textStyle(ITALIC);
  text(
    ". Intensità dell’aiuto informale per genere e fasce d’età.",
    xTesto,
    ySottotitolo
  );

}