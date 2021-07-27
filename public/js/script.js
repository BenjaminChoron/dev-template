// MENU
let navbar = document.querySelector('.menu');
let menu = document.querySelector('.menu__toggle');
let hover = document.querySelectorAll('.menu__toggle__hover');


hover.forEach((element) => {
    menu.addEventListener('mouseover', () => {
        element.classList.add('appear');
    });
    menu.addEventListener('mouseout', () => {
        element.classList.remove('appear');
    });
});

let nav = document.querySelector('.menu__container');

menu.addEventListener('click', () => {
    navbar.classList.toggle('expend');
    nav.classList.toggle('show-menu');
});

let page = document.querySelector('main');

page.addEventListener('click', () => {
    navbar.classList.remove('expend');
    nav.classList.remove('show-menu');
});