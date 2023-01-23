document.addEventListener('DOMContentLoaded', function(){
    eventListener();
});

function eventListener(){
    galeria();
    darkMode();
    formulario();
    scrolNav();
    menuHab();
    navFijo();
}

function navFijo(){
    const navfijo = document.querySelector('.header-bg');
    const lineup = document.querySelector('.lineup');
    const espacioBody = document.querySelector('body');

   window.addEventListener('scroll',function(){
        if(lineup.getBoundingClientRect().top < 0){
            navfijo.classList.add('nav-fijo');
            espacioBody.classList.add('espacio-barra');
        }else{
            navfijo.classList.remove('nav-fijo');
            espacioBody.classList.remove('espacio-barra');
        }
   });
}

function menuHab(){
    const menuHamb = document.querySelector('.barras');
    const navegacion = document.querySelector('.navegacion');

    menuHamb.addEventListener('click', function(){
        navegacion.classList.toggle('ocultar');
    });
}


function scrolNav(){
    const enlaces = document.querySelectorAll('.navegacion a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const secciones = e.target.attributes.href.value;
            const seccion = document.querySelector(secciones);
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });
}

function formulario(){
    const nombre = document.querySelector('#nombre');
    const telefono = document.querySelector('#telefono');
    const email = document.querySelector('#email');
    const mensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('.formulario');

    nombre.addEventListener('input', leerTexto);
    telefono.addEventListener('input', leerTexto);
    email.addEventListener('input', leerTexto);
    mensaje.addEventListener('input', leerTexto);


    const datos = {
        nombre: '',
        telefono: '',
        email: '',
        mensaje:''
    }

    formulario.addEventListener('submit',function(e){
    e.preventDefault();
    const {nombre, telefono, email, mensaje} = datos;

        if(nombre === '' || telefono === '' || email === '' || mensaje === ''){
            alerta('Todos los campos son necesarios', true);
            return
        }
            alerta('Todos los campos se enviaron correctamente');
    });

    function alerta(mensaje, error = null){
        const alerta = document.createElement('P');
        const bloque = document.createElement('DIV');
        bloque.classList.add('centrar');
        alerta.textContent = mensaje;

        if(error){
            alerta.classList.add('error');
        }else{
            alerta.classList.add('enviado');
        }
        
        bloque.appendChild(alerta);
        formulario.appendChild(bloque);
        
        setTimeout(()=>{
            alerta.remove();
        },4000)

    }


    function leerTexto(e){
        datos[e.target.id] = e.target.value;
        console.log(datos);
    }



}


function darkMode(){
    const darkMode = document.querySelector('.dark');
    darkMode.addEventListener('click', function(){
        document.body.classList.toggle('oscuro');
    });
}

function galeria(){
    const galeriaImagenes = document.querySelector('.galeria__contenido');
    
    for(let i = 1; i <= 8; i++){
        const imagenes = document.createElement('picture');
        imagenes.innerHTML = `
        <source srcset="/build/img/muse/${i}.webp" type="image/webp">
        <source srcset="/build/img/muse/${i}.avif" type="image/avif">
        <img loading="lazy" src="build/img/muse/${i}.jpg" alt="legends rock">
        `;
        galeriaImagenes.appendChild(imagenes);

        imagenes.onclick = function(){
            mostrarImagen(i);
        }
    } 

    function mostrarImagen(id){
        const imagenMostrar = document.createElement('picture');
        imagenMostrar.innerHTML = `
        <source srcset="/build/img/muse/${id}.webp" type="image/webp">
        <source srcset="/build/img/muse/${id}.avif" type="image/avif">
        <img loading="lazy" src="build/img/muse/${id}.jpg" alt="legends rock">
        `;
        const overlay = document.createElement('DIV');
        overlay.classList.add('overlay');
        overlay.appendChild(imagenMostrar);
        overlay.onclick = function(){
        const body = document.querySelector('body');
            body.classList.remove('body-fijo');
            overlay.remove();
        }

        const btnCerrar = document.createElement('p');
        btnCerrar.classList.add('btn-cerrar');
        btnCerrar.textContent = 'X';
        overlay.appendChild(btnCerrar);
        btnCerrar.onclick = function(){
        const body = document.querySelector('body');
            body.classList.remove('body-fijo');
            overlay.remove();

        }

        const body = document.querySelector('body');
        body.classList.add('body-fijo');
        body.appendChild(overlay);
    }
}

//# sourceMappingURL=app.js.map
