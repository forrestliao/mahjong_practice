
# 麻將聽牌練習（Mahjong Tenpai Practice）

一個用於練習麻將聽牌的網頁應用，玩家可以通過生成隨機牌組來練習判斷哪些牌可以形成聽牌組合，並且可以檢查自己的選擇是否正確。該應用支援多種配置選項，包括生成有聽牌或無聽牌的題目。

## 目錄
- [功能](#功能)
- [技術棧](#技術棧)
- [使用說明](#使用說明)
- [安裝與部署](#安裝與部署)
- [演示](#演示)
- [未來改進](#未來改進)

## 功能

- 隨機生成 7 張或 10 張麻將牌組，可重複最多 4 張。
- 提供玩家可以選擇的聽牌區域，檢查玩家的選擇。
- 支援自動檢查是否為「聽牌」組合，並且提示正確的聽牌組合。
- 設置「只出有聽牌的題目」選項，讓玩家練習有目標性的題目。
- 自動判定並顯示「沒有聽牌」的結果，適合初學者練習。

## 技術棧

- **HTML**: 建立網頁結構
- **CSS**: 提供基本的樣式
- **JavaScript**: 處理牌組的生成、判斷和互動邏輯
- **GitHub Pages**: 用於部署和託管網頁

## 使用說明

1. 打開網頁後，可以看到隨機生成的 7 張或 10 張麻將牌組。
2. 根據你對聽牌的判斷，從下方的選擇區域點選你認為的聽牌。
3. 點擊「檢查」按鈕，查看你選擇的聽牌是否正確。
4. 你可以勾選「只出有聽牌的題目」開關，然後按「生成題目」，以練習只有聽牌的情況。

## 安裝與部署

### 1. 本地運行

1. 確保你的電腦上已安裝 [Git](https://git-scm.com/)。
2. 克隆此專案：
   ```bash
   git clone https://github.com/forrestliao/mahjong_practice.git
   ```
3. 進入專案目錄：
   ```bash
   cd mahjong_practice
   ```
4. 打開 `index.html` 以啟動網頁應用。

### 2. 使用 GitHub Pages 部署

1. 確保你已將專案推送到 GitHub 儲存庫。
2. 前往儲存庫的「Settings > Pages」設定。
3. 設置分支（例如 `main`）和路徑（通常選擇 `/ (root)`），並保存。
4. 幾分鐘後，GitHub Pages 會提供一個 URL，訪問你的應用。

### 3. 使用 Netlify 或 Vercel 部署
1. 將專案打包（包括 `index.html`、CSS 和 JavaScript 文件）。
2. 登入 Netlify 或 Vercel，創建一個新的專案並上傳文件。
3. 訪問生成的免費網域以查看你的網頁應用。

## 演示

可以查看已部署的 GitHub Pages 版本：[麻將聽牌練習](https://forrestliao.github.io/mahjong_practice)

## 未來改進

- 增加多種麻將模式（例如 13 張牌組練習）。
- 提供分數統計和排名功能，提升練習的趣味性。
- 增加提示和教學功能，適合麻將初學者學習。
- 支援其他語言選項，讓更多用戶能夠參與練習。

## 聯絡方式
如果你對此專案有任何建議或問題，歡迎通過以下方式聯絡：

- GitHub: [forrestliao](https://github.com/forrestliao)
