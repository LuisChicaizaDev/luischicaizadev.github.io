'use strict';
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    fixedNavigation();
}


function fixedNavigation() {
    const nav = document.querySelector('.my-nav .nav__list');
    const sectionHeader = document.querySelector('.header');
    const sectionAbout = document.querySelector('.about-me');
    const sectionExperience = document.querySelector('.experience');
    const sectionProjects = document.querySelector('.projects');
    const sectionContact = document.querySelector('.contact');

    const links = {
        aboutMe: document.querySelector('#link-about'),
        experience: document.querySelector('#link-experience'),
        projects: document.querySelector('#link-projects'),
        contact: document.querySelector('#link-contact')
    };

    window.addEventListener('scroll', function() {
        //Con el metodo conseguimos detectar la posicion de la sección y activamos el nav
        //Se activa cuando sobre pasa la parte de abajo de la sección
        if (sectionHeader.getBoundingClientRect().bottom < 0) {
            nav.classList.add('fixed');
            document.body.classList.add('no-scroll');
        } else {
            nav.classList.remove('fixed');
            document.body.classList.remove('no-scroll');
        }

        // Determinar qué sección está actualmente a la vista
        let currentSection = null;

        if (sectionContact.getBoundingClientRect().top < 0) {
            currentSection = 'contact';
        } else if (sectionProjects.getBoundingClientRect().top < 0) {
            currentSection = 'projects';
        } else if (sectionExperience.getBoundingClientRect().top < 0) {
            currentSection = 'experience';
        } else if (sectionAbout.getBoundingClientRect().top < 0) {
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