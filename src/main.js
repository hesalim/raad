import { products } from "/src/products.js";

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

function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featuredProducts = products
    .filter((product) => product.featured === true)
    .slice(0, 4);

  container.innerHTML = featuredProducts
    .map(
      (product) => `
        <div class="bg-gray-50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all">
          <img
            src="${product.image}"
            alt="${product.name}"
            class="w-20 h-28 object-contain mx-auto mb-4"
          />
          <h3 class="text-lg font-semibold text-gray-900">
            ${product.name}
          </h3>
          <p class="text-sm text-gray-500 mt-2 mb-4">
            ${product.size}
          </p>
          <a
            href="/allproducts.html?category=${encodeURIComponent(product.category)}"
            class="inline-block text-yellow-600 text-sm font-medium border border-yellow-600 rounded-full px-4 py-1.5 hover:bg-yellow-600 hover:text-white transition"
          >
            Check Product
          </a>
        </div>
      `,
    )
    .join("");
}

renderFeaturedProducts();
