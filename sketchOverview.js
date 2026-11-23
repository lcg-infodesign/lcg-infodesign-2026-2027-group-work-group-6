let data;

//pulsanti ordina e disordina
let ordinaAttivo = false;  //ricorda quale dei due pulsanti è selezionato
let xBottoni = 30;
let yBottoni = 239;

//griglia
let marginePagina = 30;
let spazioColonne = 15;
let larghezzaColonna;
let xSinistra = 30;
let ySinistra = 79;

//array fasce d'età
let fasceEtaCSV = [
  "18-24", "25-34", "35-44", "45-54",
  "55-64", "65-74", "75 e più"
];

//array colori scritte e pallini pieni
let coloriEta = [
  "#52B5D5", "#8383F7", "#EA336C", "#F2A8DF",
  "#EC612A", "#F6C543", "#54B8A0"
];

//array colori puzzle
let coloriPuzzle = [
  "#C4E2EB", "#D3D3F6", "#F2BBCC", "#F4DEEE",
  "#F2C9B8", "#F5E7C0", "#C5E3DC"
];

//array che salvano le percentuali: meno di 20 ore, più di 20 ore, non aiutano di donne e uomini
let datiDonne = [];
let datiUomini = [];

//array di 100 pallini 
let palliniOrdinatiDonne = [];
let palliniOrdinatiUomini = [];
let palliniCasualiDonne = [];
let palliniCasualiUomini = [];


async function setup() {

  createCanvas(windowWidth, windowHeight - 55);  //tolgo l'header
  frameRate(30);

  //creo griglia
  larghezzaColonna = (
    width - 2 * marginePagina - 11 * spazioColonne
  ) / 12;

  data = await loadTable("assets/DatabaseEtaGenere (1).csv", ",", "header");

  //leggo dati conenuti nel csv
  for (let i = 0; i < data.getRowCount(); i++) {

    let riga = data.getRow(i);  //salvo la riga da leggere
    let genere = riga.getString("genere");
    let fascia = riga.getString("fascia_eta");

    let indiceEta = fasceEtaCSV.indexOf(fascia); //trova un elemento in un array e restituisce la posizione
    //serve per abbinare fasce d'età ai pezzi di puzzle

    //non usare le righe del csv entrambi e totale
    if (indiceEta === -1) continue;  //continue serve per saltare e passare alla riga successiva
    if (genere !== "femmine" && genere !== "maschi") continue;

    //percentuali dal CSV
    let meno20 = riga.getNum("tavola_17_meno_20_ore");
    let piu20 = riga.getNum("tavola_17_20_ore_o_piu");
    let nonAiutano = riga.getNum("tavola_17_non_aiutano");

    //salvo dati delle donne
    if (genere === "femmine") {
      datiDonne[indiceEta] = [
        meno20,
        piu20,
        nonAiutano
      ];
    } else {
      //dati degli uomini
      datiUomini[indiceEta] = [
        meno20,
        piu20,
        nonAiutano
      ];
    }
  }


  //preparo pallini ordinati e quelli casuali
  for (let i = 0; i < 7; i++) {  //7 fasce d'età

    // pallini nell'ordine: bianchi, contorno, pieni
    palliniOrdinatiDonne[i] = creaPallini(datiDonne[i]);
    palliniOrdinatiUomini[i] = creaPallini(datiUomini[i]);

    //funzione che mescola casualmente gli elementi di un array
    palliniCasualiDonne[i] = shuffle(
      palliniOrdinatiDonne[i]
    );
    palliniCasualiUomini[i] = shuffle(
      palliniOrdinatiUomini[i]
    );
  }

}


