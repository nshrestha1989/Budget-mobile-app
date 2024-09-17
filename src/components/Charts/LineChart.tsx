import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTrasactions } from '@/features/Records/hooks/useTransactions';
import { Block } from 'framework7-react';

const LineChart = () => {
  const { data:transactionData, isPending } =  useTrasactions({});
  const data = transactionData && transactionData.map(doc => ({
    date: new Date(doc.transactionDate).toLocaleDateString(),
    amount: doc.amount
  }))
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 2, containLabel :true },
    xAxis: {
      type: 'category',
      data: data && data.map(d => d.date),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data && data.map(d => d.amount),
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
   
  };

  return <ReactECharts option={options} />;
};


export default LineChart;