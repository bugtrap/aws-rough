<template>
  <ServiceTemplate service-name="elb">
    <template v-slot:calc>
      <div>
        <div
          class="service-inside"
          :data-test="serviceName"
          v-for="serviceName in ['alb', 'nlb', 'clb']"
          :key="serviceName"
        >
          <ServiceTemplateLabel :label="service[serviceName].fullname" />
          <ServiceTemplateCalc :service="service[serviceName]" />
        </div>
      </div>
    </template>

    <template v-slot:zakuri>
      <div class="section-child">
        <p class="text">トラフィックを分散してくれるやつ（ロードバランサー）。</p>

        <p class="text">
          ALBは、HTTPのヘッダーを見てくれるので、ホストやパスなどに基づいたルーティングができます。NLBは、そこら辺の余計な処理をせずに分散してくれるので高速に動作します。旧世代のCLBに関しては、L7がALB、L4がNLBに相当するので、新規で使うメリットは少ないでしょう。
        </p>
      </div>
    </template>

    <template v-slot:help>
      <section class="section-child">
        <h3 class="title-small"><span>台数</span></h3>
        <p class="text">利用するロードバランサーの台数を入力してください。</p>
      </section>
      <section class="section-child">
        <h3 class="title-small"><span>データ転送量</span></h3>
        <p class="text">
          ロードバランサーで処理されるデータ量の合計をGB単位で入力してください。Webサイトを例にすると、ページあたりの容量が2MBで、月間10万PVの場合、下記のようになります。
        </p>
        <pre>2 * 100000 / 1024 ≒ 195GB</pre>
      </section>
      <section class="section-child">
        <h3 class="title-small"><span>LCU</span></h3>
        <p class="text">
          Load Balancer Capacity
          Unit(LCU)を入力してください。名前だけではピンときませんが、単位時間あたりの接続数や帯域幅をもとに算出される数値です。このサイトでざっくりした説明するのは難しいので、<ExternalLink
            href="https://aws.amazon.com/jp/elasticloadbalancing/pricing/"
            >公式の料金表</ExternalLink
          >を参考に算出していただくか、<ExternalLink href="https://calculator.aws">公式のツール</ExternalLink
          >をお使いください。
        </p>
      </section>
    </template>
  </ServiceTemplate>
</template>

<script>
import ServiceTemplate from '@/components/service/template/ServiceTemplate'
import ServiceTemplateLabel from '@/components/service/template/ServiceTemplateLabel'
import ServiceTemplateCalc from '@/components/service/template/ServiceTemplateCalc'
import serviceConfigELB from '@/config/service/elb'
import serviceConfigCLB from '@/config/service/clb'
import serviceConfigALB from '@/config/service/alb'
import serviceConfigNLB from '@/config/service/nlb'
import ExternalLink from '@/components/text/ExternalLink'
import meta from '@/config/meta'

export default {
  name: 'ServiceELB',
  components: {
    ServiceTemplate,
    ServiceTemplateLabel,
    ServiceTemplateCalc,
    ExternalLink
  },
  head() {
    return meta.elb
  },
  data() {
    return {
      service: {
        elb: serviceConfigELB,
        clb: serviceConfigCLB,
        alb: serviceConfigALB,
        nlb: serviceConfigNLB
      }
    }
  }
}
</script>
