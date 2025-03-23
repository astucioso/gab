// --- Snowflakes ---
let mouseX = 0;
let mouseY = 0;
let windForce = 0;

document.addEventListener('mousemove', (e) => {
  const deltaX = e.clientX - mouseX;
  windForce = Math.max(Math.min(deltaX * 0.05, 15), -15);
  mouseX = e.clientX;
  mouseY = e.clientY;
});

setInterval(() => {
  windForce *= 0.95;
}, 50);

function createSnowflakes() {
  const container = document.querySelector('.snowflakes');
  const numberOfSnowflakes = 50;
  for (let i = 0; i < numberOfSnowflakes; i++) {
    createSnowflake(container);
  }
}

function createSnowflake(container) {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  const size = Math.random() * 4 + 3;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  snowflake.style.left = `${Math.random() * 100}%`;
  snowflake.style.top = '-10px';
  const duration = Math.random() * 5 + 5;
  snowflake.style.animationDuration = `${duration}s`;
  container.appendChild(snowflake);
  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
    createSnowflake(container);
  });
}

createSnowflakes();

// --- Redirecionamento via Ctrl+I ---
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'i') {
    e.preventDefault();
    window.location.href = 'https://xivdeos.com/';
  }
});

// --- Discord Profiles ---
const DISCORD_IDS = [
  '1243888115794579532', // Profile 1
  '748940599150772344',  // Profile 2
  // '1243887367853707278', // Profile 3 (comentado)
  '1310932740048293929', // Profile 4
  '1320160672822202428', // Profile 5
  '1330788438336606221', // Profile 6
  '1230163886540329011', // Profile 7
  '1339120613880762429', // Profile 8
  '1206627446854778900', // Profile 9
  '1317858272954552351', // Profile 10
  '1317858272954552351'  // Profile 11
];

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
        if (discord_user.avatar) {
          this.avatarElement.src = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`;
        } else {
          const defaultAvatarNumber = parseInt(discord_user.discriminator) % 5;
          this.avatarElement.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        }
        this.usernameElement.textContent = discord_user.username;
        this.statusIndicator.className = `status-indicator status-${discord_status}`;
        this.profileElement.classList.add('show');
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }
}

const profiles = [
  new DiscordProfile(1),
  new DiscordProfile(2),
  // new DiscordProfile(3), // Comentado
  new DiscordProfile(4),
  new DiscordProfile(5),
  new DiscordProfile(6),
  new DiscordProfile(7),
  new DiscordProfile(8),
  new DiscordProfile(9),
  new DiscordProfile(10),
  new DiscordProfile(11)
];

function updateAllProfiles() {
  profiles.forEach((profile, index) => {
    profile.update(DISCORD_IDS[index]);
  });
}

setInterval(updateAllProfiles, 30000);

// --- Music Management ---
let currentMusic = null;
let currentMusicIndex = 0;
const musicElements = [document.getElementById('music-1')];
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.querySelector('.volume-button i');

volumeSlider.addEventListener('input', function() {
  const volume = this.value / 100;
  if (currentMusic) {
    currentMusic.volume = volume;
  }
  if (volume === 0) {
    volumeIcon.className = 'fas fa-volume-mute';
  } else if (volume < 0.5) {
    volumeIcon.className = 'fas fa-volume-down';
  } else {
    volumeIcon.className = 'fas fa-volume-up';
  }
});

function playRandomMusic() {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }
  currentMusicIndex = Math.floor(Math.random() * musicElements.length);
  currentMusic = musicElements[currentMusicIndex];
  currentMusic.volume = volumeSlider.value / 100;
  currentMusic.loop = false;
  currentMusic.play().catch(error => console.log('Error playing audio:', error));
  currentMusic.onended = function() {
    currentMusicIndex = (currentMusicIndex + 1) % musicElements.length;
    currentMusic = musicElements[currentMusicIndex];
    currentMusic.volume = volumeSlider.value / 100;
    currentMusic.play().catch(error => console.log('Error playing audio:', error));
  };
}

// --- Intro Screen Handler ---
document.querySelector('.intro-screen').addEventListener('click', function() {
  playRandomMusic();
  this.classList.add('fade-out');
  document.querySelector('.container').classList.remove('hidden');
  document.querySelector('.volume-control').classList.add('show');
  updateAllProfiles();
});

// --- Custom Context Menu ---
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  const contextMenu = document.getElementById('contextMenu');
  contextMenu.style.left = e.pageX + 'px';
  contextMenu.style.top = e.pageY + 'px';

  const menuRect = contextMenu.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (e.pageX + menuRect.width > windowWidth) {
    contextMenu.style.left = (windowWidth - menuRect.width - 10) + 'px';
  }
  if (e.pageY + menuRect.height > windowHeight) {
    contextMenu.style.top = (windowHeight - menuRect.height - 10) + 'px';
  }

  contextMenu.classList.add('visible');
});

document.addEventListener('click', function() {
  const contextMenu = document.getElementById('contextMenu');
  contextMenu.classList.remove('visible');
});

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

// --- Selection Box ---
let isSelecting = false;
let startX, startY;
let selectionBox = null;

function createSelectionBox() {
  const box = document.createElement('div');
  box.className = 'selection-box';
  return box;
}

document.addEventListener('mousedown', (e) => {
  if (e.target.closest('.social-link') || e.target.closest('button')) {
    return;
  }
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

document.addEventListener('mousemove', (e) => {
  if (!isSelecting || !selectionBox) return;
  const currentX = e.pageX;
  const currentY = e.pageY;
  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);
  const left = Math.min(currentX, startX);
  const top = Math.min(currentY, startY);
  selectionBox.style.width = width + 'px';
  selectionBox.style.height = height + 'px';
  selectionBox.style.left = left + 'px';
  selectionBox.style.top = top + 'px';
});

document.addEventListener('mouseup', () => {
  if (isSelecting) {
    isSelecting = false;
    if (selectionBox && selectionBox.parentNode) {
      selectionBox.parentNode.removeChild(selectionBox);
    }
    selectionBox = null;
  }
});

window.onload = function() {
    document.querySelector('.intro-screen').classList.remove('fade-out');
    document.querySelector('.container').classList.add('hidden');
    document.querySelector('.volume-control').classList.remove('show');
};

document.addEventListener('selectstart', (e) => {
  if (isSelecting) {
    e.preventDefault();
  }

  
});
