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

===

## 26/04/14

### カウントが0の状態で「-1」ボタンを押してもカウントが反映されない機能を実装

▼ 目的

    カウントが0未満にならないように制御する（マイナス制限の実装）

---

▼ 仕組み

    if文 を使うことで、「特定の条件を満たした場合の未処理を実行する」ことができる
    
    今回は「count が0より大きい場合のみ減算する」という条件で制御する

---

▼ 具体的な方法・使用したコード・技術

    1⃣ カウントを減らす処理（count--）の位置を確認

    2⃣ “数字を減らす処理”の直前に『条件分岐』を入れる
        if (count > 0)

    3⃣ 『条件分岐』の中に“数字を減らす処理”を入れる
        if (count > 0) {
            count--;
        }

    これによって条件を満たしたときだけ実行されるようにする

---

▼ 重要なポイント

    ・「count--;」を“消す”のではなく、if の中に“入れる”
    ・「減らした後に判定」ではなく「減らす前に判定する」ことが重要
    ・『制御（条件分岐）』は「処理の前」に書くこと

---

▼ 学んだこと

    ・シンプルなif文でも、使い方次第で挙動が大きく変わる
    ・バグを防ぐためには「状態（変数）」を直接制御する必要がある
    ・「処理」は“削除する”のではなく、“条件で制御する”ことで安全に実装できる

===

## 26/04/16

### カウント長押し機能を追加

▼ 目的

    ボタンを長押ししたときに、カウントが自動で増え続ける処理を理解する

---

▼ 仕組み

    長押しは「押している状態」をフラグで管理し、setInterval を使って一定間隔で処理を繰り返すことで実現する

---

▼ 具体的な方法

    1. mousedown で「押している状態（isPressing）」をONにする
    2. setInterval でカウントを増やす処理を繰り返す
    3. mouseup で状態をOFFにして処理を停止する
    4. クリック（click）と長押し（isPressing）が重ならないように制御する

---

▼ 使用したコード・技術

    ・addEventListener("mousedown")
    ・addEventListener("mouseup")
    ・setInterval()
    ・clearInterval()
    ・フラグ管理（isPressing / isLongPress）

---

▼ 重要なポイント

    ・setInterval は放置すると動き続けるため、必ず clearInterval が必要
    ・click は「mousedown → mouseup の後に発火する」ため、長押しと競合する
    ・「押しているか」と「カーソル位置」は別の概念
    ・停止処理は document に書くことで、取りこぼしを防げる

---

▼ 学んだこと

    『長押し機能』は単純なクリック処理ではなく、「状態管理」と「繰り返し処理」を組み合わせて実現する必要がある、と理解した

    また、イベントはそれぞれ独立して動くため、意図しない動作を防ぐにはフラグで制御することが重要だ、と学んだ

===

## 26/04/18

### 長押し機能の安定化（+1 / -1 両方対応・バグ防止）

▼ 目的

    ボタンを長押ししたとき、カウントが連続で増減する機能を実装しつつ、どんな操作（長押し・連打・ボタン切替）でもバグが起きないようにする。

---

▼ 仕組み

    長押しは「ボタンを押している間、同じ処理を繰り返す動き」なので、setInterval を使って一定時間ごとに処理を実行する

    ただし、そのまま使うと以下の問題が起きる
        ・複数の setInterval が同時に動く（暴走）
        ・click と mousedown が動いて二重カウント

    この問題を防ぐために、以下の2つで制御する
        ・isPressing → 今押しているかどうか
        ・isLongPress → 長押しかどうか

▼ 具体的な方法

    1.ボタンを押したとき（mousedown）
    
        ・すでに押していたら何もしない（多重起動防止）

        ・長押しフラグをリセット

        ・setInterval を開始
    
    2.長押し中（setInterval）

        ・長押し状態を true にする

        ・カウント処理を繰り返す
    
    3.ボタンを離したとき（mouseup）

        ・押している状態を解除

        ・setInterval を停止
    
    4.clickイベント

        ・長押し中なら処理を止める（return）

---

▼ 使用したコード・技術

    ⓵
    let isPressing = false;
    let isLongPress = false;
    let intervalId;

    ⓶
    incrementBtn.addEventListener("mousedown", () => {

        clearInterval(intervalId);　// 前処理を止める

        if (isPressing) return;

        isPressing = true;
        isLongPress = false;

        intervalId = setInterval(() => {

            isLongPress = true;

            if (isPressing) {
                count++;
                updateDisplay();
            }
        }, 200);
    });

    ⓷
    document.addEventListener("mouseup", () => {
        isPreesing = false;
        isLongPress = false;

        clearInterval(intervalId);
    });

---

▼ 重要なポイント

    ・setInterval は複数同時に動くため、必ず clearInterval で止める必要がある
    
    ・intervalId は「タイマーを止めるための番号」

    ・mousedown の最初で clearInterval を実行すると、どんな操作でも安定する

    ・click は長押し中でも発火するため、isLongPress で制御しないとバグになる

    ・停止処理は document にまとめることで「取りこぼし」を防げる

---

▼ 学んだこと

    ・「動くコード」と「壊れないコード」は違う

    ・イベント処理は「開始・継続・停止」をセットで考える必要がある

    ・状態（フラグ）で制御すると、複雑な動きでも整理できる

    ・同じ役割の処理（例：interval）は1つにまとめるとバグが減る

    ・エラーやバグの原因は「処理が複数動いている」ケースが多い

===

## 26/04/20

### 長押し時間を取得し、カウント速度を変える準備をする

▼ 目的

    ボタンの長押し時間に応じて、カウント速度を段階的に変えられるようにするため。そのために「どれくらい押しているか（時間）」を取得する

---

▼ 仕組み

    ボタンを押した瞬間の時間と、話したときの時間を記録し、その差を取ることで「長押し時間」を求める。
    
        長押し時間 = 現在時刻 - 押し始めた時刻
    
    この時間を使って「遅い → 速い」にカウント速度を変える。

---

▼ 具体的な方法

    ① mousedown（押した瞬間）で時間を記録する

    ② mouseup（離した瞬間）で時間の差を計算する

    ③ console.log で値を確認する

---

▼ 使用したコード・技術

    ・押し始めの時間を保存する変数

        let pressStartTime = 0;

    ・ボタンを押したとき（+1/-1 両方）

        incrementBtn.addEventListener("mousedown", () => {
            pressStartTime = Date.now();
        });

        decrementBtn.addEventListener("mousedown", () => {
            pressStartTime = Date.now();
        });
    
    ・ボタンを離したとき

        document.addEventListener("mouseup", () => {
            const duration = Date.now() - pressStartTime;
            console.log(duration);
        });

---

▼ 重要なポイント

    ・Date.now() は「現在の時間（ミリ秒）」を取得する

    ・mousedown と mouseup をセットで使うことで「押していた時間」がわかる

    ・時間はミリ秒なので「1000 = 1秒」

    ・mouseup は document に付けることで、ボタン外でも確実に検知できる

    ・「時間を記録するコード」は mousedown の一番最初に書く。理由としては後に書くと時間にほんの少しのズレが生じるため

---

▼ 学んだこと

    ・『時間を使った制御』は「開始時間を保存して差を取る」ことで実現できる

    ・イベント（mousedown / mouseup）を組み合わせることで状態を管理できる

    ・長押し機能は「時間」と「繰り返し処理」の組み合わせで作られる

    ・今までは「setInterval で固定速度」だったのが、今後は「setTimeout で毎回速度を変える」ことができる

===
