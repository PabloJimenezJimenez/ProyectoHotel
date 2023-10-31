// variables para cambiar fondo barra nav superior 
let previousScrollY = window.scrollY;
// variables para cambio de fondo seccion tipos dentro de seccion tiposhab 
const secciones = document.querySelectorAll('.hab');
const tipos = document.getElementById('tiposHab');
//variables para evento para iniciar el carrusel de imagenes de la seccion restaurante
const sectRestaurante = document.getElementById('restaurante');
const imgCarousel = ['rest1', 'rest2', 'rest3'];
let imgGrande = document.querySelector('.img-grande');
let imgSmall = document.querySelector('.img-small');
let flagCarousel = false;
let posCarousel = 0;
let intervalId;
// variables para evento carrusel wellnes 
const sectWellness = document.getElementById('wellnes');
const wellnessClass = ['spa1', 'spa2', 'spa3', 'spa4', 'spa5'];
const imgWellness = document.querySelector('.img-wellness');
let flagWellnes = false;
let pos = 0;
let interval;


window.addEventListener('scroll', () => {
    //cambio de clases menu nav superior 
    let menu = document.getElementById('menu');
    let y = window.scrollY;
    if (y == 0) {
        if (!menu.classList.contains('no-scroll')) {
            menu.classList.add('no-scroll');
            menu.classList.remove('scroll-up');
        }
    } else if ((y != 0) && (y > previousScrollY)) {
        menu.classList.add('scroll-down');
        if (menu.classList.contains('no-scroll')) {
            menu.classList.remove('no-scroll');
        }
        if (menu.classList.contains('scroll-up')) {
            menu.classList.remove('scroll-up');
        }
    } else if ((y != 0) && (y < previousScrollY)) {
        menu.classList.add('scroll-up');
        if (menu.classList.contains('no-scroll')) {
            menu.classList.remove('no-scroll');
        }
        if (menu.classList.contains('scroll-down')) {
            menu.classList.remove('scroll-down');
        }
    }
    previousScrollY = y;
    
    //obtener la posicion de la seccion restaurante e iniciador carrousel restaurante
    const posSecRest = sectRestaurante.getBoundingClientRect();
    if (posSecRest.y < 704 && posSecRest.y > -1000) {
        if (!flagCarousel) { // Inicia el carrusel solo si no está en funcionamiento
            startAutoCarousel();
            flagCarousel = true;
        }
    } else {
        clearInterval(intervalId); // Detiene el carrusel si está fuera de la vista
        flagCarousel = false;
    }

    //obtener la posicion de la seccion wellnes e iniciador carrousel wellness
    const posSectWellnes = sectWellness.getBoundingClientRect();
    if (posSectWellnes.y < 704 && posSectWellnes.y > -1000) {
        if (!flagWellnes) { // Inicia el carrusel solo si no está en funcionamiento
            startCarousel();
            flagWellnes = true;
        }
    } else {
        clearInterval(interval); // Detiene el carrusel si está fuera de la vista
        flagWellnes = false;
    }
})

//recorro el array de secciones (seccion habitacione) y añado un evento mouseenter
secciones.forEach(seccion => {
    seccion.addEventListener('mouseenter', () => {
        // obtengo el id de la seccion en la que estoy 
        const id = seccion.getAttribute('id');
        //condicional para elegir el fondo de la seccion tipos hab
        switch (id) {
            case 'doble': {
                if (tipos.classList.contains('doble-sup')) {
                    tipos.classList.remove('doble-sup');
                } else if (tipos.classList.contains('suite')) {
                    tipos.classList.remove('suite');
                }
                tipos.classList.add('doble');
            }; break;
            case 'dobleSuperior': {
                if (tipos.classList.contains('doble')) {
                    tipos.classList.remove('doble');
                } else if (tipos.classList.contains('suite')) {
                    tipos.classList.remove('suite');
                }
                tipos.classList.add('doble-sup');
            }; break;
            default: {
                if (tipos.classList.contains('doble-sup')) {
                    tipos.classList.remove('doble-sup');
                } else if (tipos.classList.contains('doble')) {
                    tipos.classList.remove('doble');
                }
                tipos.classList.add('suite');
            }
        }
    })
})

//funcion para mostrar las imagenes de la seccion restaurante
function mostrarImagen() {
    if (posCarousel >= imgCarousel.length - 1) {
        posCarousel = 0;
    } else {
        posCarousel++;
    }
    // condicional para cambiar la clase de imgGrande 
    if (posCarousel > 0 && posCarousel < imgCarousel.length) {
        imgGrande.classList.replace(imgCarousel[posCarousel - 1], imgCarousel[posCarousel]);
    } else if (posCarousel == 0) {
        imgGrande.classList.replace(imgCarousel[imgCarousel.length - 1], imgCarousel[posCarousel]);
    }

    // condicional para cambiar la clase de imgSmall 
    if (posCarousel < imgCarousel.length - 1) {
        imgSmall.classList.replace(imgCarousel[posCarousel], imgCarousel[posCarousel + 1])
    } else {
        imgSmall.classList.replace(imgCarousel[posCarousel], imgCarousel[0])
    }

}

//funcion que me llama a la funcion mostrarImagen cada tres segundos (carrousel restaurante) 
function startAutoCarousel() {
    intervalId = setInterval(mostrarImagen, 3000); // Cambio de diapositiva cada 3 segundos
}

//funcion para mostrar las imagenes de la seccion wellness
function mostrarCarrousel() {
    //condicional para saber en que posicion del arrayy me encuentro
    if (pos >= wellnessClass.length - 1) {
        pos = 0;
    } else {
        pos++;
    }
    // condicional para cambiar la clase de imgWellness 
    if (pos > 0 && pos < wellnessClass.length) {
        imgWellness.classList.replace(wellnessClass[pos - 1], wellnessClass[pos]);
    } else if (pos == 0) {
        imgWellness.classList.replace(wellnessClass[wellnessClass.length - 1], wellnessClass[pos]);
    }
}

//funcion que me llama a la funcion mostrarImagen cada tres segundos (carrousel wellness)
function startCarousel() {
    interval = setInterval(mostrarCarrousel, 3000); // Cambio de diapositiva cada 3 segundos
}