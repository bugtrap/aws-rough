# ざっくりAWS 

[<img align="right" src="https://user-images.githubusercontent.com/8698355/47230506-5a514280-d405-11e8-90e9-01c1f8cc19c5.gif" alt="ざっくりAWS" width="400">](https://aws.noplan.cc)

AWS の料金を日本円でざっくり計算できるサイトです。  

入力の手間を減らすために、料金への影響が少ない項目は削っているため、手軽に概算を算出できます。

正確な料金は必要ないから適当な入力でざっくり知りたい、みたいなときに便利かもしれません。

https://aws.noplan.cc

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/noplan1989/aws-rough/blob/master/LICENSE) [![CircleCI](https://circleci.com/gh/noplan1989/aws-rough/tree/master.svg?style=svg)](https://circleci.com/gh/noplan1989/aws-rough/tree/master)
 
## 使い方
```
# インストール
yarn

# 開発サーバーの起動
yarn dev

# ユニットテスト
yarn test:unit

# E2Eテスト向けに静的ファイルを生成
yarn generate:test

# E2Eテスト
yarn test:e2e

# テストをまとめて
yarn test

# 本番向けに静的ファイルを生成
# E2Eテストに使用した要素のdata-test属性を削除しておく
yarn generate:production
```

## ライブラリ/フレームワーク
このWebサイトは、主に[Vue.js](https://jp.vuejs.org)でできています。

### [Vue.js](https://jp.vuejs.org)
公開当初からVue.jsを使ってUIを構築しています。  
ReactとVue.jsで迷いましたが、HTMLをガシガシ書きたかったので、  
テンプレートやスタイルを楽に書けるVue.jsを選びました。

### [Nuxt.js](https://ja.nuxtjs.org)
最初はVue.js単体で使っていたのですが、Nuxt.jsで静的サイトを生成できることを知って移行しました。

### [Jest](https://jestjs.io)
テストにはJestを使用しています。  
計算のロジックのユニットテストがメインです。

### [Puppeteer](https://pptr.dev)
E2EテストのためにPuppeteerを導入しました。   
直感的に書けて動作も速いので重宝しています。

## インフラ構成
AWSの料金をざっくり計算できるサイトなので、AWSを使っています。

### フロントエンド
```
CloudFront + S3
```

Nuxt.jsで静的に生成したファイルをS3へホスティングして、手前にCloudFrontを置いています。  

### バックエンド
```
API Gateway + Lambda + S3
```

計算結果を保存するAPIは、 `API Gateway + Lambda` で構築しています。  
データの保存には `DynamoDB` を使おうと思っていたのですが、キャパシティを考えるのが面倒だったのと、ライフサイクルが便利だったので `S3` にJSONをぶち込む形にしました。  

## 運用フロー
<img src="https://user-images.githubusercontent.com/8698355/47230492-4e658080-d405-11e8-9b63-619cabb11d3b.png" alt="運用フロー" width="600">

計算に使用する為替やAWSの料金は、Lambdaで定期的に取得しています。  
毎朝10時にLambdaを起こして価格の更新を行い、CircleCIで静的ファイルを生成してからデプロイする流れです。

価格を取得するLambdaのコードは別のリポジトリで管理しています。  
https://github.com/noplan1989/aws-rough-functions

## ご意見・ご要望
追加して欲しいサービスや機能、致命的なバグなどがありましたら、issueにあげていただくか、なんらかの方法でご連絡をお願いいたします。サイト名が「ざっくりAWS」なので、ざっくりじゃなくなってしまう機能追加は難しいですが、できる限り対応いたします。
