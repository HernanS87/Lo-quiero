let section = document.querySelectorAll(".section");
let header = document.getElementById("header");
let footer = document.getElementById("footer");
let headerImg = document.querySelector(".header_img");
let catJoyas = document.querySelector(".cat_joyas");
let catElect = document.querySelector(".cat_elect");
let catMen = document.querySelector(".cat_men");
let catWomen = document.querySelector(".cat_women");
let cart = document.querySelector(".cart");

// Btns Nav Mobile
let catJoyasMobile = document.querySelector(".cat_joyasMobile");
let catElectMobile = document.querySelector(".cat_electMobile");
let catMenMobile = document.querySelector(".cat_menMobile");
let catWomenMobile = document.querySelector(".cat_womenMobile");
let btnCall = document.querySelector(".btn_callAction");

let sectionCategory = document.querySelector("#section_category");
let paginaProducto = document.getElementById("pagina_productos");
let cantidadProductos = document.querySelector("#cantidadProductos");
let listado = document.querySelector("#listado");
let total = document.querySelector("#total");
let modal = document.querySelector(".modal-body");
let miModal = document.querySelector("#miModal");
let modalAddCart = document.querySelector(".add_cart");
let modalDeleteCart = document.querySelector(".delete_cart");
let fondoModal = document.querySelector(".modal-backdrop");
let noProducto = document.querySelector("#no_producto");
let btnComprar = document.querySelector("#lista_compras--btn");
let lastBtnBuy = document.querySelector("#last_btn_buy");

// <!----------------MÉTODOS DE PAGO---------------->
let listaComprasBtn = document.querySelector("#lista_compras--btn");
let paymentMethods = document.querySelector(".payment_methods");
let productsNum = document.querySelector("#products_num");
let productsPrice = document.querySelector("#products_price");
let payTotal = document.querySelector("#pay_total");

// contador del carrito
let cont = 0;
// CONTADOR DEL TOTAL A PAGAR EN EL CARRITO
let totalPagar = 0;
//HACEMOS FETCH AL CARGAR LA PAGINA PRINCIPAL ASI LO PODEMOS USAR EN TODA LA WEB, SIN TENER QUE IR A BUSCARLO

let productos = [];

fetch("https://fakestoreapi.com/products/")
  .then((res) => res.json())
  .then((res) => {
    res.forEach((elemento) => {
      productos.push(elemento);
    });
  });

//FUNCIONES QUE HACEN QUE SE DESPLEGUE LA OPCION INDUMENTARIA
function ver(n) {
  document.getElementById("subseccion" + n).style.display = "flex";
}
function ocultar(n) {
  document.getElementById("subseccion" + n).style.display = "none";
}

//Función que crea las categorias en el inicio, permite agregar categorias dinamicamente

const createCategory = () => {
  categories.forEach((elemento) => {
    let card = `<div onclick='openCategory("${elemento.category}")'class="col-md-3 ">
        <div class="card cursos">
            <img src="${elemento.image}" class="img-fluid" alt="Categoria">                            
        </div>
    </div>`;
    sectionCategory.innerHTML += card;
  });
};

// FUNCION QUE BORRA LOS PRODUCTOS DEL CARRITO

const deleteProd = (clase, precio) => {
  let producto = document.querySelector(`.${clase}`);
  let total_h2 = document.querySelector(".total_h2");
  console.log(producto);
  producto.remove();
  cont--;
  cantidadProductos.innerHTML = cont;
  totalPagar -= precio;
  total_h2.innerHTML = `Total a pagar: $${totalPagar}`;

  modalDeleteCart.classList.remove("dnone");
  setTimeout(() => {
    modalDeleteCart.classList.add("dnone");
  }, 2000);

  const items = document.querySelectorAll("#listado li");

  if (items.length === 0) {
    total.style.display = "none";
    noProducto.style.display = "flex";
    btnComprar.classList.add("dnone");
  }
};

// FUNCION QUE AGREGA LOS PRODUCTOS AL CARRITO

const carrito = (id) => {
  cont++;
  cantidadProductos.innerHTML = cont;

  let elemento = productos.find((elem) => {
    return elem.id == id;
  });
  let price = Math.round(elemento.price);

  let producto = `<li class="prod${cont} cart_item">
  <div class="cart_item-detalle">
  <img src="${elemento.image}" class="cart_item--img" alt="">
  <h3 class="card_item--titulo">${elemento.title}</h3>
  <i class="fa-solid fa-trash-can" onclick="deleteProd('prod${cont}', ${price})"></i>
  <h2>$${price}</h2>
  
  </div>
  
</li>`;

  modalAddCart.classList.remove("dnone");
  setTimeout(() => {
    modalAddCart.classList.add("dnone");
  }, 1500);

  listado.innerHTML += producto;
  totalPagar += price;
  let item = `  <h2 class="total_h2">Total a pagar: $${totalPagar}</h2>
  `;
  total.innerHTML = item;
  total.style.display = "flex";
  noProducto.style.display = "none";
  btnComprar.classList.remove("dnone");
};

