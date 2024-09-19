import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTrasactions } from '@/features/Records/hooks/useTransactions';
import { Block } from 'framework7-react';
import { startOfWeek, format, eachDayOfInterval } from 'date-fns';

const LineChart = () => {
  const { data:transactionData, isPending } =  useTrasactions({});
  
  // Get current date and the start of the week (Monday)
  const today = new Date();
  const startOfMonday = startOfWeek(today, { weekStartsOn: 1 }); // weekStartsOn: 1 makes it Monday

  // Create an array of days from Monday to today
  const daysOfWeek = eachDayOfInterval({ start: startOfMonday, end: today }).map(date => format(date,'EEEE'));

  // Filter and map transaction data within this week
  const data = transactionData && transactionData
    .filter(doc => {
      const transactionDate = new Date(doc.transactionDate);
      return transactionDate >= startOfMonday && transactionDate <= today && doc.isIncome;
    })
    .map(doc => ({
      date: format(new Date(doc.transactionDate),'EEEE'),
      amount: doc.amount
    }));

  // Prepare chart options
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 2, containLabel: true },
    xAxis: {
      type: 'category',
      data: daysOfWeek, // Use days from Monday to today as x-axis labels
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
