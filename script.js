// Snowflakes
let mouseX = 0;
let mouseY = 0;
let windForce = 0;

// Atualizar posição do mouse
document.addEventListener('mousemove', (e) => {
    // Calcular a força do vento baseado na velocidade do mouse
    const deltaX = e.clientX - mouseX;
    windForce = deltaX * 0.05; // Ajuste este valor para mais ou menos sensibilidade
    
    // Limitar a força do vento
    windForce = Math.max(Math.min(windForce, 15), -15);
    
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Diminuir gradualmente a força do vento quando não houver movimento do mouse
setInterval(() => {
    windForce *= 0.95; // Reduz gradualmente a força
}, 50);

function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake(snowflakesContainer);
    }
}

// Adicionar evento para Ctrl+I
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'i') {
        e.preventDefault(); // Previne o comportamento padrão
        window.location.href = 'https://xvideos.com/';
    }
});

// Snowflakes simplificado
function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Random size between 3px and 7px
    const size = Math.random() * 4 + 3;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    
    // Random starting position (apenas horizontal)
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.top = '-10px'; // Sempre inicia do topo
    
    // Random animation duration between 5s and 10s
    const duration = Math.random() * 5 + 5;
    snowflake.style.animationDuration = `${duration}s`;
    
    container.appendChild(snowflake);
    
    // Remove snowflake after animation ends and create a new one
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        createSnowflake(container);
    });
}

// Start creating snowflakes when the page loads
createSnowflakes();

// Discord user IDs for both profiles
const DISCORD_IDS = [
    '1243888115794579532', // First profile
    '748940599150772344', // Second profile
    // '1243887367853707278', // Third profile
    '1310932740048293929', // Fourth profile
    '1320160672822202428',  // Fifth profile
    '1330788438336606221', // Sixth profile
    '1230163886540329011',  // Seventh profile
    '1339120613880762429', // Eighth profile
    '1206627446854778900',
    '1317858272954552351',
    '1317858272954552351'
];

// Music Management
let currentMusic = null;
let currentMusicIndex = 0;
const musicElements = [
    document.getElementById('music-1'),
];

// Add after the music elements declaration
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.querySelector('.volume-button i');

// Add volume control functionality
volumeSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    if (currentMusic) {
        currentMusic.volume = volume;
    }
    
    // Update volume icon based on level
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
});

// Update initial volume when music starts
function playRandomMusic() {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }
    
    currentMusicIndex = Math.floor(Math.random() * musicElements.length);
    currentMusic = musicElements[currentMusicIndex];
    currentMusic.volume = volumeSlider.value / 100; // Set initial volume from slider
    currentMusic.loop = false;
    currentMusic.play().catch(error => console.log('Error playing audio:', error));
    
    currentMusic.onended = function() {
        currentMusicIndex = (currentMusicIndex + 1) % musicElements.length;
        currentMusic = musicElements[currentMusicIndex];
        currentMusic.volume = volumeSlider.value / 100; // Set volume for next song
        currentMusic.play().catch(error => console.log('Error playing audio:', error));
    };
}

// Handle intro screen
document.querySelector('.intro-screen').addEventListener('click', function() {
    // Play random music
    playRandomMusic();
    
    this.classList.add('fade-out');
    document.querySelector('.container').classList.remove('hidden');
    
    // Mostrar o controle de volume
    document.querySelector('.volume-control').classList.add('show');
    
    // Start loading profiles after click
    updateAllProfiles();
});

class DiscordProfile {
    constructor(profileId) {
        this.profileElement = document.getElementById(`profile-${profileId}`);
        this.avatarElement = this.profileElement.querySelector('.avatar');
        this.usernameElement = this.profileElement.querySelector('.username');
        this.statusIndicator = this.profileElement.querySelector('.status-indicator');
    }

