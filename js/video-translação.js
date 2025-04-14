// Código JavaScript para animação da translação da Terra ao redor do Sol
// com indicação das estações do ano no Brasil

// Configuração do canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 700;

// Adicionar o canvas ao documento
const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.padding = '20px';
container.style.backgroundColor = '#1a1a2e';
container.style.color = 'white';
container.style.fontFamily = 'Arial, sans-serif';
container.style.minHeight = '100vh';

const title = document.createElement('h1');
title.textContent = 'Translação da Terra e Estações do Ano no Brasil';
title.style.color = 'white';
title.style.marginBottom = '20px';

container.appendChild(title);
container.appendChild(canvas);
document.body.appendChild(container);

// Definição de constantes
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const semiMajorAxis = 250; // Eixo maior da elipse orbital
const semiMinorAxis = 240; // Eixo menor da elipse orbital
const earthRadius = 20;
const sunRadius = 40;
const axialTilt = 23.5; // Inclinação do eixo da Terra (em graus)

// Estado da animação
let orbitalPosition = 0;
let isPaused = false;
let speed = 1;

// Calcular a posição da Terra na órbita
function calculateEarthPosition(angle) {
  // Converter para radianos
  const rad = (angle * Math.PI) / 180;
  
  // Calcular posição na elipse
  const x = centerX + semiMajorAxis * Math.cos(rad);
  const y = centerY + semiMinorAxis * Math.sin(rad);
  
  return { x, y };
}

// Determinar a estação atual no Brasil (hemisfério sul)
function getCurrentSeason(angle) {
  // No hemisfério sul:
  // 0° (periélio) - Verão (Dezembro a Março)
  // 90° - Outono (Março a Junho)
  // 180° (afélio) - Inverno (Junho a Setembro)
  // 270° - Primavera (Setembro a Dezembro)
  
  if (angle >= 315 || angle < 45) {
    return { 
      name: "Verão", 
      color: "#FF5722", 
      month: getDayMonth(angle) 
    };
  } else if (angle >= 45 && angle < 135) {
    return { 
      name: "Outono", 
      color: "#FF9800", 
      month: getDayMonth(angle) 
    };
  } else if (angle >= 135 && angle < 225) {
    return { 
      name: "Inverno", 
      color: "#2196F3", 
      month: getDayMonth(angle) 
    };
  } else {
    return { 
      name: "Primavera", 
      color: "#4CAF50", 
      month: getDayMonth(angle) 
    };
  }
}

// Obter mês e dia aproximados com base no ângulo orbital
function getDayMonth(angle) {
  // 0° = 21 de dezembro (solstício)
  // 90° = 20 de março (equinócio)
  // 180° = 21 de junho (solstício)
  // 270° = 22 de setembro (equinócio)
  
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  // Ajuste para que 0° corresponda a 21 de dezembro
  const adjustedAngle = (angle + 10) % 360;
  const dayOfYear = Math.floor(adjustedAngle * 365 / 360);
  
  // Dias aproximados em cada mês
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let month = 0;
  
  // Começar em dezembro (21 de dezembro)
  let remainingDays = dayOfYear;
  if (remainingDays < 10) {
    return "21 de Dezembro";
  }
  
  remainingDays -= 10; // Dias restantes de dezembro
  
  for (let i = 0; i < 12; i++) {
    month = (i) % 12;
    if (remainingDays < daysInMonth[month]) {
      return `${remainingDays + 1} de ${months[month]}`;
    }
    remainingDays -= daysInMonth[month];
  }
  
  return "21 de Dezembro";
}

// Função para determinar se estamos em um solstício ou equinócio
function getSpecialDay(angle) {
  const tolerance = 3; // Tolerância em graus
  
  if (Math.abs(angle - 0) < tolerance || Math.abs(angle - 360) < tolerance) {
    return "Solstício de Verão (Sul)";
  } else if (Math.abs(angle - 90) < tolerance) {
    return "Equinócio de Outono (Sul)";
  } else if (Math.abs(angle - 180) < tolerance) {
    return "Solstício de Inverno (Sul)";
  } else if (Math.abs(angle - 270) < tolerance) {
    return "Equinócio de Primavera (Sul)";
  }
  return "";
}

// Desenhar estrelas no fundo
function drawStars() {
  const numStars = 200;
  
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 1.5;
    const opacity = Math.random() * 0.8 + 0.2;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();
  }
}

