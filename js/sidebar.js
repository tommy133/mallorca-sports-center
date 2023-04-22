const imatge = document.querySelectorAll('.img-fluid');
const container = document.querySelector('.container');
imatge.forEach(element => {
    element.addEventListener('click', activarSidebar);
});

function activarSidebar() {
    document.getElementById('sidebar').classList.toggle('active'); 
}