// Function to show the support message modal
function showMessage() {
  const modal = document.getElementById("messageModal");
  modal.style.display = "block";

  // Add fade-in animation to modal content
  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.opacity = "0";
  modalContent.style.transform = "scale(0.8)";

  setTimeout(() => {
    modalContent.style.transition = "all 0.3s ease";
    modalContent.style.opacity = "1";
    modalContent.style.transform = "scale(1)";
  }, 10);
}

// Function to close the support message modal
function closeMessage() {
  const modal = document.getElementById("messageModal");
  const modalContent = modal.querySelector(".modal-content");

  modalContent.style.transition = "all 0.3s ease";
  modalContent.style.opacity = "0";
  modalContent.style.transform = "scale(0.8)";

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Close modal when clicking outside of it
window.onclick = (event) => {
  const modal = document.getElementById("messageModal");
  if (event.target === modal) {
    closeMessage();
  }
};

// Add scroll-triggered animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll(
    ".slide-up, .slide-up-delay-1, .slide-up-delay-2, .slide-up-delay-3, .slide-up-delay-4, .slide-up-delay-5, .slide-up-delay-6"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize scroll animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  handleScrollAnimations();

  // Add floating animation to cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add gentle floating animation to support button
  const supportButton = document.querySelector(".support-button");
  if (supportButton) {
    setInterval(() => {
      supportButton.style.transform = "translateY(-2px)";
      setTimeout(() => {
        supportButton.style.transform = "translateY(0)";
      }, 1000);
    }, 3000);
  }
});

// Add sparkle effect on button hover
function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #d8a7e8;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleFloat 1s ease-out forwards;
    `;

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
`;

const style = document.createElement("style");
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Add sparkle effect to support button
document.addEventListener("DOMContentLoaded", () => {
  const supportButton = document.querySelector(".support-button");
  if (supportButton) {
    supportButton.addEventListener("mouseenter", function (e) {
      const rect = this.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const x = rect.left + Math.random() * rect.width;
          const y = rect.top + Math.random() * rect.height;
          createSparkle(x, y);
        }, i * 100);
      }
    });
  }
});

let currentStep = 0;
const totalSteps = 7;
let storyCards = [];
const constellationStars = [];
let floatingHearts = [];
let floatingPetals = [];

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeBackground();
  initializeStoryCards();
  initializeConstellation();
  initializePowerMeter();
  initializeRotatingQuotes();
  startFloatingElements();

  // Add click listeners to navigation dots
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.addEventListener("click", () => goToStep(index));
  });

  // Initialize AOS-like animations
  initializeScrollAnimations();
});

// Background initialization
function initializeBackground() {
  createStars();
  createFloatingHearts();
}

function createStars() {
  const starsContainer = document.querySelector(".stars-container");
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.innerHTML = "✨";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}

function createFloatingHearts() {
  const heartsContainer = document.querySelector(".floating-hearts");

  setInterval(() => {
    if (floatingHearts.length < 5) {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = "💖";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDuration = Math.random() * 3 + 4 + "s";
      heartsContainer.appendChild(heart);
      floatingHearts.push(heart);

      setTimeout(() => {
        heart.remove();
        floatingHearts = floatingHearts.filter((h) => h !== heart);
      }, 7000);
    }
  }, 2000);
}

// Story navigation
function nextStep() {
  if (currentStep < totalSteps - 1) {
    currentStep++;
    updateStep();
  }
}

function goToStep(step) {
  currentStep = step;
  updateStep();
}

function updateStep() {
  // Hide all steps
  document.querySelectorAll(".story-step").forEach((step) => {
    step.classList.remove("active");
  });

  // Show current step
  document.getElementById(`step-${currentStep}`).classList.add("active");

  // Update progress bar
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const progress = ((currentStep + 1) / totalSteps) * 100;
  progressBar.style.width = progress + "%";
  progressText.textContent = `Bab ${currentStep + 1} dari ${totalSteps}`;

  // Update navigation dots
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentStep);
  });

  // Trigger step-specific animations
  triggerStepAnimations();
}

