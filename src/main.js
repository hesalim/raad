const form = document.querySelector("[data-contact-form]");
const status = document.querySelector("[data-contact-status]");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        status.textContent = "Message sent successfully!";
        form.reset();
      } else {
        status.textContent =
          "Sorry — something went wrong. Please try again later.";
      }
    } catch (error) {
      status.textContent = "Network error. Please try again later.";
    }
  });
}
