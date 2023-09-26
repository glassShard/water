export const BASEOPTION = {
  legend: {
    data: [],
    align: 'left',
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: 'rgba(0,0,0,0.6)'
      }
    },
    backgroundColor: 'rgba(0,0,0,0.6)',
    textStyle: {
      color: '#FFFFFF'
    }
  },
  series: [],
  animationEasing: 'sinsoidallnOut',
  xAxis: {
    data: [],
    type: 'category',
    silent: false,
    splitLine: {
      show: true,
    },
    axisLabel: {
      verticalAlign: 'top',
      fontSize: 16,
      margin: 14
    },
    nameTextStyle: {
      fontSize: 26,
    }
  },
  yAxis: {
    type: 'value',
    name: '',
    splitLine: {
      show: true,
    },
    axisLabel: {
      verticalAlign: 'bottom',
      fontSize: 16
    },
  }
}
