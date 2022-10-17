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
            anadirf(producto.id);
            
            Toastify({
                text: "Se añadio a carrito",
                duration: 3000,
                style: {
                    background: "grey",
                  },
            }).showToast()
    
        });
    
        function anadirf (prodId){ 

      
            let item = data.find((prod) => prod.id == prodId)
            carrito.push(item)
        
            let carrito_datos = JSON.stringify(carrito);
            localStorage.setItem("carrito" , carrito_datos);
        
            let recupero_carrito = localStorage.getItem("carrito");
            recupero_carrito = JSON.parse(recupero_carrito);
        
            console.log(carrito);
            
            mostrar_carrito(recupero_carrito);
            
        }
    })

);

let  carrito = [];





function mostrar_carrito(){
    

    carrito.forEach((productos) =>{
    let fila = document.createElement("tr");
    
    fila.innerHTML =
    `<td><img src="${productos.img}" class="imagenes-carrito"></td>
    <td>${productos.nombre}</td>
    <td>${productos.cantidad}</td>
    <td>${productos.precio}</td>
    <td><button class="btn btn-outline-dark borrar_elemento">Borrar</button></td>`;



    let tabla = document.getElementById("tbody");
    tabla.append(fila);


    let botones_borrar = document.querySelectorAll(".borrar_elemento");

    for( let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    }

    let finalizar_compra= document.createElement("tr");
    finalizar_compra.innerHTML=
    `
    <td><button class="btn btn-outline-dark compra" id="formulario-compra"> Realizar compra</button></td>`;

    let compra = document.getElementById("formulario");
    compra.append(finalizar_compra);

    let= formulario_compra= document.getElementById("formulario-compra");
    formulario_compra.addEventListener("click" , function(){
           formulario_c();
    });
    
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


function formulario_c(){
  document.body.innerHTML=`
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#!">BothFit</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link" href="./index.html#contenedor-productos">Productos</a></li>
                    <li class="nav-item"><a class="nav-link" href="#!">Nosotros</a></li>
                    <li class="nav-item" id="mostrar_carrito"><a class="bi bi-cart3 carrito"></a></li>
                    
                </ul>
            </div>
        </div>
    </nav>
  <div class="container px-5 my-5 contenedor-form" data-aos="fade-down">
  
  <form id="contactForm" class="inicioForm">
      <div class="form-floating mb-3">
          <input class="form-control" id="nombreYApellido" type="text" placeholder="Nombre y Apellido" data-sb-validations="required" />
          <label for="nombreYApellido">Nombre y Apellido</label>
          
      </div>
      <div class="form-floating mb-3">
          <input class="form-control" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required,email" />
          <label for="emailAddress">Email Address</label>
          
      </div>
      <fieldset class="row mb-3">
      <legend class="col-form-label col-sm-2 pt-0">Medio de pago</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
          <label class="form-check-label" for="gridRadios1">
            10% de descuento con transferencia bancaria
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
          <label class="form-check-label" for="gridRadios2">
            Mercado pago
          </label>
        </div>
        <div class="form-check disabled">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3">
          <label class="form-check-label" for="gridRadios3">
            Efectivo
          </label>
        </div>
      </div>
    </fieldset>  
    <div>
    <p class="letra">Nos comunicaremos por mail para acordar el envio</p>
    </div> 
            
      <div class="d-grid button">
          <a class="btn btn-dark btn-lg comprar"  id="saludo" type="submit">Enviar</a>
      </div>
  </form>
</div>
</div>
  `

  let saludo = document.getElementById("saludo")

  saludo.addEventListener("click" , function(){
      Swal.fire({
          title: 'Gracias por tu compra',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
      })
  
  } )
  
}



