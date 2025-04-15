// Shree Ram Mandir, Ganj - Dynamic Temple Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all dynamic components
  initializeImageSlider();
  initializeAudioPlayer();

  // Add special effects for divine elements
  addDivineEffects();
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

// Audio Player for Bhajans and Mantras
function initializeAudioPlayer() {
  const audioPlayer = document.getElementById("audio-player");
  if (!audioPlayer) return;

  // Sample bhajans/mantras (would come from a real collection)
  const audioTracks = [
    { title: "Shree Ram Stuti", file: "audio/ram-stuti.mp3", duration: "4:25" },
    {
      title: "Hanuman Chalisa",
      file: "audio/hanuman-chalisa.mp3",
      duration: "9:42",
    },
    {
      title: "Om Namah Shivaya",
      file: "audio/om-namah-shivaya.mp3",
      duration: "5:10",
    },
  ];

  // Create audio player HTML
  let playerHTML = '<h3>Devotional Audio</h3><div class="audio-tracks">';

  audioTracks.forEach((track, index) => {
    playerHTML += `
            <div class="audio-track" data-src="${track.file}">
                <div class="track-number">${index + 1}</div>
                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-duration">${track.duration}</div>
                </div>
                <button class="play-btn" data-index="${index}">Play</button>
            </div>
        `;
  });

  playerHTML += "</div>";
  playerHTML += `
        <div class="audio-controls" style="display: none;">
            <div class="now-playing">Now Playing: <span id="current-track-name"></span></div>
            <audio id="audio-element" controls></audio>
        </div>
    `;

  audioPlayer.innerHTML = playerHTML;

  // Add event listeners to play buttons
  const playButtons = audioPlayer.querySelectorAll(".play-btn");
  const audioElement = document.getElementById("audio-element");
  const audioControls = document.querySelector(".audio-controls");
  const currentTrackName = document.getElementById("current-track-name");

  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      const track = audioTracks[index];

      // Update audio source and play
      audioElement.src = track.file;
      currentTrackName.textContent = track.title;
      audioControls.style.display = "block";

      // Play the audio (this might be blocked by browsers without user interaction)
      audioElement.play().catch((e) => {
        console.log(
          "Auto-play prevented by browser. Click play on the audio controls."
        );
      });

      // Update button text
      playButtons.forEach((btn) => (btn.textContent = "Play"));
      this.textContent = "Playing...";
    });
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