// Desenhar a órbita da Terra
function drawOrbit() {
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, semiMajorAxis, semiMinorAxis, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#444';
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Linhas de solstícios e equinócios
  ctx.beginPath();
  ctx.moveTo(centerX - semiMajorAxis, centerY);
  ctx.lineTo(centerX + semiMajorAxis, centerY);
  ctx.strokeStyle = '#666';
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - semiMinorAxis);
  ctx.lineTo(centerX, centerY + semiMinorAxis);
  ctx.stroke();
}

// Desenhar o Sol
function drawSun() {
  // Glow externo
  const gradient = ctx.createRadialGradient(
    centerX, centerY, sunRadius / 2,
    centerX, centerY, sunRadius * 1.5
  );
  gradient.addColorStop(0, 'rgba(253, 184, 19, 0.8)');
  gradient.addColorStop(1, 'rgba(253, 184, 19, 0)');
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, sunRadius * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Sol principal
  ctx.beginPath();
  ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#FDB813';
  ctx.fill();
  
  // Círculos de glow adicional
  ctx.beginPath();
  ctx.arc(centerX, centerY, sunRadius + 10, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(253, 184, 19, 0.3)';
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, sunRadius + 20, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(253, 184, 19, 0.1)';
  ctx.fill();
}

// Desenhar a Terra na sua posição atual
function drawEarth(position, season) {
  const { x, y } = position;
  
  // Linha entre Sol e Terra
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.setLineDash([3, 3]);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Salvar o contexto antes de aplicar transformações
  ctx.save();
  
  // Transladar para a posição da Terra
  ctx.translate(x, y);
  
  // Aplicar a inclinação do eixo
  ctx.rotate((axialTilt * Math.PI) / 180);
  
  // Desenhar o globo terrestre
  ctx.beginPath();
  ctx.arc(0, 0, earthRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#1E88E5';
  ctx.fill();
  
  // Desenhar continentes simplificados
  ctx.beginPath();
  ctx.moveTo(-earthRadius/2, -earthRadius/3);
  ctx.quadraticCurveTo(
    earthRadius/3, 0,
    -earthRadius/2, earthRadius/3
  );
  ctx.fillStyle = '#4CAF50';
  ctx.globalAlpha = 0.7;
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Desenhar o Brasil (destacado com a cor da estação)
  ctx.beginPath();
  ctx.arc(-earthRadius/2, earthRadius/4, earthRadius/5, 0, Math.PI * 2);
  ctx.fillStyle = season.color;
  ctx.fill();
  
  // Desenhar o eixo da Terra
  ctx.beginPath();
  ctx.moveTo(0, -earthRadius * 1.2);
  ctx.lineTo(0, earthRadius * 1.2);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Restaurar o contexto
  ctx.restore();
}

// Desenhar o setor da estação atual
function drawSeasonSector(position, season) {
  const prevAngle = (orbitalPosition - 45 + 360) % 360;
  const prevPos = calculateEarthPosition(prevAngle);
  
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(prevPos.x, prevPos.y);
  ctx.arc(
    centerX, centerY,
    semiMajorAxis,
    (prevAngle * Math.PI) / 180,
    (orbitalPosition * Math.PI) / 180,
    false
  );
  ctx.lineTo(centerX, centerY);
  ctx.fillStyle = season.color;
  ctx.globalAlpha = 0.1;
  ctx.fill();
  ctx.globalAlpha = 1.0;
}

// Desenhar os marcadores de estações
function drawSeasonMarkers() {
  ctx.font = '14px Arial';
  ctx.textBaseline = 'middle';
  
  // Verão (21 Dez)
  ctx.fillStyle = '#FF5722';
  ctx.textAlign = 'right';
  ctx.fillText('Verão (21 Dez)', centerX - semiMajorAxis - 10, centerY);
  
  // Outono (20 Mar)
  ctx.fillStyle = '#FF9800';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('Outono (20 Mar)', centerX, centerY - semiMinorAxis - 10);
  
  // Inverno (21 Jun)
  ctx.fillStyle = '#2196F3';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Inverno (21 Jun)', centerX + semiMajorAxis + 10, centerY);
  
  // Primavera (22 Set)
  ctx.fillStyle = '#4CAF50';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('Primavera (22 Set)', centerX, centerY + semiMinorAxis + 10);
  
  // Restaurar configurações padrão
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}