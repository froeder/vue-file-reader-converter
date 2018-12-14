import Vue from 'vue';
import './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: {
    ChartDataLabels,
  },
  render(h) {
    return h(App);
  },
}).$mount('#app');
