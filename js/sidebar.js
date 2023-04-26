const imatge = document.querySelectorAll('.img-fluid');
const container = document.querySelector('.container');
imatge.forEach(element => {
    element.addEventListener('click', activarSidebar);
});

function activarSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    const displayItemsList = document.querySelectorAll('.display-items');
    displayItemsList.forEach((element) => {
        if (sidebar.classList.contains('active')) {
            element.style.marginLeft = '0';
            element.style.marginBottom = '500px';
            detectarCambioTamanioVentana();
        } else {
            element.style.width = '100%';
            element.style.marginLeft = '';
        }
    });
}

window.addEventListener('resize', detectarCambioTamanioVentana);
// Actualizar los estilos CSS si el ancho es menor a 768 píxeles
function detectarCambioTamanioVentana() {
    const windowWidth = window.innerWidth;
    const sidebar = document.getElementById('sidebar');
    const displayItemsList = document.querySelectorAll('.display-items');
    displayItemsList.forEach((element) => {
        if (windowWidth > 1000 && sidebar.classList.contains('active')) {
            element.style.width = '70%';
            sidebar.style.width = '30%';
        }
        if(windowWidth < 1000 && sidebar.classList.contains('active')){
            element.style.width = '50%';
            sidebar.style.width = '50%';
        }
    });
}
