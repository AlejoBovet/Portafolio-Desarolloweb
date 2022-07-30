// Variables 
const btnEnviar = document.querySelector('#enviar');
const formularioEnviar = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');


//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

EventListener();
function EventListener(){
    console.log('iniciando');
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded', inicioApp);

    //campops del formulario
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);

     // Enviar Email
     formularioEnviar.addEventListener('submit', enviarEmail);

     // Boton de reset
     resetBtn.addEventListener('click', resetFormulario);
}



//Funciones 
function inicioApp() {
    // deshabilitar el envio
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50') 
}              

//validar formualrio 
function validarFormulario(e){

    

    if(e.target.value.length > 0){

        //elimina los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
       //e.target.style.borderBottomColor = 'red';
       e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border','border-red-500');

        mostraError('Todos los campos son obligatorios');
    }
//validar unicamiente el email
   
    if(e.target.type === 'email'){
        
        
        if(er.test(e.target.value)){
           //elimina los errores
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border','border-red-500');

            mostraError('email no valido');
        }
    }


    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '' ) {
        console.log('pasaste la validacion');
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.classList.remove('cursor-not-allowed');
     }


}

//mensaje error

function mostraError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3', 'mt-5', 'text.center',
    'error');
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }

    
}

// funcion que Resetea el formulario 
function resetFormulario() {
    resetFormulario.reset();

    inicioApp();
    
}


// Enviar email
function enviarEmail(e) {
    e.preventDefault();

    // mostar el spirner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de 3 segundos ocultar el spinner y mostar el mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        //mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'el mensaje se envio correctaemnte';
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500');

        //insetar el parrafo antes del spinner 
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();//eliminar menasaje de exito

            resetFormulario();
        },5000)

    }, 3000 );

   
    
}





