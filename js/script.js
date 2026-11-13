// ===== Menu do celular =====
const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.querySelector('.opcoes');

if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', () => {
        const aberto = menu.classList.toggle('aberto');
        botaoMenu.setAttribute('aria-expanded', aberto);
        botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu ao clicar em um link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => fecharMenu());
    });

    // Fecha o menu com a tecla Esc
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') fecharMenu();
    });

    // Fecha o menu se a tela for aumentada
    window.addEventListener('resize', () => {
        if (window.innerWidth > 750) fecharMenu();
    });
}

function fecharMenu() {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
}

// ===== Rota de aprendizagem (curso.html) =====
const botoesAulas = document.querySelectorAll('.aula');

if (botoesAulas.length > 0) {
    const video = document.getElementById('video-aula');
    const etiqueta = document.getElementById('aula-etiqueta');
    const titulo = document.getElementById('aula-titulo');
    const descricao = document.getElementById('aula-descricao');
    const anterior = document.getElementById('aula-anterior');
    const proxima = document.getElementById('aula-proxima');
    let aulaAtual = 0;

    function mostrarAula(indice, rolar) {
        const botao = botoesAulas[indice];
        aulaAtual = indice;

        video.src = `https://www.youtube-nocookie.com/embed/${botao.dataset.video}?rel=0`;
        video.title = `${botao.dataset.etiqueta} - ${botao.dataset.titulo}`;
        etiqueta.textContent = botao.dataset.etiqueta;
        titulo.textContent = botao.dataset.titulo;
        descricao.textContent = botao.dataset.descricao;

        botoesAulas.forEach(b => b.removeAttribute('aria-current'));
        botao.setAttribute('aria-current', 'true');

        anterior.disabled = indice === 0;
        proxima.disabled = indice === botoesAulas.length - 1;

        // Guarda o vídeo no endereço (ex.: curso.html#aula-2 ou curso.html#encerramento)
        history.replaceState(null, '', `#${botao.dataset.id}`);

        if (rolar) {
            document.querySelector('.curso-player').scrollIntoView({ behavior: 'smooth' });
        }
    }

    botoesAulas.forEach((botao, indice) => {
        botao.addEventListener('click', () => mostrarAula(indice, window.innerWidth <= 900));
    });

    anterior.addEventListener('click', () => mostrarAula(aulaAtual - 1, false));
    proxima.addEventListener('click', () => mostrarAula(aulaAtual + 1, false));

    // Abre direto no vídeo do endereço, se existir (ex.: curso.html#aula-3)
    const encontrado = Array.from(botoesAulas).findIndex(b => `#${b.dataset.id}` === location.hash);
    mostrarAula(encontrado >= 0 ? encontrado : 0, false);
}
