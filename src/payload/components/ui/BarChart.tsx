'use client';

import React, { useEffect, useState } from 'react';
import { BarChart as BarGraph, ResponsiveContainer, XAxis, YAxis, Bar, LabelList } from 'recharts';

type Order = {
  createdAt: string;
  total: number;
};

const BarChart: React.FC = () => {
  const [data, setData] = useState<{ name: string; total: number }[]>([]);
  const [barColor, setBarColor] = useState('#000000');

  // Function to get month names in your local language
  const getMonthName = (index: number) => {
    const monthNames = ['Я', 'Ф', 'М', 'А', 'М', 'Ю', 'Ю', 'А', 'С', 'О', 'Н', 'Д'];
    return monthNames[index];
  };

  // Function to prepare data per month from orders
  const calculateMonthlyTotals = (orders: Order[]) => {
    const monthlyTotals = Array(12).fill(0); // 12 months, initialized to 0

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const monthIndex = orderDate.getMonth(); // getMonth returns 0 for Jan, 1 for Feb, etc.
      monthlyTotals[monthIndex] += order.total;
    });

    // Prepare the data in the format required for the chart
    const chartData = monthlyTotals.map((total, index) => ({
      name: getMonthName(index),
      total: total,
    }));

    return chartData;
  };

  useEffect(() => {
    const updateBarColor = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setBarColor(currentTheme === 'dark' ? '#FFFFFF' : '#000000');
    };

    updateBarColor();
    const mutationObserver = new MutationObserver(updateBarColor);
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => mutationObserver.disconnect();
  }, []);

  useEffect(() => {
    // Fetch orders and calculate the totals for each month
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => {
        const monthlyTotals = calculateMonthlyTotals(data.docs);
        setData(monthlyTotals); // Update the data for the chart
      });
  }, []);

  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <BarGraph data={data}>
        <XAxis dataKey={'name'} tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={value => `${value} лв.`}
        />
        <Bar dataKey={'total'} radius={[4, 4, 0, 0]} fill={barColor}>
          <LabelList dataKey="total" position="top" formatter={value => `${value} лв.`} />
        </Bar>
      </BarGraph>
    </ResponsiveContainer>
  );
};

export default BarChart;
