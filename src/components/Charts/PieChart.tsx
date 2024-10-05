import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTrasactions } from '@/features/Records/hooks/useTransactions';
import { eachDayOfInterval, format, startOfWeek } from 'date-fns';

const PieChart = () => {
  const { data: transactionData, isPending } = useTrasactions({});


   // Get current date and the start of the week (Monday)
   const today = new Date();
   const startOfMonday = startOfWeek(today, { weekStartsOn: 1 }); // weekStartsOn: 1 makes it Monday

  // Check if data is available and categorize expenses by category
  const categoryTotals = (transactionData || [])
    .filter(doc => {
      const transactionDate = new Date(doc.transactionDate);
      return transactionDate >= startOfMonday && transactionDate <= today && !doc.isIncome;
    }) // Only consider expenses
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

  // Calculate total expenses for display
  const totalExpenses = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

  // Prepare chart options
  const options = {
    
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Expense Categories',
        type: 'pie',
        top:'5%',
        radius: ['40%', '70%'], // Updated radius to match the new structure
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'center',
          formatter: `$${totalExpenses}`, // Display total expenses in the center
          fontSize: '20', // Adjust the font size as needed
          fontWeight: 'bold', // Optional: make it bold
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
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
