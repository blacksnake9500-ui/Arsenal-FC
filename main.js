const header = document.querySelector("header");
const headerImages = ["imgs/Arsenal logo.png", "imgs/bg2.png"];
let currentHeaderIndex = 0;

function changeHeaderBackground() {
  if (!header) return;
  header.style.backgroundImage = `url('${headerImages[currentHeaderIndex]}')`;
  currentHeaderIndex = (currentHeaderIndex + 1) % headerImages.length;
}

changeHeaderBackground();
setInterval(changeHeaderBackground, 5000);

const threebtn = document.querySelector(".threebtn");
const img3 = document.querySelector(".img3");
const originalImgSrc = img3 ? img3.src : "";
const altImgSrc = "./imgs/emirates-stadium-gcfbe005c4_1920-1.jpg";

if (threebtn && img3) {
  threebtn.addEventListener("click", () => {
    const currentSrc = img3.getAttribute("src");
    const isAlt =
      currentSrc &&
      currentSrc.includes("emirates-stadium-gcfbe005c4_1920-1.jpg");
    img3.src = isAlt ? originalImgSrc : altImgSrc;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tokenForm = document.getElementById("token-form");
  if (tokenForm) {
    tokenForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const contract = tokenForm
        .querySelector('[name="contract"]')
        .value.trim();
      const email = tokenForm.querySelector('[name="email"]').value.trim();
      if (!contract || !email) {
        alert("Please fill in both fields.");
        return;
      }
      const subject = "Token Contract Submission";
      const body = encodeURIComponent(
        `Contract address: ${contract}\nEmail: ${email}`,
      );
      const mailtoLink = `mailto:blacksnake9500@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailtoLink;
    });
  }

  // Roadmap animations
  const timelineItems = document.querySelectorAll(".timeline-item");
  const phaseBoxes = document.querySelectorAll(".phase");

  // Animate timeline dots on scroll into view
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "scale(1)";
      }
    });
  }, observerOptions);

  timelineItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "scale(0)";
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
  });

  // Phase box hover effect
  phaseBoxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      box.style.transform = "translateY(-10px)";
      box.style.boxShadow = "0 10px 30px rgba(220, 5, 45, 0.3)";
    });

    box.addEventListener("mouseleave", () => {
      box.style.transform = "translateY(0)";
      box.style.boxShadow = "none";
    });

    box.style.transition = "all 0.3s ease";
  });

  // Animate roadmap list items
  const roadmapLists = document.querySelectorAll(".roadmap-list li");
  roadmapLists.forEach((li, index) => {
    li.style.opacity = "0";
    li.style.transform = "translateX(-20px)";
    li.style.transition = `all 0.5s ease ${index * 0.05}s`;

    setTimeout(() => {
      const rect = li.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        li.style.opacity = "1";
        li.style.transform = "translateX(0)";
      }
    }, 100);
  });

  // Re-check on scroll for roadmap items
  window.addEventListener("scroll", () => {
    roadmapLists.forEach((li) => {
      const rect = li.getBoundingClientRect();
      if (rect.top < window.innerHeight && li.style.opacity === "0") {
        li.style.opacity = "1";
        li.style.transform = "translateX(0)";
      }
    });
  });

  // Team carousel functionality
  const sixBox = document.querySelector(".six_box");
  const teamIndicators = document.querySelectorAll(".six .carousel-indicator");
  const cards = document.querySelectorAll(".six_card");
  let currentSlide = 0;

  function updateCarousel() {
    if (!sixBox || cards.length === 0) return;

    // Calculate scroll position by card offset
    sixBox.scrollLeft = cards[currentSlide].offsetLeft;

    // Update indicators
    teamIndicators.forEach((btn) => {
      btn.classList.remove("active");
    });
    if (teamIndicators[currentSlide]) {
      teamIndicators[currentSlide].classList.add("active");
    }
  }

  // Add click handlers to team indicators
  teamIndicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      currentSlide = parseInt(e.target.getAttribute("data-index"), 10);
      updateCarousel();
    });
  });

  // Trophy carousel functionality
  const sevenBox = document.querySelector(".seven_box");
  const trophyIndicators = document.querySelectorAll(
    ".seven .carousel-indicator",
  );
  const trophyCards = document.querySelectorAll(".seven_card");
  let currentTrophySlide = 0;

  function updateTrophyCarousel() {
    if (!sevenBox || trophyCards.length === 0) return;

    sevenBox.scrollLeft = trophyCards[currentTrophySlide].offsetLeft;

    trophyIndicators.forEach((btn) => {
      btn.classList.remove("active");
    });
    if (trophyIndicators[currentTrophySlide]) {
      trophyIndicators[currentTrophySlide].classList.add("active");
    }
  }

  // Add click handlers to trophy indicators
  trophyIndicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      currentTrophySlide = parseInt(e.target.getAttribute("data-index"), 10);
      updateTrophyCarousel();
    });
  });

  // Auto-advance carousels every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateCarousel();

    currentTrophySlide = (currentTrophySlide + 1) % trophyCards.length;
    updateTrophyCarousel();
  }, 5000);

  // Initialize carousels on load
  updateCarousel();
  updateTrophyCarousel();
});
