console.log("ABTEST SCRIPT LOADED ✓");

// RUN AFTER SHOPIFY IS FULLY LOADED
document.addEventListener("DOMContentLoaded", function () {
  console.log("ABTEST: DOM fully loaded.");

  // Only run on product pages
  if (!window.location.href.includes("/products/")) {
    console.log("ABTEST: Not a product page. Stopping.");
    return;
  }

  console.log("ABTEST: Swapping product images...");

  // TEST IMAGE (replace this later with real variants)
  const newImg =
    "https://via.placeholder.com/800x800.png?text=AB+TEST";

  // Select all images inside the page
  const imgs = document.querySelectorAll("img");

  imgs.forEach((img) => {
    // avoid icons or thumbnails (only replace bigger ones)
    if (img.width > 150) {
      img.src = newImg;
      img.style.border = "3px solid red"; // visual proof
    }
  });

  console.log("ABTEST: Swap complete.");
});
