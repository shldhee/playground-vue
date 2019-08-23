import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import Amplify from 'aws-amplify'

const awsExports = {
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id:
    'us-east-1:9fa1ba5e-72a9-4068-bd65-28678d6dcfd5',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_K1uuc5Bpe',
  aws_user_pools_web_client_id: '29b8u9omr163g1tm69oetsb96v',
  oauth: {}
}

Amplify.configure(awsExports)

// test
// Vue.component('BaseIcon', BaseIcon)

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

console.log(requireComponent.keys())

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  console.log(componentConfig)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  console.log(componentName)

  Vue.component(componentName, componentConfig.default || componentConfig)
  console.log(componentConfig.default)
  console.log(componentConfig)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
