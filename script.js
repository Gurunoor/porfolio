const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

let growth = 0;
let direction = 1;

// Ensures canvas internal resolution matches display size
function resize() {
  const container = canvas.parentElement;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

window.addEventListener("resize", resize);
resize();

/**
 * Fractal Tree Logic
 * 
 */
function drawTree(x, y, length, angle, depth) {
  if (depth === 0 || length < 2) return;

  const x2 = x + length * Math.cos(angle);
  const y2 = y - length * Math.sin(angle);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  
  ctx.strokeStyle = "#64ffda";
  ctx.lineWidth = depth * 0.6;
  ctx.stroke();

  // Closing effect math
  const shrink = 0.7; 
  const spread = 0.3 + (growth * 0.6); 

  drawTree(x2, y2, length * shrink, angle - spread, depth - 1);
  drawTree(x2, y2, length * shrink, angle + spread, depth - 1);
}
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tab-link");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");

  // Move the vertical indicator
  const indicator = document.querySelector('.tab-indicator');
  const index = Array.from(tablinks).indexOf(evt.currentTarget);
  indicator.style.transform = `translateY(${index * 42}px)`;
}

//project slide
function changeProject(direction) {
  const container = document.getElementById('master-project-slider');
  const projects = Array.from(container.querySelectorAll('.project-featured'));
  const currentIdx = projects.findIndex(p => p.classList.contains('active'));

  if (currentIdx === -1) return;

  // Fade out current
  projects[currentIdx].classList.remove('active');

  // Calculate next
  const nextIdx = (currentIdx + direction + projects.length) % projects.length;

  // Use a tiny timeout to let the browser process the change
  setTimeout(() => {
    projects[nextIdx].classList.add('active');
  }, 10);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Speed of the "breathing" animation
  growth += 0.003 * direction;
  if (growth >= 1 || growth <= 0) direction *= -1;

  // Adapt the tree size based on screen width
  const isMobile = window.innerWidth < 768;
  const trunkLength = isMobile ? canvas.height * 0.2 : 80;
  const iterations = isMobile ? 8 : 10;

  drawTree(
    canvas.width / 2, // Centered horizontally
    canvas.height - 10, // Sit at bottom of container
    trunkLength,                
    Math.PI / 2, // Points upward
    iterations
  );

  requestAnimationFrame(animate);
}

animate();