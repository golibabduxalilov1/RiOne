const modal = document.getElementById("modal");
const openButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close-modal");
const leadForm = document.getElementById("leadForm");
const successText = document.getElementById("successText");

function openModal() {
  modal.classList.add("active");
  document.body.classList.add("lock");
}

function closeModal() {
  modal.classList.remove("active");
  document.body.classList.remove("lock");
  successText.classList.remove("show");
}

openButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// INPUTLARNING FORM SUBMIT INTEGRATSIYASI
leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = leadForm.querySelector('input[type="text"]');
  const phoneInput = leadForm.querySelector('input[type="tel"]');
  const submitBtn = leadForm.querySelector(".submit-btn");

  const leadData = {
    name: nameInput.value,
    phone: phoneInput.value,
    date: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }),
    source: "RiOne Stars Landing Page"
  };

  // Tugmani yuklanish holatiga o'tkazish
  submitBtn.disabled = true;
  submitBtn.innerText = "Yuborilmoqda...";

  // ⚠️ SHU YERGA GOOGLE APPS SCRIPT'DAN NUSXALAB OLGAN WEB APP URL HAVOLANGIZNI QO'YING:
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyM1F906o7hgC8JP4UffncVryOO-O_4X9g7bYivIkejFA-0gz-T28aagsg4uaKSrDVx/exec";

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  })
    .then(() => {
      // Muvaffaqiyatli yuborilganda modal ichida yozuv chiqarish va formani tozalash
      successText.classList.add("show");
      leadForm.reset();

      setTimeout(() => {
        closeModal();
      }, 1600);
    })
    .catch(error => {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerText = "Davom etish";
    });
});