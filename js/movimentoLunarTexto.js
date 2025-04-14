// Dados fundamentais sobre a órbita lunar
const lunarOrbitalPeriod = 27.32; // Período orbital sideral em dias
const lunarSynodicPeriod = 29.53; // Período sinódico (ciclo completo de fases) em dias
const lunarOrbitEccentricity = 0.0549; // Excentricidade da órbita lunar
const lunarSemiMajorAxis = 384400; // Semi-eixo maior em km
const earthRadius = 6371; // Raio da Terra em km
const lunarRadius = 1737; // Raio da Lua em km
const moonOrbitalInclination = 5.14; // Inclinação da órbita lunar em relação ao plano da eclíptica em graus

// Calculando distância no periélio e afélio
const c = lunarSemiMajorAxis * lunarOrbitEccentricity; // Distância do centro da elipse ao foco
const perigee = lunarSemiMajorAxis * (1 - lunarOrbitEccentricity); // Distância mínima (perigeu)
const apogee = lunarSemiMajorAxis * (1 + lunarOrbitEccentricity); // Distância máxima (apogeu)

console.log("Informações sobre a órbita da Lua:");
console.log(`Período orbital sideral: ${lunarOrbitalPeriod} dias`);
console.log(`Período sinódico (ciclo de fases): ${lunarSynodicPeriod} dias`);
console.log(`Excentricidade da órbita: ${lunarOrbitEccentricity}`);
console.log(`Semi-eixo maior: ${lunarSemiMajorAxis} km`);
console.log(`Distância no perigeu: ${perigee.toFixed(2)} km`);
console.log(`Distância no apogeu: ${apogee.toFixed(2)} km`);
console.log(`Variação da distância: ${(apogee - perigee).toFixed(2)} km (${((apogee - perigee) / lunarSemiMajorAxis * 100).toFixed(2)}% da distância média)`);
console.log(`Inclinação orbital: ${moonOrbitalInclination}°`);

// A equação para a distância Terra-Lua em função do ângulo θ na órbita
function lunarDistance(theta) {
  // Equação da elipse em coordenadas polares (r em função de θ)
  // r = a(1-e²)/(1+e·cos(θ)) onde:
  // a = semi-eixo maior, e = excentricidade, θ = ângulo na órbita
  return lunarSemiMajorAxis * (1 - lunarOrbitEccentricity ** 2) / (1 + lunarOrbitEccentricity * Math.cos(theta));
}

// Posições da lua em diferentes ângulos para o ciclo orbital
function calculateLunarPositions() {
  const positions = [];
  const totalPositions = 8; // Número de posições para visualizar
  
  for (let i = 0; i < totalPositions; i++) {
    const angle = (i * 2 * Math.PI) / totalPositions; // Ângulo em radianos
    const distance = lunarDistance(angle);
    const x = distance * Math.cos(angle);
    const y = distance * Math.sin(angle);
    
    // Calcular a fase da lua em dias aproximados no ciclo sinódico
    // 0° = Lua Nova, 90° = Quarto Crescente, 180° = Lua Cheia, 270° = Quarto Minguante
    const phaseDay = (i / totalPositions) * lunarSynodicPeriod;
    
    // Adicionar à lista de posições
    positions.push({
      angle: angle * 180 / Math.PI, // Converter para graus
      distance: distance,
      x: x,
      y: y,
      phaseDay: phaseDay
    });
  }
  
  return positions;
}

// Dimensões para a visualização
const visualizationScale = 0.0005; // Escala para converter km para pixels na visualização
const earthVisualizationRadius = Math.max(earthRadius * visualizationScale, 40); // Garantir um mínimo visível
const lunarVisualizationRadius = Math.max(lunarRadius * visualizationScale, 10); // Garantir um mínimo visível
const orbitMajorAxis = lunarSemiMajorAxis * visualizationScale * 2;
const orbitMinorAxis = orbitMajorAxis * Math.sqrt(1 - lunarOrbitEccentricity**2);

// Dimensões do canvas
const canvasWidth = 800;
const canvasHeight = 600;

// Criar o elemento canvas
const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Posição central
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;

// Posição atual da Lua na órbita (em graus)
let currentAngle = 0;
let isPaused = false;
let animationSpeed = 1;

