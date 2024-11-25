// JavaScript para el Carrusel de Congresos
let currentCongreso = 0;
const congresos = document.getElementsByClassName("slides-congresos");
const totalCongresos = congresos.length;
const prevCongresos = document.querySelector(".prev-congresos");
const nextCongresos = document.querySelector(".next-congresos");
const tabButtons = document.querySelectorAll(".tab-button");

function showCongreso(index) {
    for (let i = 0; i < totalCongresos; i++) {
        congresos[i].classList.remove("active");
        tabButtons[i].classList.remove("active");
    }
    congresos[index].classList.add("active");
    tabButtons[index].classList.add("active");
}

function nextCongreso() {
    currentCongreso = (currentCongreso + 1) % totalCongresos;
    showCongreso(currentCongreso);
}

function prevCongresoFunc() {
    currentCongreso = (currentCongreso - 1 + totalCongresos) % totalCongresos;
    showCongreso(currentCongreso);
}

// Eventos de los botones del Carrusel de Congresos
nextCongresos.addEventListener("click", function(){
    nextCongreso();
});

prevCongresos.addEventListener("click", function(){
    prevCongresoFunc();
});

// Evento para las pestañas
tabButtons.forEach((button, index) => {
    button.addEventListener("click", function() {
        currentCongreso = index;
        showCongreso(currentCongreso);
    });
});

// JavaScript para los Carruseles de Posters
const postersCarousels = document.querySelectorAll(".posters-carousel");

postersCarousels.forEach(function(carousel) {
    let currentPoster = 0;
    const posters = carousel.getElementsByClassName("slides-posters");
    const totalPosters = posters.length;
    const congressoData = carousel.getAttribute('data-congreso');
    const prevPoster = document.querySelector(`.prev-poster[data-congreso="${congressoData}"]`);
    const nextPoster = document.querySelector(`.next-poster[data-congreso="${congressoData}"]`);
    const dotsContainer = document.querySelector(`.indicator[data-congreso="${congressoData}"]`);
    const dots = dotsContainer.getElementsByClassName("dot");

    function showPosterFunc(index) {
        for (let i = 0; i < totalPosters; i++) {
            posters[i].classList.remove("active");
            dots[i].classList.remove("active");
        }
        posters[index].classList.add("active");
        dots[index].classList.add("active");
        currentPoster = index;
    }

    function nextPosterFunc() {
        currentPoster = (currentPoster + 1) % totalPosters;
        showPosterFunc(currentPoster);
    }

    function prevPosterFunc() {
        currentPoster = (currentPoster - 1 + totalPosters) % totalPosters;
        showPosterFunc(currentPoster);
    }

    // Eventos de los botones del Carrusel de Posters
    nextPoster.addEventListener("click", function(){
        nextPosterFunc();
        resetTimerPosters();
    });

    prevPoster.addEventListener("click", function(){
        prevPosterFunc();
        resetTimerPosters();
    });

    // Eventos de los dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function(){
            let index = parseInt(this.getAttribute("data-index"));
            if (!isNaN(index)) {
                showPosterFunc(index);
                resetTimerPosters();
            }
        });
    }

    // Auto-cambio de slides de Posters cada 5 segundos
    let timerPosters = setInterval(nextPosterFunc, 5000);

    function resetTimerPosters() {
        clearInterval(timerPosters);
        timerPosters = setInterval(nextPosterFunc, 5000);
    }

    // Inicializar el carrusel de posters
    showPosterFunc(currentPoster);
});

// Inicializar el carrusel de congresos
showCongreso(currentCongreso);
