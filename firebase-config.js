// 這個檔案的內容不是密鑰，可以安心放進公開的 GitHub repo。
// Firebase 網頁 SDK 的設定值本來就是公開的，真正的存取控制是靠
// Firestore 的安全規則（見 README.md），不是靠隱藏這幾個值。
//
// 使用方式：
// 1. 到 https://console.firebase.google.com 建立一個新專案
// 2. 左側選單「建構」→「Firestore Database」→ 建立資料庫（地區可選 asia-east1）
// 3. 專案總覽頁點「</>」新增一個網頁應用程式，複製它給你的設定值
// 4. 把下面 YOUR_XXX 換成你拿到的實際值
// 5. 依照 README.md 設定 Firestore 安全規則

export const firebaseConfig = {
  apiKey: "AIzaSyAw_Nq4XO2niTeMEKF9ksQgHRPKEuXxUSE",
  authDomain: "assessment-8bc1c.firebaseapp.com",
  projectId: "assessment-8bc1c",
  storageBucket: "assessment-8bc1c.firebasestorage.app",
  messagingSenderId: "39588195621",
  appId: "1:39588195621:web:2884b2859f12fa1f6c7ecc",
};