// Adicionar controles
function createControls() {
  const controlsDiv = document.createElement('div');
  controlsDiv.style.marginTop = '20px';
  controlsDiv.style.marginBottom = '20px';
  controlsDiv.style.textAlign = 'center';
  
  // Botão de pausa/continuar
  const pauseButton = document.createElement('button');
  pauseButton.textContent = 'Pausar';
  pauseButton.style.marginRight = '20px';
  pauseButton.style.padding = '10px 20px';
  pauseButton.onclick = function() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Continuar' : 'Pausar';
  };
  
  // Controle de velocidade
  const speedLabel = document.createElement('label');
  speedLabel.textContent = 'Velocidade: ';
  speedLabel.style.color = 'white';
  
  const speedSlider = document.createElement('input');
  speedSlider.type = 'range';
  speedSlider.min = '0.1';
  speedSlider.max = '5';
  speedSlider.step = '0.1';
  speedSlider.value = '1';
  speedSlider.style.width = '150px';
  speedSlider.oninput = function() {
    animationSpeed = parseFloat(this.value);
    speedValue.textContent = animationSpeed.toFixed(1) + 'x';
  };
  
  const speedValue = document.createElement('span');
  speedValue.textContent = '1.0x';
  speedValue.style.marginLeft = '10px';
  speedValue.style.color = 'white';
  
  controlsDiv.appendChild(pauseButton);
  controlsDiv.appendChild(speedLabel);
  controlsDiv.appendChild(speedSlider);
  controlsDiv.appendChild(speedValue);
  
  document.body.appendChild(controlsDiv);
  
  // Adicionar controles de teclado
  document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
      isPaused = !isPaused;
      pauseButton.textContent = isPaused ? 'Continuar' : 'Pausar';
    } else if (e.code === 'ArrowUp') {
      animationSpeed = Math.min(5, animationSpeed + 0.1);
      speedSlider.value = animationSpeed;
      speedValue.textContent = animationSpeed.toFixed(1) + 'x';
    } else if (e.code === 'ArrowDown') {
      animationSpeed = Math.max(0.1, animationSpeed - 0.1);
      speedSlider.value = animationSpeed;
      speedValue.textContent = animationSpeed.toFixed(1) + 'x';
    }
  });
}

// Função para calcular a posição da Lua com base no ângulo
function calculateMoonPosition(angle) {
  // Converter ângulo para radianos
  const radian = angle * Math.PI / 180;
  
  // Calcular distância Terra-Lua neste ângulo
  const distance = lunarDistance(radian);
  
  // Calcular a posição x, y
  const x = centerX + (distance * visualizationScale * Math.cos(radian));
  const y = centerY + (distance * visualizationScale * Math.sin(radian));
  
  return { x, y, distance };
}

// Função para determinar a fase da Lua
function getMoonPhase(angle) {
  // Fase da Lua é determinada pela posição relativa da Lua em relação à Terra e ao Sol
  // 0° = Lua Nova, 90° = Quarto Crescente, 180° = Lua Cheia, 270° = Quarto Minguante
  
  // Normalizar o ângulo para 0-360
  let normalizedAngle = angle % 360;
  if (normalizedAngle < 0) normalizedAngle += 360;
  
  if (normalizedAngle < 22.5 || normalizedAngle >= 337.5) {
    return { name: "Lua Nova", illumination: 0 };
  } else if (normalizedAngle < 67.5) {
    return { name: "Lua Crescente", illumination: 0.25 };
  } else if (normalizedAngle < 112.5) {
    return { name: "Quarto Crescente", illumination: 0.5 };
  } else if (normalizedAngle < 157.5) {
    return { name: "Lua Gibosa Crescente", illumination: 0.75 };
  } else if (normalizedAngle < 202.5) {
    return { name: "Lua Cheia", illumination: 1 };
  } else if (normalizedAngle < 247.5) {
    return { name: "Lua Gibosa Minguante", illumination: 0.75 };
  } else if (normalizedAngle < 292.5) {
    return { name: "Quarto Minguante", illumination: 0.5 };
  } else {
    return { name: "Lua Minguante", illumination: 0.25 };
  }
}

// Desenhar fundo com estrelas
function drawStars() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Desenhar estrelas
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const radius = Math.random() * 1.5;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
    ctx.fill();
  }
}

