export const sucessosErrosChartData = {
    type: 'pie',
    label: 'Sucessos / Erros',
    data: {},
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Sucessos / Erros',
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
  
  export default sucessosErrosChartData;