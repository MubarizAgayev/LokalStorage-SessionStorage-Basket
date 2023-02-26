"use strict"





let tableBody = document.querySelector("tbody");
let products = JSON.parse(localStorage.getItem("basket"));
let commonPrize = document.querySelector(".common-prize")

if (products != null) {
    let sum = 0;
    for (const product of products) {
        tableBody.innerHTML += `<tr>
        <td><div class="img"><img src="${product.img}" alt=""></div></td>
        <td>${product.name}</td>
        <td>${product.describtion}</td>
        <td><div class="d-flex common"><div class="minus"><button class="btn-minus" data-id="${product.id}">-</button></div><div>${product.count}</div><div class="plus"><button class="btn-plus" data-id="${product.id}">+</button></div></div></td>
        <td>${product.prize * product.count}</td>
        <td><i class="fa-solid fa-trash trush" data-id="${product.id}"></i></td>
        </tr>`
        sum += product.prize * product.count 
    }

    commonPrize.innerText =  `Product Prize : ${sum} $`;
    getBasketCount(products);
}else {
    document.querySelector("table").classList.add("d-none");
    document.querySelector(".alert").classList.remove("d-none");
    commonPrize.classList.add("d-none");
}



document.querySelectorAll(".trush").forEach(trush => {
    trush.addEventListener("click", function () {
        let filteredProducts = products.filter(m=>m.id != trush.getAttribute("data-id"))
        if(filteredProducts.length == 0){
            localStorage.removeItem("basket")
            document.querySelector("table").classList.add("d-none");
            document.querySelector(".alert").classList.remove("d-none");
            commonPrize.classList.add("d-none");
            getBasketCount(filteredProducts)
        }
        else{
            localStorage.setItem("basket",JSON.stringify(filteredProducts));
            window.location.reload(); 
        }
    }) 
});

document.querySelectorAll("tbody .minus .btn-minus").forEach(minus => {
    minus.addEventListener("click",function(){
        let findProduct = products.find(m=>m.id == minus.getAttribute("data-id"))
        findProduct.count -= 1;
        if(findProduct.count >= 1){
            localStorage.setItem("basket",JSON.stringify(products));
        }
        else{
            let filteredProducts = products.filter(m=>m.id != minus.getAttribute("data-id"))
            if(filteredProducts.length == 0){
                localStorage.removeItem("basket")
                document.querySelector("table").classList.add("d-none");
                document.querySelector(".alert").classList.remove("d-none");
                commonPrize.classList.add("d-none");
                getBasketCount(filteredProducts)
            }
            else{
                localStorage.setItem("basket",JSON.stringify(filteredProducts));
            }
        }
        window.location.reload();
    })
});

document.querySelectorAll("tbody .plus .btn-plus").forEach(plus => {
    plus.addEventListener("click",function(){
        let findProduct = products.find(m=>m.id == plus.getAttribute("data-id"))
        findProduct.count += 1
        localStorage.setItem("basket",JSON.stringify(products));
        window.location.reload();
    })
});


function getBasketCount(arr) {
    let sum = 0;
    for (const item of arr) {
        sum += item.count
    }
    document.querySelector("sup").innerText = sum
}
