/**
 * language-switcher.js - Gerencia a troca de idiomas no aplicativo
 * Parte do aplicativo Astronomia: Terra e Lua - Versão 3.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Obtém o idioma atual da página
    const currentLang = document.documentElement.lang;
    
    // Determina o idioma alternativo e o caminho para a página traduzida
    const altLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
    
    // Obtém o caminho atual da página
    let currentPath = window.location.pathname;
    let filename = currentPath.split('/').pop();
    
    // Determina o caminho para a página traduzida
    let translatedPath;
    
    // Mapeamento de nomes de arquivo entre idiomas
    const fileNameMap = {
        // Português para Inglês
        'index.html': 'index.html',
        'visual-fases-lua.html': 'visual-moon-phases.html',
        'visual-translacao-terra.html': 'visual-earth-orbit.html',
        'video-translacao-terra.html': 'video-earth-orbit.html',
        'visual-translacao-lua.html': 'visual-moon-orbit.html',
        'video-translacao-lua.html': 'video-moon-orbit.html',
        'video-rotacao-terra.html': 'video-earth-rotation.html',
        
        // Inglês para Português
        'visual-moon-phases.html': 'visual-fases-lua.html',
        'visual-earth-orbit.html': 'visual-translacao-terra.html',
        'video-earth-orbit.html': 'video-translacao-terra.html',
        'visual-moon-orbit.html': 'visual-translacao-lua.html',
        'video-moon-orbit.html': 'video-translacao-lua.html',
        'video-earth-rotation.html': 'video-rotacao-terra.html'
    };
    
    // Obtém o nome do arquivo traduzido
    const translatedFileName = fileNameMap[filename] || filename;
    
    if (currentLang === 'pt-BR') {
        // Se estamos na versão portuguesa, a versão em inglês está na pasta /en/
        translatedPath = '/en/' + translatedFileName;
    } else {
        // Se estamos na versão inglesa, a versão em português está na raiz
        translatedPath = '/' + translatedFileName;
    }
    
    // Corrige o caminho para URLs relativas em vez de absolutas
    if (translatedPath.startsWith('/')) {
        if (currentLang === 'pt-BR') {
            translatedPath = '.' + translatedPath;
        } else {
            translatedPath = '..' + translatedPath;
        }
    }
    
    // Cria o botão de troca de idioma
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    
    const languageBtn = document.createElement('button');
    languageBtn.className = 'language-btn ' + (currentLang === 'pt-BR' ? 'flag-usa' : 'flag-brazil');
    languageBtn.setAttribute('aria-label', currentLang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português');
    languageBtn.setAttribute('title', currentLang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português');
    
    // Adiciona evento de clique para navegar para a versão traduzida
    languageBtn.addEventListener('click', function() {
        window.location.href = translatedPath;
    });
    
    // Adiciona o botão ao container
    languageSwitcher.appendChild(languageBtn);
    
    // Adiciona o container ao corpo da página
    document.body.appendChild(languageSwitcher);
});
