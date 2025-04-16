// Função para desenhar a Terra com sua rotação atual
function drawEarth() {
    // Terra base (oceanos)
    ctx.save();
    
    // CORRIGIDO: Rotacionar todo o globo terrestre, incluindo os continentes e o Brasil
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    
    // Desenhar o globo
    ctx.beginPath();
    ctx.arc(0, 0, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#1E90FF';
    ctx.fill();
    
    // Desenhar continentes simplificados (agora fixos em relação à Terra)
    // Desenhar um contorno continental simplificado
    ctx.beginPath();
    ctx.moveTo(0, -earthRadius * 0.7);
    ctx.bezierCurveTo(
      earthRadius * 0.6, -earthRadius * 0.5,
      earthRadius * 0.7, earthRadius * 0.3,
      0, earthRadius * 0.6
    );
    ctx.bezierCurveTo(
      -earthRadius * 0.5, earthRadius * 0.4,
      -earthRadius * 0.6, -earthRadius * 0.3,
      0, -earthRadius * 0.7
    );
    
    ctx.fillStyle = 'rgba(34, 139, 34, 0.7)';
    ctx.fill();
    
    // Restaurar contexto após rotação
    ctx.restore();
    
    // Desenhar o Brasil com base na rotação atual
    drawBrazil();
    
    // Desenhar o lado noturno (sombra) - Agora fixo em relação ao Sol
    drawNightSide();
    
    // Linha do terminadouro (separação dia/noite) - Fixa em relação ao Sol
    drawTerminator();
  }
  
  // Função para desenhar o Brasil
  function drawBrazil() {
    const isBrazilVisible = isVisible(-50, rotation);
    
    // CORRIGIDO: Determinar se o Brasil está iluminado com base na posição em relação ao Sol
    // O Sol está fixo à direita, então o lado direito da Terra está sempre iluminado
    const isBrazilIlluminated = isIlluminated(-50, rotation);
    
    // Se o Brasil não estiver na face visível, desenhar com transparência
    const opacity = isBrazilVisible ? 1 : 0.3;
    
    // Definir cor com base na iluminação (dia/noite)
    const fillColor = isBrazilIlluminated ? '#7CFC00' : '#004400';
    
    ctx.save();
    
    // Desenhar o contorno do Brasil rotacionado
    ctx.beginPath();
    
    const rotatedPoints = brazilPoints.map(point => {
      // Converter longitude para ângulo
      const angle = (point.lon * Math.PI) / 180 + rotation;
      
      // Calcular posição na esfera
      // Escala de acordo com a latitude (mais estreito perto dos polos)
      const latScale = Math.cos((point.lat * Math.PI) / 180);
      const x = Math.cos(angle) * earthRadius * latScale + centerX;
      const y = Math.sin((point.lat * Math.PI) / 180) * earthRadius + centerY;
      
      return { x, y };
    });
    
    // Construir o caminho
    ctx.moveTo(rotatedPoints[0].x, rotatedPoints[0].y);
    for (let i = 1; i < rotatedPoints.length; i++) {
      ctx.lineTo(rotatedPoints[i].x, rotatedPoints[i].y);
    }
    
    ctx.fillStyle = fillColor;
    ctx.globalAlpha = opacity;
    ctx.fill();
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.globalAlpha = 1;
    ctx.restore();
  }// Código JavaScript para animação da rotação da Terra com foco no Brasil
  
  // Configuração do canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);
  
  // Definição de constantes
  const earthRadius = 150;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const sunRadius = 50;
  const sunCenterX = canvas.width - 100;
  const sunCenterY = centerY;
  
  // Estado da animação
  let rotation = 0;
  let isPaused = false;
  let speed = 1;
  
  // Coordenadas aproximadas para o contorno do Brasil (simplificado)
  const brazilPoints = [
    { lon: -48, lat: -1 },   // Norte
    { lon: -35, lat: -5 },   // Nordeste
    { lon: -38, lat: -12 },  // Leste
    { lon: -43, lat: -23 },  // Sudeste
    { lon: -52, lat: -30 },  // Sul
    { lon: -65, lat: -18 },  // Centro-Oeste
    { lon: -67, lat: -10 },  // Oeste
    { lon: -60, lat: -5 },   // Noroeste
    { lon: -48, lat: -1 }    // Fecha o caminho
  ];
  
  // Função para desenhar estrelas aleatórias
  function drawStars() {
    for (let i = 0; i < 100; i++) {
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
  
  // Função para desenhar o Sol
  function drawSun() {
    // Glow externo
    const gradient = ctx.createRadialGradient(
      sunCenterX, sunCenterY, sunRadius / 2,
      sunCenterX, sunCenterY, sunRadius * 1.5
    );
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(sunCenterX, sunCenterY, sunRadius * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Sol principal
    ctx.beginPath();
    ctx.arc(sunCenterX, sunCenterY, sunRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    
    // Raios de luz
    drawSunRays();
  }
  
  // Função para desenhar raios solares
  function drawSunRays() {
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
    ctx.lineWidth = 1;
    
    // Raio central
    ctx.beginPath();
    ctx.moveTo(sunCenterX, sunCenterY);
    ctx.lineTo(centerX, centerY);
    ctx.stroke();
    
    // Raios adicionais
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI;
      const offsetY = Math.sin(angle) * 50;
      
      ctx.beginPath();
      ctx.moveTo(sunCenterX, sunCenterY + offsetY);
      ctx.lineTo(centerX, centerY + offsetY);
      ctx.stroke();
    }
  }
  
  // Função para determinar se um ponto está visível (na parte da frente da esfera)
  function isVisible(longitude, rotationAngle) {
    const adjustedLon = (longitude + 180) % 360 - 180; // Normalizar para -180 a 180
    const angle = (adjustedLon * Math.PI) / 180 + rotationAngle;
    return Math.cos(angle) > 0;
  }
  
  // Função para determinar se um ponto está na parte iluminada pelo Sol
  function isIlluminated(longitude, rotationAngle) {
    const adjustedLon = (longitude + 180) % 360 - 180; // Normalizar para -180 a 180
    const angle = (adjustedLon * Math.PI) / 180 + rotationAngle;
    return Math.cos(angle + Math.PI) > 0; // Sol está em posição oposta (+ Math.PI)
  }
  
  // Função para desenhar a Terra com sua rotação atual
  function drawEarth() {
    // Terra base (oceanos)
    ctx.beginPath();
    ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#1E90FF';
    ctx.fill();
    
    // Desenhar o Brasil com base na rotação atual
    drawBrazil();
    
    // Desenhar continentes simplificados
    drawContinents();
    
    // Desenhar o lado noturno (sombra)
    drawNightSide();
    
    // Linha do terminadouro (separação dia/noite)
    drawTerminator();
  }
  
  // Função para desenhar continentes simplificados
  function drawContinents() {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    
    // Desenhar um contorno continental simplificado
    ctx.beginPath();
    ctx.moveTo(0, -earthRadius * 0.7);
    ctx.bezierCurveTo(
      earthRadius * 0.6, -earthRadius * 0.5,
      earthRadius * 0.7, earthRadius * 0.3,
      0, earthRadius * 0.6
    );
    ctx.bezierCurveTo(
      -earthRadius * 0.5, earthRadius * 0.4,
      -earthRadius * 0.6, -earthRadius * 0.3,
      0, -earthRadius * 0.7
    );
    
    ctx.fillStyle = 'rgba(34, 139, 34, 0.7)';
    ctx.fill();
    
    ctx.restore();
  }
  
  // Função para desenhar o Brasil
  function drawBrazil() {
    const isBrazilVisible = isVisible(-50, rotation);
    const isBrazilIlluminated = isIlluminated(-50, rotation);
    
    // Se o Brasil não estiver na face visível, desenhar com transparência
    const opacity = isBrazilVisible ? 1 : 0.3;
    
    // Definir cor com base na iluminação (dia/noite)
    const fillColor = isBrazilIlluminated ? '#7CFC00' : '#004400';
    
    ctx.save();
    
    // Desenhar o contorno do Brasil rotacionado
    ctx.beginPath();
    
    const rotatedPoints = brazilPoints.map(point => {
      // Converter longitude para ângulo
      const angle = (point.lon * Math.PI) / 180 + rotation;
      
      // Calcular posição na esfera
      // Escala de acordo com a latitude (mais estreito perto dos polos)
      const latScale = Math.cos((point.lat * Math.PI) / 180);
      const x = Math.cos(angle) * earthRadius * latScale + centerX;
      const y = Math.sin((point.lat * Math.PI) / 180) * earthRadius + centerY;
      
      return { x, y };
    });
    
    // Construir o caminho
    ctx.moveTo(rotatedPoints[0].x, rotatedPoints[0].y);
    for (let i = 1; i < rotatedPoints.length; i++) {
      ctx.lineTo(rotatedPoints[i].x, rotatedPoints[i].y);
    }
    
    ctx.fillStyle = fillColor;
    ctx.globalAlpha = opacity;
    ctx.fill();
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.globalAlpha = 1;
    ctx.restore();
  }