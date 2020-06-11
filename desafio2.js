
let paginaatual = 1

//Ajax
function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

let container = document.getElementsByClassName("bigcontainer")[0]
//products
function load() {
    ajax_get(`https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${paginaatual}`, function (data) {

        let html_ = ""
        for (let i = 0; i < data.products.length; i++) {
            let item =
                ` <div>
                <a target="_blank" href=${data.products[i].image}>
                    <img id="img" src=${data.products[i].image} alt="Product"
                        width="100%" height="auto">
                </a>
                <p class="font14 fontgrey">${data.products[i].name}</p> <br>
                <p class="font12 fontgrey">${data.products[i].description}</p><br>
                <p class="font12 fontgrey">De: R$${data.products[i].oldPrice.toFixed(2).replace(".", ",")}</p><br>
                <p class="font16bold fontgrey">Por: R$${data.products[i].price.toFixed(2).replace(".", ",")}</p><br>
                <p class="font12 fontgrey">ou ${data.products[i].installments.count}x de R$${data.products[i].installments.value.toFixed(2).replace(".", ",")}</p>
                <input type="button" class="prodbutton font14" value="Comprar" onclick="buybtn()" onmousedown="clickbuy(this)" onmouseup="bought(this)">              

            </div>       
            `

            html_ = html_ + item
        }
        container.innerHTML += html_
    })
}

load()

let maispagina = document.getElementsByClassName("moreprodbutton")[0]

//mouse functions
maispagina.onclick = function () {
    paginaatual++

    load()
}


  function mOver(obj) {
    obj.style.color = "white"
    obj.style.background = "#2F4F4F"
  }

  function mOut(obj) {
    obj.style.color = "#888888"
    obj.style.background = "white"
  }

  function conf(obj) {
    obj.innerHTML = "Confira!"
    obj.style.fontSize = "60px"
  }

  function back(obj) {
    obj.innerHTML = "especial para você"
    obj.style.fontSize = "40px"
  }

  function clickbuy(obj){
    obj.value = "Comprando"
  }

  function bought(obj){
    obj.value = "Comprar"
  }

 let x = document.getElementsByClassName("stick")[0]
 x.style.position = "sticky"
 x.style.top = "0"

let y = document.getElementById("sticky")
 y.style.position = "sticky"
 y.style.top = "0"

 let modal = document.getElementsByClassName("modal")[0]
 let btn = document.getElementsByClassName("closemodal")[0]
 
 btn.onclick = function() {
  modal.style.display = "none";
  btn.style.display = "none";
}
 
let modalbuy = document.getElementsByClassName("dispnone")[0]
let btnbought = document.getElementsByClassName("dispnone")[1]

btnbought.onclick = function() {
  modalbuy.style.display = "none";
  btnbought.style.display = "none";
}
  
function buybtn() {
  modalbuy.style.display = "inline";
  btnbought.style.display = "inline";
}