function triggerStepAnimations() {
  switch (currentStep) {
    case 1:
      revealStoryCards();
      break;
    case 2:
      animateTimeline();
      break;
    case 3:
      animatePowerMeter();
      break;
    case 4:
      startFloatingPetals();
      break;
    case 5:
      // Memory gallery is already animated
      break;
    case 6:
      // Final step animations
      break;
  }
}

// Story cards initialization and animation
function initializeStoryCards() {
  storyCards = document.querySelectorAll(".story-card");
}

function revealStoryCards() {
  storyCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("revealed");
    }, index * 300);
  });
}

// Interactive heart functionality
function showLove() {
  const modal = document.getElementById("loveModal");
  modal.style.display = "block";

  // Create heart explosion effect
  createHeartExplosion();
}

function createHeartExplosion() {
  const heartsContainer = document.querySelector(".floating-hearts");
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.innerHTML = "💕";
      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "50%";
      heart.style.fontSize = "2rem";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "1500";
      heart.style.animation = `heartExplosion 2s ease-out forwards`;
      heart.style.transform = `translate(-50%, -50%) rotate(${
        Math.random() * 360
      }deg)`;

      const angle = (i / 10) * Math.PI * 2;
      const distance = 100 + Math.random() * 100;
      heart.style.setProperty("--end-x", Math.cos(angle) * distance + "px");
      heart.style.setProperty("--end-y", Math.sin(angle) * distance + "px");

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 2000);
    }, i * 100);
  }
}

// Add heart explosion animation to CSS
const heartExplosionCSS = `
@keyframes heartExplosion {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    50% {
        transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1.5);
        opacity: 1;
    }
    100% {
        transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
        opacity: 0;
    }
}
`;

const heartStyle = document.createElement("style");
heartStyle.textContent = heartExplosionCSS;
document.head.appendChild(heartStyle);

function closeLoveModal() {
  document.getElementById("loveModal").style.display = "none";
}

// Timeline animation
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("aos-animate");
    }, index * 500);
  });
}

// Constellation functionality
function initializeConstellation() {
  const constellation = document.getElementById("constellation");
  const hopes = [
    "Kamu akan menemukan kebahagiaan yang sejati 🌟",
    "Impianmu akan menjadi kenyataan ✨",
    "Cinta akan datang pada waktu yang tepat 💕",
    "Kekuatanmu akan menginspirasi banyak orang 🌈",
    "Masa depanmu penuh dengan keajaiban 🦋",
  ];

  constellation.addEventListener("click", () => {
    // Clear existing stars
    constellation.innerHTML =
      '<div class="constellation-text">Klik bintang-bintang untuk melihat harapan</div>';

    // Create constellation stars
    for (let i = 0; i < 8; i++) {
      const star = document.createElement("div");
      star.className = "constellation-star";
      star.innerHTML = "⭐";
      star.style.left = Math.random() * 80 + 10 + "%";
      star.style.top = Math.random() * 60 + 20 + "%";

      star.addEventListener("click", (e) => {
        e.stopPropagation();
        const hope = hopes[Math.floor(Math.random() * hopes.length)];
        showHopeMessage(hope, e.clientX, e.clientY);
      });

      constellation.appendChild(star);
    }

    constellation.querySelector(".constellation-text").style.display = "none";
  });
}

