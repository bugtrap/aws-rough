<template>
  <div class="about">
    <section class="section">
      <h2 class="title-section">このサイトについて</h2>
      <div class="service-content">
        <div class="section-child">
          <p class="text">AWSの料金、ややこしいですよね。</p>
          <p class="text">
            従量課金と多様なオプションがあいまって、料金を計算するときに考慮すべき点が多いのが悩みどころですが、重要なパラメータは意外と限られています。そこに絞って、ざっくり料金を計算できるサイトを作りました。
          </p>
          <p class="text">
            このサイトを作った当初は、公式のツールが<ExternalLink href="https://calculator.s3.amazonaws.com/index.html"
              >SIMPLE MONTHLY CALCULATOR</ExternalLink
            >という敷居が高いやつしかありませんでしたが、今は<ExternalLink href="https://calculator.aws"
              >AWS Pricing Calculator</ExternalLink
            >という良い感じのやつがあるので、使ったことがない方は試してみてください。
          </p>

          <p class="text">
            「ざっくりAWS」と言いつつ、計算ツールを公開する以上は、料金の目安として役に立つ金額を算出できるように努めていますが、実際に運用してみたら案外高かった・・・といった場合の責任は負いかねます。あくまでざっくり知りたいときに使ってください。
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="title-section">計算の前提</h2>
      <div class="service-content">
        <div class="section-child">
          <table class="spec">
            <caption>
              ※ 為替とAWSの料金は毎朝10時に更新しています
            </caption>
            <tbody>
              <tr>
                <th>通貨</th>
                <td>日本円</td>
              </tr>
              <tr>
                <th>税金</th>
                <td>税抜き</td>
              </tr>
              <tr>
                <th>期間</th>
                <td>30.5日（月額）</td>
              </tr>
              <tr>
                <th>ドル円</th>
                <td>
                  <span v-if="usdjpy" data-test="yen">{{ usdjpy }}</span
                  >円
                </td>
              </tr>
              <tr>
                <th>リージョン</th>
                <td>東京<br />バージニア北部（SESのみ）</td>
              </tr>
              <tr>
                <th>AWSの料金</th>
                <td>
                  <ExternalLink
                    href="https://docs.aws.amazon.com/ja_jp/awsaccountbilling/latest/aboutv2/price-changes.html"
                    >Price List API</ExternalLink
                  >
                </td>
              </tr>
              <tr>
                <th>為替レート</th>
                <td>
                  <ExternalLink href="https://github.com/exchangeratesapi/exchangeratesapi"
                    >exchangeratesapi</ExternalLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="title-section">Google Analytics</h2>
      <div class="service-content">
        <div class="section-child">
          <p class="text">
            サイトの利用状況を把握するために、Google
            Analyticsを使用しています。GoogleによるCookieの利用方法やオプトアウトの方法は、下記のリンクから確認できます。
          </p>

          <ul class="list">
            <li class="list-item">
              <ExternalLink href="https://policies.google.com/technologies/cookies?hl=ja"
                >GoogleによるCookieの利用方法</ExternalLink
              >
            </li>
            <li class="list-item">
              <ExternalLink href="https://support.google.com/analytics/answer/181881?hl=ja"
                >Google Analyticsのオプトアウト</ExternalLink
              >
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="title-section">Google AdSense</h2>
      <div class="service-content">
        <div class="section-child">
          <p class="text">
            広告の配信に、Google
            AdSenseというサービスを使用しており、こちらもCookieを使用します。パーソナライズ広告に抵抗がある方は、<ExternalLink
              href="https://www.google.com/settings/ads"
              >広告設定のページ</ExternalLink
            >から無効にできます。
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="title-section">GitHub</h2>
      <div class="service-content">
        <div class="section-child">
          <p class="text">ソースコードはGitHubにあります。</p>
          <ul class="list">
            <li class="list-item">
              <ExternalLink href="https://github.com/nishinoshake/aws-rough">nishinoshake/aws-rough</ExternalLink>
            </li>
            <li class="list-item">
              <ExternalLink href="https://github.com/nishinoshake/aws-rough-functions"
                >nishinoshake/aws-rough-functions</ExternalLink
              >
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="title-section">お問い合わせ</h2>
      <div class="service-content">
        <div class="section-child">
          <p class="text">
            不具合などのご連絡は、<ExternalLink href="https://github.com/nishinoshake/aws-rough/issues"
              >GitHubのIssue</ExternalLink
            >か<ExternalLink href="https://twitter.com/nishinoshake">Twitter</ExternalLink>か<a
              href="mailto:lawson.and.7.11@gmail.com"
              class="text-link"
              >メール</a
            >までお願いいたします。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ServicePartsUnkown from '@/components/service/parts/ServicePartsUnkown'
import ExternalLink from '@/components/text/ExternalLink'
import serviceConfig from '@/config/service/mokuji'
import meta from '@/config/meta'
import { MONTHLY_DATE } from '@/config/constants'
import { getService } from '@/lib/service'

export default {
  name: 'LandingIndex',
  components: { ServicePartsUnkown, ExternalLink },
  data() {
    return {
      monthlyDate: MONTHLY_DATE
    }
  },
  head() {
    return meta.about
  },
  computed: {
    usdjpy() {
      return this.$store.state.fx ? this.$store.state.fx.usdjpy : null
    },
    services() {
      return serviceConfig.map(service => getService(service.key, serviceConfig))
    }
  }
}
</script>
