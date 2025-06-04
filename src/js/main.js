'use strict';
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    wowJs();
    customCursor();
    fixedNavigation();
    scrollNav();
    loadProjects();
    scrollFunction();
}
// Inicia wowjs
function wowJs(){
    new WOW().init();
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

// Cargar los datos de los proyectos 
async function loadProjects() {
    try {
        const response = await fetch('/assets/data/projects.json');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        // Proyectos destacados
        const featuredProjects = data.featured_projects;

        if (!featuredProjects || !Array.isArray(featuredProjects)) {
            throw new Error("Formato de JSON inválido en Proyectos Destacados");
        }

        // Otros proyectos
        const otherProjects = data.other_projects;
        if (!otherProjects || !Array.isArray(otherProjects)) {
            throw new Error("Formato de JSON inválido en Proyectos Destacados");
        }
        
        //console.log("Proyectos cargados:", featuredProjects.map ((project, index) => `Proyecto ${index + 1}: ${project.title}`));
        // Renderiza los proyectos
        renderFeaturedProjects(featuredProjects);
        renderOtherProjects(otherProjects);
        // Después de renderizar los proyectos, inicializa el modal de imágenes
        imagesModal(featuredProjects);

    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
    }
}

// Renderiza los proyectos destacados
function renderFeaturedProjects(projects) {
    const container = document.querySelector('.projects-container'); 

    container.innerHTML = projects.map( (project, index) => `
        <div class="projects__content">

            <!--Imagen-->
            <div class="projects__column projects__column--image wow fadeIn" data-wow-duration="2.25s" data-wow-delay="0.5s" data-index="${index + 1}">
                <div class="project-icon-box">
                    <div class="icon-inner">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                    </div>
                </div>
                <img width="520" height="400" loading="lazy" src="${project.img.src}"
                class="projects__image img-fluid" alt="${project.img.alt}" title="${project.img.title}">
            </div>

            <!--Info-->
            <div class="projects__column projects__column--info wow fadeIn" data-wow-duration="3s">

                <h3 class="projects__project-title">
                    ${project.title}
                </h3>
                <span class="projects__date color-khaki">${project.year}</span>
                <div class="projects__tags d-flex flex-wrap gap-2 my-4">
                    ${project.tags.map (tag => `<span class="projects__tag"> ${tag}</span>`).join('')}
                </div>
                
                ${project.description.map ( d => `<p class="projects__description"> ${d} </p>`).join('')} 
                
                ${project.features.length
                ? `<details><summary>Funcionalidades principales</summary>
                    <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
                    </details>`
                : ''}
                
                <div class="projects__buttons d-flex gap-4 mt-5">
                ${project.links.figma ? 
                        `
                        <a href="${project.links.figma}" target="_blank" 
                            class="projects__button btn-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 41 41" fill="none"> <g clip-path="url(#clip0_176_389)"><path d="M14.4944 40.8125C18.2131 40.8125 21.2131 37.8125 21.2131 34.0938V27.375H14.4944C10.7756 27.375 7.77563 30.375 7.77563 34.0938C7.77563 37.8125 10.7756 40.8125 14.4944 40.8125Z" fill="currentColor"></path><path d="M7.77563 20.6562C7.77563 16.9375 10.7756 13.9375 14.4944 13.9375H21.2131V27.375H14.4944C10.7756 27.375 7.77563 24.375 7.77563 20.6562Z" fill="currentColor"></path><path d="M7.77563 7.21875C7.77563 3.5 10.7756 0.5 14.4944 0.5H21.2131V13.9375H14.4944C10.7756 13.9375 7.77563 10.9375 7.77563 7.21875Z" fill="currentColor"></path><path d="M21.2131 0.5H27.9319C31.6506 0.5 34.6506 3.5 34.6506 7.21875C34.6506 10.9375 31.6506 13.9375 27.9319 13.9375H21.2131V0.5Z" fill="currentColor"></path><path d="M34.6506 20.6562C34.6506 24.375 31.6506 27.375 27.9319 27.375C24.2131 27.375 21.2131 24.375 21.2131 20.6562C21.2131 16.9375 24.2131 13.9375 27.9319 13.9375C31.6506 13.9375 34.6506 16.9375 34.6506 20.6562Z" fill="currentColor"></path></g><defs><clipPath id="clip0_176_389"><rect width="40" height="40" fill="white" transform="translate(0.275635 0.5)"></rect></clipPath></defs>
                            </svg>
                            Diseño
                        </a>
                        ` 
                    : ''}

                    ${project.links.github ? 
                        `
                        <a href="${project.links.github}" target="_blank"
                        class="projects__button btn-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                                <path d="M14 0.666666C12.249 0.666666 10.5152 1.01154 8.89751 1.68161C7.27984 2.35167 5.80998 3.33379 4.57187 4.57191C2.07138 7.07239 0.666626 10.4638 0.666626 14C0.666626 19.8933 4.49329 24.8933 9.78663 26.6667C10.4533 26.7733 10.6666 26.36 10.6666 26V23.7467C6.97329 24.5467 6.18663 21.96 6.18663 21.96C5.57329 20.4133 4.70663 20 4.70663 20C3.49329 19.1733 4.79996 19.2 4.79996 19.2C6.13329 19.2933 6.83996 20.5733 6.83996 20.5733C7.99996 22.6 9.95996 22 10.72 21.68C10.84 20.8133 11.1866 20.2267 11.56 19.8933C8.59996 19.56 5.49329 18.4133 5.49329 13.3333C5.49329 11.8533 5.99996 10.6667 6.86663 9.72C6.73329 9.38667 6.26663 8 6.99996 6.2C6.99996 6.2 8.11996 5.84 10.6666 7.56C11.72 7.26667 12.8666 7.12 14 7.12C15.1333 7.12 16.28 7.26667 17.3333 7.56C19.88 5.84 21 6.2 21 6.2C21.7333 8 21.2666 9.38667 21.1333 9.72C22 10.6667 22.5066 11.8533 22.5066 13.3333C22.5066 18.4267 19.3866 19.5467 16.4133 19.88C16.8933 20.2933 17.3333 21.1067 17.3333 22.3467V26C17.3333 26.36 17.5466 26.7867 18.2266 26.6667C23.52 24.88 27.3333 19.8933 27.3333 14C27.3333 12.249 26.9884 10.5152 26.3184 8.89755C25.6483 7.27988 24.6662 5.81002 23.4281 4.57191C22.1899 3.33379 20.7201 2.35167 19.1024 1.68161C17.4847 1.01154 15.7509 0.666666 14 0.666666Z" 
                                fill="currentColor"/>
                            </svg>
                            Código
                        </a>
                        ` 
                    : ''}
                    
                    ${project.links.website ? 
                        `
                        <a href="${project.links.website}" target="_blank" 
                            class="projects__button btn-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <path d="M23.7469 13C23.7469 6.99463 18.8788 2.12659 12.8734 2.12659C6.86804 2.12659 2 6.99463 2 13C2 19.0054 6.86804 23.8735 12.8734 23.8735" stroke="#2D3239" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.9606 2.18103C13.9606 2.18103 17.2226 6.47604 17.2226 13.0001M11.7859 23.8192C11.7859 23.8192 8.52385 19.5242 8.52385 13.0001C8.52385 6.47604 11.7859 2.18103 11.7859 2.18103M2.68481 16.8058H12.8732M2.68481 9.1944H23.0616" stroke="#2D3239" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.6153 19.4338C24.1524 19.7644 24.1187 20.5679 23.5664 20.631L20.7751 20.9474L19.5236 23.4613C19.2757 23.9604 18.5091 23.7158 18.3819 23.0982L17.0173 16.448C16.9096 15.926 17.3794 15.5977 17.8328 15.8771L23.6153 19.4338Z" stroke="#2D3239" stroke-width="2.5"/>
                            </svg>
                            Sitio Web
                        </a>
                        ` 
                    : ''}

                    ${project.links.demo ? 
                        `
                        <a href="${project.links.demo}" target="_blank" 
                            class="projects__button btn-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17.7777 16.6388V16.4877C19.0821 15.9433 19.9999 14.6555 19.9999 13.1544V3.61109C19.9999 2.65337 19.6194 1.73488 18.9422 1.05766C18.265 0.380453 17.3465 0 16.3888 0H6.94441C6.18088 1.33262e-05 5.43698 0.24197 4.81954 0.691129C4.20209 1.14029 3.74286 1.77355 3.50776 2.49999H3.28443C2.2711 2.49999 1.40888 2.85665 0.815551 3.55998C0.239999 4.24109 0 5.14886 0 6.11108V15.8333C0 17.011 0.425554 18.071 1.23333 18.8332C2.03999 19.5921 3.15887 19.9943 4.44442 19.9943H8.79996L13.3288 19.9999H13.331C14.4155 20.0055 15.4899 19.7777 16.3233 19.2443C17.1899 18.6888 17.7777 17.8055 17.7777 16.6388ZM3.28443 4.16665H3.33332V13.1533C3.33332 14.111 3.71377 15.0295 4.39098 15.7067C5.06819 16.3839 5.98669 16.7644 6.94441 16.7644H16.1066C16.071 17.2288 15.8377 17.5755 15.4244 17.8399C14.9433 18.1488 14.2133 18.3377 13.3377 18.3332H13.3333L8.79773 18.3277H4.44442C3.50776 18.3277 2.82221 18.0388 2.37777 17.6199C1.93555 17.2044 1.66666 16.5999 1.66666 15.8333V6.11108C1.66666 5.40553 1.84444 4.92553 2.08888 4.63442C2.31666 4.36553 2.67999 4.16665 3.28443 4.16665ZM10.0244 3.88887H15.2777C15.4987 3.88887 15.7107 3.97667 15.867 4.13295C16.0232 4.28923 16.111 4.50119 16.111 4.7222V9.97662C16.111 10.1976 16.0232 10.4096 15.867 10.5659C15.7107 10.7221 15.4987 10.8099 15.2777 10.8099C15.0567 10.8099 14.8447 10.7221 14.6884 10.5659C14.5322 10.4096 14.4444 10.1976 14.4444 9.97662V6.7333L8.6444 12.5333C8.56749 12.6128 8.47551 12.6763 8.37382 12.7199C8.27213 12.7635 8.16277 12.7865 8.05212 12.7874C7.94147 12.7883 7.83175 12.7671 7.72936 12.7252C7.62696 12.6832 7.53395 12.6213 7.45574 12.543C7.37754 12.4648 7.3157 12.3717 7.27385 12.2693C7.232 12.1668 7.21097 12.0571 7.21198 11.9464C7.21299 11.8358 7.23603 11.7264 7.27975 11.6248C7.32347 11.5231 7.387 11.4312 7.46663 11.3544L13.2666 5.55553H10.0244C9.80338 5.55553 9.59142 5.46773 9.43514 5.31145C9.27886 5.15517 9.19107 4.94321 9.19107 4.7222C9.19107 4.50119 9.27886 4.28923 9.43514 4.13295C9.59142 3.97667 9.80338 3.88887 10.0244 3.88887Z" 
                                fill="currentColor"/>
                            </svg>
                            Ver Demo
                        </a>
                        ` 
                    : ''}
                    
                </div>
            </div>

        </div>
        
    `).join('');
    
}

// Renderiza otros proyectos
function renderOtherProjects(projects) {
    const container = document.querySelector('.other-projects__content'); 

    container.innerHTML = projects.map( project =>`
        <div class="project mb-5">
            <div class="project__name">
                <h4>${project.title}</h4>
            </div>

            <span class="projects__date color-khaki p-0">${project.year}</span>

            <div class="projects__tags my-3 d-flex flex-wrap gap-2">
                ${project.tags.map (tag => `<span class="projects__tag"> ${tag} </span>`).join('')} 
            </div>

            <div class="project__description">
                ${project.description.map (d => `<p> ${d} </p>`).join('')} 
            </div>

            <div class="projects__buttons d-flex gap-4 mt-4">
                ${project.links.github ? 
                    `
                    <a href="${project.links.github}" target="_blank"
                    class="projects__button btn-gray">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                            <path d="M14 0.666666C12.249 0.666666 10.5152 1.01154 8.89751 1.68161C7.27984 2.35167 5.80998 3.33379 4.57187 4.57191C2.07138 7.07239 0.666626 10.4638 0.666626 14C0.666626 19.8933 4.49329 24.8933 9.78663 26.6667C10.4533 26.7733 10.6666 26.36 10.6666 26V23.7467C6.97329 24.5467 6.18663 21.96 6.18663 21.96C5.57329 20.4133 4.70663 20 4.70663 20C3.49329 19.1733 4.79996 19.2 4.79996 19.2C6.13329 19.2933 6.83996 20.5733 6.83996 20.5733C7.99996 22.6 9.95996 22 10.72 21.68C10.84 20.8133 11.1866 20.2267 11.56 19.8933C8.59996 19.56 5.49329 18.4133 5.49329 13.3333C5.49329 11.8533 5.99996 10.6667 6.86663 9.72C6.73329 9.38667 6.26663 8 6.99996 6.2C6.99996 6.2 8.11996 5.84 10.6666 7.56C11.72 7.26667 12.8666 7.12 14 7.12C15.1333 7.12 16.28 7.26667 17.3333 7.56C19.88 5.84 21 6.2 21 6.2C21.7333 8 21.2666 9.38667 21.1333 9.72C22 10.6667 22.5066 11.8533 22.5066 13.3333C22.5066 18.4267 19.3866 19.5467 16.4133 19.88C16.8933 20.2933 17.3333 21.1067 17.3333 22.3467V26C17.3333 26.36 17.5466 26.7867 18.2266 26.6667C23.52 24.88 27.3333 19.8933 27.3333 14C27.3333 12.249 26.9884 10.5152 26.3184 8.89755C25.6483 7.27988 24.6662 5.81002 23.4281 4.57191C22.1899 3.33379 20.7201 2.35167 19.1024 1.68161C17.4847 1.01154 15.7509 0.666666 14 0.666666Z" 
                            fill="currentColor"/>
                        </svg>
                        Código
                    </a>
                        ` 
                : ''}
                    

                ${project.links.demo ? 
                    `
                    <a href="${project.links.demo}" target="_blank" 
                        class="projects__button btn-gray">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.7777 16.6388V16.4877C19.0821 15.9433 19.9999 14.6555 19.9999 13.1544V3.61109C19.9999 2.65337 19.6194 1.73488 18.9422 1.05766C18.265 0.380453 17.3465 0 16.3888 0H6.94441C6.18088 1.33262e-05 5.43698 0.24197 4.81954 0.691129C4.20209 1.14029 3.74286 1.77355 3.50776 2.49999H3.28443C2.2711 2.49999 1.40888 2.85665 0.815551 3.55998C0.239999 4.24109 0 5.14886 0 6.11108V15.8333C0 17.011 0.425554 18.071 1.23333 18.8332C2.03999 19.5921 3.15887 19.9943 4.44442 19.9943H8.79996L13.3288 19.9999H13.331C14.4155 20.0055 15.4899 19.7777 16.3233 19.2443C17.1899 18.6888 17.7777 17.8055 17.7777 16.6388ZM3.28443 4.16665H3.33332V13.1533C3.33332 14.111 3.71377 15.0295 4.39098 15.7067C5.06819 16.3839 5.98669 16.7644 6.94441 16.7644H16.1066C16.071 17.2288 15.8377 17.5755 15.4244 17.8399C14.9433 18.1488 14.2133 18.3377 13.3377 18.3332H13.3333L8.79773 18.3277H4.44442C3.50776 18.3277 2.82221 18.0388 2.37777 17.6199C1.93555 17.2044 1.66666 16.5999 1.66666 15.8333V6.11108C1.66666 5.40553 1.84444 4.92553 2.08888 4.63442C2.31666 4.36553 2.67999 4.16665 3.28443 4.16665ZM10.0244 3.88887H15.2777C15.4987 3.88887 15.7107 3.97667 15.867 4.13295C16.0232 4.28923 16.111 4.50119 16.111 4.7222V9.97662C16.111 10.1976 16.0232 10.4096 15.867 10.5659C15.7107 10.7221 15.4987 10.8099 15.2777 10.8099C15.0567 10.8099 14.8447 10.7221 14.6884 10.5659C14.5322 10.4096 14.4444 10.1976 14.4444 9.97662V6.7333L8.6444 12.5333C8.56749 12.6128 8.47551 12.6763 8.37382 12.7199C8.27213 12.7635 8.16277 12.7865 8.05212 12.7874C7.94147 12.7883 7.83175 12.7671 7.72936 12.7252C7.62696 12.6832 7.53395 12.6213 7.45574 12.543C7.37754 12.4648 7.3157 12.3717 7.27385 12.2693C7.232 12.1668 7.21097 12.0571 7.21198 11.9464C7.21299 11.8358 7.23603 11.7264 7.27975 11.6248C7.32347 11.5231 7.387 11.4312 7.46663 11.3544L13.2666 5.55553H10.0244C9.80338 5.55553 9.59142 5.46773 9.43514 5.31145C9.27886 5.15517 9.19107 4.94321 9.19107 4.7222C9.19107 4.50119 9.27886 4.28923 9.43514 4.13295C9.59142 3.97667 9.80338 3.88887 10.0244 3.88887Z" 
                            fill="currentColor"/>
                        </svg>
                        Ver Demo
                    </a>
                    ` 
                : ''}
            </div>
        </div>
    `).join('');
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
    <span>Salir</span>
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

// Creará el carrusel con las imágenes de los proyectos
function imagesModal(projects) {
    const projectImagesElements = document.querySelectorAll('.projects__column--image');
    
    projectImagesElements.forEach( image => {
        image.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            //console.log(`Proyecto ${index} seleccionado`);

            // Obtenemos el proyecto que corresponde al indice
            const mockups = projects[index - 1] && projects[index - 1].mockups;

            if(mockups && Array.isArray(mockups) && mockups.length) {
                createCarousel(mockups);
            } else {
                console.error("El proyecto no tiene imágenes o el formato es incorrecto.");
            }
        });
    } );
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
