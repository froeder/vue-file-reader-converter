export const okNotOkChartData = {
  type: 'pie',
  label: 'Response Code',
  data: {},
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Response Code',
    },
    plugins: {
      datalabels: {
        color: '#fff',
        font: {
          size: 20,
        },
        align: 'end',
      },
    },
  },
};

export default okNotOkChartData;
