//Variables 
const demografia = document.querySelector('#demografia');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');

const resultado = document.querySelector('#resultado');

const max= new Date().getFullYear();
const min=max-10;

//generar un objeto en la busqueda
const datosBusqueda = {
    demografia:'',
    year:'',
    minimo:'',
    maximo:'',

}

//eventos 
document.addEventListener('DOMContentLoaded', () => {
    mostrarMangas(Mangas);

    llenarSelect()

})

demografia.addEventListener('change',e =>{
    datosBusqueda.demografia = e.target.value;
   
    filtrarMangas();
})

 year.addEventListener('change',e =>{
    datosBusqueda.year=e.target.value;
    filtrarMangas();
})

minimo.addEventListener('change',e =>{
    datosBusqueda.minimo=e.target.value;
    filtrarMangas();
})

maximo.addEventListener('change',e =>{
    datosBusqueda.maximo=e.target.value;
    filtrarMangas();
    console.log(datosBusqueda);
}) 

//funciones
function mostrarMangas(Mangas){

    limpiarHTML();//elimina html previo

    Mangas.forEach(mangas => {
        const {titulo, demografia, year, tomos, autor}= mangas;
        const MangasHTML = document.createElement('p');

        MangasHTML.textContent=`
        ${titulo} - ${demografia} - ${year} - Tomos: ${tomos} - Autor: ${autor} 
        `;

        resultado.appendChild(MangasHTML)
    })
}

//limpiat html
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect(){

    for(let i = max; i >=min; i--){
        const opcion = document.createElement('option');
        opcion.Value=i;
        opcion.textContent= i;
        year.appendChild(opcion);//agrega las opciones de año al select
    }
}

//funcion que filtra en base a la busqueda

function filtrarMangas(){
    const resultado = Mangas.filter(filtrarDemografia).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMax)
   
     
    console.log(resultado);
    mostrarMangas(resultado);

    if(resultado.length){
        mostrarMangas(resultado);
    } else {
        noResultado();
    } 
}



function noResultado(){

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'no hay resultado, intenta otros parametros';
    resultado.appendChild(noResultado);
}

function filtrarDemografia(mangas){
    if(datosBusqueda.demografia){
        return mangas.demografia === datosBusqueda.demografia;
    }
    return mangas

}

 function filtrarYear(mangas){
    const{year} = datosBusqueda;
    if(year){
        return mangas.year === parseInt(year);
    }
    return mangas;
}

function filtrarMinimo(mangas){
    const{minimo} = datosBusqueda;
    if(minimo){
        return mangas.tomos >= minimo;
    }
    return mangas;
}

function filtrarMax(mangas){
    const{maximo} = datosBusqueda;
    if(maximo){
        return mangas.tomos <= maximo;
    }
    return mangas;
} 
