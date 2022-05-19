const video1Url = "videos/ActPrev1Full.mp4";
const video2Url = "videos/ActPrev2Full.mp4";
const video3Url = "videos/ActPrev3Full.mp4";
const video4Url = "videos/ActPrev4Full.mp4";
const video5Url = "videos/ActPrev5Full.mp4";

const bar1Url = "imagenes/avance_0.png";
const bar2Url = "imagenes/avance_2.png";
const bar3Url = "imagenes/avance_3.png";
const bar4Url = "imagenes/avance_4.png";
const bar5Url = "imagenes/avance_5.png";

let videoImg; //Imagen del primer fotograma del video
let videoDiv; //Referencia del div creado en HTML para acomodar el tamaño del video 
let video; //Variable global de video. Solo reemplazar en esta variable los demás videos
let videoIsPlaying = false;
let arrayVideos = [video1Url, video2Url, video3Url, video4Url, video5Url];
let videoCounter = 0;

let arrayBar = [bar1Url, bar2Url, bar3Url, bar4Url, bar5Url];

let wd, hg;
let imgPetro;
let petroPressed;

let playButton;
let progressBar;

//Variables para las ventanas de ayuda y de créditos
let helpDiv;
let helpIsShowed;
let creditsDiv;
let creditsIsShowed;

//Línea de tiempo
let divPetro;
let divVideos;
let boolVideo = true;
var intVideo = 0;


function preload() {
    // imgPetro = createImg("imagenes/petroImg.png", "img-petro");
    // imgPetro = loadImage("imagenes/petroImg.png");
}

function setup() {
    background(255, 204, 0);

    //Variables de la ventana
    canvasDiv = document.getElementById("div-canvas"); //Referencio el objeto del DOM de HTML para sacar su tamaño

    //Obtengo el tamaño del div-canvas que puse en HTML. No es pantalla completa
    wd = canvasDiv.clientWidth;
    hg = canvasDiv.clientHeight;

    //Creación de botones
    playButton = createImg("imagenes/PausaBotton.png", "Botón de reproducción y pausa");
    helpButton = createImg("imagenes/AyudaBotton.png", "Botón de ayuda");
    backButton = createImg("imagenes/izquierda.png", "Botón de atrás");
    backButtonCreditos = createImg("imagenes/izquierda.png", "Botón de atrás");
    progressBar = createImg("imagenes/avance_1.png", "Barra de progreso");  
    // petrin =  reateImg("imagenes/petroImg.png", "img-petro");   

    twitterButton = createImg("imagenes/gorjeo.png", "Botón de Twitter");
    facebookButton = createImg("imagenes/facebook.png", "Bottón de Facebook");
    whatsappButton = createImg("imagenes/whatsapp.png", "Botón de WhatsApp");

    petroPressed= false;

    var myCanvas = createCanvas(wd, hg);
    myCanvas.parent("div-canvas");

    //Asignación de DOM a los botones (para editar sus posiciones, tamaños, etc, en CSS)
    progressBar.parent("div-progressbar");
    helpButton.parent("div-nav");
    playButton.parent("div-playBtn");
    backButton.parent("div-help");
    backButtonCreditos.parent("div-credits");

    twitterButton.parent("div-socials");
    facebookButton.parent("div-socials");
    whatsappButton.parent("div-socials");

    twitterButton.addClass("btn-socials");
    facebookButton.addClass("btn-socials");
    whatsappButton.addClass("btn-socials");

    twitterButton.mousePressed(twitterLink);
    facebookButton.mousePressed(facebookLink);
    whatsappButton.mousePressed(whatsappLink);

    helpButton.addClass("btns-control");
    playButton.addClass("btns-control");
    backButton.addClass("btn-volver");
    backButtonCreditos.addClass("btn-volver");
    
    playButton.mousePressed(toggleVideo);

    video = createVideo(video1Url);
    video.id('video');
    videoDiv = document.getElementById("div-video");
    video.parent("div-video");
    video.size(videoDiv.clientWidth, videoDiv.clientHeight);
    vidIsPlaying = true;

    video.onended(progressVideo);
    
    progressBar.id('progressBar');

    //Creación de la barra de progreso usando un Slider
    //slider = createSlider(1, 5, 1, 1);
    //slider.parent("div-timeline");
    //slider.addClass("timeline");

    //Se especifica el div de la ventana de ayuda
    helpDiv = select("#div-help");
    helpDiv.hide(); //Se oculta por el momento
    helpIsShowed = false;

    //Se especifica el div de la ventana de créditos
    creditsDiv = select("#div-credits");
    creditsDiv.hide(); //Se oculta por el momento
    creditsIsShowed = false;

    helpButton.mousePressed(showHelpMessage); //Cuando se presione el boton de ayuda, que haga esta funcion
    backButton.mousePressed(showHelpMessage); //Cuando se presione el boton de atrás, que haga esta funcion
    backButtonCreditos.mousePressed(restartPage);

    divVideos = document.querySelectorAll(".timeline");
    setupPetro();
    
    document.getElementById('defaultCanvas0').remove();

}

