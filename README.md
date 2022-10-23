# ゆめみ　フロントエンドコーディング試験

このリポジトリは[ゆめみのフロントエンドコーディング試験](https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d)のために作成した都道府県別総人口を可視化するアプリケーションです。

## Getting Started

- [RESAS API](https://opendata.resas-portal.go.jp/)の利用登録を行い、API キーを`.env.sample`を参考に`.env.local`などに登録する

```.env
RESAS_API_KEY=ここにAPIキー
```

- 次に以下のコマンドを実行する

```bash
npm ci
npm run dev
```
