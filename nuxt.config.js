module.exports = {
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-53153991-13'
      }
    ],
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@/modules/count-page'
  ],
  head: {
    title: 'Not Found | ざっくりAWS',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'google-site-verification',
        content: 'ClJCk2KjauaZyRoNcwAeHI-oDC6aS8dgZqnb3u0EKUI'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:image',
        content: 'https://aws.noplan.cc/img/og.png?2018040902'
      },
      {
        property: 'og:site_name',
        content: 'ざっくりAWS'
      },
      {
        property: 'og:image',
        content: 'https://aws.noplan.cc/img/og.png?2018040902'
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        href: '/img/favicon.ico'
      }
    ]
  },
  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active-exact'
  },
  build: {
    vendor: ['axios', 'lodash', 'animejs'],
    extend(config) {
      config.module.rules = config.module.rules.map(rule => {
        if (rule.loader === 'url-loader' && rule.test.toString().indexOf('svg') > -1) {
          return {
            ...rule,
            test: /\.(png|jpe?g|gif)$/
          }
        }
        return rule
      })

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [{ removeTitle: false }]
          }
        }
      })
    }
  },
  manifest: {
    name: 'ざっくりAWS',
    short_name: 'ざっくりAWS',
    lang: 'ja',
    orientation: 'portrait',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    start_url: '/index.html'
  },
  workbox: {
    dev: true
  },
  loading: false,
  css: ['@/assets/scss/index.scss']
}
