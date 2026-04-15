# カウンター

---

## Demo

---

## Sourcecode

---

## アプリ概要

シンプルなカウンターアプリです。
ボタンをクリックすることで数値を増減・リセットできます。

単純なクリック操作に加え、長押しによる連続カウント機能を実装し、ユーザーの操作効率を向上させています。

---

## アプリ画面

---

## How to Run

1. index.html をブラウザで開く
2. ボタンをクリックしてカウントを操作する

---

## Features（主な機能）

---

### 基本機能

・カウントの増減（+1 / -1）
・「リセット」ボタンでカウントを0に戻す
・カウントは0未満にならない（マイナス制限）

### 拡張機能

・ボタン長押しによる連続カウント機能

### UX改善

・マウスをボタン外に移動しても、押している間はカウント継続
・マウスを離したタイミングで確実に停止（documentで制御）
・長押し時にクリックイベントが重複しないように制御

---

## 設計・実装のポイント

### 課題

    クリック操作のみでは、連続入力時の操作効率が低い

### 解決方法

    長押し状態をフラグで管理し、setInterval による繰り返し処理を実装

### 工夫した点

    ・click と mousedown の競合を防ぐため、長押し判定フラグ（isLongPress）を導入

    ・setInterval の多重起動を防ぐため、状態管理（isPressing）で制御

    ・mouseup を document に設定し、操作取りこぼしを防止

---

## 使用技術

・HTML：構造の定義

・CSS：レイアウト

・JavaScript（vanilla JS）：ロジック定義

---

## 学習ポイント

・getElementById を使ったDOM取得
・addEventListener によるクリックイベント処理
・状態管理（isPressing / isLongPress）による挙動制御
・setInterval / clearInterval を使った繰り返し処理
・複数イベント（click / mousedown / mouseup）の競合制御

---

## フォルダ構成

.
├── css/
│    └── style.css
├── js/
│    └── script.js
├── docs/
│    ├── dev-log.md
│    └── learning-note.md
├── index.html
└── README.md

---

## 今後の改善予定

    ・LocalStorage を使ったデータ保存
    ・デザインの改善（UI/UX向上）
    ・減算ボタンにも長押し機能を追加
    ・長押し時のカウント速度を段階的に加速させる

---

## 備考

本アプリはフロントエンド学習の一環として作成しています。

---

## 作成者

GitHub: <https://github.com/yaki-onigiri>

---