function showHopeMessage(message, x, y) {
  const hopeDiv = document.createElement("div");
  hopeDiv.innerHTML = message;
  hopeDiv.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        padding: 15px 20px;
        border-radius: 20px;
        font-size: 1rem;
        z-index: 1500;
        pointer-events: none;
        transform: translate(-50%, -100%);
        animation: hopeAppear 3s ease-out forwards;
        box-shadow: 0 10px 25px rgba(255, 107, 157, 0.4);
        max-width: 250px;
        text-align: center;
    `;

  document.body.appendChild(hopeDiv);

  setTimeout(() => hopeDiv.remove(), 3000);
}

// Add hope message animation
const hopeCSS = `
@keyframes hopeAppear {
    0% {
        opacity: 0;
        transform: translate(-50%, -100%) scale(0.5);
    }
    20% {
        opacity: 1;
        transform: translate(-50%, -120%) scale(1);
    }
    80% {
        opacity: 1;
        transform: translate(-50%, -120%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -140%) scale(0.8);
    }
}
`;

const hopeStyle = document.createElement("style");
hopeStyle.textContent = hopeCSS;
document.head.appendChild(hopeStyle);

// Strength cards functionality
function revealStrength(card) {
  card.classList.add("revealed");

  // Add sparkle effect
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.innerHTML = "✨";
      sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: 1.5rem;
                pointer-events: none;
                animation: sparkleDisappear 1.5s ease-out forwards;
            `;
      card.style.position = "relative";
      card.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 1500);
    }, i * 200);
  }
}

// Add sparkle animation
const sparkleDisappearCSS = `
@keyframes sparkleDisappear {
    0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
    }
}
`;

const sparkleDisappearStyle = document.createElement("style");
sparkleDisappearStyle.textContent = sparkleDisappearCSS;
document.head.appendChild(sparkleDisappearStyle);

// Power meter animation
function initializePowerMeter() {
  // Will be triggered when step 3 is reached
}

function animatePowerMeter() {
  const powerMeter = document.getElementById("powerMeter");
  setTimeout(() => {
    powerMeter.style.width = "95%";
  }, 500);
}

// Poetry functionality
let currentVerse = 1;

