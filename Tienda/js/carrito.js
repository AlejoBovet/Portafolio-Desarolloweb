//Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarcarritobtn = document.querySelector('#vaciar-carrito');
const listaarticulos = document.querySelector('#lista-articulos');
let articulosCarrito = []; //Para ir agregando y quitando

cargarEventlisteners();
function cargarEventlisteners(){
    //cuando agregas un producto presionando agregar al carrito
    listaarticulos.addEventListener('click',agregarArticulo);
    
   //eliminar producto
    carrito.addEventListener('click',EliminarProducto);

    vaciarcarritobtn.addEventListener('click', () => {
        articulosCarrito = [];//resetear arreglo
        
        limpiarHTML();//eliminamos todo el html
    })  
}

                //FUNCIONES//

function agregarArticulo(e){

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const articuloSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(articuloSeleccionado);
    }
    
    

}

function EliminarProducto(e){
    //console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const articuloID = e.target.getAttribute('data-id');

        //elimina del arreglo 
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloID);
        
        carritoHTML();// iterar sobre el carrito y mostrar su html 
    }
}



//lee el contenido del html 
function leerDatosCurso(articulo){
    //console.log(articulo);

    //crear un objeto con el contenido del curso
    const infoarticulo = {
        imagen: articulo.querySelector('img').src,
        titulo: articulo.querySelector('h4').textContent,
        precio: articulo.querySelector('.precio span').textContent,
        id: articulo.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //console.log(infoarticulo);

    //agregar elementos al arreglo 
    articulosCarrito = [...articulosCarrito, infoarticulo];
    console.log(articulosCarrito);

    carritoHTML();

}

// Muestra el carrtio de compras en el html 
function carritoHTML(){

    //limpiar el html 
    limpiarHTML();
    //recorre el carrito y genera el html 

    articulosCarrito.forEach( articulo => {
        const { imagen,titulo,precio,cantidad,id}=articulo;
        const row = document.createElement('tr');
        row.innerHTML=`
        <td> <img src="${imagen}" width="100"> </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `;

        //afregar html del carrito tbody
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody 
function limpiarHTML(){
//forma lenta   
//contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}




