/* ============================================================
   CONFIGURATION
   ============================================================ */
let whatsappNumber = 919288309406;

/* ============================================================
   MODAL FUNCTIONS
   ============================================================ */
function openModal() {
  const modal = document.getElementById("appointmentModal");
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10);
}

function closeModal() {
  const modal = document.getElementById("appointmentModal");
  modal.classList.remove("show");
  setTimeout(() => (modal.style.display = "none"), 300);
}

/* Close modal on outside click */
window.onclick = function (event) {
  const modal = document.getElementById("appointmentModal");
  if (event.target === modal) {
    closeModal();
  }
};

/* ============================================================
   NAVIGATION MENU
   ============================================================ */
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.querySelector(".menu-toggle");
  const isActive = navMenu.classList.toggle("active");

  menuToggle.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isActive.toString());
}

/* Close menu when nav link clicked */
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("active");
    document.querySelector(".menu-toggle").classList.remove("open");
  });
});

/* ============================================================
   FORM VALIDATION
   ============================================================ */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone); // Indian format
}

/* ============================================================
   APPOINTMENT BOOKING
   ============================================================ */
function sendToEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const problem = document.getElementById("problem").value;
  const button = document.querySelector(".whatsapp-btn");
  const originalText = button.innerHTML;

  // Require name, phone, date and time. Email is optional.
  if (!name || !phone || !date || !time) {
    alert("Please fill all required fields (name, phone, date, time)");
    return;
  }

  // If email provided, validate it
  if (email && !validateEmail(email)) {
    alert("Please enter a valid email or leave it empty to skip.");
    return;
  }

  if (!validatePhone(phone)) {
    alert("Enter valid 10-digit phone number");
    return;
  }

  button.innerHTML = `
    <span class="lang en">Booking...</span>
    <span class="lang hi">बुक हो रहा है...</span>
  `;
  button.disabled = true;

  // Ensure we always send an email (email may be empty). Use a placeholder if not provided.
  const sendEmail = email && email.trim() ? email.trim() : "Not provided";

  emailjs
    .send("service_cqjci6q", "template_8er9mw8", {
      name: name,
      email: sendEmail,
      phone: phone,
      date: date,
      time: time,
      problem: problem,
    })
    .then(() => {
      setTimeout(() => {
        closeModal();
        button.innerHTML = originalText;
        button.disabled = false;
      }, 2000);
    })
    .catch((error) => {
      console.error("Email failed:", error);
      button.innerHTML = originalText;
      button.disabled = false;
    });
}

function sendToWhatsApp() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let problem = document.getElementById("problem").value.trim();

  // Email is optional: require only name, phone, date and time
  if (!name || !phone || !date || !time) {
    alert("Please fill all required fields (name, phone, date, time)");
    return;
  }

  // If email provided, validate it
  if (email && !validateEmail(email)) {
    alert("Please enter a valid email or leave it empty to skip.");
    return;
  }

  if (!validatePhone(phone)) {
    alert("Enter valid 10-digit phone number");
    return;
  }

  let button = document.querySelector(".whatsapp-btn");
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<span class="spinner-small"></span>';

  let message = `Hello Doctor,

I would like to book an appointment:

Name: ${name}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Problem: ${problem || "N/A"}

Please confirm availability.`;

  let url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  /* Show success popup */
  let popup = document.getElementById("successPopup");
  popup.classList.add("show");

  /* Open WhatsApp after short delay */
  setTimeout(() => {
    window.open(url, "_blank");
  }, 1200);

  /* Reset form and close modal */
  setTimeout(() => {
    closeModal();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("problem").value = "";

    button.disabled = false;
    button.innerText = "Book on WhatsApp";
    popup.classList.remove("show");
  }, 3000);
}

function openWhatsApp() {
  let message = "Hello Doctor, I want to book an appointment.";
  let url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function openMap() {
  window.open("https://maps.app.goo.gl/tf8feNz9hpsK3H5B8", "_blank");
}

function scrollToForm() {
  document.getElementById("appointment").scrollIntoView({
    behavior: "smooth",
  });
}

/* ============================================================
   SCROLL ANIMATIONS & DETECTION
   ============================================================ */
function revealOnScroll() {
  const elements = document.querySelectorAll(".animate");
  elements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("show");
    }
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav a");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
}

function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollTop / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
}

function updateHeaderScroll() {
  const header = document.querySelector(".header-wrapper");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

/* Consolidated scroll handler */
window.addEventListener("scroll", () => {
  revealOnScroll();
  updateActiveNavLink();
  updateScrollProgress();
  updateHeaderScroll();
});

/* Run reveal on initial load */
revealOnScroll();

/* ============================================================
   FLOATING BAR & PAGE LOAD
   ============================================================ */
function handleFloatingBar() {
  const bar = document.querySelector(".floating-bar");

  function showBar() {
    bar.classList.add("show");
    setTimeout(() => {
      bar.classList.remove("show");
    }, 8000);
  }

  setTimeout(showBar, 5000);
  setInterval(showBar, 10000);
}

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
  handleFloatingBar();
});

/* ============================================================
   LANGUAGE SWITCHING (BILINGUAL)
   ============================================================ */
function switchLang(lang) {
  document.querySelectorAll(".lang").forEach((el) => {
    el.style.display = "none";
  });

  document.querySelectorAll("." + lang).forEach((el) => {
    el.style.display = "inline";
  });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");
  });

  const activeButton = document.querySelector(
    `.lang-switch button[onclick="switchLang('${lang}')"]`,
  );
  if (activeButton) {
    activeButton.classList.add("active");
    activeButton.setAttribute("aria-pressed", "true");
  }

  localStorage.setItem("lang", lang);
  updatePlaceholders(lang);
  updateSelectOptions(lang);
}

function updatePlaceholders(lang) {
  document.querySelectorAll("input, textarea").forEach((el) => {
    if (el.dataset[lang]) {
      el.placeholder = el.dataset[lang];
    }
  });
}

function updateSelectOptions(lang) {
  document.querySelectorAll("#time option").forEach((opt) => {
    if (opt.dataset[lang]) {
      opt.textContent = opt.dataset[lang];
    }
  });
}

window.onload = () => {
  const lang = localStorage.getItem("lang") || "en";
  switchLang(lang);
};
