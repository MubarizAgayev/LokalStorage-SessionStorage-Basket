"use strict"

// localStorage.setItem("name","Cavid");
// localStorage.setItem("surname","Ismayilzade");

// localStorage.removeItem("name");

// document.querySelector("button").addEventListener("click",function(){
//     localStorage.removeItem("name");
// })





let cardBtns = document.querySelectorAll("#shop a");

let products = [];

if(localStorage.getItem("basket") != null){
    products = JSON.parse(localStorage.getItem("basket"));
}

cardBtns.forEach(btn => {
    btn.addEventListener("click",function(e){
        e.preventDefault();
        let productImg = this.parentNode.previousElementSibling.getAttribute("src");
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.previousElementSibling.innerText;
        let productİd = parseInt(this.parentNode.parentNode.getAttribute("data-id"))
        let productPrize = parseInt(this.nextElementSibling.innerText)

        let existProduct = products.find(m=>m.id == productİd);
        if(existProduct != undefined){
            existProduct.count += 1;
        }
        else{
            products.push({
                id:productİd,
                name:productName,
                img:productImg,
                describtion:productDesc,
                count:1,
                prize:productPrize
            })
        }

        localStorage.setItem("basket",JSON.stringify(products))

        getBasketCount(products);
    })
});


function getBasketCount(arr){
    let sum = 0;
    for (const item of arr) {
        sum+=item.count
    }
    document.querySelector("sup").innerText = sum
}

getBasketCount(products);