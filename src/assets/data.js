let months = ['Янв', 'Фев', 'Апр', 'Мар', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек']
let monthToday = months[2]

let today = {
  id: 'today',
  chart: { type: "area" },
  title: { text: "" },
  xAxis: {
    categories: [ ],
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
        stops: [ [0, '#f3bc45'], [1, '#ed832c'] ]
      },
      lineWidth: 3,
      lineColor: "#c77824",
      marker: {
        symbol: "circle"
      },
      data: [ ]
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
        var d = new Date();
        return this.value + " " + months[d.getMonth()]
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
      data: []
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
      data: []
    },
  ]
}

export default {
 today,
 month,
 year
}


