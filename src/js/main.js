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
    moreProjects()
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
    const body = document.querySelector('BODY');
    const container = document.querySelector('.carouselContainer');
    container.classList.add('show'); // Mostrar el modal del carrusel

    body.classList.add('block-body');

    const btnClose = document.createElement('P');
    btnClose.classList.add('btn-close-modal', 'btn-khaki');
    btnClose.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-logout">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
    <path d="M9 12h12l-3 -3"></path><path d="M18 15l3 -3"></path></svg>
    <span>Cerrar</span>
    `;

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
        body.classList.remove('block-body');
    });
}
// Galería de proyectos con imágenes
const projectImages = {
    project1: [
        { src: '../../src/img/aera/aera-1.png', alt: 'Mockup del proyecto de Aera' },
        { src: '../../src/img/aera/aera-2.png', alt: 'Mockup del proyecto de Aera' },
        { src: '../../src/img/aera/aera-3.png', alt: 'Mockup del proyecto de Aera' },
        { src: '../../src/img/aera/aera-4.png', alt: 'Mockup del proyecto de Aera' },
        { src: '../../src/img/aera/aera-5.png', alt: 'Mockup del proyecto de Aera' }
    ],
    project2: [
        { src: '../../src/img/anexa-luxury/anexa-1.png', alt: 'Mockup del proyecto de Anexa Luxury Cars' },
        { src: '../../src/img/anexa-luxury/anexa-2.png', alt: 'Mockup del proyecto de Anexa Luxury Cars' },
        { src: '../../src/img/anexa-luxury/anexa-3.png', alt: 'Mockup del proyecto de Anexa Luxury Cars' },
        { src: '../../src/img/anexa-luxury/anexa-4.png', alt: 'Mockup del proyecto de Anexa Luxury Cars' },
        { src: '../../src/img/anexa-luxury/anexa-5.png', alt: 'Mockup del proyecto de Anexa Luxury Cars' },
        { src: '../../src/img/anexa-luxury/anexa-6.png', alt: 'Mockup del proyecto de Anexa Luxury Cars' }
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

// Mostrar más proyectos
function moreProjects(){
    const moreProjectsButton = document.querySelector('.more-projects__button button');
    const showProjects = document.querySelector('.more__projects');
    const textButton = moreProjectsButton.querySelector('SPAN');

    moreProjectsButton.addEventListener('click', () =>{
        
        let height = 0;
        if(showProjects.clientHeight == '0'){
            height = showProjects.scrollHeight;
            showProjects.style.height = `${height}px`;
            textButton.innerHTML = 'Menos Proyectos';
        }else{
            showProjects.style.height = '0px';
            textButton.innerHTML = 'Más Proyectos';
        }
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