function showVerse(verseNumber) {
  // Hide all verses
  document.querySelectorAll(".verse").forEach((verse) => {
    verse.classList.remove("active");
  });

  // Remove active class from all buttons
  document.querySelectorAll(".verse-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected verse
  document
    .querySelector(`[data-verse="${verseNumber}"]`)
    .classList.add("active");
  document
    .querySelector(`[onclick="showVerse(${verseNumber})"]`)
    .classList.add("active");

  currentVerse = verseNumber;
}

// Floating petals
function startFloatingPetals() {
  const petalsContainer = document.getElementById("petals");

  const interval = setInterval(() => {
    if (currentStep === 4) {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.innerHTML = "🌸";
      petal.style.left = Math.random() * 100 + "%";
      petal.style.animationDuration = Math.random() * 3 + 5 + "s";
      petal.style.animationDelay = Math.random() * 2 + "s";
      petalsContainer.appendChild(petal);

      setTimeout(() => petal.remove(), 8000);
    } else {
      clearInterval(interval);
    }
  }, 800);
}

// Memory gallery functionality
function openMemory(card) {
  const memoryData = {
    1: {
      title: "Senyuman Pertama",
      content:
        "Hari itu, ketika kamu tersenyum untuk pertama kalinya setelah sekian lama, dunia terasa lebih cerah. Senyumanmu adalah bukti bahwa kebahagiaan masih ada di dalam hatimu yang kuat.",
    },
    2: {
      title: "Tawa yang Menular",
      content:
        "Tawamu yang lepas dan tulus itu mengingatkanku bahwa kamu masih bisa menemukan kegembiraan di tengah badai. Suara tawamu adalah musik terindah yang pernah kudengar.",
    },
    3: {
      title: "Bangkit dari Keterpurukan",
      content:
        "Melihatmu bangkit dari keterpurukan dengan begitu anggun dan kuat, seperti bunga yang mekar setelah hujan deras. Kamu adalah definisi sejati dari ketahanan dan keindahan.",
    },
  };

  const memoryNumber = card.dataset.memory;
  const memory = memoryData[memoryNumber];

  // Create memory modal
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3>${memory.title} 💖</h3>
            <p>${memory.content}</p>
            <div style="margin-top: 20px;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: linear-gradient(135deg, #ff6b9d, #c44569); color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">
                    Tutup 💕
                </button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  modal.style.display = "block";

  // Add click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Rotating quotes functionality
function initializeRotatingQuotes() {
  const quotes = document.querySelectorAll(".quote-item");
  let currentQuote = 0;

  setInterval(() => {
    if (currentStep === 5) {
      quotes[currentQuote].classList.remove("active");
      currentQuote = (currentQuote + 1) % quotes.length;
      quotes[currentQuote].classList.add("active");
    }
  }, 4000);
}

// Support functionality
function showSupport(type) {
  const supportMessages = {
    1: {
      title: "Aku Selalu Ada Untukmu 🤗",
      content:
        "Kapanpun kamu merasa sendirian, ingatlah bahwa ada seseorang yang selalu memikirkanmu, mendoakanmu, dan siap mendengarkan ceritamu. Kamu tidak pernah sendirian dalam perjalanan ini.",
    },
    2: {
      title: "Pesan Harian Untukmu 💌",
      content:
        "Setiap pagi ketika matahari terbit, ingatlah bahwa itu adalah pengingat bahwa kamu juga bisa bersinar. Kamu adalah keajaiban yang berjalan di bumi ini, dan hari ini adalah kesempatanmu untuk bersinar lebih terang.",
    },
    3: {
      title: "Motivasi Tak Terbatas 🌟",
      content:
        "Kekuatanmu tidak terbatas, semangatmu tidak akan pernah habis, dan masa depanmu penuh dengan kemungkinan indah. Kamu adalah penulis cerita hidupmu sendiri, dan aku yakin ceritamu akan menjadi yang terindah.",
    },
  };

  const support = supportMessages[type];

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div style="margin: 20px 0;">
                <div style="font-size: 3rem; animation: bounce 1s infinite;">💖</div>
            </div>
            <h3>${support.title}</h3>
            <p>${support.content}</p>
            <div style="margin-top: 25px;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-size: 1rem;">
                    Terima Kasih 💕
                </button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  modal.style.display = "block";

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Final message functionality
function showFinalMessage() {
  const modal = document.getElementById("finalModal");
  modal.style.display = "block";
}

function closeFinalModal() {
  document.getElementById("finalModal").style.display = "none";
}

// Restart story
function restartStory() {
  currentStep = 0;
  updateStep();

  // Reset all animations and states
  document.querySelectorAll(".story-card").forEach((card) => {
    card.classList.remove("revealed");
  });

  document.querySelectorAll(".timeline-item").forEach((item) => {
    item.classList.remove("aos-animate");
  });

  document.querySelectorAll(".strength-card").forEach((card) => {
    card.classList.remove("revealed");
  });

  document.getElementById("powerMeter").style.width = "0%";

  // Show first verse
  showVerse(1);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Scroll animations initialization
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
      }
    });
  }, observerOptions);

  // Observe elements that need scroll animations
  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el);
  });
}

// Floating elements management
function startFloatingElements() {
  // This function manages all floating elements
  setInterval(() => {
    // Clean up old floating elements
    floatingHearts = floatingHearts.filter((heart) =>
      document.body.contains(heart)
    );
    floatingPetals = floatingPetals.filter((petal) =>
      document.body.contains(petal)
    );
  }, 5000);
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    nextStep();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    if (currentStep > 0) {
      currentStep--;
      updateStep();
    }
  } else if (e.key >= "1" && e.key <= "7") {
    e.preventDefault();
    goToStep(Number.parseInt(e.key) - 1);
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next step
      nextStep();
    } else {
      // Swipe right - previous step
      if (currentStep > 0) {
        currentStep--;
        updateStep();
      }
    }
  }
}

// Add bounce animation for support buttons
const bounceCSS = `
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}
`;

const bounceStyle = document.createElement("style");
bounceStyle.textContent = bounceCSS;
document.head.appendChild(bounceStyle);

// Window resize handler
window.addEventListener("resize", () => {
  // Recalculate positions for floating elements if needed
  if (window.innerWidth < 768) {
    // Mobile adjustments
    document.querySelectorAll(".floating-heart").forEach((heart) => {
      heart.style.fontSize = "16px";
    });
  }
});

// Prevent context menu on long press (mobile)
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
