# 学習メモ

## 26/04/13

### カウンターアプリの基本機能を実装（+1 / -1 / リセット）

▼ 目的
    ボタン操作によって数値を増減・リセットできるアプリを作成する。

---

▼ 仕組み

    カウンターは以下の流れで動く：
        1. 数値（count）を保持する
        2. ボタン操作で数値を変更する
        3. 変更した数値を画面に反映する

    ☞ 「データ変更」と「画面更新」は別処理

---

▼ 具体的な方法
    1⃣ 初期値を用意する
        let count = 0;

    2⃣ HTML要素を取得する
        const countEl = document.getElementById("count");

    3⃣ ボタン操作を検知する
        addEventListener("click", function() {...処理...});

    4⃣ 数値を変更する
        ・count++;
        ・count--;
        ・count = 0;
    
    5⃣ 画面を更新する
        countEl.textContent = count;

---

▼ 使用したコード・技術

    ・getElementById
        ⇒ HTML要素を取得する

    ・addEventListener
        ⇒クリックイベントを検知する

    ・textContent
        ⇒画面のテキストを書き換える
    
    ・関数（updateDisplay）

        function updateDisplay() {
            countEl.textContent = count;
        }

        ⇒表示更新を共通化

---

▼ 重要なポイント

    ・「count（データ）」と「画面表示」は別物
    ・値を変えただけでは画面は変わらない
    ・必ず「表示更新処理」が必要

    値変更 → updateDisplay()

    ☞このセットで動く

---

▼ 学んだこと

    ・JavaScriptは「状態(データ)」を操作してUIに反映する仕組み
    ・イベント(クリック)をきっかけに処理が実行される
    ・同じ処理は関数にまとめることで管理しやすくなる

    ☞基本構造：「イベント → データ変更 → 表示更新」

---
