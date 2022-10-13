let productos = "./JSON/productos.json";

let  carrito = [];

let contenedorProductos = document.getElementById("contenedor-productos"); 

fetch('./JSON/productos.json')
.then(response => response.json())
.then(data => 
    
    
    data.forEach(producto => {
        let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML= `
        <img src=${producto.img} class="tamañosImg" alt="">
        <h3 class="titulo"> ${producto.nombre}</h3>
        <p class="precioProducto"> Precio: ${producto.precio}</p>
        <button id="agregar${producto.id}" class="btn btn-outline-dark"> Agregar </button>
        `
    
        contenedorProductos.appendChild(div)
    
       
    
        let boton = document.getElementById(`agregar${producto.id}`);
    
        boton.addEventListener("click" , function(){
            anadir(producto.id);
            
    
        });
    
    })

);



function anadir (prodId){ 
    let item = productos.find((prod) => prod.id == prodId)
    carrito.push(item);



    let carrito_datos = JSON.stringify(carrito);
    localStorage.setItem("carrito" , carrito_datos);

    let recupero_carrito = localStorage.getItem("carrito");
    recupero_carrito = JSON.parse(recupero_carrito);

    console.log(carrito);
    
    mostrar_carrito(recupero_carrito);

};


    




function mostrar_carrito(){
    
    carrito.forEach((productos) =>{
    let fila = document.createElement("tr");
    
    fila.innerHTML =
    `<td><img src="${productos.img}" class="imagenes-carrito"></td>
    <td>${productos.nombre}</td>
    <td>${productos.precio}</td>
    <td><button class="btn btn-outline-dark borrar_elemento">Borrar</button></td>`;



    let tabla = document.getElementById("tbody");
    tabla.append(fila);


    let botones_borrar = document.querySelectorAll(".borrar_elemento");

    for( let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    }


    });
}




function borrar_producto(e){

    let abuelo = e.target.parentNode.parentNode;
    abuelo.remove();
}



let btn_carrito = document.getElementById("mostrar_carrito");

btn_carrito.addEventListener("click" , function(){

    let compra = document.getElementById("carrito-compra");

    if(compra.style.display != "none"){
        compra.style.display = "none";
    }
    else{
        compra.style.display = "flex";   
     }


})





/*

let buscar = document.getElementById("buscador");
let botonBuscar= document.getElementById("buscar");


botonBuscar.addEventListener("click" , function() {
    let buscar = document.getElementById("buscador");

    let li = document.createElement("li");

    li.innerHTML = 
    `<span>${buscar.value}</span>`;


    productos.includes(prod)



});

function prod (producto){
    if( producto.id == productos.id){
        return `${productos.id}`
    }
    else{
        console.log("error")
    }
}
*/