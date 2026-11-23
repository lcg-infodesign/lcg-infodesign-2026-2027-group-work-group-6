let puzzle1;
let puzzle2;
let puzzle3;
let puzzle4;
let puzzle5;
let puzzle6;

async function setup(){
    createCanvas(windowWidth, windowHeight);
    
    //associo a ogni puzzle la sua immagine fronte e retro
    puzzle1 = {
    fronte : await loadImage("assets/facce-01.svg"),
    retro : await loadImage("assets/facce-01Retro.svg"),
    posX : -95,
    posY : -290,
    

    girato : false
     }

      puzzle2 = {
    fronte : await loadImage("assets/facce-02.svg"),
    retro : await loadImage("assets/facce-02Retro.svg"),
    posX : -110,
    posY : -295,
    
    
    girato : false
     }

    puzzle3 = {
    fronte : await loadImage("assets/facce-03.svg"),
    retro : await loadImage("assets/facce-03Retro.svg"),
    posX : -125,
    posY : -295,
    

    girato : false
     }

    puzzle4 = {
    fronte : await loadImage("assets/facce-04.svg"),
    retro : await loadImage("assets/facce-04Retro.svg"),
    posX : -100,
    posY : -310,
    
    
    girato : false
     }

    puzzle5 = {
    fronte : await loadImage("assets/facce-05.svg"),
    retro : await loadImage("assets/facce-05Retro.svg"),
    posX : -110,
    posY : -305,
    
    
    girato : false
     }

    puzzle6 = {
    fronte : await loadImage("assets/facce-06.svg"),
    retro : await loadImage("assets/facce-06Retro.svg"),
    posX : -120,
    posY : -315,
   
    
    girato : false
     }

}

function draw(){
    background('#F1F1F1');
    
//titolo
fill('#1E1E1E');
noStroke();

textFont("Instrument Sans");
textAlign(LEFT);
textFont("Instrument Sans");
textStyle(BOLD);
textSize(49);
textLeading(48);
text("Sei persone,\nun unico progetto", 40, 55);

//sottotitolo
fill('#444444');

textStyle(ITALIC);
textSize(15);
text("Ogni pezzo di puzzle contribuisce all’insieme.", 40, 130);


textStyle(ITALIC);
textSize(15);
text("Come nelle reti di aiuto che abbiamo indagato, anche questo progetto nasce dalla collaborazione.", 40, 150);
textStyle(NORMAL);
text("Passa il mouse sulle tessere per conoscere il team!", 40, 180);

//scritta sotto
fill('#1E1E1E');
textSize(9);
textAlign(LEFT);
text("Politecnico di Milano | Corso di laurea in Design della comunicazione | Information Design | Anno accademico 26/27", 40, height -20);

//disegno puzzle: puzzle non girato = fronte, puzzle girato = retro
    if(puzzle1.girato == false){
        image(puzzle1.fronte, puzzle1.posX, puzzle1.posY);
    } else {
        image(puzzle1.retro, puzzle1.posX, puzzle1.posY);

    fill("#52B5D5");
    noStroke();

    
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(16);
    text("Ruolo", 420, 270);


    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text("SOFIA\nD'AURIA", 500, 340);
       
    }

    if(puzzle2.girato == false){
        image(puzzle2.fronte, puzzle2.posX, puzzle2.posY);
    } else {
        image(puzzle2.retro, puzzle2.posX, puzzle2.posY);


    fill("#F6C543");
    noStroke();

    
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(16);
    text("Ruolo", 660, 250);

  
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text("BEATRICE\nZUILA\nMURATAORI", 750, 340);
       
    }

    if(puzzle3.girato == false){
        image(puzzle3.fronte, puzzle3.posX, puzzle3.posY);
    } else {
        image(puzzle3.retro, puzzle3.posX, puzzle3.posY);


    fill("#EC612A");
    noStroke();

    
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(16);
    text("Ruolo", 920, 250);

  
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text("STELLA\nLUCREZIA\nNGOLONG", 1000, 340);
       
    }

    if(puzzle4.girato == false){
        image(puzzle4.fronte, puzzle4.posX, puzzle4.posY);
    } else {
        image(puzzle4.retro, puzzle4.posX, puzzle4.posY);


    fill("#F2A8DF");
    noStroke();

    
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(16);
    text("Ruolo", 420, 500);

   
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text("LAURA\nPETRALIA", 500, 580);
       
    }

    if(puzzle5.girato == false){
        image(puzzle5.fronte, puzzle5.posX, puzzle5.posY);
    } else {
        image(puzzle5.retro, puzzle5.posX, puzzle5.posY);


    fill("#EA336C");
    noStroke();


    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(16);
    text("Ruolo", 660, 500);

    
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text("GAIA\nRESTELLI", 750, 580);
       
    }

    if(puzzle6.girato == false){
        image(puzzle6.fronte, puzzle6.posX, puzzle6.posY);
    } else {
        image(puzzle6.retro, puzzle6.posX, puzzle6.posY);


    fill("#8383F7");
    noStroke();

    // RUOLO: in alto a sinistra
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(16);
    text("Ruolo", 900, 500);

    // NOME: sotto e centrato
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text("ELVIRA\nSANNINO", 1000, 580);
       
    }


}

//quando clicco la carta si gira
function mousePressed(){

    if(mouseX > puzzle1.posX &&
       mouseX < puzzle1.posX + puzzle1.fronte.width &&
       mouseY > puzzle1.posY &&
       mouseY < puzzle1.posY + puzzle1.fronte.height){

        if(puzzle1.girato == false){
            puzzle1.girato = true;
        } else {
            puzzle1.girato = false;
        }
    }

    if(mouseX > puzzle2.posX &&
       mouseX < puzzle2.posX + puzzle2.fronte.width &&
       mouseY > puzzle2.posY &&
       mouseY < puzzle2.posY + puzzle2.fronte.height){

        if(puzzle2.girato == false){
            puzzle2.girato = true;
        } else {
            puzzle2.girato = false;
        }
    }

    if(mouseX > puzzle3.posX &&
       mouseX < puzzle3.posX + puzzle3.fronte.width &&
       mouseY > puzzle3.posY &&
       mouseY < puzzle3.posY + puzzle3.fronte.height){

        if(puzzle3.girato == false){
            puzzle3.girato = true;
        } else {
            puzzle3.girato = false;
        }
    }

    if(mouseX > puzzle4.posX &&
       mouseX < puzzle4.posX + puzzle4.fronte.width &&
       mouseY > puzzle4.posY &&
       mouseY < puzzle4.posY + puzzle4.fronte.height){

        if(puzzle4.girato == false){
            puzzle4.girato = true;
        } else {
            puzzle4.girato = false;
        }
    }

    if(mouseX > puzzle5.posX &&
       mouseX < puzzle5.posX + puzzle5.fronte.width &&
       mouseY > puzzle5.posY &&
       mouseY < puzzle5.posY + puzzle5.fronte.height){

        if(puzzle5.girato == false){
            puzzle5.girato = true;
        } else {
            puzzle5.girato = false;
        }
    }

    if(mouseX > puzzle6.posX &&
       mouseX < puzzle6.posX + puzzle6.fronte.width &&
       mouseY > puzzle6.posY &&
       mouseY < puzzle6.posY + puzzle6.fronte.height){

        if(puzzle6.girato == false){
            puzzle6.girato = true;
        } else {
            puzzle6.girato = false;
        }
    }

}
