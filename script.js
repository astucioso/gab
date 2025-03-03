const userId1 = '1317810475458891819';
const userId2 = '748940599150772344';

const avatarElement1 = document.getElementById('avatar1');
const nicknameElement1 = document.getElementById('nickname-text1');
const subnickElement1 = document.getElementById('subnick1');
const nitroBadge1 = document.getElementById('nitro-badge1');
const boostBadge1 = document.getElementById('boost-badge1');

const avatarElement2 = document.getElementById('avatar2');
const nicknameElement2 = document.getElementById('nickname-text2');
const subnickElement2 = document.getElementById('subnick2');
const nitroBadge2 = document.getElementById('nitro-badge2');
const boostBadge2 = document.getElementById('boost-badge2');

const avatarElement3 = document.getElementById('avatar3'); 
const nicknameElement3 = document.getElementById('nickname-text3'); 
const subnickElement3 = document.getElementById('subnick3');
const nitroBadge3 = document.getElementById('nitro-badge3'); 
const boostBadge3 = document.getElementById('boost-badge3');

async function fetchLanyardData(userId, avatarElement, nicknameElement, subnickElement, nitroBadge, boostBadge) {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await response.json();

    if (data.success) {
      const { discord_user, premium_type } = data.data;

      const nickname = discord_user.global_name || discord_user.username;
      nicknameElement.textContent = nickname;

      subnickElement.textContent = `@${discord_user.username}`;

      avatarElement.src = `https://cdn.discordapp.com/avatars/${userId}/${discord_user.avatar}.png?size=512`;

      if (premium_type === 2) {
        nitroBadge.classList.remove('hidden');
      }
      if (premium_type === 1) {
        boostBadge.classList.remove('hidden');
      }
    } else {
      nicknameElement.textContent = 'UsuÃ¡rio nÃ£o encontrado';
      subnickElement.textContent = '';
    }
  } catch (error) {
    nicknameElement.textContent = 'Erro ao carregar';
    subnickElement.textContent = '';
  }
}

fetchLanyardData(userId1, avatarElement1, nicknameElement1, subnickElement1, nitroBadge1, boostBadge1);
fetchLanyardData(userId2, avatarElement2, nicknameElement2, subnickElement2, nitroBadge2, boostBadge2);
fetchLanyardData(userId3, avatarElement3, nicknameElement3, subnickElement3, nitroBadge3, boostBadge3); 