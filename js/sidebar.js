// Função para alternar o menu lateral
document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('show');
    document.querySelector('.content').classList.toggle('shifted');
});

// Fechar o menu lateral quando a navegação for realizada (para não deixar o menu aberto em páginas diferentes)
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('show');
            document.querySelector('.content').classList.remove('shifted');
        }
    });
});
