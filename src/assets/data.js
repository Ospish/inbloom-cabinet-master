let months = ['Янв', 'Фев', 'Апр', 'Мар', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек']
let monthToday = months[2]

let today = {
  id: 'today',
  chart: {
      type: "area"
  },
  title: {
      text: ""
  },
  xAxis: {
    categories: [
      "00:00",
      "06:00",
      "12:00",
      "18:00",
      "24:00"
    ],
    labels: {
      formatter: function() {
        return this.value;
      }
    }
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
        radius: 5
      }            
    }
  },
  series: [
    {
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
        500,
        690,
        950,
        1400,
        180
      ]
    },
  ]
}


let month = {
  id: 'month',
  chart: {
      type: "area"
  },
  title: {
      text: ""
  },
  xAxis: {
    categories: [
      "1",
      "7",
      "14",
      "21",
      "28"
    ],
    labels: {
      formatter: function() {
        return this.value + " " + monthToday;
      }
    }
  },
  yAxis: {
    title: {
    text: ""
    },
    labels: {
      formatter: function() {
        return this.value / 1000 + "К ₽";
      }
    }
  },
  plotOptions: {
    area: {
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 5
      }            
    }
  },
  series: [
    {
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
    },
  ]
}


let year = {
  id: 'year',
  chart: {
      type: "area"
  },
  title: {
      text: ""
  },
  xAxis: {
    categories: months,
    labels: {
      formatter: function() {
        return this.value;
      }
    }
  },
  yAxis: {
    title: {
    text: ""
    },
    labels: {
      formatter: function() {
        return this.value / 1000 + "К ₽";
      }
    }
  },
  plotOptions: {
    area: {
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 5
      }            
    }
  },
  series: [
    {
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
        50000,
        69000,
        95000,
        40000,
        20200,
        50000,
        69000,
        95000,
        41000,
        27200,
        50000,
        90000
      ]
    },
  ]
}

export default {
 today, 
 month, 
 year
}


