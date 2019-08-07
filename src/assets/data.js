
export let LineChart = {
    month: 'Апр',
    chart: {
        type: "area"
    },
    title: {
        text: ""
    },
    xAxis: {
      categories: [
      "1 Апр",
      "7 Апр",
      "14 Апр",
      "21 Апр",
      "28 Апр"
      ]
    },
    yAxis: {
      title: {
      text: ""
      },
      labels: {
      formatter: function() {
          return this.value + " ₽";
      }
      }
    },
    plotOptions: {
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 5,
            }            
        }
    },
    series: [{
        name: "Доход",

        color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
                [0, '#f3bc45'],
                [1, '#ed832c']
            ]
        },
        lineWidth: 3,
        lineColor: "#c77824",
        marker: {
            symbol: "circle"
      },
      data: [
        5000,
        6900,
        9500,
        14000,
        18200
      ]
    }]
  }