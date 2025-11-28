console.log("ABTEST LOADED 🚀");

// Your test image
const AB_IMAGE = "https://picsum.photos/id/237/800/800";

// Universal replacer
function replaceImages() {
  console.log("ABTEST: Running...");

  // Actual images
  document.querySelectorAll("img").forEach(img => {
    if (img.width > 150 || img.height > 150) {
      img.src = AB_IMAGE;
      img.srcset = AB_IMAGE;
      img.style.border = "3px solid red";
    }
  });

  // Lazyload: data-src, data-bgset
  document.querySelectorAll("[data-src]").forEach(el => {
    el.setAttribute("data-src", AB_IMAGE);
    el.src = AB_IMAGE;
  });

  document.querySelectorAll("[data-bgset]").forEach(el => {
    el.setAttribute("data-bgset", AB_IMAGE);
    el.style.backgroundImage = `url(${AB_IMAGE})`;
  });

  // <picture> sources
  document.querySelectorAll("source").forEach(src => {
    src.srcset = AB_IMAGE;
  });

  // background-image
  document.querySelectorAll("[style*='background-image']").forEach(bg => {
    bg.style.backgroundImage = `url(${AB_IMAGE})`;
  });

  console.log("ABTEST: Swap Complete ✓");
}

// Run repeatedly because Shopify renders late
setInterval(replaceImages, 1500);
