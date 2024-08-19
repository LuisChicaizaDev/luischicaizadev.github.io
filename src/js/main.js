'use strict';
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    customCursor();
    fixedNavigation();
    scrollNav();
    scrollFunction();
    imagesModal();
}
//Custom cursor
function customCursor(){
    const cursor = document.querySelector('.cursor-custom');
    const links = document.querySelectorAll('A');
    const linksProjects = Array.from(document.querySelectorAll('#projects A')).slice(0, -1);
    const linkToTop = document.querySelector('.to-top__button');
    const linkLogo = document.querySelector('.logo');

    //Position the cursor
    document.addEventListener('mousemove', e =>{
        cursor.setAttribute('style', 'top:'+(e.pageY - 10)+'px; left:'+(e.pageX - 10)+'px;');
    });

    document.addEventListener('mouseout', () =>{
        cursor.setAttribute('style', 'display:none');
    });

    document.addEventListener('click', () => {
        cursor.classList.add('cursor-expand');

        setTimeout(() => {
            cursor.classList.remove('cursor-expand');
        },200);
    });

    function handleMouseEnterExpand() {
        cursor.classList.add('cursor-expand');
    }

    function handleMouseLeaveExpand() {
        cursor.classList.remove('cursor-expand');
    }

    function handleMouseEnterExpandGray() {
        cursor.classList.add('cursor-expand-gray');
    }

    function handleMouseLeaveExpandGray() {
        cursor.classList.remove('cursor-expand-gray');
    }

    //Hover buttons khaki
    links.forEach(link => {
        link.addEventListener('mouseenter', handleMouseEnterExpand);
        link.addEventListener('mouseleave', handleMouseLeaveExpand);
    });

    //Hover buttons gray
    linksProjects.forEach(link => {
        link.addEventListener('mouseenter', handleMouseEnterExpandGray);
        link.addEventListener('mouseleave', handleMouseLeaveExpandGray);
    });

    //Hover button to top
    linkToTop.addEventListener('mouseenter', () => {
        cursor.classList.remove('cursor-expand');
    });
    
    linkLogo.addEventListener('mouseenter', () => {
        cursor.classList.remove('cursor-expand');
    });
}

//Fixed Navigation
function fixedNavigation() {
    const nav = document.querySelector('.my-nav .nav__list');
    const sectionHeader = document.querySelector('#header');
    const sectionAbout = document.querySelector('#about-me');
    const sectionExperience = document.querySelector('#experience');
    const sectionProjects = document.querySelector('#projects');
    const sectionContact = document.querySelector('#contact');

    const links = {
        aboutMe: document.querySelector('#link-about'),
        experience: document.querySelector('#link-experience'),
        projects: document.querySelector('#link-projects'),
        contact: document.querySelector('#link-contact')
    };

    window.addEventListener('scroll', function() {
        //Con el metodo conseguimos detectar la posicion de la sección y activamos el nav
        //Se activa cuando sobre pasa la parte de abajo de la sección
        if (sectionHeader.getBoundingClientRect().bottom < 100) {
            nav.classList.add('fixed');
            document.body.classList.add('no-scroll');
        } else {
            nav.classList.remove('fixed');
            document.body.classList.remove('no-scroll');
        }

        // Determinar qué sección está actualmente a la vista
        let currentSection = null;

        if (sectionContact.getBoundingClientRect().top < 100) {
            currentSection = 'contact';
        } else if (sectionProjects.getBoundingClientRect().top < 100) {
            currentSection = 'projects';
        } else if (sectionExperience.getBoundingClientRect().top < 100) {
            currentSection = 'experience';
        } else if (sectionAbout.getBoundingClientRect().top < 100) {
            currentSection = 'aboutMe';
        }

        // Elimina la clase active de los enlaces
        for (let key in links) {
            if (links.hasOwnProperty(key)) {
                links[key].classList.remove('nav__link--active');
            }
        }

        // Agrega la clase active al enlace de la sección actual
        if (currentSection) {
            links[currentSection].classList.add('nav__link--active');
        }
    });
}

