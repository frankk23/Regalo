// Función para ajustar el volumen y permitir que el usuario inicie el audio
window.addEventListener('load', function() {
    var audio = document.getElementById("miAudio");
    var startButton = document.getElementById("startButton");
    
    // Ajustar el volumen al 30%
    audio.volume = 0.3;

    // Agregar evento para que el usuario inicie la música con un clic
    startButton.addEventListener('click', function() {
        // Iniciar la reproducción cuando el usuario hace clic
        var playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Reproducción iniciada exitosamente
                console.log('Reproducción iniciada');
                // Ocultar el botón de inicio de música
                startButton.style.display = 'none';
            }).catch(function(error) {
                // Si la reproducción es bloqueada, mostrar mensaje en la consola
                console.error('Reproducción bloqueada', error);
            });
        }
    });

    // Otra función que elimina la clase "not-loaded" después de 1 segundo
    const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
    }, 1000);
});

// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
    // Primera estrofa
    { text: "Nunca estaras sola Florcita 🌺", time: 4 },
    { text: "Not tryna be in there", time: 8 },
    { text: "Not tryna be cool", time: 10 },
    { text: "Just tryna be in this", time: 13 },
    { text: "Tell me, are you too?", time: 15 },
    { text: "Can you feel where the wind is?", time: 18 },
    { text: "Can you feel it through?", time: 20 },
    { text: "All of the windows", time: 22 },
    { text: "Inside this room?", time: 24 },
  
    // Pre-coro
    { text: "'Cause I wanna touch you baby", time: 28 },
    { text: "And I wanna feel you too", time: 31 },
    { text: "I wanna see the sunrise", time: 33 },
    { text: "On your sins just me and you", time: 37 },
    { text: "Light it up, on the run", time: 41 },
    { text: "Let's make love tonight", time: 45 },
    { text: "Make it up, fall in love", time: 50 },
    { text: "Try...", time: 53 },
  
    // Estribillo
    { text: "But you'll never be alone", time: 62 },
    { text: "I'll be with you from dusk till dawn", time: 65 },
    { text: "I'll be with you from dusk till dawn", time: 68 },
    { text: "Baby, I'm right here", time: 71 },
    { text: "I'll hold you when things go wrong", time: 74 },
    { text: "I'll be with you from dusk till dawn", time: 76 },
    { text: "I'll be with you from dusk till dawn", time: 79 },
    { text: "Baby, I'm right here", time: 84 },
    { text: "I'll be with you from dusk till dawn", time: 87 },
    { text: "Baby, I'm right here", time: 89 },


    // Segunda estrofa
    { text: "We were shut like a jacket", time: 97 },
    { text: "So do your zip", time: 99 },
    { text: "We would roll down the rapids", time: 101 },
    { text: "To find a wave that fits", time: 103 },
    
    // Pre-coro
    { text: "Can you feel where the wind is?", time: 106 },
    { text: "Can you feel it through?", time: 110 },
    { text: "All of the windows", time: 112 },
    { text: "Inside this room?", time: 116 },
  
    // Estribillo (Repetición)
    { text: "Cause I wanna touch you baby", time: 116 },
    { text: "And I wanna feel you too", time: 120 },
    { text: "I wanna see the sunrise", time: 123 },
    { text: "On your sins just me and you", time: 126 },
    { text: "Light it up, on the run", time: 129 },
    { text: "Let's make love tonight", time: 134 },
    { text: "Make it up, fall in love", time: 141 },
    { text: "Try...", time: 145 },
  
    // Estribillo repetido
    { text: "But you'll never be alone", time: 151 },
    { text: "I'll be with you from dusk till dawn", time: 153 },
    { text: "I'll be with you from dusk till dawn", time: 156 },
    { text: "Baby, I'm right here", time: 160 },
    { text: "I'll hold you when things go wrong", time: 162 },
    { text: "I'll be with you from dusk till dawn", time: 164 },
    { text: "I'll be with you from dusk till dawn", time: 166 },
    { text: "Baby, I'm right here", time: 168 },
    { text: "Aqui me quede Flor :n", time: 170 },
    { text: "Bonita cancion", time: 172 },
    { text: "Nunca estaras sola", time: 174 },
    { text: "Nunca estaras sola", time: 176 },
    { text: "Nunca estaras sola", time: 178 },
    { text: "Bueno, puede ser inmaduro", time: 180 },
    { text: "Bueno, puede ser inmaduro", time: 182 },
    { text: "por que ni nos vimos en persona", time: 184 },
    { text: "por que ni nos vimos en persona", time: 186 },
    { text: "pero de estos meses que hemos hablado", time: 188 },
    { text: "pero de estos meses que hemos hablado", time: 190 },
    { text: "pero de estos meses que hemos hablado", time: 192 },
    { text: "me haz parecido una grandiosa persona", time: 194 },
    { text: "me haz parecido una grandiosa persona", time: 196 },
    { text: "me haz parecido una grandiosa persona", time: 198 },
    { text: "y quisiera que", time: 200 },
    { text: "y quisiera que", time: 202 },
    { text: "y quisiera que", time: 204 },
    { text: "me des una oportunidad para conocernos", time: 206 },
    { text: "me des una oportunidad para conocernos", time: 208 },
    { text: "me des una oportunidad para conocernos", time: 210 },
    { text: "Deseas? :n", time: 212 },
    { text: "Deseas? :n", time: 214 },
    { text: "Deseas? :n", time: 216 },
  
  ];
// Animar las letras
function updateLyrics() {
  var time = audio.currentTime; // Usar el tiempo exacto sin redondear
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.5; // Ajustar duración de efecto de aparición
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

// Actualizar cada 100ms para mayor fluidez en las animaciones de letras
setInterval(updateLyrics, 100);