// Desenhar a Terra
function drawEarth() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, earthVisualizationRadius, 0, Math.PI * 2);
  
  // Gradiente para a Terra
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, earthVisualizationRadius
  );
  gradient.addColorStop(0, '#4477AA');
  gradient.addColorStop(0.6, '#1E90FF');
  gradient.addColorStop(1, '#104E8B');
  
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Adicionar glow
  ctx.beginPath();
  ctx.arc(centerX, centerY, earthVisualizationRadius + 5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(30, 144, 255, 0.2)';
  ctx.fill();
  
  // Adicionar continentes (simplificados)
  ctx.beginPath();
  ctx.ellipse(centerX - 10, centerY - 5, earthVisualizationRadius * 0.5, earthVisualizationRadius * 0.3, Math.PI/4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(34, 139, 34, 0.6)';
  ctx.fill();
}

// Desenhar a órbita lunar
function drawLunarOrbit() {
  ctx.beginPath();
  ctx.ellipse(
    centerX, centerY,
    lunarSemiMajorAxis * visualizationScale,
    lunarSemiMajorAxis * visualizationScale * Math.sqrt(1 - lunarOrbitEccentricity**2),
    0, 0, Math.PI * 2
  );
  ctx.strokeStyle = '#555';
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
}

// Desenhar a Lua em sua fase atual
function drawMoon(x, y, phase) {
  // Desenhar a lua básica
  ctx.beginPath();
  ctx.arc(x, y, lunarVisualizationRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#DDD';
  ctx.fill();
  
  // Desenhar a sombra com base na fase
  const illumination = phase.illumination;
  
  // Para lua nova e lua cheia, é simples
  if (illumination === 0) {
    // Lua Nova - totalmente escura
    ctx.beginPath();
    ctx.arc(x, y, lunarVisualizationRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#111';
    ctx.fill();
  } else if (illumination < 0.5) {
    // Crescente ou Minguante - desenhar semicírculo escuro
    ctx.beginPath();
    ctx.arc(x, y, lunarVisualizationRadius, -Math.PI/2, Math.PI/2);
    
    // Determinar se é crescente ou minguante
    if (currentAngle < 180) { // Crescente
      ctx.arc(x, y, lunarVisualizationRadius * (1 - illumination * 2), Math.PI/2, -Math.PI/2, true);
    } else { // Minguante
      ctx.arc(x, y, lunarVisualizationRadius * (1 - illumination * 2), -Math.PI/2, Math.PI/2, true);
    }
    
    ctx.closePath();
    ctx.fillStyle = '#111';
    ctx.fill();
  } else if (illumination < 1) {
    // Gibosa Crescente ou Minguante - desenhar apenas uma parte escura
    ctx.beginPath();
    
    // Determinar se é crescente ou minguante
    if (currentAngle < 180) { // Gibosa Crescente
      ctx.arc(x, y, lunarVisualizationRadius, -Math.PI/2, Math.PI/2);
      ctx.arc(x - lunarVisualizationRadius * (illumination * 2 - 1), y, lunarVisualizationRadius, Math.PI/2, -Math.PI/2, true);
    } else { // Gibosa Minguante
      ctx.arc(x, y, lunarVisualizationRadius, Math.PI/2, -Math.PI/2);
      ctx.arc(x + lunarVisualizationRadius * (illumination * 2 - 1), y, lunarVisualizationRadius, -Math.PI/2, Math.PI/2, true);
    }
    
    ctx.closePath();
    ctx.fillStyle = '#111';
    ctx.fill();
  }
  // Para lua cheia (illumination === 1), não precisamos adicionar sombra
  
  // Adicionar texto com informações sobre a fase
  ctx.fillStyle = 'white';
  ctx.font = '12px Arial';
  ctx.fillText(phase.name, x + lunarVisualizationRadius + 5, y - 5);
  
  // Calcular dia aproximado do ciclo lunar
  const lunarDay = (currentAngle / 360 * lunarSynodicPeriod).toFixed(1);
  ctx.fillText(`Dia ${lunarDay}`, x + lunarVisualizationRadius + 5, y + 10);
}

// Desenhar o painel de informações
function drawInfoPanel(moonPosition, phase) {
  // Fundo do painel
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(10, 10, 250, 120);
  
  // Informações
  ctx.fillStyle = 'white';
  ctx.font = 'bold 14px Arial';
  ctx.fillText('Movimento e Fases da Lua', 20, 30);
  
  ctx.font = '12px Arial';
  ctx.fillText(`Fase atual: ${phase.name}`, 20, 50);
  ctx.fillText(`Distância Terra-Lua: ${Math.round(moonPosition.distance).toLocaleString()} km`, 20, 70);
  ctx.fillText(`Ângulo orbital: ${Math.round(currentAngle)}°`, 20, 90);
  ctx.fillText(`Dia do ciclo lunar: ${(currentAngle / 360 * lunarSynodicPeriod).toFixed(1)} de ${lunarSynodicPeriod}`, 20, 110);
}

// Desenhar indicação da luz solar
function drawSunlight() {
  // Desenhar setas indicando a direção da luz solar (da direita)
  ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
  
  // Desenhar várias linhas de luz
  for (let i = -2; i <= 2; i++) {
    const yOffset = i * 50;
    
    ctx.beginPath();
    ctx.moveTo(canvasWidth, centerY + yOffset);
    ctx.lineTo(canvasWidth - 100, centerY + yOffset - 10);
    ctx.lineTo(canvasWidth - 100, centerY + yOffset + 10);
    ctx.closePath();
    ctx.fill();
  }
  
  // Texto indicativo
  ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
  ctx.font = '14px Arial';
  ctx.fillText('Luz Solar', canvasWidth - 180, centerY - 30);
}

// Função principal de animação
function animate() {
  // Limpar o canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Desenhar o fundo
  drawStars();
  drawSunlight();
  
  // Desenhar a órbita
  drawLunarOrbit();
  
  // Desenhar a Terra
  drawEarth();
  
  // Calcular a posição atual da Lua
  const moonPosition = calculateMoonPosition(currentAngle);
  
  // Determinar a fase da Lua
  const moonPhase = getMoonPhase(currentAngle);
  
  // Desenhar a Lua
  drawMoon(moonPosition.x, moonPosition.y, moonPhase);
  
  // Desenhar informações
  drawInfoPanel(moonPosition, moonPhase);
  
  // Atualizar o ângulo para a próxima frame, se não estiver pausado
  if (!isPaused) {
    currentAngle = (currentAngle + 0.5 * animationSpeed) % 360;
  }
  
  requestAnimationFrame(animate);
}

// Adicionar título
const title = document.createElement('h1');
title.textContent = 'Movimento e Fases da Lua';
title.style.color = 'white';
title.style.textAlign = 'center';
document.body.insertBefore(title, document.body.firstChild);

// Estilizar o corpo da página
document.body.style.backgroundColor = '#1a1a2e';
document.body.style.margin = '0';
document.body.style.padding = '20px';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.color = 'white';

// Adicionar explicação
const explanation = document.createElement('div');
explanation.style.maxWidth = '800px';
explanation.style.margin = '20px auto';
explanation.style.padding = '15px';
explanation.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
explanation.style.borderRadius = '8px';
explanation.style.lineHeight = '1.5';

explanation.innerHTML = `
  <h2>Sobre o Movimento e Fases da Lua</h2>
  <p>
    A Lua orbita a Terra em uma trajetória elíptica com excentricidade de ${lunarOrbitEccentricity.toFixed(4)}.
    Ela completa uma órbita a cada ${lunarOrbitalPeriod} dias (período sideral), mas o ciclo completo de suas
    fases (período sinódico) leva ${lunarSynodicPeriod} dias devido ao movimento simultâneo da Terra ao redor do Sol.
  </p>
  <p>
    <strong>Fases da Lua:</strong> As fases são causadas pela porção da face iluminada pelo Sol que podemos ver
    da Terra. À medida que a Lua orbita ao redor da Terra, a posição relativa entre Terra, Lua e Sol muda,
    resultando nas diferentes fases.
  </p>
  <p>
    <strong>Características da órbita lunar:</strong><br>
    • Distância média Terra-Lua: ${lunarSemiMajorAxis.toLocaleString()} km<br>
    • Distância no perigeu (ponto mais próximo): ${Math.round(perigee).toLocaleString()} km<br>
    • Distância no apogeu (ponto mais distante): ${Math.round(apogee).toLocaleString()} km<br>
    • Variação da distância: ${Math.round(apogee - perigee).toLocaleString()} km (${((apogee - perigee) / lunarSemiMajorAxis * 100).toFixed(1)}% da distância média)
  </p>
`;

document.body.appendChild(explanation);

// Iniciar a animação
createControls();
animate();