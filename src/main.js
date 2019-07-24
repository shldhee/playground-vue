import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

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