//FUNCION COMPRAR AHORA
const comprarAhora = (id) => {
  carrito(id);
  cierres("lista_compras");
};

// FUNCION QUE AGREGA LA INFO AL MODAL

const detalle = (id) => {
  let elemento = productos.find((elem) => {
    return elem.id == id;
  });
  let info = `
  <img src="${elemento.image}" class="img_modal"  alt="">
  <div class="txt-general">
  <h3>${elemento.title}</h3>
  <p>${elemento.description}</p>
  <h2>$${elemento.price}</h2>
  </div>
  <button onclick="comprarAhora('${elemento.id}')" id="boton"type="button" class="btn btn-secondary btn_general" data-bs-dismiss="modal">Comprar</button>

`;

  modal.innerHTML = info;
};

//FUNCION QUE ABRE LAS DISTINTAS CATEGORIAS

const openCategory = (item) => {
  paginaProducto.innerHTML = "";
  if (item == "men") {
    var item = "men's clothing";
  } else if (item == "women") {
    var item = "women's clothing";
  }
  cierres("section_productos");
  productos.forEach((elemento) => {
    if (elemento.category == item) {
      let carta = `
        <div  id= "div"  class="card_producto">
          <div data-bs-toggle="modal" data-bs-target="#miModal" class="card_body" onclick="detalle(${elemento.id})" >
          <div class="div_data" >   
          <img src="${elemento.image}" class="producto_img" alt="">
          </div>
        <div class="txt_descripcion">
            <h2>$${elemento.price}</h2>
            <h4>${elemento.title}</h4>
          </div>
          </div>
          <div class="btn_comprar">
              <button onclick="carrito('${elemento.id}')" id="boton" class="btn_general ">Agregar al carrito</button>
          </div>
        </div> `;

      paginaProducto.innerHTML += carta;
    }
  });
};

let cierres = (pagina) => {
  section.forEach((item) => {
    if (item.id === pagina) {
      item.classList.remove("dnone");
      item.classList.add("dflex");
    } else {
      item.classList.add("dnone");
      item.classList.remove("dflex");
    }
  });
  if (pagina == "inicio") {
    footer.classList.remove("dnone");
  } else {
    footer.classList.add("dnone");
  }

  if (pagina == "payment_methods" || pagina == "exito") {
    header.classList.add("dnone");
  } else {
    header.classList.remove("dnone");
  }
};
let inicio = () => {
  cierres("inicio");
  header.classList.remove("dnone");
};

createCategory();
setTimeout(() => inicio(), 3000);

// <!----------------FUNCIÓN DE MÉTODOS DE PAGO---------------->

listaComprasBtn.addEventListener("click", () => {
  if (cont > 1) {
    productsNum.innerHTML = `Productos(${cont})`;
  } else {
    productsNum.innerHTML = `Producto`;
  }
  productsPrice.innerHTML = "$" + totalPagar;
  payTotal.innerHTML = "$" + totalPagar;
  cierres("payment_methods");
});

// <!----------------FUNCION DEL ULTIMO BOTON DE COMPRAR---------------->

lastBtnBuy.addEventListener("click", () => {
  cierres("exito");
  cont = 0;
  cantidadProductos.innerHTML = cont;
  totalPagar = 0;
  listado.innerHTML = "";
  total.innerHTML = "";
  noProducto.style.display = "block";
  btnComprar.classList.add("dnone");
  setTimeout(() => {
    cierres("inicio");
  }, 1500);
});

// LISTENER PARA LOS BOTONES DEL NAV

headerImg.addEventListener("click", () => {
  cierres("inicio");
});
catJoyas.addEventListener("click", () => {
  openCategory("jewelery");
});
catElect.addEventListener("click", () => {
  openCategory("electronics");
});
catMen.addEventListener("click", () => {
  openCategory("men");
});
catWomen.addEventListener("click", () => {
  openCategory("women");
});
cart.addEventListener("click", () => {
  cierres("lista_compras");
});

catJoyasMobile.addEventListener("click", () => {
  openCategory("jewelery");
});
catElectMobile.addEventListener("click", () => {
  openCategory("electronics");
});
catMenMobile.addEventListener("click", () => {
  openCategory("men");
});
catWomenMobile.addEventListener("click", () => {
  openCategory("women");
});
btnCall.addEventListener("click", () => {
  openCategory("jewelery");
});
