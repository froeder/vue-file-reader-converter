<template>
  <v-container grid-list-md text-xs-center style="max-width:100%">
    <v-layout
      wrap
      row
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
      <v-card v-if="canvas_response_code">
        <v-card-title>
          Quantidade por Response
        </v-card-title>
        <v-card-text>
          <div v-html="canvas_response_code">
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-card v-if="canvas">
        <v-card-title>
          Quantidade de Sucessos e Erros
        </v-card-title>
        <v-card-text>
          <div v-html="canvas">
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card >
        <v-card-title>
          Quantidade de Usuários ativos
        </v-card-title>
        <v-card-text>
          <div v-html="canvas_user">
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
import sucessosErrosChartData from "./charts/sucessos-erros.js";
import responseCodeChartData from "./charts/response-code.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Papa from "papaparse";

export default {
  data() {
    return {
      sucessosErrosChartData: sucessosErrosChartData,
      responseCodeChartData: responseCodeChartData,
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
      canvas_response_code: "",
      canvas: "",
      canvas_user: "",
      qtde_true: 0,
      qtde_false: 0
    };
  },
  created() {
    /* for (var i = 0 i < 3 i++) {
      this.categorias.push(dados[i].timeStamp)
      this.serie.push(dados[i].sentBytes)
    } */
  },
  mounted() {},
  methods: {
    createChartResponseCode(chartId, chartData) {
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
    createChartSucessosErros(chartId, chartData) {
      this.loading = false;
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: chartData.type,
        data: {
          labels: ["True", "False"],
          datasets: [
            {
              // one line graph
              label: "Response Code",
              data: [
                this.qtde_true,
                this.qtde_false
              ],
              backgroundColor: [
                "rgba(0, 128, 0, 0.7)",
                "rgba(255,0,0, 0.7)"
              ],
              borderWidth: 3
            }
          ]
        },
        options: chartData.options
      });
    },
    confereResponseCode(responseCode) {
      if (responseCode === "200") {
        this.response20x++;
      } else if (
        responseCode === "301" ||
        responseCode === "302" ||
        responseCode === "304"
      ) {
        this.response30x++;
      } else if (responseCode === "400" || responseCode === "404") {
        this.response40x++;
      } else if (responseCode === "500" || responseCode === "502") {
        this.response50x++;
      } else this.responseNao++;
    },
    contaSucessoErros(status) {
      if (status === "true") {
        this.qtde_true++;
      } else if (status === "false") {
        this.qtde_false++;
      }
    },
    converteParaData(timestamp) {
      console.log(timestamp);
      let data = new Date(timestamp);
      let ano = data.getFullYear();
      console.log(ano);
    },
    plotaGraficos() {
      this.createChartResponseCode("response-code", this.responseCodeChartData);

      this.createChartSucessosErros(
        "sucessos-erros",
        this.sucessosErrosChartData
      );
    },
    pegarCategoria(dado) {
      let dados = dado[0];

      for (var i = 0; i < dados.length; i++) {
        //this.timestamp.push(dados[i].timeStamp)
        //this.response.push(dados[i].responseCode)
        this.confereResponseCode(dados[i].responseCode);
        this.contaSucessoErros(dados[i].success);
        this.converteParaData(dados[i].timeStamp);
      }

      this.plotaGraficos();
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
      this.canvas_response_code = `<canvas id="response-code"></canvas>`;
      this.canvas = `<canvas id="sucessos-erros"></canvas>`;
      this.canvas_user = '<canvas id="user"></canvas>';
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
