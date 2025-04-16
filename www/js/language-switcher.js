/**
 * language-switcher.js - Gerencia a troca de idiomas no aplicativo
 * Parte do aplicativo Astronomia: Terra e Lua - Versão 3.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Obtém o idioma atual da página
    const currentLang = document.documentElement.lang;
    
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
    
    // Cria o botão de troca de idioma
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    
    const languageBtn = document.createElement('button');
    languageBtn.className = 'language-btn ' + (currentLang === 'pt-BR' ? 'flag-usa' : 'flag-brazil');
    languageBtn.setAttribute('aria-label', currentLang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português');
    languageBtn.setAttribute('title', currentLang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português');
    
    // Adiciona evento de clique para navegar para a versão traduzida
    languageBtn.addEventListener('click', function() {
        // Obtém o caminho atual da página
        let currentPath = window.location.pathname;
        let filename = currentPath.split('/').pop();
        
        // Obtém o nome do arquivo traduzido
        const translatedFileName = fileNameMap[filename] || filename;
        
        // Detecta se estamos em um ambiente Android
        const isAndroid = /Android/.test(navigator.userAgent);
        
        if (currentLang === 'pt-BR') {
            // De português para inglês
            if (isAndroid) {
                // No Android, usamos um caminho absoluto
                window.location.href = 'file:///android_asset/public/en/' + translatedFileName;
            } else {
                // No navegador, usamos um caminho relativo
                window.location.href = './en/' + translatedFileName;
            }
        } else {
            // De inglês para português
            if (isAndroid) {
                // No Android, usamos um caminho absoluto
                window.location.href = 'file:///android_asset/public/' + translatedFileName;
            } else {
                // No navegador, usamos um caminho relativo
                window.location.href = '../' + translatedFileName;
            }
        }
    });
    
    // Adiciona o botão ao container
    languageSwitcher.appendChild(languageBtn);
    
    // Adiciona o container ao corpo da página
    document.body.appendChild(languageSwitcher);
});
