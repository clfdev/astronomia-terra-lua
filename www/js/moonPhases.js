/**
 * moonPhases.js - Controls the interactive visualization of moon phases
 * Part of Astronomy: Earth and Moon app - Version 3.0
 * 
 * This file contains functions to control the interactive visualization
 * of moon phases, including lunar cycle animation and educational
 * information about each phase.
 */

// Data about moon phases
const MOON_PHASES = {
    0: {
        name: "New Moon",
        description: "During the New Moon phase, the side of the Moon facing Earth is not illuminated by the Sun. This occurs when the Moon is between the Earth and the Sun.",
        details: "In this phase, the Moon is not visible in the night sky, as its illuminated face is facing away from Earth.",
        phenomena: "During the New Moon, solar eclipses can occur when the Moon blocks the Sun's light as seen from Earth."
    },
    12.5: {
        name: "Waxing Crescent",
        description: "In the Waxing Crescent phase, a small portion of the Moon's illuminated side becomes visible from Earth, forming a 'C' shape in the sky.",
        details: "This phase occurs as the Moon moves away from the line between Earth and Sun, allowing us to see a portion of its illuminated face.",
        phenomena: "During this phase, the Moon is visible mainly in the afternoon and early evening."
    },
    25: {
        name: "First Quarter",
        description: "In the First Quarter, half of the Moon's illuminated side is visible from Earth.",
        details: "This phase occurs approximately 7 days after the New Moon, when the Moon has completed 1/4 of its orbit around Earth.",
        phenomena: "The Moon in this phase rises around noon and sets around midnight."
    },
    37.5: {
        name: "Waxing Gibbous",
        description: "In the Waxing Gibbous phase, more than half of the Moon's illuminated side is visible, but it's not yet completely full.",
        details: "This phase occurs between the First Quarter and Full Moon, as the illuminated area continues to increase.",
        phenomena: "During this phase, the Moon rises after noon and sets after midnight."
    },
    50: {
        name: "Full Moon",
        description: "During the Full Moon, the side of the Moon facing Earth is completely illuminated by the Sun. This occurs when Earth is between the Sun and the Moon.",
        details: "In this phase, the Moon appears as a complete, bright disk in the night sky, visible from sunset to sunrise.",
        phenomena: "During the Full Moon, lunar eclipses can occur when Earth blocks the sunlight that would reach the Moon."
    },
    62.5: {
        name: "Waning Gibbous",
        description: "In the Waning Gibbous phase, more than half of the Moon's illuminated side is visible, but it's decreasing.",
        details: "This phase occurs between the Full Moon and Last Quarter, as the illuminated area begins to decrease.",
        phenomena: "During this phase, the Moon rises after sunset and remains visible until after dawn."
    },
    75: {
        name: "Last Quarter",
        description: "In the Last Quarter, half of the Moon's illuminated side is visible from Earth.",
        details: "This phase occurs approximately 7 days before the next New Moon, when the Moon has completed 3/4 of its orbit around Earth.",
        phenomena: "The Moon in this phase rises around midnight and sets around noon."
    },
    87.5: {
        name: "Waning Crescent",
        description: "In the Waning Crescent phase, a small portion of the Moon's illuminated side is visible from Earth, forming a 'D' shape in the sky.",
        details: "This phase occurs as the Moon approaches the line between Earth and Sun again, causing the visible portion of its illuminated face to gradually decrease.",
        phenomena: "During this phase, the Moon is visible mainly in the early morning and dawn."
    },
    100: {
        name: "New Moon (complete cycle)",
        description: "The complete lunar cycle lasts approximately 29.5 days, returning to the New Moon phase.",
        details: "This cycle, known as a lunation or synodic month, represents the time it takes for the Moon to orbit Earth relative to the Sun.",
        phenomena: "The cycle of Moon phases has influenced calendars, agriculture, and culture throughout human history."
    }
};

/**
 * Initializes the interactive visualization of moon phases
 */
function initializeMoonPhases() {
    const slider = document.getElementById('phase-slider');
    const moonShadow = document.getElementById('moonShadow');
    const phaseInfo = document.getElementById('phase-info');
    const moonPhases = document.querySelectorAll('.moon-phase');
    const animateButton = document.getElementById('animate-button');
    let animationId = null;
    
    // Updates the moon visualization based on slider value
    function updateMoonPhase(value) {
        // Calculate shadow position
        const position = value / 100;
        
        // Correcting visualization so 0 is new moon (all dark) and 50 is full moon (all light)
        if (position <= 0.5) {
            // New Moon (0) to Full Moon (50)
            // Starts with shadow covering everything (translateX(0)) and moves left until completely gone (translateX(-250px))
            const xPos = -position * 2 * 250;
            moonShadow.style.transform = `translateX(${xPos}px)`;
        } else {
            // Full Moon (50) to New Moon (100)
            // Starts with no shadow (translateX(-250px)) and enters from right until covering everything (translateX(0))
            const xPos = -(2 - position * 2) * 250;
            moonShadow.style.transform = `translateX(${xPos}px)`;
        }
        
        // Updates phase information
        updatePhaseInfo(value);
    }
    
    // Updates the informative text about the current phase
    function updatePhaseInfo(value) {
        // Find the closest phase
        let closestPhase = 0;
        let minDiff = 100;
        
        for (const phase in MOON_PHASES) {
            const diff = Math.abs(value - phase);
            if (diff < minDiff) {
                minDiff = diff;
                closestPhase = phase;
            }
        }
        
        const phase = MOON_PHASES[closestPhase];
        phaseInfo.innerHTML = `
            <h3>${phase.name}</h3>
            <p>${phase.description}</p>
            <p>${phase.details}</p>
            <p class="fenomenos"><strong>Phenomena:</strong> ${phase.phenomena}</p>
        `;
    }
    
    // Starts the lunar cycle animation
    function startAnimation() {
        if (animationId) {
            // If already animating, stop animation
            stopAnimation();
            animateButton.textContent = "Start Animation";
            return;
        }
        
        let currentValue = parseInt(slider.value);
        
        animationId = setInterval(() => {
            currentValue = (currentValue + 0.5) % 100;
            slider.value = currentValue;
            updateMoonPhase(currentValue);
        }, 100);
        
        animateButton.textContent = "Stop Animation";
    }
    
    // Stops the lunar cycle animation
    function stopAnimation() {
        if (animationId) {
            clearInterval(animationId);
            animationId = null;
        }
    }
    
    // Event listener for the slider
    slider.addEventListener('input', function() {
        // If animating, stop animation when user moves slider
        if (animationId) {
            stopAnimation();
            animateButton.textContent = "Start Animation";
        }
        updateMoonPhase(this.value);
    });
    
    // Event listeners for moon phase icons
    moonPhases.forEach(phase => {
        phase.addEventListener('click', function() {
            // If animating, stop animation when user clicks a phase
            if (animationId) {
                stopAnimation();
                animateButton.textContent = "Start Animation";
            }
            
            const phaseValue = parseFloat(this.getAttribute('data-phase')) * 100;
            slider.value = phaseValue;
            updateMoonPhase(phaseValue);
        });
    });
    
    // Event listener for animation button
    if (animateButton) {
        animateButton.addEventListener('click', startAnimation);
    }
    
    // Initialize with default value
    updateMoonPhase(slider.value);
    
    // Add listener to stop animation when page is closed
    window.addEventListener('beforeunload', stopAnimation);
    
    // Add listener for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        // If user prefers reduced motion, disable animation button
        if (animateButton) {
            animateButton.disabled = true;
            animateButton.title = "Animation disabled due to reduced motion preference";
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMoonPhases);
