export const sucessosErrosChartData = {
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
          size: 25,
        },
        align: 'end',
      },
    },
  },
};

export default sucessosErrosChartData;
