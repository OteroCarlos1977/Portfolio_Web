document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
    const navList = document.getElementById('lista-navegacion');

    openBtn.addEventListener('click', function() {
        navList.style.display = 'block';
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        navList.style.display = 'none';
        openBtn.style.display = 'block';
        closeBtn.style.display = 'none';
    });
});