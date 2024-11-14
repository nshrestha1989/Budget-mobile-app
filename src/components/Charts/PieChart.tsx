import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTrasactions } from '@/features/Records/hooks/useTransactions';
import { eachDayOfInterval, format, startOfWeek } from 'date-fns';

const PieChart = () => {
  const { data: transactionData, isPending } = useTrasactions({});


  const categoryTotals = (transactionData || [])
    .filter(doc => {
      const transactionDate = !doc.isIncome && new Date(doc.transactionDate);
      return transactionDate;
    }) 
    .reduce((acc, doc) => {
      const category = doc?.categories?.categoryname || 'Uncategorized'; 
      acc[category] = (acc[category] || 0) + doc.amount;
      return acc;
    }, {} as Record<string, number>);


  const pieData = Object.entries(categoryTotals).map(([category, total]) => ({
    value: total,
    name: category,
  }));

  const totalExpenses = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

  const options = {
    
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
     
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: pieData.length > 0 ? pieData : [ // Ensure there's data to display
          { value: 0, name: 'No Data' }
        ],
      },
    ],
  };

  return (
    <ReactECharts option={options} />
  );
};

export default PieChart;