function draw() {

  background("#F1F1F1");

  //mi creo la griglia
  stroke("#BDBDBD");
  strokeWeight(1);
  for (let i = 0; i < 12; i++) {

    let xColonna = marginePagina + i * (larghezzaColonna + spazioColonne);

    line(xColonna, 0, xColonna, height);

    line(xColonna + larghezzaColonna, 0, xColonna + larghezzaColonna, height);
  }

  noStroke();

  textFont("Instrument Sans");
  textAlign(LEFT, TOP);

  // titolo
  fill("#1E1E1E");
  textStyle(BOLD);
  textSize(50);
  textLeading(49);  //distanza verticale tra le righe
  text(
    "Chi si prende cura degli altri\ne per quanto tempo?", xSinistra, ySinistra
  );

  // sottotitolo
  push();

  fill("#444444");
  textStyle(ITALIC);
  textSize(28);
  let ySottotitolo = ySinistra + 106;
  let testoItalia = "Italia,";  //salvo la parola perchè poi mi serve capire quanto spazio occupa
  text(testoItalia, xSinistra, ySottotitolo);

  let xAnno = xSinistra + textWidth(testoItalia) + 6;  //funzione che calcola quanto è largo un testo
  textStyle(BOLDITALIC);
  text("2024", xAnno, ySottotitolo);

  let xTesto = xAnno + textWidth("2024");
  textStyle(ITALIC);
  text(
    ". Intensità dell’aiuto informale per genere e fasce d’età.", xTesto, ySottotitolo
  );

  pop();


  //richiamo funzione pulsanti ordina e disordina
  disegnaBottoni();


  //chiamo funzione contenitore ombra donne
  disegnaContenitore(30, 350, 1380, 264, 20);
  fill("#444444");
  textStyle(BOLD);
  textSize(20);
  textAlign(LEFT, TOP);
  text("DONNE", 30, 312);

  //chiamo funzione contenitore ombra uomini
  disegnaContenitore(30, 678, 1380, 264, 20);
  fill("#444444");
  textStyle(BOLD);
  textSize(20);
  textAlign(LEFT, TOP);
  text("UOMINI", 30, 639);

  //posizione x e larghezza pezzi puzzle
  let xPezzi = 49;
  let larghezzaPezzo = 189.15;

  //chiamo funzione disegno i pezzi arrotondati e i cerchi per gli incastri
  disegnaPuzzle(390);   //y=390 per donne
  disegnaPuzzle(718);  //y=718 per uomini


  //disegno 100 pallini per ogni pezzo di puzzle
  for (let i = 0; i < 7; i++) {

    // calcolo la posizione orizzontale di ogni pezzo
    let xPezzo = xPezzi + i * larghezzaPezzo;

    let tipiDonne;
    let tipiUomini;

    //salvo in variabili i pallini ordinati o casuali in base al pulsante premuto
    if (ordinaAttivo) {
      tipiDonne = palliniOrdinatiDonne[i];
      tipiUomini = palliniOrdinatiUomini[i];
    } else {
      tipiDonne = palliniCasualiDonne[i];
      tipiUomini = palliniCasualiUomini[i];
    }

    //chiamo funzione disegna pallini donne
    disegnaPallini( xPezzo, 390, tipiDonne, coloriEta[i]);
    //chiamo funzione disegna pallini uomini
    disegnaPallini( xPezzo, 718, tipiUomini, coloriEta[i]);

  }
}

//creo funzione che disegna contenitore con ombre
function disegnaContenitore(x, y, larghezza, altezza, raggio) {
  //raggio mi serve per arrotondare i bordi
  push();

  noStroke();
  fill("#F1F1F1");

  //variabile di sistema che consente di accedere agli strumenti grafici e quindi di creare ombre https://p5js.org/reference/p5/drawingContext/
  //ombra superiore
  drawingContext.shadowColor = "#FFFFFF";  //colore ombra
  drawingContext.shadowBlur = 29.57;  //sfumatura ombra
  drawingContext.shadowOffsetX = -9.86;  //spostamento orizzontale dell'ombra 
  drawingContext.shadowOffsetY = -9.86;  //spostamento verticale dell'ombra
  rect(x, y, larghezza, altezza, raggio);

  //ombra inferiore
  drawingContext.shadowColor = "#AEAEC0";
  drawingContext.shadowBlur = 16.46;
  drawingContext.shadowOffsetX = 3.94;
  drawingContext.shadowOffsetY = 3.94;
  rect(x, y, larghezza, altezza, raggio);

  pop();
}


//creo funzione che disegna i pulsanti
function disegnaBottoni() {

  push();
  noStroke();
  fill("#F1F1F1");

  //ombra superiore 
  drawingContext.shadowColor = "#FFFFFF";
  drawingContext.shadowBlur = 30;
  drawingContext.shadowOffsetX = -10;
  drawingContext.shadowOffsetY = -10;
  rect(xBottoni, yBottoni, 218, 48, 30);
  //ombra inferiore 
  drawingContext.shadowColor = "#AEAEC0";
  drawingContext.shadowBlur = 16.7;
  drawingContext.shadowOffsetX = 4;
  drawingContext.shadowOffsetY = 4;
  rect(xBottoni, yBottoni, 218, 48, 30);

  //prima di inserire le scritte togliamo le ombre dato che i testi non le devono avere
  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;

  // testo dei pulsanti
  textFont("Instrument Sans");
  textStyle(BOLD);
  textSize(12);
  textAlign(CENTER, CENTER);

  //controllo quale pulsante è stato selezionato
  if (ordinaAttivo) {  //ordina è selezionato

    fill("#1E1E1E");
    rect(xBottoni + 5, yBottoni + 5, 96, 38, 20);

    fill("#F1F1F1");
    text("ORDINA", xBottoni + 53, yBottoni + 24);

    fill("#1E1E1E");
    text("DISORDINA", xBottoni + 164.5, yBottoni + 24);
  } else {  //disordina è selezionato

    fill("#1E1E1E");
    rect(xBottoni + 116, yBottoni + 5, 97, 38, 20);

    fill("#1E1E1E");
    text("ORDINA", xBottoni + 53, yBottoni + 24);

    fill("#F1F1F1");
    text("DISORDINA", xBottoni + 164.5, yBottoni + 24);
  }

  pop();
}

