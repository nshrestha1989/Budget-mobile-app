import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTrasactions } from '@/features/Records/hooks/useTransactions';
import { Block } from 'framework7-react';
import { format } from 'date-fns';

const LineChart = () => {
  const { data:transactionData, isPending } =  useTrasactions({});
  
  // Create an array of all transaction dates (without limiting to this week)
  const daysOfWeek = transactionData ? transactionData.map(doc => format(new Date(doc.transactionDate),'dd/MM')) : [];

  // Map transaction data without filtering by date
  const data = transactionData && transactionData.filter(X=>X.isIncome)
    .map(doc => ({
      date: format(new Date(doc.transactionDate),'dd/MM'),
      amount: doc.amount
    }));

  // Prepare chart options
  const options = {
  
    grid: {  right: 8, bottom: 24, left: 2, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: daysOfWeek, // Use all transaction dates as x-axis labels
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: daysOfWeek.map(day => {
          const foundData = data && data.find(d => d.date === day);
          return foundData ? foundData.amount : 0; // If no data for that day, use 0
        }),
        type: 'line',
        areaStyle: {}
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return <ReactECharts option={options} />;
};

export default LineChart;
