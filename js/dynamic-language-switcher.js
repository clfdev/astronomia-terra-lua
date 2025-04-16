/**
 * dynamic-language-switcher.js - Sistema de troca de idioma dinâmico para o aplicativo Astronomia: Terra e Lua
 * Versão 4.0 - Abril 2025
 * 
 * Esta abordagem carrega o conteúdo traduzido dinamicamente sem mudar de página,
 * o que é mais confiável em ambientes Android/Capacitor.
 */

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial
    setupLanguageSwitcher();
});

// Configura o botão de troca de idioma
function setupLanguageSwitcher() {
    // Idioma atual (padrão: português)
    let currentLang = document.documentElement.lang || 'pt-BR';
    
    // Cria o botão de troca de idioma
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    
    const languageBtn = document.createElement('button');
    languageBtn.className = 'language-btn ' + (currentLang === 'pt-BR' ? 'flag-usa' : 'flag-brazil');
    languageBtn.setAttribute('aria-label', currentLang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português');
    languageBtn.setAttribute('title', currentLang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português');
    
    // Adiciona evento de clique para alternar o idioma
    languageBtn.addEventListener('click', function() {
        // Alterna o idioma
        currentLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
        
        // Atualiza o idioma do documento
        document.documentElement.lang = currentLang;
        
        // Atualiza a classe do botão
        languageBtn.className = 'language-btn ' + (currentLang === 'pt-BR' ? 'flag-usa' : 'flag-brazil');
        languageBtn.setAttribute('aria-label', currentLang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português');
        languageBtn.setAttribute('title', currentLang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português');
        
        // Traduz o conteúdo da página
        translatePage(currentLang);
    });
    
    // Adiciona o botão ao container
    languageSwitcher.appendChild(languageBtn);
    
    // Adiciona o container ao corpo da página
    document.body.appendChild(languageSwitcher);
}

// Traduz o conteúdo da página para o idioma especificado
function translatePage(lang) {
    // Obtém o nome da página atual
    const currentPath = window.location.pathname;
    let pageName = currentPath.split('/').pop().replace('.html', '');
    
    // Log para depuração
    console.log('Página atual:', pageName);
    
    // Detecta a página atual pelo título ou elementos específicos
    // Isso é mais confiável do que usar o nome do arquivo
    if (document.title.includes('Rotação da Terra')) {
        pageName = 'video-rotacao-terra';
    } else if (document.title.includes('Translação da Terra e Estações')) {
        pageName = 'video-translacao-terra';
    } else if (document.title.includes('Movimento e Fases da Lua') && document.querySelector('canvas#moonCanvas')) {
        pageName = 'video-translacao-lua';
    } else if (document.title.includes('Visualização da Translação da Terra')) {
        pageName = 'visual-translacao-terra';
    } else if (document.title.includes('Visualização da Translação da Lua')) {
        pageName = 'visual-translacao-lua';
    } else if (document.title.includes('Fases da Lua')) {
        pageName = 'visual-fases-lua';
    } else if (document.title.includes('Menu de Astronomia') || document.title.includes('Astronomy Menu')) {
        pageName = 'index';
    }
    
    console.log('Página identificada:', pageName);
    
    // Dicionário de traduções para cada página
    const translations = {
        // Página inicial
        'index': {
            'pt-BR': {
                'title': 'Menu de Astronomia',
                'heading': 'Astronomia: Terra e Lua',
                'menu-items': [
                    'Visualização da Translação da Terra',
                    'Vídeo da Translação da Terra',
                    'Visualização da Translação da Lua',
                    'Vídeo da Translação da Lua',
                    'Vídeo da Rotação da Terra',
                    'Visualização das Fases da Lua'
                ],
                'footer': [
                    'Explore os movimentos da Terra e da Lua através de visualizações e vídeos.',
                    'Versão 3.0 - Abril 2025',
                    ' 2025. Desenvolvido por Caio Lima Firme e Claude 3.7'
                ]
            },
            'en': {
                'title': 'Astronomy Menu',
                'heading': 'Astronomy: Earth and Moon',
                'menu-items': [
                    'Earth\'s Orbit Visualization',
                    'Earth\'s Orbit Video',
                    'Moon\'s Orbit Visualization',
                    'Moon\'s Orbit Video',
                    'Earth\'s Rotation Video',
                    'Moon Phases Visualization'
                ],
                'footer': [
                    'Explore Earth and Moon movements through visualizations and videos.',
                    'Version 3.0 - April 2025',
                    ' 2025. Developed by Caio Lima Firme and Claude 3.7'
                ]
            }
        },
        
        // Visualização das Fases da Lua
        'visual-fases-lua': {
            'pt-BR': {
                'title': 'Fases da Lua - Astronomia',
                'heading': 'Fases da Lua',
                'back-button': '← Voltar',
                'phases': [
                    'Lua Nova',
                    'Lua Crescente',
                    'Quarto Crescente',
                    'Lua Gibosa Crescente',
                    'Lua Cheia',
                    'Lua Gibosa Minguante',
                    'Quarto Minguante',
                    'Lua Minguante'
                ],
                'interactive-title': 'Visualização Interativa',
                'slider-label': 'Posição da Lua:',
                'footer': [
                    'Astronomia: Terra e Lua - Versão 3.0',
                    ' 2025. Desenvolvido por Caio Lima Firme e Claude 3.7'
                ]
            },
            'en': {
                'title': 'Moon Phases - Astronomy',
                'heading': 'Moon Phases',
                'back-button': '← Back',
                'phases': [
                    'New Moon',
                    'Waxing Crescent',
                    'First Quarter',
                    'Waxing Gibbous',
                    'Full Moon',
                    'Waning Gibbous',
                    'Last Quarter',
                    'Waning Crescent'
                ],
                'interactive-title': 'Interactive Visualization',
                'slider-label': 'Moon Position:',
                'footer': [
                    'Astronomy: Earth and Moon - Version 3.0',
                    ' 2025. Developed by Caio Lima Firme and Claude 3.7'
                ]
            }
        },
        
        // Visualização da Translação da Terra
        'visual-translacao-terra': {
            'pt-BR': {
                'title': 'Visualização da Translação da Terra',
                'heading': 'Visualização da Translação da Terra',
                'back-button': '← Voltar',
                'info-title': 'Informações sobre a Órbita Terrestre',
                'footer': [
                    'Astronomia: Terra e Lua - Versão 3.0',
                    ' 2025. Desenvolvido por Caio Lima Firme e Claude 3.7'
                ]
            },
            'en': {
                'title': 'Earth\'s Orbit Visualization',
                'heading': 'Earth\'s Orbit Visualization',
                'back-button': '← Back',
                'info-title': 'Earth Orbit Information',
                'footer': [
                    'Astronomy: Earth and Moon - Version 3.0',
                    ' 2025. Developed by Caio Lima Firme and Claude 3.7'
                ]
            }
        },
        
        // Visualização da Translação da Lua
        'visual-translacao-lua': {
            'pt-BR': {
                'title': 'Visualização da Translação da Lua',
                'heading': 'Movimento e Fases da Lua',
                'back-button': '← Voltar',
                'phases-title': 'Fases da Lua',
                'footer': [
                    'Astronomia: Terra e Lua - Versão 3.0',
                    ' 2025. Desenvolvido por Caio Lima Firme e Claude 3.7'
                ]
            },
            'en': {
                'title': 'Moon\'s Orbit Visualization',
                'heading': 'Moon Movement and Phases',
                'back-button': '← Back',
                'phases-title': 'Moon Phases',
                'footer': [
                    'Astronomy: Earth and Moon - Version 3.0',
                    ' 2025. Developed by Caio Lima Firme and Claude 3.7'
                ]
            }
        },
        
        // Vídeo da Translação da Terra
        'video-translacao-terra': {
            'pt-BR': {
                'title': 'Translação da Terra e Estações do Ano no Brasil',
                'heading': 'Translação da Terra e Estações do Ano no Brasil',
                'back-button': '← Voltar',
                'footer': [
                    'Astronomia: Terra e Lua - Versão 3.0',
                    ' 2025. Desenvolvido por Caio Lima Firme e Claude 3.7'
                ]
            },
            'en': {
                'title': 'Earth\'s Orbit and Seasons in Brazil',
                'heading': 'Earth\'s Orbit and Seasons in Brazil',
                'back-button': '← Back',
                'footer': [
                    'Astronomy: Earth and Moon - Version 3.0',
                    ' 2025. Developed by Caio Lima Firme and Claude 3.7'
                ]
            }
        },
        
        // Vídeo da Rotação da Terra
        'video-rotacao-terra': {
            'pt-BR': {
                'title': 'Rotação da Terra - Ciclo Dia/Noite no Brasil',
                'heading': 'Rotação da Terra e Ciclo Dia/Noite no Brasil',
                'back-button': '← Voltar',
                'footer': [
                    'Astronomia: Terra e Lua - Versão 3.0',
                    ' 2025. Desenvolvido por Caio Lima Firme e Claude 3.7'
                ]
            },
            'en': {
                'title': 'Earth\'s Rotation - Day/Night Cycle in Brazil',
                'heading': 'Earth\'s Rotation and Day/Night Cycle in Brazil',
                'back-button': '← Back',
                'footer': [
                    'Astronomy: Earth and Moon - Version 3.0',
                    ' 2025. Developed by Caio Lima Firme and Claude 3.7'
                ]
            }
        },
        
        // Vídeo da Translação da Lua
        'video-translacao-lua': {
            'pt-BR': {
                'title': 'Movimento e Fases da Lua',
                'heading': 'Movimento e Fases da Lua',
                'back-button': '← Voltar',
                'phases-title': 'Fases da Lua',
                'footer': [
                    'Astronomia: Terra e Lua - Versão 3.0',
                    ' 2025. Desenvolvido por Caio Lima Firme e Claude 3.7'
                ]
            },
            'en': {
                'title': 'Moon\'s Orbit and Phases',
                'heading': 'Moon\'s Orbit and Phases',
                'back-button': '← Back',
                'phases-title': 'Moon Phases',
                'footer': [
                    'Astronomy: Earth and Moon - Version 3.0',
                    ' 2025. Developed by Caio Lima Firme and Claude 3.7'
                ]
            }
        }
    };
    
    // Verifica se temos traduções para esta página
    if (!translations[pageName]) {
        console.warn('Traduções não disponíveis para a página:', pageName);
        alert(lang === 'pt-BR' ? 
            'Traduções não disponíveis para esta página.' : 
            'Translations not available for this page.');
        return;
    }
    
    // Obtém as traduções para o idioma atual
    const pageTranslations = translations[pageName][lang];
    
    // Atualiza o título da página
    if (pageTranslations.title) {
        document.title = pageTranslations.title;
    }
    
    // Atualiza os elementos com base no ID da página
    switch (pageName) {
        case 'index':
            // Atualiza o cabeçalho
            document.querySelector('h1').textContent = pageTranslations.heading;
            
            // Atualiza os itens do menu
            const menuItems = document.querySelectorAll('.menu-link');
            pageTranslations['menu-items'].forEach((text, index) => {
                if (menuItems[index]) {
                    // Mantém o emoji, mas atualiza o texto
                    const emoji = menuItems[index].querySelector('span')?.textContent || '';
                    menuItems[index].childNodes[0].textContent = text + ' ';
                    if (emoji) {
                        const span = document.createElement('span');
                        span.textContent = emoji;
                        menuItems[index].appendChild(span);
                    }
                }
            });
            
            // Atualiza o rodapé
            const indexFooterParagraphs = document.querySelectorAll('.footer p');
            pageTranslations.footer.forEach((text, index) => {
                if (indexFooterParagraphs[index]) {
                    indexFooterParagraphs[index].textContent = text;
                }
            });
            break;
            
        case 'visual-fases-lua':
            // Atualiza o cabeçalho
            document.querySelector('h1').textContent = pageTranslations.heading;
            
            // Atualiza o botão de voltar
            document.querySelector('.back-button').textContent = pageTranslations['back-button'];
            
            // Atualiza os nomes das fases
            const phaseLabels = document.querySelectorAll('.phase-name');
            pageTranslations.phases.forEach((text, index) => {
                if (phaseLabels[index]) {
                    phaseLabels[index].textContent = text;
                }
            });
            
            // Atualiza o título da seção interativa
            document.querySelector('.interactive-section h2').textContent = pageTranslations['interactive-title'];
            
            // Atualiza o label do slider
            document.querySelector('label[for="moonPosition"]').textContent = pageTranslations['slider-label'];
            
            // Atualiza o rodapé
            const luaFooterParagraphs = document.querySelectorAll('.footer p');
            pageTranslations.footer.forEach((text, index) => {
                if (luaFooterParagraphs[index]) {
                    luaFooterParagraphs[index].textContent = text;
                }
            });
            break;
            
        // Páginas adicionais
        case 'visual-translacao-terra':
        case 'visual-translacao-lua':
        case 'video-translacao-terra':
        case 'video-rotacao-terra':
        case 'video-translacao-lua':
            // Atualiza o cabeçalho
            const heading = document.querySelector('h1');
            if (heading) {
                heading.textContent = pageTranslations.heading;
            }
            
            // Atualiza o botão de voltar
            const backButton = document.querySelector('.back-button');
            if (backButton) {
                backButton.textContent = pageTranslations['back-button'];
            }
            
            // Atualiza títulos específicos de cada página
            if (pageTranslations['info-title']) {
                const infoTitle = document.querySelector('h2[style*="color: #66D9E8"]');
                if (infoTitle) {
                    infoTitle.textContent = pageTranslations['info-title'];
                }
            }
            
            if (pageTranslations['phases-title']) {
                const phasesTitle = document.querySelector('h2');
                if (phasesTitle) {
                    phasesTitle.textContent = pageTranslations['phases-title'];
                }
            }
            
            // Atualiza o rodapé
            const footerParagraphs = document.querySelectorAll('.footer p');
            pageTranslations.footer.forEach((text, index) => {
                if (footerParagraphs[index]) {
                    footerParagraphs[index].textContent = text;
                }
            });
            break;
    }
    
    // Notifica o usuário sobre a mudança de idioma
    console.log('Idioma alterado para:', lang);
}
