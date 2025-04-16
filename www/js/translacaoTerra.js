// Definindo as distâncias em milhões de km
const perihelion = 147.1;  // Periélio - ponto mais próximo do Sol
const aphelion = 152.1;    // Afélio - ponto mais distante do Sol
const minorAxis = 149.58;  // Pontos no eixo menor

// Calculando parâmetros da elipse
const semiMajorAxis = (perihelion + aphelion) / 2; // ~149.6
const semiMinorAxis = minorAxis;
const focalDistance = aphelion - semiMajorAxis; // Distância do centro ao foco

console.log("Semi-eixo maior:", semiMajorAxis);
console.log("Semi-eixo menor:", semiMinorAxis);
console.log("Distância focal:", focalDistance);

// Calculando a excentricidade da órbita
const eccentricity = focalDistance / semiMajorAxis;
console.log("Excentricidade:", eccentricity);

// Para a visualização, criamos uma escala para caber na tela
// Escala em pixels por milhão de km
const scale = 2;

// Dimensões da visualização SVG
const svgWidth = 800;
const svgHeight = 500;
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;

// Dimensões da elipse em pixels
const ellipseMajor = semiMajorAxis * scale;
const ellipseMinor = semiMinorAxis * scale;

// Posição do sol (em um dos focos)
const sunOffsetX = focalDistance * scale;
const sunX = centerX;
const sunY = centerY;

console.log("Dimensões da elipse (px):", ellipseMajor, ellipseMinor);
console.log("Deslocamento do Sol (px):", sunOffsetX);

// Calculando as coordenadas dos pontos principais
// Periélio - Solstício de Verão (21 Dez)
const perihelionX = centerX - ellipseMajor + sunOffsetX;
const perihelionY = centerY;

// Afélio - Solstício de Inverno (21 Jun)
const aphelionX = centerX + ellipseMajor + sunOffsetX;
const aphelionY = centerY;

// Eixo menor 1 - Equinócio de Outono (20 Mar)
const minorAxis1X = centerX + sunOffsetX;
const minorAxis1Y = centerY - ellipseMinor;

// Eixo menor 2 - Equinócio de Primavera (22 Set)
const minorAxis2X = centerX + sunOffsetX;
const minorAxis2Y = centerY + ellipseMinor;

console.log("Coordenadas do periélio (Solstício de Verão):", perihelionX, perihelionY);
console.log("Coordenadas do afélio (Solstício de Inverno):", aphelionX, aphelionY);
console.log("Coordenadas do eixo menor 1 (Equinócio de Outono):", minorAxis1X, minorAxis1Y);
console.log("Coordenadas do eixo menor 2 (Equinócio de Primavera):", minorAxis2X, minorAxis2Y);

// Datas aproximadas dos solstícios e equinócios
const summerSolsticeDate = "21 Dez"; // Solstício de verão (hemisfério sul)
const autumnEquinoxDate = "20 Mar";  // Equinócio de outono (hemisfério sul)
const winterSolsticeDate = "21 Jun";  // Solstício de inverno (hemisfério sul)
const springEquinoxDate = "22 Set";  // Equinócio de primavera (hemisfério sul)

