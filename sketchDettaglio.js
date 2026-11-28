let margine = 24;
let altezzaHeader = 55;

let xSecondaSezione = margine + 280;
let ySezioni = 145;
let ySelettori = 199;
let yContenitore = 255;
let altezzaSelettore = 38;

let generi = ["DONNA", "UOMO", "TOTALE"];
let genereSelezionato = "UOMO";

let fasceEta = ["18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"];
let coloriEta = ["#52B5D5", "#8383F7", "#EA336C", "#F2A8DF", "#EC612A", "#F6C543", "#54B8A0"];

let coloriEtaChiari = [
  "#C4E2EB",
  "#D3D3F6",
  "#F2BBCC",
  "#F4DEEE",
  "#F2C9B8",
  "#F5E7C0",
  "#C5E3DC"
];

let etaSelezionata = 3;
let larghezzaGenere = 270;
let larghezzaEta = 455;

let paddingContenitore;
let gapBox;
let altezzaBox;
let larghezzaBox = [];
let proporzioniBox = [0.221, 0.554, 0.453];

let scorrimento = 0;
let scorrimentoObiettivo = 0;
let raggioFreccia = 20;

let larghezzaPulsante = 120;
let distanzaPulsanti = 30;

// nomi delle tipologie di aiuto e colonne del CSV
let tipologieAiuto = [
  ["Economico", "tavola_2_aiuto_economico"],
  ["Sanitario", "tavola_2_prestazioni_sanitarie"],
  ["Assistenza adulti", "tavola_2_assistenza_adulti"],
  ["Accudimento bambini", "tavola_2_accudimento_bambini"],
  ["Aiuto nello studio", "tavola_2_aiuto_nello_studio"],
  ["Cibo, vestiario, ecc.", "tavola_2_cibo_vestiario_ecc"],
  ["Attività domestiche", "tavola_2_attivita_domestiche"],
  ["Compagnia", "tavola_2_compagnia_accompagnamento_ospitalita"],
  ["Pratiche burocratiche", "tavola_2_pratiche_burocratiche"],
  ["Extra domestico", "tavola_2_lavoro_extra_domestico"],
  ["Uso di internet", "tavola_2_uso_internet_strumenti_digitali"],
  ["Altro", "tavola_2_altro_aiuto_a_persone"]
];

// valori delle percentuali
let valoriAiuto = [];

async function setup(){
  let canvas = createCanvas(windowWidth, windowHeight - altezzaHeader);
  canvas.style('display', 'block');

  database = await loadTable("assets/DatabaseEtaGenere (1).csv", ",", "header");

  calcolaMisure();


}

function draw(){
  background('#F1F1F1');
  noStroke();

  // titolo
  fill('#202020');
  textFont('Instrument Sans');
  textStyle(BOLD);
  textSize(38);
  textLeading(40);
  textAlign(LEFT, TOP);
  text("A chi viene prestato aiuto, attraverso quali\nattività e a quali persone?", margine, 18);

  // sottotitolo
  fill('#3A3A3A');
  textStyle(ITALIC);
  textSize(22);
  text("Esplora la fascia d'età e il genere selezionato.", margine, 103);

  // etichette delle sezioni
  fill('#404040');
  textStyle(BOLD);
  textSize(12);
  textAlign(LEFT, TOP);
  text("01 | PANORAMICA", margine, ySezioni);
  text("02 | FOCUS / AIUTI A PERSONE NON COABITANTI", xSecondaSezione, ySezioni);

  // descrizioni sotto le etichette
  textStyle(ITALIC);
  textSize(10);
  text("Destinatari dell'aiuto", margine, ySezioni + 16);
  text("Tipologia di aiuto e relazione con i destinatari dell'aiuto", xSecondaSezione, ySezioni + 16);

  disegnaSelettoreGenere();
  disegnaSelettoreEta();
  disegnaContenitoreGrafici();
  disegnaPulsanti();
}

