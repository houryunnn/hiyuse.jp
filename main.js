// 実行
document.addEventListener("DOMContentLoaded", () => {
  // ===== HERO スライダー =====
  const heroSlides = Array.from(document.querySelectorAll(".hero-bg__slide"));
  let heroIndex = 0;
  const FAST_INTERVAL = 350; // パラパラ速度
  const NORMAL_INTERVAL = 5000; // 以降のゆっくり
  const FAST_DURATION = 4000; // 何秒パラパラさせるか
  let sliderTimer;

  if (heroSlides.length > 1) {
    const switchFast = () => {
      heroSlides[heroIndex].classList.remove("is-active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("is-active");
    };

    const switchNormal = () => {
      heroSlides[heroIndex].classList.remove("is-active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("is-active");
    };

    // 最初：パラパラ
    sliderTimer = setInterval(switchFast, FAST_INTERVAL);

    // 一定時間後：ゆっくり
    setTimeout(() => {
      clearInterval(sliderTimer);
      sliderTimer = setInterval(switchNormal, NORMAL_INTERVAL);
    }, FAST_DURATION);
  }

  // ===== オーバーレイメニュー =====
  const navTrigger = document.getElementById("navTrigger");
  const overlayNav = document.getElementById("overlayNav");
  const overlayClose = document.getElementById("overlayClose");

  function openNav() {
    overlayNav.classList.add("is-open");
    overlayNav.setAttribute("aria-hidden", "false");
  }

  function closeNav() {
    overlayNav.classList.remove("is-open");
    overlayNav.setAttribute("aria-hidden", "true");
  }

  if (navTrigger) navTrigger.addEventListener("click", openNav);
  if (overlayClose) overlayClose.addEventListener("click", closeNav);

  // メニュー内リンクをクリックしたら自動で閉じる
  overlayNav?.addEventListener("click", (e) => {
    if (e.target.matches(".overlay-nav__list a")) {
      closeNav();
    }
  });

  // ===== TOPボタン =====
  const toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
