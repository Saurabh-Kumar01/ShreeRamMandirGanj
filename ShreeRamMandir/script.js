// Shree Ram Mandir Website JavaScript with Bhashini API Integration
document.addEventListener("DOMContentLoaded", function () {
  initializeLanguageSelector();
});

// Bhashini API Configuration
const BHASHINI_API_KEY = "YOUR_BHASHINI_API_KEY"; // Replace with your actual API key
const BHASHINI_API_URL = "https://bhashini.gov.in/api/v1/translate";

// Language codes
const LANGUAGES = {
  en: { code: "en", name: "English" },
  hi: { code: "hi", name: "हिन्दी" },
  sa: { code: "sa", name: "संस्कृतम्" },
};

// Initialize language selector functionality
function initializeLanguageSelector() {
  const languageLinks = document.querySelectorAll(
    ".language-dropdown-content a"
  );
  const languageBtn = document.querySelector(".language-btn .lang-text");

  // Add click event to language options
  languageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get selected language
      const lang = this.getAttribute("data-lang");

      // Update active class
      languageLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Update button text
      languageBtn.textContent = LANGUAGES[lang].name;

      // Change language
      changeLanguage(lang);

      // Store language preference
      localStorage.setItem("preferredLanguage", lang);
    });
  });

  // Check for stored language preference
  const storedLang = localStorage.getItem("preferredLanguage");
  if (storedLang && LANGUAGES[storedLang]) {
    const storedLangLink = document.querySelector(
      `.language-dropdown-content a[data-lang="${storedLang}"]`
    );
    if (storedLangLink) {
      storedLangLink.click();
    }
  }
}

// Change language function
async function changeLanguage(targetLang) {
  // If target language is English, reset to original content
  if (targetLang === "en") {
    resetToDefaultLanguage();
    showNotification(LANGUAGES[targetLang].name);
    return;
  }

  // Show loading indicator
  toggleLoader(true);

  try {
    // Get all translatable elements
    let elements = document.querySelectorAll('[data-translatable="true"]');

    // If no elements are marked for translation yet, mark the title
    if (elements.length === 0) {
      const title = document.querySelector(".banner-title");
      if (title) title.setAttribute("data-translatable", "true");
      elements = document.querySelectorAll('[data-translatable="true"]');
    }

    // Translate each element
    for (const element of elements) {
      // Skip empty elements
      if (!element.textContent.trim()) continue;

      // Store original text if not already stored
      if (!element.getAttribute("data-original-text")) {
        element.setAttribute("data-original-text", element.textContent);
      }

      const originalText = element.getAttribute("data-original-text");

      // Get translation
      const translatedText = await getTranslation(originalText, targetLang);

      // Update element with translated text
      if (translatedText) {
        element.textContent = translatedText;
      }
    }

    // Show success notification
    showNotification(LANGUAGES[targetLang].name);
  } catch (error) {
    console.error("Translation error:", error);
    showNotification("Translation failed", true);
  } finally {
    // Hide loading indicator
    toggleLoader(false);
  }
}

// Reset to default language (English)
function resetToDefaultLanguage() {
  document.querySelectorAll('[data-translatable="true"]').forEach((element) => {
    const originalText = element.getAttribute("data-original-text");
    if (originalText) {
      element.textContent = originalText;
    }
  });
}

// Get translation using Bhashini API
async function getTranslation(text, targetLang) {
  // Mock translations for demonstration
  const mockTranslations = {
    "Shree Ram Mandir, Ganj": {
      hi: "श्री राम मंदिर, गंज",
      sa: "श्री राम मन्दिरम्, गंज",
    },
  };

  // Return mock translation if available
  if (mockTranslations[text] && mockTranslations[text][targetLang]) {
    return mockTranslations[text][targetLang];
  }

  // In a real implementation, you would call the Bhashini API here
  // For example:
  /*
  try {
    const response = await fetch(BHASHINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BHASHINI_API_KEY}`
      },
      body: JSON.stringify({
        input: text,
        sourceLanguage: "en",
        targetLanguage: LANGUAGES[targetLang].code
      })
    });

    if (!response.ok) throw new Error("Translation API failed");

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("API error:", error);
    return text; // Return original text on error
  }
  */

  // Return original text if no translation is available
  return text;
}

// Toggle loading indicator
function toggleLoader(show) {
  let loader = document.getElementById("translation-loader");

  if (show) {
    if (!loader) {
      loader = document.createElement("div");
      loader.id = "translation-loader";
      loader.className = "translation-loader";
      loader.innerHTML = `
        <div class="loader-spinner"></div>
        <div class="loader-text">Translating...</div>
      `;
      document.body.appendChild(loader);
    }
    loader.style.display = "flex";
  } else if (loader) {
    loader.style.display = "none";
  }
}

// Show notification
function showNotification(message, isError = false) {
  let notification = document.getElementById("language-notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "language-notification";
    document.body.appendChild(notification);
  }

  notification.className = isError
    ? "language-notification error"
    : "language-notification";

  notification.textContent = isError
    ? "Translation failed. Please try again."
    : `Language changed to ${message}`;

  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}
