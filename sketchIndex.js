let colonne = 10;
let righe = 10; 
let margineRelativo = 0.113; // margine tra il bordo del quadrato e i pallini: 11,3% del lato
let diametroRelativo = 0.79; // il pallino è il 79% della sua cella: nel wireframe sono più grandi e vicini
let coloreChiaro = '#F6F6F6';

let coloreScuro = '#404040';
let numeroScuri = 36;
let indiciScuri = []; // qui salviamo quali pallini (numeri da 0 a 99) sono scuri

function setup() {
    let contenitore = document.getElementById('contenitore-puzzle');
    let lato = contenitore.clientWidth; // legge la larghezza del quadrato in pixel
    let tela = createCanvas(lato, lato); // crea un canvas quadrato grande quanto il quadrato grigio
    tela.parent('contenitore-puzzle'); // mette il canvas dentro il quadrato grigio, invece che in fondo alla pagina
    
    noStroke();
    scegliScuri();
    noLoop(); // il disegno non si anima, quindi draw() viene eseguita una volta sola
}

function scegliScuri() { // sceglie a caso i 36 pallini scuri
    let tuttiGliIndici = []; // lista con tutti i numeri da 0 a 99

    for (let i = 0; i < colonne * righe; i++) { // ripete 100 volte (10 x 10)
        tuttiGliIndici.push(i); // aggiunge il numero i alla lista
    }

    tuttiGliIndici = shuffle(tuttiGliIndici); // mescola la lista a caso
    indiciScuri = tuttiGliIndici.slice(0, numeroScuri); // tiene solo i primi 36 della lista mescolata
}

function draw() { 
    clear(); // lascia il canvas trasparente, così si vede il grigio del quadrato
    let margine = width * margineRelativo; // margine in pixel: larghezza del canvas per 0,12
    let lato = width - 2 * margine; // lo spazio per i pallini: la larghezza meno i due margini
    let cella = lato / colonne; // la grandezza di una cella della griglia
    let diametro = cella * diametroRelativo; // il diametro dei pallini: il 70% della cella

    for (let r = 0; r < righe; r++) { // ripete per ogni riga, da 0 a 9
        for (let c = 0; c < colonne; c++) { // in ogni riga, ripete per ogni colonna, da 0 a 9
            let indice = r * colonne + c; // il numero del pallino da 0 a 99: riga per 10 più la colonna
            if (indiciScuri.includes(indice)) { // se questo numero è nella lista dei 36 scuri...
                fill(coloreScuro); // ...usa il grigio scuro
                } else { 
                fill(coloreChiaro);
                }   
            let x = margine + c * cella + cella / 2; // x del centro: margine + c celle + metà cella
            let y = margine + r * cella + cella / 2; // y del centro: stessa cosa in verticale
            circle(x, y, diametro);
        }
    }
}

function windowResized() { // p5 la esegue quando cambi la dimensione della finestra
  let contenitore = document.getElementById('contenitore-puzzle'); // trova di nuovo il quadrato grigio
  let lato = contenitore.clientWidth; // legge la sua nuova larghezza
  resizeCanvas(lato, lato); // adatta il canvas e lo ridisegna
}