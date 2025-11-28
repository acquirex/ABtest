console.log("UNIVERSAL ABTEST LOADED 🚀");

const NEW_IMG = "https://picsum.photos/id/237/800/800";   // your test image

function replaceImg(el) {
    // 1. Normal <img src="">
    if (el.tagName === "IMG") {
        el.src = NEW_IMG;
        el.srcset = "";
        el.style.border = "3px solid red";
    }

    // 2. Lazyload attributes
    const lazyAttrs = ["data-src", "data-original", "data-lazy", "data-srcset"];
    lazyAttrs.forEach(attr => {
        if (el.getAttribute && el.getAttribute(attr)) {
            el.setAttribute(attr, NEW_IMG);
        }
    });

    // 3. Background images
    const bg = window.getComputedStyle(el).backgroundImage;
    if (bg && bg.includes("url(")) {
        el.style.backgroundImage = `url(${NEW_IMG})`;
    }

    // 4. <picture> elements
    if (el.tagName === "PICTURE") {
        const sources = el.querySelectorAll("source");
        sources.forEach(src => src.srcset = NEW_IMG);
    }
}

function scanAndReplace() {
    const all = document.querySelectorAll("*");

    all.forEach(el => {
        // Only swap visible large images
        const w = el.clientWidth || 0;
        if (w > 150) replaceImg(el);
    });

    console.log("Universal ABTEST Swap Done ✔");
}

// Run multiple times due to lazy loading
document.addEventListener("DOMContentLoaded", scanAndReplace);
window.addEventListener("load", () => setTimeout(scanAndReplace, 800));
setInterval(scanAndReplace, 1500);
