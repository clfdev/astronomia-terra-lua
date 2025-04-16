/**
 * android-language-handler.js - Manipulador específico para troca de idiomas no ambiente Android
 * Parte do aplicativo Astronomia: Terra e Lua - Versão 3.0
 */

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

// Função para trocar o idioma
function switchLanguage() {
    // Obtém o idioma atual da página
    const currentLang = document.documentElement.lang;
    
    // Obtém o caminho atual da página
    let currentPath = window.location.pathname;
    let filename = currentPath.split('/').pop();
    
    // Obtém o nome do arquivo traduzido
    const translatedFileName = fileNameMap[filename] || filename;
    
    // Constrói o caminho para a página traduzida
    let translatedPath;
    
    if (currentLang === 'pt-BR') {
        // Português para Inglês
        translatedPath = 'en/' + translatedFileName;
        console.log('Tentando navegar para:', translatedPath);
        window.location.href = translatedPath;
    } else {
        // Inglês para Português
        // Removendo "en/" do caminho atual
        let parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        parentPath = parentPath.substring(0, parentPath.lastIndexOf('/') + 1);
        translatedPath = parentPath + translatedFileName;
        console.log('Tentando navegar para:', translatedPath);
        window.location.href = translatedPath;
    }
}
