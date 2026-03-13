import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    const subject = process.env.CONTACT_SUBJECT || "New message from Raad Oil website";

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Server not configured (missing RESEND_API_KEY)" });
    }
    if (!toEmail) {
      return res.status(500).json({ error: "Server not configured (missing CONTACT_TO_EMAIL)" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-sans-serif,system-ui;">${escapeHtml(message)}</pre>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
