console.log("ABTEST SCRIPT LOADED 🚀");

const TEST_IMG = "https://raw.githubusercontent.com/acquirex/ABtest/main/test-red.png";

function replaceImage(node) {
  try {
    // For normal <img>
    if (node.tagName === "IMG") {
      node.removeAttribute("srcset");
      node.src = TEST_IMG;
      node.style.border = "4px solid yellow";
    }

    // For <source> tags inside <picture>
    if (node.tagName === "SOURCE") {
      node.srcset = TEST_IMG;
    }

    // For lazyloaded bg images
    if (node.dataset.bg) {
      node.dataset.bg = TEST_IMG;
      node.style.backgroundImage = `url(${TEST_IMG})`;
    }

    // Kalles uses data-bgset for responsive images
    if (node.dataset.bgset) {
      node.dataset.bgset = TEST_IMG;
      node.style.backgroundImage = `url(${TEST_IMG})`;
    }

    // Lazyload "data-src"
    if (node.dataset.src) {
      node.dataset.src = TEST_IMG;
      node.src = TEST_IMG;
    }

  } catch (e) {
    console.log("ABTEST ERROR:", e);
  }
}

function runABTest() {
  console.log("ABTEST: Running replacement...");

  // Only on product page
  if (!location.href.includes("/products/")) return;

  const selectors = `
    img,
    picture source,
    .lazyload,
    .nt_bg_lz,
    [data-bg],
    [data-bgset],
    [data-src]
  `;

  const nodes = document.querySelectorAll(selectors);

  nodes.forEach((node) => {
    const w = node.clientWidth || node.width || 0;
    if (w > 150) replaceImage(node);
  });

  console.log("ABTEST: swap done.");
}

// Run repeatedly to override Kalles re-render events
document.addEventListener("DOMContentLoaded", runABTest);
window.addEventListener("load", () => setTimeout(runABTest, 1500));
setInterval(runABTest, 1500);

