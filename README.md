# Garmin Activity Viewer

GarminのアクティビティデータをWebブラウザで表示するアプリケーションです。

## 機能

- Garmin Connectへのログイン
- アクティビティ一覧の表示
- 各アクティビティの詳細情報表示
  - 距離
  - 時間
  - 平均ペース
  - 平均心拍数
  - 消費カロリー

## セットアップ

### ローカル開発

#### 1. 依存パッケージのインストール

```bash
npm install
```

#### 2. 環境変数の設定（オプション）

`.env`ファイルを作成して、必要に応じて設定：

```
PORT=3000
SESSION_SECRET=your-random-session-secret
```

**注意**: アプリケーションのログインフォームから直接ログインすることもできます。

#### 3. アプリケーションの起動

```bash
npm start
```

開発モード（自動再起動）：

```bash
npm run dev
```

#### 4. ブラウザでアクセス

ブラウザで `http://localhost:3000` を開きます。

### Vercelへのデプロイ

#### 1. Vercel CLIのインストール

```bash
npm install -g vercel
```

#### 2. デプロイ

```bash
vercel
```

初回デプロイ時は、プロジェクトの設定をインタラクティブに選択します。

#### 3. プロダクション環境へのデプロイ

```bash
vercel --prod
```

**注意**: Vercelでは、各APIエンドポイントが個別のServerless Functionとしてデプロイされます。セッション管理はクライアント側のlocalStorageでOAuthトークンを保存します。

## 使い方

1. Garmin Connectのメールアドレスとパスワードでログイン
2. アクティビティ一覧が自動的に表示されます
3. 「更新」ボタンで最新のアクティビティを再読み込み
4. 「さらに読み込む」ボタンで過去のアクティビティを表示

## 技術スタック

- **バックエンド**: Node.js + Express
- **フロントエンド**: HTML + CSS + JavaScript
- **API**: Garmin Connect (非公式)
- **パッケージ**: garmin-connect

## 注意事項

このアプリケーションは非公式のGarmin Connect APIを使用しています。Garminが仕様を変更した場合、動作しなくなる可能性があります。

## ライセンス

MIT
