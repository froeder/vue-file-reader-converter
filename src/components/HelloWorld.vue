<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Painel
        </v-card-title>
        <v-card-text>
          <div>
            <canvas id="planet-chart"></canvas>
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
import planetChartData from "./chart-data.js";

export default {
  data() {
    return {
      planetChartData: planetChartData,
      dados: dados,
      categorias: [],
      serie: [],
      chartOptions: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: ["a", "b", "c"]
        }
      },
      series: [
        {
          name: "series-1",
          data: this.serie
        }
      ]
    };
  },
  created() {
    console.log(dados);
    for (var i = 0; i < 3; i++) {
      this.categorias.push(dados[i].timeStamp);
      this.serie.push(dados[i].sentBytes);
    }

    console.log(this.categorias);
    console.log(this.serie);
  },
  mounted() {
    this.createChart("planet-chart", this.planetChartData);
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
