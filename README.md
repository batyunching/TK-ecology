# 4.4 生態系生圖工作室

這是一個可直接開啟的課堂網站原型，包含學生登入、生態系草案資料、Prompt 建立與複製、圖片上傳、作品送出、作品展覽、同儕 1-10 分評分、優點與可增加內容回饋、老師後台與 CSV 匯出。

## 開啟網站

打開 `index.html` 即可試用。尚未填 Supabase 設定時會使用示範模式，資料存在同一台電腦的瀏覽器中。

老師後台預設代碼：

```text
ecosystem44
```

## 接上 Supabase

1. 在 Supabase 專案的 SQL Editor 執行 `supabase/schema.sql`。
2. 到 `app.js` 填入 `SUPABASE_URL` 與 `SUPABASE_ANON_KEY`。
3. 視需要修改 `TEACHER_CODE`。
4. 部署 `supabase/functions/generate-ecosystem-image`。
5. 設定 Edge Function secret：

```bash
supabase secrets set OPENAI_API_KEY=你的_OpenAI_API_Key
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=你的_Service_Role_Key
```

## 資料表

`submissions` 儲存班級、座號、姓名、小組人數、生態系種類、Prompt、圖片網址與繳交時間。

`ratings` 儲存評分者、分數、優點、可增加內容，並用 `submissions_with_average` view 計算每件作品的平均分數與評分人數。

## 草案與生圖流程

學生先自行填寫環境、植物、動物與生物互動內容，再按「組合 Prompt」。若需要比較，可按「查看內建草案」顯示參考資料；草案直接內建在 `app.js`，不會自動填入或覆蓋學生內容。

學生可以複製 Prompt 到自己的 Gemini 或 ChatGPT 生圖，再回網站上傳圖片或貼上圖片網址。

## 正式上課提醒

目前學生登入是課堂用的輕量登入，方便快速開始活動。若要公開到網路或長期使用，建議再加上 Supabase Auth 或班級邀請碼，老師後台也可改成真正的帳號權限控管。