//creo funzione per disegnare i pezzi di puzzle arrotondati e i cerchietti laterali
function disegnaPuzzle(yPezzi) {

  let xPezzi = 49;
  let larghezzaPezzo = 189.15;
  let altezzaPezzo = 188.01;
  let diametroCerchio = 34.74;
  //array posizione verticale dei cerchi
  let posizioneCerchi = [45, 135, 45, 135, 45, 135, 45];

  noStroke();

  //ciclo per creare puzzle arrotondati
  for (let i = 0; i < 7; i++) {

    let xPezzo = xPezzi + i * larghezzaPezzo;

    fill(coloriPuzzle[i]);
    rect( xPezzo, yPezzi, larghezzaPezzo, altezzaPezzo, 20);
  }

  //aggiungo cerchi/incastri
  for (let i = 0; i < 7; i++) {

    let xCerchio = xPezzi + (i + 1) * larghezzaPezzo;  //aggiungo 1 perchè i cerchi si trovano sul bordo destro del pezzo

    //mi serve la condizione per far sì che il primo e il secondo cerchio siano entrambi viola
    if (i === 0) {
      fill(coloriPuzzle[1]);
    } else {
      fill(coloriPuzzle[i]);
    }

    circle( xCerchio, yPezzi + posizioneCerchi[i], diametroCerchio);
  }
}

//creo funzione con cui trasformo le percentuali in 100 pallini
function creaPallini(percentuali) {
  //prendo valore percentuale dall'array e lo arrotondo al numero intero più vicino https://p5js.org/reference/p5/round/ 
  let quantiContorno = round(percentuali[0]);
  let quantiPieni = round(percentuali[1]);  

  //calcolo i bianchi sottraendo i due valori precedentemente arrotondati
  let quantiBianchi = 100 - quantiContorno - quantiPieni;

  //array per contenere tutti i pallini
  let pallini = [];

  //cicli per riempire l'array che avrà come valori 0,1,2
  for (let i = 0; i < quantiBianchi; i++) {
    pallini.push(0);  //0 per pallino bianco
  }
  for (let i = 0; i < quantiContorno; i++) {
    pallini.push(1);  //1 per pallino con bordo
  }
  for (let i = 0; i < quantiPieni; i++) {
    pallini.push(2);  //2 per pallino colorato pieno
  }

  return pallini;
}

//creo funzione disegno pallini in griglia
function disegnaPallini(xPezzo, yPezzo, pallini, coloreEta) {

  //dimensioni griglia
  let larghezzaGriglia = 143.12;
  let altezzaGriglia = 142.24;
  //diametro pallino
  let diametroPallino = 11.59;

  //posiziono la griglia al centro del pezzo di puzzle
  let xGriglia = xPezzo + (189.15 - larghezzaGriglia) / 2;
  let yGriglia = yPezzo + (188.01 - altezzaGriglia) / 2;

  //calcolo la distanza orizzontale e verticale tra i pallini
  let passoX = (larghezzaGriglia - diametroPallino) / 9;
  let passoY = (altezzaGriglia - diametroPallino) / 9;

  //pallino con stroke colorato (opacità al 70%). https://p5js.org/reference/p5.Color/setAlpha/
  let coloreContorno = color(coloreEta);  //con la funzione color creo un oggetto colore che posso modificare
  coloreContorno.setAlpha(179);  //modifico trasparenza usando scala 0 - 255

  //disegno 100 pallini, uso due cicli per disporli lungo righe e colonne
  for (let riga = 0; riga < 10; riga++) {

    for (let colonna = 0; colonna < 10; colonna++) {

      let indice = riga * 10 + colonna;  //trasformo sequenza di valori in una griglia 

      //coordinate del centro di ogni pallino
      let x = xGriglia + diametroPallino / 2 + colonna * passoX;
      let y = yGriglia + diametroPallino / 2 + riga * passoY;

      if (pallini[indice] === 0) {
        noStroke();
        fill("#F6F6F6");
      } else if (pallini[indice] === 1) {
        stroke(coloreContorno);
        strokeWeight(2.7);
        fill("#F6F6F6");
      } else {
        noStroke();
        fill(coloreEta);
      }
      circle(x, y, diametroPallino);
    }
  }

  noStroke();
}


//clic su pulsante ordina/disordina
function mousePressed() {

  //se il mouse si trova sotto o sopra i pulsanti non eseguo le istruzioni successive
  if (mouseY < yBottoni || mouseY > yBottoni + 48) {
    return;
  }
  //controllo se è stato cliccato il pulsante ordina
  if (mouseX >= xBottoni && mouseX < xBottoni + 109) {
    ordinaAttivo = true;
  }
  //pulsante disordina
  if (mouseX >= xBottoni + 109 && mouseX <= xBottoni + 218) {
    ordinaAttivo = false;
  }
}