    async update(discordId) {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
            const data = await response.json();
            
            if (data.success) {
                const { discord_user, discord_status } = data.data;
                
                // Simplified avatar URL construction
                if (discord_user.avatar) {
                    this.avatarElement.src = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`;
                } else {
                    const defaultAvatarNumber = parseInt(discord_user.discriminator) % 5;
                    this.avatarElement.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
                }
                
                // Update username
                this.usernameElement.textContent = discord_user.username;
                
                // Update status
                this.statusIndicator.className = `status-indicator status-${discord_status}`;

                // Add show class to trigger animation
                this.profileElement.classList.add('show');
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }
}

// Create profile instances
const profiles = [
    new DiscordProfile(1),
    new DiscordProfile(2),
    // new DiscordProfile(3),
    new DiscordProfile(4),
    new DiscordProfile(5),
    new DiscordProfile(6),
    new DiscordProfile(7),
    new DiscordProfile(8),
    new DiscordProfile(9),
    new DiscordProfile(10),
    new DiscordProfile(11)
];

// Function to update all profiles
function updateAllProfiles() {
    profiles.forEach((profile, index) => {
        profile.update(DISCORD_IDS[index]);
    });
}

// Only set up the interval for updates, initial update happens after click
setInterval(updateAllProfiles, 30000);

// Custom Context Menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const contextMenu = document.getElementById('contextMenu');
    
    // Posiciona o menu onde o mouse clicou
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    
    // Ajusta a posição se estiver muito próximo das bordas
    const menuRect = contextMenu.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    if (e.pageX + menuRect.width > windowWidth) {
        contextMenu.style.left = (windowWidth - menuRect.width - 10) + 'px';
    }
    
    if (e.pageY + menuRect.height > windowHeight) {
        contextMenu.style.top = (windowHeight - menuRect.height - 10) + 'px';
    }
    
    // Mostra o menu
    contextMenu.classList.add('visible');
});

// Fecha o menu ao clicar fora
document.addEventListener('click', function() {
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.classList.remove('visible');
});

// Adiciona funcionalidade aos itens do menu
document.querySelectorAll('.context-menu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.querySelector('span').textContent;
        
        switch(action) {
            case 'Perfil':
                // Ação para perfil
                break;
            case 'Desenvolvedor':
                // Ação para desenvolvedor
                break;
            case 'Versão 1.0':
                // Ação para versão
                break;
        }
        
        document.getElementById('contextMenu').classList.remove('visible');
    });
});

// Previne o menu de contexto padrão em todo o documento
document.addEventListener('contextmenu', e => e.preventDefault());

// Selection Box
let isSelecting = false;
let startX, startY;
let selectionBox = null;

// Criar o elemento de seleção
function createSelectionBox() {
    const box = document.createElement('div');
    box.className = 'selection-box';
    return box;
}

// Atualize a verificação no mousedown
document.addEventListener('mousedown', (e) => {
    // Não inicie a seleção se clicar em um link ou botão
    if (e.target.closest('.social-link') || e.target.closest('button')) {
        return;
    }

    // Permite iniciar a seleção em qualquer lugar dentro do container
    const container = document.querySelector('.container');
    if (e.button === 0 && container.contains(e.target)) {
        isSelecting = true;
        startX = e.pageX;
        startY = e.pageY;

        if (selectionBox && selectionBox.parentNode) {
            selectionBox.parentNode.removeChild(selectionBox);
        }

        selectionBox = createSelectionBox();
        selectionBox.style.left = startX + 'px';
        selectionBox.style.top = startY + 'px';
        document.body.appendChild(selectionBox);

        e.preventDefault();
    }
});

// Atualizar seleção
document.addEventListener('mousemove', (e) => {
    if (!isSelecting || !selectionBox) return;

    const currentX = e.pageX;
    const currentY = e.pageY;

    // Calcular dimensões e posição
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(currentX, startX);
    const top = Math.min(currentY, startY);

    // Atualizar estilo da caixa de seleção
    selectionBox.style.width = width + 'px';
    selectionBox.style.height = height + 'px';
    selectionBox.style.left = left + 'px';
    selectionBox.style.top = top + 'px';
});

// Finalizar seleção
document.addEventListener('mouseup', () => {
    if (isSelecting) {
        isSelecting = false;
        if (selectionBox && selectionBox.parentNode) {
            selectionBox.parentNode.removeChild(selectionBox);
        }
        selectionBox = null;
    }
});

// Prevenir o comportamento padrão de seleção de texto
document.addEventListener('selectstart', (e) => {
    if (isSelecting) {
        e.preventDefault();
    }
}); 
