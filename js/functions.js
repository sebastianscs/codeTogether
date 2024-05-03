let deleteIcon 
const header = document.querySelector("header")
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () =>{
    cart.classList.toggle("show");
});

const menuIcon = header.firstElementChild;
const menu = document.querySelector(".menu");
menuIcon.addEventListener("click", ()=>{
    menu.classList.toggle("showMenu");
});

const addShoppingCartButtons = document.querySelectorAll(".addToCart");
addShoppingCartButtons.forEach((addShoppingButton) =>{
    addShoppingButton.addEventListener("click", addToCartClicked);
});

function addToCartClicked (event){
    
    const button = event.target;
    const item = button.closest('.product');
    const itemTitle = item.getElementsByTagName('h3');
    const title = itemTitle[0].textContent;

    const itemPrice = item.getElementsByTagName('p');
    const price = itemPrice[0].textContent;
    const itemImage = item.getElementsByTagName('img');
    const image = itemImage[0].src;
    addProductToShoppingCart(title,price,image);
}

function addProductToShoppingCart(title,price,image){

    const elementsProductCart = cart.querySelectorAll('.cartContent .productCart .productName');
    for (i=0;i<=elementsProductCart.length;i++){
        if (typeof(elementsProductCart[i]) !== 'undefined' && elementsProductCart[i].innerText === title){
            let quantity = elementsProductCart[i].parentElement.querySelector('.quantity');
            quantity.value++;
            updateShoppingCartTotal();
            updateShoppingCartProducts();
            return;
            
        }
    }
    //const titles = productCart.getElementsByClassName('.productName');
    

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
        <img src=${image}>
        <p class='productName'>${title}</p>
        <span class='productPrice'>${price}</span>
        <input class='quantity' type='number' value='1'></input>
        <i class="remove"><img src="img/cancel.png" alt="Icono Quitar" class="delete-icon"></i>`
    shoppingCartRow.innerHTML = shoppingCartContent;
    const cartContainer = document.querySelector('.cartContent')
    shoppingCartRow.setAttribute('class','productCart')
    cartContainer.append(shoppingCartRow);
    
    
    shoppingCartRow.querySelector('.remove').addEventListener('click', removeShoppingCart);
    
    shoppingCartRow.querySelector('.quantity').addEventListener('change', quantityChange);
    updateShoppingCartProducts();
    updateShoppingCartTotal();
}
function updateShoppingCartProducts(){
    const counterProducts  = document.querySelector("#counterProducts");
    let quantityCounterProducts = 0;
    const itemsCart = cart.querySelectorAll('.cartContent .productCart');
    for (let i=0;i < itemsCart.length;i++){
        let quantity = itemsCart[i].querySelector('.quantity');
        quantityCounterProducts+= Number(quantity.value);
    }
    counterProducts.innerHTML=`${quantityCounterProducts}`;
}

function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.total');
    const shoppingCartProducts = document.querySelectorAll('.productCart');

    shoppingCartProducts.forEach(shoppingCartProduct =>{
        const shoppingCartProductPrice = Number(shoppingCartProduct.querySelector('.productPrice').textContent.replace('$ ',''));
        const shoppingCartProductQuantity = Number(shoppingCartProduct.querySelector('.quantity').value);
        total += shoppingCartProductPrice*shoppingCartProductQuantity

    });
    shoppingCartTotal.innerHTML = `$ ${total}`
}
function removeShoppingCart(event){
    const buttonClicked = event.target;
    buttonClicked.closest('.productCart').remove();
    updateShoppingCartTotal();
    updateShoppingCartProducts();
}

function quantityChange(event){
    const input = event.target;
    if (input.value <= 0){
        input.value = 1
        
    }
    updateShoppingCartTotal();
    updateShoppingCartProducts();
}