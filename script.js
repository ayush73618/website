let whatsappNumber = 919989654703;
function scrollToForm() {
  document.getElementById("appointment").scrollIntoView({
    behavior: "smooth",
  });
}

function openModal() {
  document.getElementById("appointmentModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("appointmentModal").style.display = "none";
}

/* CLOSE ON OUTSIDE CLICK */
window.onclick = function (event) {
  let modal = document.getElementById("appointmentModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function sendToWhatsApp() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let problem = document.getElementById("problem").value.trim();

  if (!name || !email || !phone || !date || !time) {
    alert("Please fill all required fields");
    return;
  }
  if (!validateEmail(email)) {
    alert("Please enter a valid email");
    return;
  }

  if (!validatePhone(phone)) {
    alert("Enter valid 10-digit phone number");
    return;
  }

  let button = document.querySelector(".whatsapp-btn");
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

  let phoneNumber = whatsappNumber;

  let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  /* SHOW SUCCESS POPUP */
  let popup = document.getElementById("successPopup");
  popup.classList.add("show");

  /* OPEN WHATSAPP AFTER SHORT DELAY */
  setTimeout(() => {
    window.open(url, "_blank");
  }, 1200);

  /* RESET FORM + CLOSE MODAL */
  setTimeout(() => {
    document.getElementById("appointmentModal").style.display = "none";

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

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone); // Indian format
}

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header-wrapper");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

function openWhatsApp() {
  let phoneNumber = whatsappNumber; // CHANGE THIS
  let message = "Hello Doctor, I want to book an appointment.";
  let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function openMap() {
  window.open("https://maps.app.goo.gl/tf8feNz9hpsK3H5B8", "_blank");
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("active");
  });
});

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

window.addEventListener("scroll", revealOnScroll);

// Run once on load
revealOnScroll();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    window.addEventListener("scroll", () => {
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
    });
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (scrollTop / height) * 100;

  document.getElementById("progress-bar").style.width = scrolled + "%";
});

function handleFloatingBar() {
  const bar = document.querySelector(".floating-bar");

  function showBar() {
    bar.classList.add("show");

    // hide after 5 sec
    setTimeout(() => {
      bar.classList.remove("show");
    }, 8000);
  }

  // first appearance after 10 sec
  setTimeout(showBar, 5000);

  // repeat every 15 sec
  setInterval(showBar, 10000);
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
  document.querySelector(".menu-toggle").classList.toggle("open");
}

handleFloatingBar();
