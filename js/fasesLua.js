/**
 * fasesLua.js - Controle da visualização interativa das fases da lua
 * Parte do aplicativo Astronomia: Terra e Lua - Versão 2.0
 * 
 * Este arquivo contém as funções para controlar a visualização interativa
 * das fases da lua, incluindo a animação do ciclo lunar e informações
 * educacionais sobre cada fase.
 */

// Dados sobre as fases da lua
const FASES_LUA = {
    0: {
        nome: "Lua Nova",
        descricao: "Na fase de Lua Nova, a face da Lua voltada para a Terra não está iluminada pelo Sol. Isso ocorre quando a Lua está entre a Terra e o Sol.",
        detalhes: "Nesta fase, a Lua não é visível no céu noturno, pois sua face iluminada está voltada para o lado oposto à Terra.",
        fenomenos: "Durante a Lua Nova podem ocorrer eclipses solares, quando a Lua bloqueia a luz do Sol vista da Terra."
    },
    12.5: {
        nome: "Lua Crescente",
        descricao: "Na fase Crescente, uma parte da face iluminada da Lua começa a ser visível da Terra, formando um 'C' no céu.",
        detalhes: "Esta fase ocorre quando a Lua se afasta da linha entre a Terra e o Sol, permitindo que vejamos uma porção da sua face iluminada.",
        fenomenos: "Nesta fase, a Lua é visível principalmente durante a tarde e início da noite."
    },
    25: {
        nome: "Quarto Crescente",
        descricao: "No Quarto Crescente, metade da face iluminada da Lua é visível da Terra.",
        detalhes: "Esta fase ocorre aproximadamente 7 dias após a Lua Nova, quando a Lua completou 1/4 de sua órbita ao redor da Terra.",
        fenomenos: "A Lua nesta fase nasce por volta do meio-dia e se põe por volta da meia-noite."
    },
    37.5: {
        nome: "Lua Gibosa Crescente",
        descricao: "Na fase Gibosa Crescente, mais da metade da face iluminada da Lua é visível, mas ainda não está completamente cheia.",
        detalhes: "Esta fase ocorre entre o Quarto Crescente e a Lua Cheia, quando a área iluminada continua a aumentar.",
        fenomenos: "Durante esta fase, a Lua nasce após o meio-dia e se põe após a meia-noite."
    },
    50: {
        nome: "Lua Cheia",
        descricao: "Na Lua Cheia, a face da Lua voltada para a Terra está completamente iluminada pelo Sol. Isso ocorre quando a Terra está entre o Sol e a Lua.",
        detalhes: "Nesta fase, a Lua aparece como um disco completo e brilhante no céu noturno, visível do pôr do sol ao nascer do sol.",
        fenomenos: "Durante a Lua Cheia podem ocorrer eclipses lunares, quando a Terra bloqueia a luz do Sol que chegaria à Lua."
    },
    62.5: {
        nome: "Lua Gibosa Minguante",
        descricao: "Na fase Gibosa Minguante, mais da metade da face iluminada da Lua é visível, mas está diminuindo.",
        detalhes: "Esta fase ocorre entre a Lua Cheia e o Quarto Minguante, quando a área iluminada começa a diminuir.",
        fenomenos: "Durante esta fase, a Lua nasce após o pôr do sol e permanece visível até depois do amanhecer."
    },
    75: {
        nome: "Quarto Minguante",
        descricao: "No Quarto Minguante, metade da face iluminada da Lua é visível da Terra.",
        detalhes: "Esta fase ocorre aproximadamente 7 dias antes da próxima Lua Nova, quando a Lua completou 3/4 de sua órbita ao redor da Terra.",
        fenomenos: "A Lua nesta fase nasce por volta da meia-noite e se põe por volta do meio-dia."
    },
    87.5: {
        nome: "Lua Minguante",
        descricao: "Na fase Minguante, uma parte da face iluminada da Lua é visível da Terra, formando um 'D' no céu.",
        detalhes: "Esta fase ocorre quando a Lua se aproxima novamente da linha entre a Terra e o Sol, fazendo com que a porção visível de sua face iluminada diminua gradualmente.",
        fenomenos: "Nesta fase, a Lua é visível principalmente durante a madrugada e início da manhã."
    },
    100: {
        nome: "Lua Nova (ciclo completo)",
        descricao: "O ciclo lunar completo dura aproximadamente 29,5 dias, retornando à fase de Lua Nova.",
        detalhes: "Este ciclo, conhecido como lunação ou mês sinódico, representa o tempo que a Lua leva para orbitar a Terra em relação ao Sol.",
        fenomenos: "O ciclo das fases da Lua tem influenciado calendários, agricultura e cultura ao longo da história humana."
    }
};