//scroll smooth para la navegación
function scrollNav(){
    const navLinks = document.querySelectorAll('.nav__list a');

    navLinks.forEach( links  =>{
        links.addEventListener('click', function(e){
            e.preventDefault(); //para prevenir la acción por defecto del scroll

            //configuramos un nuevo comportamiento del scroll
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

//Modal slider
function createCarousel(images) {
    const container = document.querySelector('.carouselContainer');
    container.classList.add('show'); // Mostrar el modal del carrusel

    const btnClose = document.createElement('P');
    btnClose.classList.add('btn-close-modal', 'btn-khaki');
    btnClose.innerText = "Cerrar";

    // Crear HTML del carrusel
    let carouselHTML = `
        <div id="slider" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
    `;

    // Usar forEach para recorrer las imágenes
    images.forEach((image, index) => {
        const activeClass = index === 0 ? 'active' : ''; // La primera imagen será activa por defecto
        carouselHTML += `
        <div class="carousel-item ${activeClass}">
            <img src="${image.src}" class="d-block w-100 image-modal" alt="${image.alt}">
        </div>
        `;
    });

    // Finalizar HTML del carrusel
    carouselHTML += `
        </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;

    // Insertar el HTML del carrusel en el contenedor
    container.innerHTML = carouselHTML;

    // Agregar el botón de cerrar modal
    container.appendChild(btnClose);

    // Inicializar el carrusel con Bootstrap
    const myCarousel = new bootstrap.Carousel(document.querySelector('#slider'), {
      touch: true,
    });

    // Evento para cerrar el modal
    btnClose.addEventListener('click', () => {
        container.innerHTML = '';  // Limpia el contenido del carrusel al cerrar
        container.classList.remove('show');
    });
}
// Galería de proyectos con imágenes
const projectImages = {
    project1: [
        { src: '../../src/img/proyecto-aera.png', alt: 'Imagen de Proyecto 1 - 1' },
        { src: '../../src/img/proyecto-aera.png', alt: 'Imagen de Proyecto 1 - 2' },
        { src: '../../src/img/proyecto-aera.png', alt: 'Imagen de Proyecto 1 - 3' }
    ],
    project2: [
        { src: '../../src/img/default.png', alt: 'Imagen de Proyecto 2 - 1' },
        { src: '../../src/img/default.png', alt: 'Imagen de Proyecto 2 - 2' },
        { src: '../../src/img/default.png', alt: 'Imagen de Proyecto 2 - 3' }
    ]
};

// Función para manejar el clic en cualquier proyecto
function handleProjectClick(event) {
    const projectId = event.currentTarget.dataset.project;
    console.log('Project ID:', projectId);  // Verifica el ID obtenido

    // Si el proyecto existe en projectImages, crea el carrusel
    if (projectImages[projectId]) { 
        createCarousel(projectImages[projectId]); 
    }
}

// Añadir eventos a las imágenes de los proyectos
function imagesModal() {
    const projectImagesElements = document.querySelectorAll('.projects__column--image');
    
    projectImagesElements.forEach(image => {
        image.addEventListener('click', handleProjectClick); 
    });
}

//Back to top
function scrollFunction() {
    const scrollTopBtn = document.querySelector(".to-top__button");

    window.addEventListener("scroll", function() {
        // Obtiene la posición actual de desplazamiento vertical del cuerpo del documento
        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop; 
        // Calcula la altura total del contenido desplazable en la ventana del navegador
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        // Calcula la opacidad del elemento según la posición de desplazamiento actual
        const scrollOpacity = scrollPosition / windowHeight;

        if (scrollPosition > 200) {
            scrollTopBtn.classList.add('active');
            } else {
            scrollTopBtn.classList.remove('active');
        }
        
        let opacityDefault = 0.25;
        scrollTopBtn.style.opacity = opacityDefault + scrollOpacity;

    });

    scrollTopBtn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollTopBtn.style.opacity = 1;
    });
}
