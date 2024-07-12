'use strict';
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    customCursor();
    fixedNavigation();
    scrollNav();
}
//Custom cursor
function customCursor(){
    const cursor = document.querySelector('.cursor-custom');
    const links = document.querySelectorAll('A');
    const linksProjects = Array.from(document.querySelectorAll('#projects A')).slice(0, -1);

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