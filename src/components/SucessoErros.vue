<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
    <input
      type="file"
      @change="selecionarArquivo"
    >
    <v-progress-circular
      :width="3"
      color="green"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Painel
        </v-card-title>
        <v-card-text>
          <div>
            <canvas id="sucessos-erros"></canvas>
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
      timestamp: [],
      response: [],
      response200: 0,
      response302: 0,
      response404: 0,
      response500: 0,
      responseNao: 0
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
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          labels: ["200", "304", "404", "500", "Não retornado"],
          datasets: [
            {
              // one line graph
              label: "Response Code",
              data: [
                this.response200,
                this.response302,
                this.response404,
                this.response500,
                this.responseNao
              ],
              backgroundColor: [
                "rgba(54,73,93,.5)" //
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
        this.response200++;
      } else if (dados.responseCode === "500") {
        this.response500++;
      } else if (dados.responseCode === "302") {
        this.response302++;
      } else if (dados.responseCode === undefined) {
        this.responseNao++;
      } else if (dados.responseCode === "404") {
        this.response404++;
      }
    },
    pegarCategoria(dado) {
      let dados = dado[0];

      for (var i = 0; i < dados.length; i++) {
        //this.timestamp.push(dados[i].timeStamp);
        //this.response.push(dados[i].responseCode);
        this.confereResponseCode(dados[i]);
      }

      this.createChart("sucessos-erros", this.sucessosErrosChartData);
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
