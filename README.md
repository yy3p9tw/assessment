# 2026 年度績效考核系統

內部主管填寫用的線上考核表，取代原本的 Excel 表格（`考核2026.xlsx`）。
純前端網頁（HTML/CSS/JS），資料存在 Firebase Firestore，可以直接放在 GitHub Pages 上跑，不需要自己架伺服器。

## 檔案說明

- `index.html` — 整個系統（填表 + 彙整總覽），部門/員工名單與評分項目都寫在檔案裡的 `CATEGORIES`。
- `firebase-config.js` — 你的 Firebase 專案設定值，**上線前一定要換成自己的**。
- `考核2026.xlsx` — 原始 Excel，保留作為評分項目與配分的對照依據。

## 第一步：建立 Firebase 專案（存共用資料用）

1. 開啟 https://console.firebase.google.com ，用公司 Google 帳號登入，建立新專案。
2. 左側選單「建構 (Build)」→「Firestore Database」→「建立資料庫」。地區選近的（例如 `asia-east1`），先選「測試模式」也可以，等一下會換成正式規則。
3. 回到「專案總覽」，點 `</>`（新增網頁應用程式），輸入應用程式名稱（隨意），完成後畫面會顯示一段 `firebaseConfig = {...}`。
4. 打開 `firebase-config.js`，把裡面的 `YOUR_API_KEY`、`YOUR_PROJECT_ID` 等值換成你剛剛拿到的實際內容。

> `firebase-config.js` 裡的值**不是密碼**，是公開給瀏覽器用的識別資訊，可以放心一起上傳到 GitHub。真正決定「誰能讀寫資料」的是下面的 Firestore 安全規則。

## 第二步：設定 Firestore 安全規則

在 Firebase 主控台左側「Firestore Database」→「規則」，貼上：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /assessments/{docId} {
      allow read, write: if true;
    }
  }
}
```

按「發布」。

**注意（重要的安全取捨）：** 這個規則等於「只要知道這個網址的人，都能讀到、也能新增/刪除考核資料」，沒有帳號登入的門檻 —— 跟原本 Google Form／Excel 用連結分享的邏輯類似。因為系統設計是給公司內部約 10 位主管填寫，建議：

- 不要把網址公開貼在公司以外看得到的地方（例如公開的 GitHub README、社群貼文）。
- 之後如果想要更嚴謹，可以加上 Firebase Authentication（例如限定公司網域的 Google 登入），這部分需要再加開發，跟我說一聲即可。

## 第三步：放上 GitHub 並開啟 GitHub Pages

1. 到 GitHub 建立一個新的 repository（可以設成 Private，但 Private repo 的 GitHub Pages 需要付費方案才能對外開放；免費方案的話要用 Public repo，網址雖公開但不會被搜尋引擎主動收錄）。
2. 把這個資料夾（`index.html`、`firebase-config.js`、`README.md`）推上去。
3. 到 repo 的 Settings → Pages，Source 選 `Deploy from a branch`，Branch 選 `main` / `(root)`，儲存。
4. 等 1-2 分鐘，Pages 會給一個網址，例如 `https://<你的帳號>.github.io/<repo名稱>/`，這就是往後所有主管要填表的連結。

## 本機測試

`index.html` 用了 ES module（`import`），直接用瀏覽器打開檔案（`file://`）會因為瀏覽器安全限制而失敗。本機測試請用簡單的本地伺服器，例如：

```
npx serve .
```

或用 VS Code 的 Live Server 擴充功能開啟，再用瀏覽器連過去。

## 之後要調整部門、人員、評分項目

打開 `index.html`，找到最上面的 `CATEGORIES` 這個物件，每個部門是一個區塊，裡面有：

- `criteria`：評分項目，`weight` 是配分、`evaluator` 標示是「部門直屬主管」還是「管理部」評分。
- `roster`：這個部門底下的被考核者名單與到職日期。

改完存檔、`git commit` / `git push` 上去，GitHub Pages 會自動更新（通常 1 分鐘內）。