// rettangolo bianco dietro ai box rosa
function disegnaContenitore(x, y, larghezza, altezza, raggio){
  drawingContext.shadowOffsetX = 4;
  drawingContext.shadowOffsetY = 4;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = '#AEAEC0';

  fill('#F1F1F1');
  noStroke();
  rect(x, y, larghezza, altezza, raggio);

  drawingContext.shadowColor = 'transparent';
}

// bottoni genere
function disegnaSelettoreGenere(){
  disegnaContenitore(margine, ySelettori, larghezzaGenere, altezzaSelettore, altezzaSelettore / 2);

  let larghezzaPillola = larghezzaGenere / generi.length;

  for(let i = 0; i < generi.length; i++){
    let x = margine + i * larghezzaPillola;

    if(genereSelezionato == generi[i]){
      fill('#1E1E1E');
      rect(x, ySelettori, larghezzaPillola, altezzaSelettore, altezzaSelettore / 2);
      fill('#FFFFFF');
      textStyle(BOLD);
    }else{
      fill('#1E1E1E');
      textStyle(NORMAL);
    }

    textSize(12);
    textAlign(CENTER, CENTER);
    text(generi[i], x + larghezzaPillola / 2, ySelettori + altezzaSelettore / 2);
  }
}

// bottoni età
function disegnaSelettoreEta(){
  disegnaContenitore(xSecondaSezione, ySelettori, larghezzaEta, altezzaSelettore, altezzaSelettore / 2);

  let larghezzaPillola = larghezzaEta / fasceEta.length;

  for(let i = 0; i < fasceEta.length; i++){
    let x = xSecondaSezione + i * larghezzaPillola;

    if(etaSelezionata == i){
      fill(coloriEta[i]);
      rect(x, ySelettori, larghezzaPillola, altezzaSelettore, altezzaSelettore / 2);
      fill('#FFFFFF');
      textStyle(BOLD);
    }else{
      fill('#1E1E1E');
      textStyle(NORMAL);
    }

    textSize(12);
    textAlign(CENTER, CENTER);
    text(fasceEta[i], x + larghezzaPillola / 2, ySelettori + altezzaSelettore / 2);
  }
}

function mousePressed(){
  if(mouseY >= ySelettori && mouseY <= ySelettori + altezzaSelettore){

    // click sul selettore del genere
    if(mouseX >= margine && mouseX <= margine + larghezzaGenere){
      let indice = floor((mouseX - margine) / (larghezzaGenere / generi.length));
      genereSelezionato = generi[indice];
    }

    // click sul selettore dell'età
    if(mouseX >= xSecondaSezione && mouseX <= xSecondaSezione + larghezzaEta){
      etaSelezionata = floor((mouseX - xSecondaSezione) / (larghezzaEta / fasceEta.length));
    }
  }

  // click sulle frecce
  let yFreccia = yContenitore + (altezzaBox + paddingContenitore * 2) / 2;

  if(scorrimentoObiettivo == 0){
    if(dist(mouseX, mouseY, width - margine - 40, yFreccia) < raggioFreccia){
      scorrimentoObiettivo = calcolaScorrimentoMassimo();
    }
  }else{
    if(dist(mouseX, mouseY, margine + 40, yFreccia) < raggioFreccia){
      scorrimentoObiettivo = 0;
    }
  }

  // click sui pulsanti in basso
  let yPulsanti = calcolaYPulsanti();

  if(mouseSuPulsante(margine, yPulsanti)){
    window.location.href = "overview.html";
  }
}

// box rosa
function disegnaContenitoreGrafici(){
  let larghezzaContenitore = width - margine * 2;
  let altezzaContenitore = altezzaBox + paddingContenitore * 2;

  disegnaContenitore(margine, yContenitore, larghezzaContenitore, altezzaContenitore, 24);

  scorrimento = lerp(scorrimento, scorrimentoObiettivo, 0.15);

  // tutto quello che disegno tra save e restore viene tagliato al contenitore
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.roundRect(margine, yContenitore, larghezzaContenitore, altezzaContenitore, 24);
  drawingContext.clip();

  fill(coloriEtaChiari[etaSelezionata]);
  noStroke();

  let x = margine + paddingContenitore - scorrimento;

  for(let i = 0; i < larghezzaBox.length; i++){
    rect(x, yContenitore + paddingContenitore, larghezzaBox[i], altezzaBox, 20);
    x += larghezzaBox[i] + gapBox;
  }

  drawingContext.restore();

// disegno il grafico della tipologia di aiuto
  disegnaGraficoTipologiaAiuto();

  disegnaFrecce();
}