// SVG completo para a visualização da translação da Terra
const svgCode = `
<svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
  <!-- Fundo -->
  <rect width="${svgWidth}" height="${svgHeight}" fill="#111" />
  
  <!-- Linhas de referência -->
  <line x1="${centerX + sunOffsetX}" y1="${centerY - 200}" x2="${centerX + sunOffsetX}" y2="${centerY + 200}" stroke="#333" stroke-width="1" />
  <line x1="${centerX - 200 + sunOffsetX}" y1="${centerY}" x2="${centerX + 200 + sunOffsetX}" y2="${centerY}" stroke="#333" stroke-width="1" />
  
  <!-- Órbita da Terra (elipse) -->
  <ellipse cx="${centerX + sunOffsetX}" cy="${centerY}" rx="${ellipseMajor}" ry="${ellipseMinor}" 
           fill="none" stroke="#555" stroke-width="1" />
  
  <!-- Eixo maior -->
  <line x1="${perihelionX}" y1="${perihelionY}" x2="${aphelionX}" y2="${aphelionY}" 
        stroke="#444" stroke-width="1" stroke-dasharray="5,5" />
  
  <!-- Eixo menor -->
  <line x1="${minorAxis1X}" y1="${minorAxis1Y}" x2="${minorAxis2X}" y2="${minorAxis2Y}" 
        stroke="#444" stroke-width="1" stroke-dasharray="5,5" />
  
  <!-- Linhas de solstícios e equinócios -->
  <line x1="${sunX}" y1="${sunY}" x2="${perihelionX}" y2="${perihelionY}" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="10,5" />
  <line x1="${sunX}" y1="${sunY}" x2="${aphelionX}" y2="${aphelionY}" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="10,5" />
  <line x1="${sunX}" y1="${sunY}" x2="${minorAxis1X}" y2="${minorAxis1Y}" stroke="#87CEEB" stroke-width="1.5" stroke-dasharray="10,5" />
  <line x1="${sunX}" y1="${sunY}" x2="${minorAxis2X}" y2="${minorAxis2Y}" stroke="#87CEEB" stroke-width="1.5" stroke-dasharray="10,5" />
  
  <!-- Sol -->
  <circle cx="${sunX}" cy="${sunY}" r="20" fill="#FF9900">
    <animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite" />
  </circle>
  <circle cx="${sunX}" cy="${sunY}" r="25" fill="rgba(255,153,0,0.3)" />
  <circle cx="${sunX}" cy="${sunY}" r="30" fill="rgba(255,153,0,0.1)" />
  
  <!-- Terra nos pontos principais -->
  <!-- Periélio (Verão no Brasil) - Solstício de Verão -->
  <g transform="translate(${perihelionX}, ${perihelionY})">
    <circle r="8" fill="#1E90FF" />
    <circle r="10" fill="rgba(30,144,255,0.3)" />
    <!-- Inclinação do eixo da Terra ~23.5° -->
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#FFF" stroke-width="1" transform="rotate(-23.5)" />
    <text x="15" y="5" fill="white" font-size="12">Terra (Verão)</text>
    <text x="15" y="20" fill="orange" font-size="10">${summerSolsticeDate}</text>
    <text x="15" y="35" fill="#AAA" font-size="10">${perihelion} milhões km</text>
    <text x="15" y="50" fill="#FF5" font-size="10">Solstício de Verão</text>
  </g>
  
  <!-- Eixo menor 1 (Outono no Brasil) - Equinócio de Outono -->
  <g transform="translate(${minorAxis1X}, ${minorAxis1Y})">
    <circle r="8" fill="#1E90FF" />
    <circle r="10" fill="rgba(30,144,255,0.3)" />
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#FFF" stroke-width="1" transform="rotate(-23.5)" />
    <text x="-70" y="-15" fill="white" font-size="12">Terra (Outono)</text>
    <text x="-70" y="-30" fill="orange" font-size="10">${autumnEquinoxDate}</text>
    <text x="-70" y="-45" fill="#AAA" font-size="10">${minorAxis} milhões km</text>
    <text x="-70" y="-60" fill="#FF5" font-size="10">Equinócio de Outono</text>
  </g>
  
  <!-- Afélio (Inverno no Brasil) - Solstício de Inverno -->
  <g transform="translate(${aphelionX}, ${aphelionY})">
    <circle r="8" fill="#1E90FF" />
    <circle r="10" fill="rgba(30,144,255,0.3)" />
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#FFF" stroke-width="1" transform="rotate(-23.5)" />
    <text x="-100" y="5" fill="white" font-size="12">Terra (Inverno)</text>
    <text x="-100" y="20" fill="orange" font-size="10">${winterSolsticeDate}</text>
    <text x="-100" y="35" fill="#AAA" font-size="10">${aphelion} milhões km</text>
    <text x="-100" y="50" fill="#FF5" font-size="10">Solstício de Inverno</text>
  </g>
  
  <!-- Eixo menor 2 (Primavera no Brasil) - Equinócio de Primavera -->
  <g transform="translate(${minorAxis2X}, ${minorAxis2Y})">
    <circle r="8" fill="#1E90FF" />
    <circle r="10" fill="rgba(30,144,255,0.3)" />
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#FFF" stroke-width="1" transform="rotate(-23.5)" />
    <text x="15" y="5" fill="white" font-size="12">Terra (Primavera)</text>
    <text x="15" y="20" fill="orange" font-size="10">${springEquinoxDate}</text>
    <text x="15" y="35" fill="#AAA" font-size="10">${minorAxis} milhões km</text>
    <text x="15" y="50" fill="#FF5" font-size="10">Equinócio de Primavera</text>
  </g>
  
  <!-- Setores das estações -->
  <path d="M ${sunX} ${sunY} L ${perihelionX} ${perihelionY} A ${ellipseMajor} ${ellipseMinor} 0 0 1 ${minorAxis1X} ${minorAxis1Y} Z" 
        fill="rgba(255,100,100,0.15)" stroke="none" />
  <path d="M ${sunX} ${sunY} L ${minorAxis1X} ${minorAxis1Y} A ${ellipseMajor} ${ellipseMinor} 0 0 1 ${aphelionX} ${aphelionY} Z" 
        fill="rgba(255,200,100,0.15)" stroke="none" />
  <path d="M ${sunX} ${sunY} L ${aphelionX} ${aphelionY} A ${ellipseMajor} ${ellipseMinor} 0 0 1 ${minorAxis2X} ${minorAxis2Y} Z" 
        fill="rgba(100,100,255,0.15)" stroke="none" />
  <path d="M ${sunX} ${sunY} L ${minorAxis2X} ${minorAxis2Y} A ${ellipseMajor} ${ellipseMinor} 0 0 1 ${perihelionX} ${perihelionY} Z" 
        fill="rgba(100,200,100,0.15)" stroke="none" />
  
  <!-- Legenda -->
  <text x="50" y="30" fill="white" font-size="14" font-weight="bold">Translação da Terra</text>
  <text x="50" y="50" fill="rgb(255,100,100)" font-size="12">■ Verão</text>
  <text x="50" y="70" fill="rgb(255,200,100)" font-size="12">■ Outono</text>
  <text x="50" y="90" fill="rgb(100,100,255)" font-size="12">■ Inverno</text>
  <text x="50" y="110" fill="rgb(100,200,100)" font-size="12">■ Primavera</text>
  <text x="50" y="140" fill="#AAA" font-size="10">* Estações no Hemisfério Sul (Brasil)</text>
  <text x="50" y="160" fill="#AAA" font-size="10">* Inclinação do eixo da Terra: ~23.5°</text>
  <text x="50" y="180" fill="#FFD700" font-size="10">--- Solstícios (${summerSolsticeDate} e ${winterSolsticeDate})</text>
  <text x="50" y="200" fill="#87CEEB" font-size="10">--- Equinócios (${autumnEquinoxDate} e ${springEquinoxDate})</text>
</svg>
`;

console.log("SVG code generated successfully");

// Importante: Este código gera as coordenadas para visualizar a órbita da Terra
// com base nas distâncias reais entre a Terra e o Sol nos diferentes pontos:
// - Periélio (mais próximo do Sol): 147,1 milhões de km - coincide com o Solstício de Verão no Hemisfério Sul
// - Afélio (mais distante do Sol): 152,1 milhões de km - coincide com o Solstício de Inverno no Hemisfério Sul
// - Pontos do eixo menor: 149,58 milhões de km - coincide com os Equinócios

// Observações importantes:
// 1. As estações do ano são determinadas principalmente pela inclinação do eixo da Terra (~23,5°), 
//    não pela distância ao Sol.
// 2. A órbita da Terra é uma elipse de baixa excentricidade (0,0167), o que a torna quase circular.
// 3. O Sol está posicionado em um dos focos da elipse, não no centro.
// 4. Os solstícios e equinócios marcam o início das estações e também importantes posições 
//    astronômicas na órbita terrestre.