console.log("ABTEST LOADED 🎯");

// Your test image
const NEW_IMG = "https://picsum.photos/id/237/800/800";

// Product containers (works for Shopify, WooCommerce, Webflow, Magento)
const PRODUCT_SELECTORS = `
  .product, 
  .product-single,
  .product__photo,
  .product__images,
  .product-gallery,
  .product-media,
  #ProductSection-product-template,
  .productView,
  .woocommerce-product-gallery,
  .woocommerce-product-gallery__image,
  .single-product,
  .product-main,
  .product-page
`;

// Return TRUE only if element is inside a product area
function isInsideProduct(el) {
    return el.closest(PRODUCT_SELECTORS) !== null;
}

function replaceProductImages() {
    console.log("ABTEST: scanning...");

    const candidates = document.querySelectorAll("img, picture, [style*='background-image']");

    candidates.forEach(el => {
        if (!isInsideProduct(el)) return;            // ❌ skip non-product images
        
        const w = el.clientWidth || 0;
        if (w < 200) return;                        // avoid small icons

        // <img>
        if (el.tagName === "IMG") {
            el.src = NEW_IMG;
            el.srcset = "";
            el.style.border = "3px solid red";
        }

        // picture sources
        if (el.tagName === "PICTURE") {
            el.querySelectorAll("source").forEach(src => src.srcset = NEW_IMG);
        }

        // background-image
        if (window.getComputedStyle(el).backgroundImage.includes("url(")) {
            el.style.backgroundImage = `url(${NEW_IMG})`;
        }
    });
}

// Run multiple times because of lazyload / sliders
setInterval(replaceProductImages, 1200);
document.addEventListener("DOMContentLoaded", replaceProductImages);
window.addEventListener("load", () => setTimeout(replaceProductImages, 900));
