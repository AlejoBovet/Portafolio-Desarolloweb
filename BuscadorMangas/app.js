const marca = document.querySelector('#demografia');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');


const resultado = document.querySelector('#resultado');


const max= new Date().getFullYear();
const min=max-10;

//Generar un objeto con la busqueda
const datoBusqueda = {
    demografia:'',
    year:'',
    minimo:'',
    maximo:'',
   
}

//eventos 
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(mangas);

    // llena las opciones de años
    llenarSelect()
})

demografia.addEventListener('change',e =>{
    datoBusqueda.marca=e.target.value;  

    filtrarmangas();
})
year.addEventListener('change',e =>{
    datoBusqueda.year=e.target.value;  
    filtrarmangas();
})
minimo.addEventListener('change', e =>{
    datoBusqueda.minimo = e.target.value;
    filtrarmangas();
})
maximo.addEventListener('change', e =>{
    datoBusqueda.maximo = e.target.value;
    filtrarmangas();
}



//Funciones 
function mostrarmangas(manga){

    limpiarHTML();//elimina html previo

    autos.forEach(manga => {
        const {titulo, demografia, year, tomos, autor} = manga;
        const autoHTML = document.createElement('p');

        autoHTML.textContent =`
        ${titulo} - ${demografia}  -${year} -${tomos}  - ${autor} 
        
        `;
    
        //insertar en el html
        resultado.appendChild(autoHTML)

    });

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
function filtrarmangas(){
    const resultado = Mangas.filter(filtrarmangas).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMax)
    //console.log(resultado);
    mostrarAutos(resultado);

    if(resultado.length){
        mostrarmangas(resultado);
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

function filtrarmangas(mangas){
    const{demografia} = datoBusqueda;
    if(datoBusqueda.demografia){
        return mangas.demografia === demografia;
    }
    return mangas;
}

function filtrarYear(mangas){
    const{year} = datoBusqueda;
    if(year){
        return mangas.year === parseInt(year);
    }
    return mangas;
}

function filtrarMinimo(mangas){
    const{minimo} = datoBusqueda;
    if(minimo){
        return mangas.tomos >= minimo;
    }
    return mangas;
}

function filtrarMax(mangas){
    const{maximo} = datoBusqueda;
    if(maximo){
        return mangas.tomos <= maximo;
    }
    return mangas;
}
