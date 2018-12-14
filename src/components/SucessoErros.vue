<template>
  <v-container style="max-width:100%!important">
    <v-layout
      text-xs-center
      wrap
    >
    <v-flex xs12>
      <input
      type="file"
      @change="selecionarArquivo"
    >
    <br>
    <br>
    <v-progress-circular
      :width="2"
      :size=100
      color="green"
      indeterminate
      v-if="loading"
    >Carregando dados</v-progress-circular>
    </v-flex>
    <br>
    <br>
    <v-flex xs12 v-if="!canvas">
      <span>Adicione um arquivo para obter os relatórios</span>
    </v-flex>
    <v-flex xs6>
      <v-card v-if="canvas">
        <v-card-title>
          Painel
        </v-card-title>
        <v-card-text>
          <div v-html="canvas">
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-card v-if="canvas">
        <v-card-title>
          Painel
        </v-card-title>
        <v-card-text>
          <div v-html="canvas">
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <br>
    </v-layout>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import sucessosErrosChartData from "./charts/sucessos-e-erros.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Papa from "papaparse";

export default {
  data() {
    return {
      sucessosErrosChartData: sucessosErrosChartData,
      objeto: {},
      dados: [],
      arquivo: "",
      file: {},
      categorias: [],
      serie: [],
      loading: false,
      exibe_grafico: false,
      timestamp: [],
      response: [],
      response20x: 0,
      response30x: 0,
      response40x: 0,
      response50x: 0,
      responseNao: 0,
      response_outros: 0,
      response: {},
      canvas: ""
    };
  },
  created() {
    /* for (var i = 0; i < 3; i++) {
      this.categorias.push(dados[i].timeStamp);
      this.serie.push(dados[i].sentBytes);
    } */
  },
  mounted() {},
  methods: {
    createChartSuccessErrors(chartId, chartData) {
      this.loading = false;
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: chartData.type,
        data: {
          labels: ["20x", "30x", "40x", "50x", "Não retornado"],
          datasets: [
            {
              // one line graph
              label: "Response Code",
              data: [
                this.response20x,
                this.response30x,
                this.response40x,
                this.response50x,
                this.responseNao
              ],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 206, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)"
              ],
              borderWidth: 3
            }
          ]
        },
        options: chartData.options
      });
    },
    createChartOkNotOk(chartId, chartData) {
      this.loading = false;
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: chartData.type,
        data: {
          labels: ["20x", "30x", "40x", "50x", "Não retornado"],
          datasets: [
            {
              // one line graph
              label: "Response Code",
              data: [
                this.response20x,
                this.response30x,
                this.response40x,
                this.response50x,
                this.responseNao
              ],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 206, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)"
              ],
              borderWidth: 3
            }
          ]
        },
        options: chartData.options
      });
    },
    confereResponseCode(dados) {
      if (dados.responseCode === "200") {
        this.response20x++;
      } else if (
        dados.responseCode === "301" ||
        dados.responseCode === "302" ||
        dados.responseCode === "304"
      ) {
        this.response30x++;
      } else if (dados.responseCode === "400" || dados.responseCode === "404") {
        this.response40x++;
      } else if (dados.responseCode === "500" || dados.responseCode === "502") {
        this.response50x++;
      } else this.responseNao++;
    },
    pegarCategoria(dado) {
      let dados = dado[0];

      for (var i = 0; i < dados.length; i++) {
        //this.timestamp.push(dados[i].timeStamp);
        //this.response.push(dados[i].responseCode);
        this.confereResponseCode(dados[i]);
      }

      this.createChartSuccessErrors(
        "sucessos-erros",
        this.sucessosErrosChartData
      );
    },
    converterObjeto(obj) {
      this.dados.push(obj.data);

      this.pegarCategoria(this.dados);
    },
    converterArquivo(arquivo) {
      let self = this;
      Papa.parse(arquivo, {
        header: true,
        complete: function(results) {
          this.objeto = results;
          self.converterObjeto(results);
        }
      });
    },
    selecionarArquivo(e) {
      this.canvas = `<canvas id="sucessos-erros"></canvas>`;
      this.loading = true;
      var input = e.target;

      var file = input.files[0];
      this.arquivo = file.name;
      this.file = file;

      this.converterArquivo(file);
    }
  }
};
</script>

<style>
</style>
