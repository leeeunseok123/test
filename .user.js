// ==UserScript==
// @name         Pickko 통합 자동화 (window.name 기반)
// @namespace    http://pickko.auto
// @version      1.3
// @description  유저 동기화 자동화 (북마클릿 진입 감지 → system 이동 및 동기화 → 창 자동 닫기)
// @match        https://www.pickkoadmin.com/manager/dashboard.html
// @match        https://www.pickkoadmin.com/manager/shop/system.html
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  const fromBookmarklet = window.name === "pickko-bookmarklet";

  // ✅ dashboard 진입 시 → 북마클릿 감지되면 바로 system.html 이동
  if (location.pathname === "/manager/dashboard.html") {
    if (fromBookmarklet) {
      console.log("🧭 북마클릿 진입 감지됨 → 시스템 설정으로 이동");
      location.href = "https://www.pickkoadmin.com/manager/shop/system.html";
    } else {
      console.log("📎 일반 접속 (북마클릿 아님)");
    }
  }

  // ✅ system.html 진입 시 (북마클릿인 경우만) 유저 동기화 + 창 닫기
  if (location.pathname === "/manager/shop/system.html" && fromBookmarklet) {
    const btn = document.querySelector(".fn-bs-sync-user");
    if (btn) {
      console.log("✅ 유저 동기화 버튼 감지됨 → 자동 클릭");
      btn.click();
      setTimeout(() => {
        console.log("✅ 동기화 완료 → 창 자동 닫기");
        window.close();
      }, 3000);
    } else {
      console.warn("❌ 유저 동기화 버튼을 찾을 수 없습니다.");
    }
  }
})();