// calcola lo scorrimento massimo dei box rosa
function calcolaScorrimentoMassimo(){
  let larghezzaContenuto = paddingContenitore * 2 + gapBox * (larghezzaBox.length - 1);
  for(let i = 0; i < larghezzaBox.length; i++){
    larghezzaContenuto += larghezzaBox[i];
  }
  let larghezzaContenitore = width - margine * 2;
  return max(0, larghezzaContenuto - larghezzaContenitore);
}

// freccia tonda a destra
function disegnaFrecciaTonda(x, y, verso){
  drawingContext.shadowOffsetX = 3;
  drawingContext.shadowOffsetY = 3;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = '#AEAEC0';
  fill('#F1F1F1');
  noStroke();
  ellipse(x, y, raggioFreccia * 2, raggioFreccia * 2);
  drawingContext.shadowColor = 'transparent';

  stroke('#1E1E1E');
  strokeWeight(2);
  noFill();
  line(x - 3 * verso, y - 6, x + 3 * verso, y);
  line(x + 3 * verso, y, x - 3 * verso, y + 6);
  noStroke();
}

// freccia tonda a sinistra
function disegnaFrecce(){
  if(calcolaScorrimentoMassimo() == 0){
    return;
  }

  let y = yContenitore + (altezzaBox + paddingContenitore * 2) / 2;

  if(scorrimentoObiettivo == 0){
    disegnaFrecciaTonda(width - margine - 40, y, 1);
  }else{
    disegnaFrecciaTonda(margine + 40, y, -1);
  }
}

function calcolaMisure(){
  paddingContenitore = width * 0.01;
  gapBox = width * 0.01;

  let spazioSotto = distanzaPulsanti + altezzaSelettore + 24;
  altezzaBox = height - yContenitore - paddingContenitore * 2 - spazioSotto;
  altezzaBox = max(altezzaBox, 150);

  for(let i = 0; i < proporzioniBox.length; i++){
    larghezzaBox[i] = width * proporzioniBox[i];
  }
}

function calcolaYPulsanti(){
  return yContenitore + altezzaBox + paddingContenitore * 2 + distanzaPulsanti;
}

function disegnaPulsante(testo, x, y, verso){
  let hover = mouseSuPulsante(x, y);

  disegnaContenitore(x, y, larghezzaPulsante, altezzaSelettore, altezzaSelettore / 2);

  if(hover){
    fill('#1E1E1E');
    noStroke();
    rect(x, y, larghezzaPulsante, altezzaSelettore, altezzaSelettore / 2);
  }

  let coloreTesto = '#1E1E1E';
  if(hover){
    coloreTesto = '#FFFFFF';
  }

  fill(coloreTesto);
  noStroke();
  textStyle(BOLD);
  textSize(11);
  textAlign(CENTER, CENTER);

  let xFreccetta;
  if(verso == -1){
    xFreccetta = x + 20;
    text(testo, x + larghezzaPulsante / 2 + 10, y + altezzaSelettore / 2);
  }else{
    xFreccetta = x + larghezzaPulsante - 20;
    text(testo, x + larghezzaPulsante / 2 - 10, y + altezzaSelettore / 2);
  }

  let yFreccetta = y + altezzaSelettore / 2;
  stroke(coloreTesto);
  strokeWeight(1.5);
  noFill();
  line(xFreccetta - 3 * verso, yFreccetta - 5, xFreccetta + 3 * verso, yFreccetta);
  line(xFreccetta + 3 * verso, yFreccetta, xFreccetta - 3 * verso, yFreccetta + 5);
  noStroke();
}

