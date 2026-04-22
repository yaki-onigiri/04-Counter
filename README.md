# カウンター

---

## Demo

<https://yaki-onigiri.github.io/04-Counter>

---

## Sourcecode

<https://github.com/yaki-onigiri/04-Counter>

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

・増減ボタン（+1/-1）両方に"長押しによる連続カウント機能"を実装

・"長押し時間に応じてカウント速度が変化する加速処理"の基礎を実装

### UX改善

・マウスをボタン外に移動しても、押している間はカウント継続
・マウスを離したタイミングで確実に停止（documentで制御）
・長押し時にクリックイベントが重複しないように制御
・どのボタンから操作を開始しても、タイマー処理が1つだけ動作するように制御

### 開発中機能

・長押し時間に応じてカウント速度を段階的に加速させる機能（段階制御の調整中）

---

## 設計・実装のポイント

### 課題

    クリック操作のみでは、連続入力時の操作効率が低い

### 解決方法

    長押し状態をフラグで管理し、setTimeout による"再帰的な繰り返し処理"を実装

### 工夫した点

    ・click と mousedown の競合を防ぐため、長押し判定フラグ（isLongPress）を導入

    ・setInterval の多重起動を防ぐため、状態管理（isPressing）で制御

    ・mouseup を document に設定し、操作取りこぼしを防止

    ・timerId を1つに統一し、clearInterval による確実な停止制御を実装

    ・ボタン間の操作時にタイマーが重複しないように、mousedown 時に必ず初期化処理を実行

    ・長押し時間を計測し、将来的に速度制御へ拡張できる構造に設計

    ・固定間隔（setInterval）から可変間隔（setTimeout）への移行を前提とした設計に変更中

    ・setTimeout の再帰処理において、開始・再帰・停止で同一のIDを扱うように設計し、タイマーの暴走を防止

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

    ・時間（Date.now）を使った状態制御の基礎

    ・setInterval と setTimeout の違いと使い分け

    ・イベント駆動と状態管理を組み合わせたUI制御

    ・setTimeout を用いた「再帰処理による非同期ループ」の実装

    ・タイマーIDの一元管理と停止制御の重要性

---

## フォルダ構成

.
├── css/
│   └── style.css
├── js/
│   └── script.js
├── docs/
│   ├── dev-log.md
│   └── learning-note.md
├── index.html
└── README.md

---

## 今後の改善予定

    ・長押し時のカウント速度を段階的に加速させる（現在対応中）

    ・LocalStorage を使ったデータ保存/永続化

    ・デザインの改善（UI/UX向上）
    
    ・スマートフォン対応（touchイベントの実装）

---

## 備考

本アプリはフロントエンド学習の一環として作成しています。

---

## 作成者

GitHub: <https://github.com/yaki-onigiri>

---
