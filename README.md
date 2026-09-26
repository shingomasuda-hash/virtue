# VIRTUE コーポレートサイト

黒・グレー・シルバー、人生コンサルタントの使命、スクロール演出、全国ネットワークのアニメーションを含む最新版です。

## GitHubへのアップロード
1. ZIPを解凍します。
2. GitHubの対象リポジトリで「Add file → Upload files」を開きます。
3. distフォルダ、vercel.json、README.mdをリポジトリの最上位にアップロードします。
4. Commit changesで保存します。ZIPそのものはアップロードしないでください。

既存の同名ファイルがある場合は、内容を確認してから差し替えてください。

## Vercel（GitHub連携済みの場合）
- Root Directory: リポジトリの最上位（./）。distは指定しません。
- Framework Preset: Other
- Build Command: 空欄（ビルド不要）
- Install Command: 空欄（インストール不要）
- Output Directory: dist

同梱vercel.jsonにビルド・出力設定を記載済みです。Root DirectoryはVercel画面で確認してください。
以前の案内でRoot Directoryをdistに設定した場合は、今回のパッケージでは最上位へ戻してください。
GitHubの本番用ブランチへ保存すると、連携先のVercelで自動デプロイが始まります。

## ファイル
- dist/index.html: 本文・日本地図
- dist/style.css: 基本デザイン
- dist/experience.css: スクロール・ネットワーク演出
- dist/mission.css: 使命・シルバーのデザイン
- dist/gray-motion.css: 最新のグレー配色と追加アニメーション
- dist/script.js: アニメーション制御・停止ボタン
- dist/hero.webp: トップ画像
- dist/map-source.txt: 地図データの出典
- vercel.json: Vercel設定

## 補足
HTMLをローカルで開く場合も、CSS・JavaScript・画像は同じ階層に置いてください。
Google Fontsは外部読み込みです。読み込めない場合も標準フォントで表示されます。
地図上の点と矢印はネットワークのイメージであり、実際の所在地や拠点数を示していません。
