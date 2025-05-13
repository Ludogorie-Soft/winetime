import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Helper function to get month names
const getMonthName = (monthIndex: number) => {
  const monthNames = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'];
  return monthNames[monthIndex];
};

// Helper function to group data by month and category
const groupOrdersByMonthAndCategory = (orders) => {
  const monthlyData = Array(12).fill(null).map(() => ({}));

  orders.forEach(order => {
    const orderDate = new Date(order.createdAt);
    const monthIndex = orderDate.getMonth();

    order.items.forEach(item => {
      const categoryTitle = item.product.categories.title;
      
      if (!monthlyData[monthIndex][categoryTitle]) {
        monthlyData[monthIndex][categoryTitle] = 0;
      }
      monthlyData[monthIndex][categoryTitle] += item.product.price * item.quantity;
    });
  });

  return monthlyData.map((monthData, index) => ({
    name: getMonthName(index),
    ...monthData,
  }));
};

export default function LineCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the orders from the API
    fetch('/api/orders')
      .then(response => response.json())
      .then(result => {
        // Group the orders by month and category
        const groupedData = groupOrdersByMonthAndCategory(result.docs);
        setData(groupedData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Render dynamic lines based on available categories */}
        {data.length > 0 && Object.keys(data[0]).map((key, index) => {
          if (key !== 'name') {
            return (
              <Line key={index} type="monotone" dataKey={key} name={key} stroke={getLineColor(index)} />
            );
          }
          return null;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

// Helper function to generate different line colors for each category
const getLineColor = (index) => {
  const colors = ['#8884d8', '#82ca9d', '#7e0c36', '#ff7300', '#387908', '#ff0080'];
  return colors[index % colors.length];
};
