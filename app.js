const tituloCancion = document.querySelector('.Reproductor h1');
const nombreArtista = document.querySelector('.Reproductor p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoPlay = document.getElementById('iconoControl');
const botonPlayPause = document.querySelector('.controles button.play-pause');

const botonAtras = document.querySelector('.controles button.atras');
const botonSiguiente = document.querySelector('.controles button.siguiente');

const canciones =  [
    {
        titulo:'Candy (Live)',
        nombre:'Mk.gee',
        archivo:'Music/Candy_Live.mp3'
    },
    {
        titulo:'Dream Police(Live)',
        nombre:'Mk.gee',
        archivo:'Music/Dream Police_Live.mp3'
    },
    {
        titulo:'Rockman(Live)',
        nombre:'Mk.gee',
        archivo:'Music/ROCKMAN_Live.mp3'
    }
];

let indiceCancion = 0;

function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancion].titulo;
    nombreArtista.textContent = canciones[indiceCancion].nombre;
    cancion.src = canciones[indiceCancion].archivo;
    cancion.addEventListener('loadeddata',function(){});
}
cancion.addEventListener('loadedmetadata',function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

botonPlayPause.addEventListener('click', reproducirPausar);

function reproducirPausar(){
   if(cancion.paused){
       reproducirCancion();   
   } else {
       pausarCancion();
   }
}

function reproducirCancion(){
    cancion.play();
    iconoPlay.classList.add('bi-pause-fill');
    iconoPlay.classList.remove('bi-play-fill');
};

function pausarCancion(){
    cancion.pause();
    iconoPlay.classList.add('bi-play-fill');
    iconoPlay.classList.remove('bi-pause-fill');
};

cancion.addEventListener('timeupdate',function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    };
});

progreso.addEventListener('input',function(){
    cancion.currentTime = progreso.value;
});

botonSiguiente.addEventListener('click',function(){
    indiceCancion = (indiceCancion + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
}); 

botonAtras.addEventListener('click',function(){
    indiceCancion = (indiceCancion-1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});
actualizarInfoCancion();