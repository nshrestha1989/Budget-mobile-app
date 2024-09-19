import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTrasactions } from '@/features/Records/hooks/useTransactions';

const PieChart = () => {
  const { data: transactionData, isPending } = useTrasactions({});

  // Check if data is available and categorize expenses by category
  const categoryTotals = (transactionData || [])
    .filter(doc => !doc.isIncome) // Only consider expenses
    .reduce((acc, doc) => {
      const category = doc.categories.categoryname || 'Uncategorized'; // Handle uncategorized transactions
      acc[category] = (acc[category] || 0) + doc.amount;
      return acc;
    }, {} as Record<string, number>);

  // Prepare data for the pie chart
  const pieData = Object.entries(categoryTotals).map(([category, total]) => ({
    value: total,
    name: category,
  }));

  // Prepare chart options
  const options = {
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Expense Categories',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: pieData,
        itemStyle: {
          borderRadius: 8,
        },
      },
    ],
    tooltip: {
      trigger: 'item',
    },
  };

  return (
    <ReactECharts option={options}  />
  );
};

export default PieChart;
