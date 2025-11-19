document.addEventListener("DOMContentLoaded", () => {
  // HTML にフラグを付けて、CSS 側で「JS 有効時だけアニメ」制御
  document.documentElement.classList.add("js-ready");

  // ==============================
  // HERO スライダー
  // ==============================
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

  // ==============================
  // オーバーレイメニュー
  // ==============================
  const navTrigger = document.getElementById("navTrigger");
  const overlayNav = document.getElementById("overlayNav");
  const overlayClose = document.getElementById("overlayClose");

  function openNav() {
    if (!overlayNav) return;
    overlayNav.classList.add("is-open");
    overlayNav.setAttribute("aria-hidden", "false");
  }

  function closeNav() {
    if (!overlayNav) return;
    overlayNav.classList.remove("is-open");
    overlayNav.setAttribute("aria-hidden", "true");
  }

  if (navTrigger) navTrigger.addEventListener("click", openNav);
  if (overlayClose) overlayClose.addEventListener("click", closeNav);

  // メニュー内リンクで自動クローズ
  if (overlayNav) {
    overlayNav.addEventListener("click", (e) => {
      if (e.target.matches(".overlay-nav__list a")) {
        closeNav();
      }
    });
  }

  // ==============================
  // TOP ボタン
  // ==============================
  const toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==============================
  // セクション フェードイン
  // ==============================
  const sections = Array.from(document.querySelectorAll(".section"));

  if (sections.length > 0 && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const index = sections.indexOf(el);

          const baseDelay = 0.2; // 全体のワンテンポ
          const perSection = 0.12; // セクションごとの差

          el.style.transitionDelay = `${baseDelay + perSection * index}s`;
          el.classList.add("is-visible");

          sectionObserver.unobserve(el);
        });
      },
      {
        threshold: 0.25,
      }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  } else {
    // 古いブラウザ用：全部即表示
    sections.forEach((el) => el.classList.add("is-visible"));
  }

  // ==============================
  // TEAM メンバーポップイン（順番に）
  // ==============================
  const teamGrid = document.querySelector("#team .team-grid");

  if (teamGrid && "IntersectionObserver" in window) {
    const members = Array.from(teamGrid.querySelectorAll(".team-member"));

    const teamObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          members.forEach((m, i) => {
            const baseDelay = 0.2;
            const perMember = 0.1;

            m.style.transitionDelay = `${baseDelay + perMember * i}s`;
            m.classList.add("is-visible");
          });

          teamObserver.disconnect();
        });
      },
      {
        threshold: 0.3,
      }
    );

    teamObserver.observe(teamGrid);
  } else if (teamGrid) {
    // フォールバック
    const members = Array.from(teamGrid.querySelectorAll(".team-member"));
    members.forEach((m) => m.classList.add("is-visible"));
  }
});
