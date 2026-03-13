/**
 * Raad Oil static site JS
 * - Contact form AJAX submit (optional)
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('[data-contact-form="true"]');
  if (!form) return;

  const statusEl = document.querySelector('[data-contact-status="true"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (statusEl) statusEl.textContent = "";
    if (submitBtn) submitBtn.disabled = true;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out?.error || "Failed to send message");

      form.reset();
      if (statusEl) statusEl.textContent = "Message sent successfully. We'll get back to you soon.";
    } catch (err) {
      if (statusEl) statusEl.textContent = "Sorry — something went wrong. Please try again later.";
      console.error(err);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
