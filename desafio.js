
let paginaatual = 1

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

function load() {
    ajax_get(`https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${paginaatual}`, function (data) {

        let html_ = ""
        for (let i = 0; i < data.products.length; i++) {
            let item =
                ` <div>
                <a target="_blank" href=${data.products[i].image}>
                    <img src=${data.products[i].image} alt="Product"
                        width="200px" height="150px">
                </a>
                <p class="font14 fontgrey">${data.products[i].name}</p> <br>
                <p class="font12 fontgrey">${data.products[i].description}</p><br>
                <p class="font12 fontgrey">De: R$${data.products[i].oldPrice.toFixed(2).replace(".", ",")}</p><br>
                <p class="font16bold fontgrey lineh01">Por: R$${data.products[i].price.toFixed(2).replace(".", ",")}</p><br>
                <p class="font12 fontgrey lineh01">ou ${data.products[i].installments.count}x de R$${data.products[i].installments.value.toFixed(2).replace(".", ",")}</p>
                <input type="button" class="prodbutton font14" value="Comprar">
    
            </div>       
            `

            html_ = html_ + item
        }
        container.innerHTML += html_
    })
}

load()

let maispagina = document.getElementsByClassName("moreprodbutton")[0]

maispagina.onclick = function () {
    paginaatual++

    load()
}