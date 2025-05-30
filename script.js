// 📝 Cá nhân hoá danh sách thông điệp yêu thương ở đây
const loveMessages = [
  "Anh yêu em 💖",
  "Mãi bên nhau nhé 🌹",
  "Em là duy nhất 💋",
  "Tình yêu bất diệt 💞",
  "Mỗi ngày yêu em hơn 💗"
];

const messageContainer = document.getElementById("message-container");
const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
  const heart = {
    x: Math.random() * canvas.width,
    y: 0,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    color: Math.random() < 0.5 ? "#ff5eaa" : "#e91e63"
  };
  hearts.push(heart);
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    ctx.fillStyle = heart.color;
    ctx.beginPath();
    ctx.moveTo(heart.x, heart.y);
    ctx.bezierCurveTo(heart.x - heart.size / 2, heart.y - heart.size / 2, heart.x - heart.size, heart.y + heart.size / 3, heart.x, heart.y + heart.size);
    ctx.bezierCurveTo(heart.x + heart.size, heart.y + heart.size / 3, heart.x + heart.size / 2, heart.y - heart.size / 2, heart.x, heart.y);
    ctx.fill();
    heart.y += heart.speed;

    // remove if off screen
    if (heart.y > canvas.height) {
      hearts.splice(index, 1);
    }
  });
}

setInterval(() => {
  createHeart();
}, 100);

function animateHearts() {
  drawHearts();
  requestAnimationFrame(animateHearts);
}
animateHearts();

// Tạo chữ rơi
function createFallingMessage() {
  const msg = document.createElement("div");
  msg.classList.add("love-message");
  msg.innerText = loveMessages[Math.floor(Math.random() * loveMessages.length)];

  msg.style.left = `${Math.random() * 90}%`;
  msg.style.animationDuration = `${3 + Math.random() * 3}s`;

  messageContainer.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 6000);
}

setInterval(createFallingMessage, 800);
