const deleteIcon = document.querySelectorAll(".remove");

deleteIcon.forEach(elem => {
    elem.addEventListener("click", () => {
        const  elemParent = elem.parentElement;
        elemParent.remove();
    })
});

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