console.log("ABTEST SCRIPT LOADED 🚀");

// Run after full load AND after Shopify's lazy-loading / ajax
function runABTest() {
  console.log("ABTEST: Checking for images...");

  // Only run on product pages
  if (!window.location.href.includes("/products/")) {
    console.log("ABTEST: Not a product page.");
    return;
  }

  // Test image
  const newImg =
    "https://via.placeholder.com/800x800.png?text=AB+TEST+IMAGE";

  // Select all product images (Shopify + Kalles lazyload version)
  const imgs = document.querySelectorAll(
    "img, .lazyload, .nt_bg_lz, .product-image img"
  );

  imgs.forEach((img) => {
    let w = img.width || img.clientWidth;

    if (w > 150) {
      img.src = newImg;
      img.style.border = "3px solid red";
    }
  });

  console.log("ABTEST: swap done.");
}

// Run multiple times because images load late
document.addEventListener("DOMContentLoaded", () => {
  runABTest();
});
window.addEventListener("load", () => {
  setTimeout(runABTest, 1500);
});
setInterval(runABTest, 2000); // keep checking
