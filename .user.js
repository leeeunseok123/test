// ==사용자스크립트==
// @name 픽코 통합 자동화
// @namespace http://pickko.auto
// @버전 1.0
// @description 유저 동기화 자동화 + 북마클릿 코드 제공
// @match https://www.pickkoadmin.com/manager/dashboard.html
// @match https://www.pickkoadmin.com/manager/shop/system.html
// @grant GM_setClipboard
// @run-at document-idle
// ==/UserScript==

(기능. () {
 BM_KEY = "pickko_bookmarklet_copied";

  // ✅ 북마클릿 코드 안내 (최초 1회만)
 만약 (!localStorage.getItem(BM_KEY)) {
 const bmCode = 'jav 스크립트:(()=>{const id=prompt("동기화할 상점 ID 를 입력하세요:");if(!id||!/^\\d+$/.test(id))알림 ("숫자를 정확히 입력해주세요";로컬스토리지.setItem("autoSyncShopId", id);const url=\\'https://www.pickkoadmin.com/manager/shop/proc/select/ \\${id}.html?autoSync=true\\';const win=window.open(url,_blank");win?focus ():alert("❗. 관리자 사이트에 팝업 허용을 해주세요.");})();`;

 alert("✅ Pickko 자동화 스크립트가 설치되었습니다.\n\n📌 북마클릿 코드가 클립보드에 복사되었어요!\n크롬 북마크바에 새 북마크를 추가하고, URL에 붙여넣으세요.");
 GM_setClipboard(bmCode);
 로컬 스토리지.setItem(BM_KEY, "true");
  }

  // ✅ 대시보드 진입 시 확인창  → 시스템.HTML 이동
 만약 (location.pathname === "/manager/dashboard.html") {
 const proceed = confirm("🔄 유저 동기화를 진행하시겠습니까?\n[확인]을 누르면 시스템 설정 페이지로 이동합니다.");
    한다면 (진행하다) {
 위치.href = "https://www.pickkoadmin.com/manager/shop/system.html ";
    } 또 다른 {
 console.log("❌ 유저 동기화 취소됨");
    }
  }

  // ✅ 시스템.html 진입 시 자동 동기화 클릭
 만약 (location.pathname === "/manager/shop/system.html") {
 const btn = 문서.쿼리 셀렉터("fn-bs-sync-user");
    한다면 (btn) {
 console.log("✅ 유저 동기화 버튼 감지됨 → 자동 클릭");
 btn.클릭 ();
 alert("✅ 유저 동기화 완료!");
    } 또 다른 {
 console.warn("❌ 유저 동기화 버튼을 찾을 수 없습니다.");
    }
  }
})();
