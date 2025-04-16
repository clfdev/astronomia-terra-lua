# Script PowerShell para sincronizar arquivos e preparar build do APK
# Caminho do projeto: ajuste se necessário
$projeto = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Host "\n--- CHECKLIST DE SINCRONIZAÇÃO E BUILD ---\n"
Write-Host "1. Certifique-se de que todos os arquivos HTML, JS e CSS principais estão atualizados."
Write-Host "2. Os arquivos em 'www' devem ser idênticos aos originais do projeto."
Write-Host "3. Sincronizando arquivos com Capacitor..."

# Comando de sincronização
npx cap sync android

Write-Host "\nSincronização concluída! Abra o Android Studio e faça o build do APK."
Write-Host "Se necessário, execute novamente este script antes de cada build."
