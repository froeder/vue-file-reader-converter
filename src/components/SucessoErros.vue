<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
    <v-btn color="success">Enviar arquivo</v-btn>

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
import dados from "../csvjson.json";
import Chart from "chart.js";
import sucessosErrosChartData from "./charts/sucessos-e-erros.js";

export default {
  data() {
    return {
      sucessosErrosChartData: sucessosErrosChartData,
      dados: [],
      categorias: [],
      serie: []
    };
  },
  created() {
    /* for (var i = 0; i < 3; i++) {
      this.categorias.push(dados[i].timeStamp);
      this.serie.push(dados[i].sentBytes);
    } */
  },
  mounted() {
    this.createChart("sucessos-erros", this.sucessosErrosChartData);
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          labels: this.categorias,
          datasets: [
            {
              // one line graph
              label: "Dados enviados",
              data: this.serie,
              backgroundColor: [
                "rgba(54,73,93,.5)" //
              ],
              borderWidth: 3
            }
          ]
        },
        options: chartData.options
      });
    }
  }
};
</script>

<style>
</style>