/**
 * Inicializa a visualização interativa das fases da lua
 */
function inicializarFasesLua() {
    const slider = document.getElementById('phase-slider');
    const moonShadow = document.getElementById('moonShadow');
    const phaseInfo = document.getElementById('phase-info');
    const moonPhases = document.querySelectorAll('.moon-phase');
    const animateButton = document.getElementById('animate-button');
    let animationId = null;
    
    // Atualiza a visualização da lua com base no valor do slider
    function atualizarFaseLua(valor) {
        // Calcula a posição do sombreamento
        const posicao = valor / 100;
        
        // Corrigindo a visualização para que 0 seja lua nova (toda escura) e 50 seja lua cheia (toda clara)
        if (posicao <= 0.5) {
            // Lua Nova (0) para Lua Cheia (50)
            // Começa com sombra cobrindo tudo (translateX(0)) e vai movendo para a esquerda até sair completamente (translateX(-250px))
            const xPos = -posicao * 2 * 250;
            moonShadow.style.transform = `translateX(${xPos}px)`;
        } else {
            // Lua Cheia (50) para Lua Nova (100)
            // Começa sem sombra (translateX(-250px)) e vai entrando da direita até cobrir tudo (translateX(0))
            const xPos = -(2 - posicao * 2) * 250;
            moonShadow.style.transform = `translateX(${xPos}px)`;
        }
        
        // Atualiza as informações da fase
        atualizarInfoFase(valor);
    }
    
    // Atualiza o texto informativo sobre a fase atual
    function atualizarInfoFase(valor) {
        // Encontra a fase mais próxima
        let faseProxima = 0;
        let difMinima = 100;
        
        for (const fase in FASES_LUA) {
            const diferenca = Math.abs(valor - fase);
            if (diferenca < difMinima) {
                difMinima = diferenca;
                faseProxima = fase;
            }
        }
        
        const fase = FASES_LUA[faseProxima];
        phaseInfo.innerHTML = `
            <h3>${fase.nome}</h3>
            <p>${fase.descricao}</p>
            <p>${fase.detalhes}</p>
            <p class="fenomenos"><strong>Fenômenos:</strong> ${fase.fenomenos}</p>
        `;
    }
    
    // Inicia a animação do ciclo lunar
    function iniciarAnimacao() {
        if (animationId) {
            // Se já estiver animando, para a animação
            pararAnimacao();
            animateButton.textContent = "Iniciar Animação";
            return;
        }
        
        let valorAtual = parseInt(slider.value);
        
        animationId = setInterval(() => {
            valorAtual = (valorAtual + 0.5) % 100;
            slider.value = valorAtual;
            atualizarFaseLua(valorAtual);
        }, 100);
        
        animateButton.textContent = "Parar Animação";
    }
    
    // Para a animação do ciclo lunar
    function pararAnimacao() {
        if (animationId) {
            clearInterval(animationId);
            animationId = null;
        }
    }
    
    // Event listener para o slider
    slider.addEventListener('input', function() {
        // Se estiver animando, para a animação quando o usuário move o slider
        if (animationId) {
            pararAnimacao();
            animateButton.textContent = "Iniciar Animação";
        }
        atualizarFaseLua(this.value);
    });
    
    // Event listeners para os ícones de fase da lua
    moonPhases.forEach(phase => {
        phase.addEventListener('click', function() {
            // Se estiver animando, para a animação quando o usuário clica em uma fase
            if (animationId) {
                pararAnimacao();
                animateButton.textContent = "Iniciar Animação";
            }
            
            const phaseValue = parseFloat(this.getAttribute('data-phase')) * 100;
            slider.value = phaseValue;
            atualizarFaseLua(phaseValue);
        });
    });
    
    // Event listener para o botão de animação
    if (animateButton) {
        animateButton.addEventListener('click', iniciarAnimacao);
    }
    
    // Inicializa com o valor padrão
    atualizarFaseLua(slider.value);
    
    // Adiciona listener para parar animação quando a página é fechada
    window.addEventListener('beforeunload', pararAnimacao);
    
    // Adiciona listener para preferência de movimento reduzido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        // Se o usuário prefere movimento reduzido, desabilita o botão de animação
        if (animateButton) {
            animateButton.disabled = true;
            animateButton.title = "Animação desativada devido à preferência de movimento reduzido";
        }
    }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarFasesLua);