function setupPetro() {
    //Linea
    divVideos = document.querySelectorAll(".timeline");
    divPetro = document.getElementById('div-petro');
    divPetro.addEventListener('dragstart', () => {
        divPetro.classList.add('dragging');
        videoIsPlaying = true;
    })

    divPetro.addEventListener('dragend', () => {
        divPetro.classList.remove('dragging');
    })

    divPetro.addEventListener('drop', () => {
        divPetro.classList.remove('dragging');
        intVideo = divPetro.parentNode.id;
        progressVideoRare(intVideo)
    })

    
    divVideos.forEach(divVideo => {
        divVideo.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            divVideo.appendChild(draggable);
        })
    })
}

function showHelpMessage() {    
    var divTodo = select("#div-todo"); //Selecciono el div creado con su ID

    if(!helpIsShowed){
        helpDiv.show(); //Muestro mi div de ayuda que está oculto por defecto
        divTodo.style("filter", "brightness(80%)"); //Oscurezco el fondo del div donde está todo
        helpIsShowed = true; //Pongo un true para que no pase por aquí otra vez
    } else {
        helpDiv.hide();
        divTodo.style("filter", "brightness(100%)");
        helpIsShowed = false;
    }
    
}

function showCreditsMessage() {
    var divTodo = select("#div-todo");
    
    if(!creditsIsShowed){
        creditsDiv.show();
        divTodo.style("filter", "brightness(80%)");
        creditsIsShowed = true;
    } else {
        creditsDiv.hide();
        divTodo.style("filter", "brightness(100%)");
        creditsIsShowed = false;
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    video.size(videoDiv.clientWidth, videoDiv.clientHeight);
  }


function toggleVideo(){
    if(videoIsPlaying){
        video.pause();
        videoIsPlaying= false;
    } else {
        video.play();
        videoIsPlaying= true;
    }
}

function continueVideo(){
    videoCounter++;
}

function progressVideo(){
    videoCounter++;
    if(document.getElementById('video') != null){
        document.getElementById('video').remove();
    }
    
    video = createVideo(arrayVideos[videoCounter]);
    video.id('video');
    video.parent("div-video");
    video.play();
    
    video.size(videoDiv.clientWidth, videoDiv.clientHeight);
    vidIsPlaying = true;
    windowResized()
    video.onended(progressVideo)
    
    updateBar();
    updatePetroPosition(videoCounter);
}

function progressVideoRare(intVideo){
    if(document.getElementById('video') != null){
        document.getElementById('video').remove();
    }
    
    video = createVideo(arrayVideos[intVideo]);
    video.id('video');
    video.parent("div-video");
    video.play();
    
    video.size(videoDiv.clientWidth, videoDiv.clientHeight);
    vidIsPlaying = true;
    windowResized()
    video.onended(progressVideo)
    
    updateBar();
    updatePetroPosition(intVideo);
}

function updateBar(){
    if(videoCounter > 4){
        showCreditsMessage();
    } else {
        document.getElementById('progressBar').remove();
        progressBar = createImg(arrayBar[videoCounter], "Barra de progreso");
        progressBar.parent("div-progressbar");
        progressBar.id('progressBar');

    }
    
    
}

function updatePetroPosition(intDivVideo){
    const draggable = document.querySelector('.draggable');
    divVideos.item(intDivVideo).appendChild(draggable);
}

function twitterLink(){
    window.open("https://twitter.com/intent/tweet?text=Conoce%20al%20candidato%20a%20la%20presidencia%20Gustavo%20Petro&url=https://informa-tu-voto-estudiante-uao.on.drv.tw/candidato-petro/experience.html");
}

function facebookLink(){
    window.open("https://www.facebook.com/sharer/sharer.php?u=https://informa-tu-voto-estudiante-uao.on.drv.tw/candidato-petro/experience.html");
}

function whatsappLink(){
    window.open("https://api.whatsapp.com/send?text=Conoce%20al%20candidato%20a%20la%20presidencia%20Gustavo%20Petro%20https://informa-tu-voto-estudiante-uao.on.drv.tw/candidato-petro/experience.html");
}

function restartPage() {
    window.location.reload();
}