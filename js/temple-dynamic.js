// Shree Ram Mandir - Dynamic Temple Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all dynamic components
  initializeImageSlider();
  initializeAartiAccordion();
  initializeGallery();
  initializeNavigation();

  // Add divine effects
  addDivineEffects();

  // Handle image loading errors
  handleImageErrors();
});

// Image Slider/Carousel Functionality
function initializeImageSlider() {
  const slider = document.querySelector(".temple-slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".slide");
  const prevBtn = slider.querySelector(".prev-btn");
  const nextBtn = slider.querySelector(".next-btn");
  let currentSlide = 0;

  // Hide all slides initially except the first one
  slides.forEach((slide, index) => {
    if (index !== 0) {
      slide.style.display = "none";
    }
  });

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.style.display = "none";
    });

    // Show the current slide
    slides[index].style.display = "block";

    // Add fade-in animation
    slides[index].classList.add("fade-in");
    setTimeout(() => {
      slides[index].classList.remove("fade-in");
    }, 1000);
  }

  // Event listeners for next and previous buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  // Auto-advance slides every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

// Aarti Accordion Functionality
function initializeAartiAccordion() {
  const aartiItems = document.querySelectorAll(".aarti-header");
  if (!aartiItems.length) return;

  aartiItems.forEach((item) => {
    item.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isActive = content.classList.contains("active");

      // Close all accordion items
      document.querySelectorAll(".aarti-content").forEach((content) => {
        content.classList.remove("active");
      });

      // Toggle the clicked item
      if (!isActive) {
        content.classList.add("active");
      }
    });
  });
}

// Gallery Functionality
function initializeGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.querySelector(".gallery-modal");
  if (!galleryItems.length || !modal) return;

  const modalImg = modal.querySelector(".modal-img");
  const modalCaption = modal.querySelector(".modal-caption");
  const closeBtn = modal.querySelector(".modal-close");
  const prevBtn = modal.querySelector(".modal-prev");
  const nextBtn = modal.querySelector(".modal-next");

  let currentIndex = 0;

  // Open modal when clicking on a gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      const caption = this.querySelector(".gallery-caption").textContent;

      modalImg.src = imgSrc;
      modalCaption.textContent = caption;
      modal.classList.add("active");
      currentIndex = index;

      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Navigate to previous image
  prevBtn.addEventListener("click", function () {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const imgSrc = galleryItems[currentIndex].querySelector("img").src;
    const caption =
      galleryItems[currentIndex].querySelector(".gallery-caption").textContent;

    modalImg.src = imgSrc;
    modalCaption.textContent = caption;
  });

  // Navigate to next image
  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const imgSrc = galleryItems[currentIndex].querySelector("img").src;
    const caption =
      galleryItems[currentIndex].querySelector(".gallery-caption").textContent;

    modalImg.src = imgSrc;
    modalCaption.textContent = caption;
  });

  // Filter gallery by category
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const category = this.getAttribute("data-category");

        // Update active button
        filterBtns.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        // Filter gallery items
        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");
          if (category === "all" || itemCategory === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
}

// Navigation Functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  if (!navLinks.length) return;

  // Set active link based on current page
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (
      currentPage === linkPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }

    // Add click event for smooth page transitions
    link.addEventListener("click", function (e) {
      const targetPage = this.getAttribute("href");

      // Only apply transition for internal links
      if (
        targetPage.startsWith("./") ||
        targetPage.startsWith("/") ||
        !targetPage.includes("://")
      ) {
        e.preventDefault();
        document.querySelector(".page-content").style.opacity = "0";

        setTimeout(() => {
          window.location.href = targetPage;
        }, 300);
      }
    });
  });
}

// Handle image loading errors
function handleImageErrors() {
  const allImages = document.querySelectorAll("img");
  allImages.forEach((img) => {
    if (!img.hasAttribute("onerror")) {
      img.onerror = function () {
        this.src = "https://i.imgur.com/JFGHvDc.jpg";
        this.onerror = null;
      };
    }
  });
}

// Add special effects to divine elements
function addDivineEffects() {
  // Add subtle glow effect to divine images
  const divineImages = document.querySelectorAll(".ram-image, .divine-image");
  divineImages.forEach((image) => {
    image.addEventListener("mouseover", function () {
      this.classList.add("divine-glow");
    });

    image.addEventListener("mouseout", function () {
      this.classList.remove("divine-glow");
    });
  });

  // Add special effect to Om symbol
  const omSymbol = document.querySelector(".om-symbol");
  if (omSymbol) {
    setInterval(() => {
      omSymbol.classList.add("om-pulse");
      setTimeout(() => {
        omSymbol.classList.remove("om-pulse");
      }, 1000);
    }, 10000);
  }

  // Add subtle animation to mantras
  const mantras = document.querySelectorAll(".divine-quote, .footer-mantra");
  mantras.forEach((mantra) => {
    mantra.addEventListener("mouseover", function () {
      this.classList.add("mantra-highlight");
    });

    mantra.addEventListener("mouseout", function () {
      this.classList.remove("mantra-highlight");
    });
  });
}
