const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector ('.toggle_btn i')
const respMenu = document.querySelector('.responsive_navbar')


toggleBtn.onclick = function () {
    respMenu.classList.toggle('open')
    const isOpen = respMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}