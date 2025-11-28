console.log("ABTEST SCRIPT LOADED 🚀");

// Run after full load AND after Shopify's lazy-loading
function runABTest() {
  console.log("ABTEST: Checking for images...");

  if (!window.location.href.includes("/products/")) {
    console.log("ABTEST: Not a product page.");
    return;
  }

  // BIG RED TEST IMAGE
  const newImg = "https://dummyimage.com/600x600/ff0000/ffffff.png&text=ABTEST";

  const imgs = document.querySelectorAll(
    "img, .lazyload, .nt_bg_lz, .product-image img"
  );

  imgs.forEach((img) => {
    let w = img.width || img.clientWidth;

    if (w > 150) {
      img.src = newImg;
      img.style.border = "4px solid yellow";
    }
  });

  console.log("ABTEST: swap done.");
}

document.addEventListener("DOMContentLoaded", runABTest);
window.addEventListener("load", () => setTimeout(runABTest, 1500));
setInterval(runABTest, 2000);
