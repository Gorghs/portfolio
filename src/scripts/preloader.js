// Preloader with progress bar animation
export function initPreloader() {
  const PRELOADER_SEEN_KEY = "karthickv-portfolio-preloader-seen";
  const preloader = document.getElementById("preloader");
  const preloaderName = document.getElementById("preloader-name");
  const mainContent = document.getElementById("main-content");

  if (!preloader || !preloaderName || !mainContent) return;
  if (preloader.dataset.started === "1") return;

  preloader.dataset.started = "1";

  const hasSeenPreloader = (() => {
    try {
      return sessionStorage.getItem(PRELOADER_SEEN_KEY) === "1";
    } catch {
      return false;
    }
  })();

  if (hasSeenPreloader) {
    skipPreloader(preloader, mainContent);
    return;
  }

  try {
    sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
  } catch {
    // Ignore storage access issues
  }

  copyTargetStyles(preloaderName, mainContent);

  // Create progress bar element
  const progressBar = document.createElement("div");
  progressBar.id = "preloader-progress";
  progressBar.style.cssText = `
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 3px;
    width: 0%;
    background: var(--color-primary);
    border-radius: 2px;
    transition: width 0.15s linear;
  `;
  preloaderName.style.position = "relative";
  preloaderName.appendChild(progressBar);

  // Animate progress bar
  animateProgress(progressBar, 0, 100, 1200, () => {
    setTimeout(() => {
      progressBar.remove();
      animateToTarget(preloader, preloaderName, mainContent);
    }, 200);
  });
}

function copyTargetStyles(preloaderName, mainContent) {
  mainContent.style.opacity = "0";
  mainContent.style.visibility = "hidden";
  mainContent.classList.remove("content-hidden");

  requestAnimationFrame(() => {
    const targetEl = document.getElementById("intro-name");
    if (targetEl) {
      const targetStyle = window.getComputedStyle(targetEl);
      preloaderName.style.fontSize = targetStyle.fontSize;
      preloaderName.style.letterSpacing = targetStyle.letterSpacing;
      preloaderName.style.lineHeight = targetStyle.lineHeight;
      preloaderName.style.fontWeight = targetStyle.fontWeight;
      preloaderName.style.fontFamily = targetStyle.fontFamily;
    }

    mainContent.classList.add("content-hidden");
    mainContent.style.removeProperty("opacity");
    mainContent.style.removeProperty("visibility");
  });

  // Set the name immediately
  preloaderName.textContent = "Karthick V";
}

function animateProgress(element, start, end, duration, callback) {
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = start + (end - start) * eased;
    element.style.width = `${current}%`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      callback?.();
    }
  }

  requestAnimationFrame(step);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateToTarget(preloader, preloaderName, mainContent) {
  mainContent.classList.remove("content-hidden");
  mainContent.style.opacity = "0";
  mainContent.style.visibility = "hidden";

  requestAnimationFrame(() => {
    const targetEl = document.getElementById("intro-title");
    if (!targetEl) {
      finishAnimation(preloader, mainContent);
      return;
    }

    const targetRect = targetEl.getBoundingClientRect();
    const currentRect = preloaderName.getBoundingClientRect();

    preloaderName.style.transition = "none";
    preloaderName.classList.remove("centered");
    preloaderName.style.top = `${currentRect.top}px`;
    preloaderName.style.left = `${currentRect.left}px`;
    preloaderName.style.transform = "none";

    preloaderName.offsetHeight;

    preloaderName.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

    const dx = targetRect.left - currentRect.left;
    const dy = targetRect.top - currentRect.top;

    preloaderName.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    preloaderName.style.transform = `translate(${dx}px, ${dy}px)`;

    preloader.classList.add("fade-bg");

    setTimeout(() => {
      finishAnimation(preloader, mainContent);
    }, 700);
  });
}

function finishAnimation(preloader, mainContent) {
  mainContent.style.removeProperty("opacity");
  mainContent.style.removeProperty("visibility");
  mainContent.classList.add("content-visible");

  const introName = document.getElementById("intro-name");
  introName?.classList.add("visible");

  preloader.classList.add("done");
  setTimeout(() => preloader.remove(), 300);
}

function skipPreloader(preloader, mainContent) {
  mainContent.classList.remove("content-hidden");
  mainContent.classList.add("content-visible");
  mainContent.style.removeProperty("opacity");
  mainContent.style.removeProperty("visibility");

  const introName = document.getElementById("intro-name");
  introName?.classList.add("visible");

  preloader.remove();
}