function disegnaPulsanti(){
  let y = calcolaYPulsanti();
  let xIndietro = margine;
  let xConfronta = width - margine - larghezzaPulsante;

  disegnaPulsante("INDIETRO", xIndietro, y, -1);
  disegnaPulsante("CONFRONTA", xConfronta, y, 1);

  if(mouseSuPulsante(xIndietro, y) || mouseSuPulsante(xConfronta, y)){
    cursor(HAND);
  }else{
    cursor(ARROW);
  }
}

function mouseSuPulsante(x, y){
  return mouseX >= x && mouseX <= x + larghezzaPulsante &&
         mouseY >= y && mouseY <= y + altezzaSelettore;
}
function disegnaGraficoTipologiaAiuto(){

  // leggo i dati del genere e dell'età selezionati
  leggiDatiAiuto();

  // posizione del secondo box rosa
  let xBox = margine + paddingContenitore + larghezzaBox[0] + gapBox - scorrimento;
  let yBox = yContenitore + paddingContenitore;

  let larghezza = larghezzaBox[1];

  // taglio il disegno all'interno del secondo box
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.roundRect(xBox, yBox, larghezza, altezzaBox, 20);
  drawingContext.clip();

  noStroke();
  textFont("Instrument Sans");

  // titolo del grafico
  fill("#1E1E1E");
  textStyle(BOLD);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Tipologia di aiuto", xBox + 16, yBox + 18);

  // dimensioni delle due colonne
  let larghezzaColonna = (larghezza - 48) / 2;

  // distanza verticale tra le tipologie
  let altezzaRiga = (altezzaBox - 75) / 6;

  // disegno le 12 tipologie
  for(let i = 0; i < 12; i++){

    // stabilisco in quale colonna disegnare
    let colonna = 0;
    let indice = i;

    if(i >= 6){
      colonna = 1;
      indice = i - 6;
    }

    let x = xBox + 16 + colonna * (larghezzaColonna + 16);
    let y = yBox + 47 + indice * altezzaRiga;

    // nome della tipologia
    fill("#303030");
    textStyle(NORMAL);
    textSize(12);
    textAlign(LEFT, TOP);
    text(tipologieAiuto[i][0], x, y);

    // dimensioni della barra
    let larghezzaBarra = larghezzaColonna - 48;
    let altezzaBarra = 10;

    let yBarra = y + 19;

    // barra di sfondo bianca
    noStroke();
    fill("#FFFFFF");
    rect(x, yBarra, larghezzaBarra, altezzaBarra, 10);

    // calcolo la lunghezza proporzionale alla percentuale
    let lunghezzaPiena = map(
      valoriAiuto[i],
      0,
      40,
      0,
      larghezzaBarra
    );

    lunghezzaPiena = min(lunghezzaPiena, larghezzaBarra);

    // barra colorata
    fill(coloriEta[etaSelezionata]);
    rect(x, yBarra, lunghezzaPiena, altezzaBarra, 10);

    // percentuale accanto alla barra
    fill("#1E1E1E");
    textStyle(BOLD);
    textSize(12);
    textAlign(LEFT, CENTER);

    text(
      round(valoriAiuto[i]) + "%",
      x + larghezzaBarra + 12,
      yBarra + altezzaBarra / 2
    );
  }

  drawingContext.restore();
}

function leggiDatiAiuto(){

  // traduco il genere selezionato nel valore del CSV
  let genereCSV;

  if(genereSelezionato == "DONNA"){
    genereCSV = "femmine";
  }else if(genereSelezionato == "UOMO"){
    genereCSV = "maschi";
  }else{
    genereCSV = "entrambi";
  }

  // traduco la fascia d'età nel valore del CSV
  let fasciaCSV = fasceEta[etaSelezionata];

  if(fasciaCSV == "75+"){
    fasciaCSV = "75 e più";
  }

  // cerco la riga corrispondente nel database
  for(let i = 0; i < database.getRowCount(); i++){

    if(database.get(i, "genere") == genereCSV &&
       database.get(i, "fascia_eta") == fasciaCSV){

      // salvo le percentuali delle 12 tipologie
      valoriAiuto = [];

      for(let j = 0; j < tipologieAiuto.length; j++){

        let valore = database.getNum(i, tipologieAiuto[j][1]);

        valoriAiuto.push(valore);
      }

      return;
    }
  }
}
