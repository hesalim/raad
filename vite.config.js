import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "products.html"),
        oilProducts: resolve(__dirname, "oil-products.html"),
        oliveProducts: resolve(__dirname, "olive-products.html"),
        pickleProducts: resolve(__dirname, "pickle-products.html"),
        allproducts: resolve(__dirname, "allproducts.html"),
        contact: resolve(__dirname, "contact.html"),
        catalog: resolve(__dirname, "catalog.html"),
      },
    },
  },
});
