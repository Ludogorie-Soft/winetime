import React, { useEffect, useState } from 'react';
import { Order } from '../../payload-types';
import Card, { CardContent, CardProps } from '../ui/Card';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import BarChart from '../ui/BarChart';
import SalesCard, { SalesProps } from '../ui/SalesCard';
import PageTitle from '../ui/PageTitle';
import LineCharts from '../ui/LineCharts';
import PieCharts from '../ui/PieCharts';
import './index.scss';

const baseClass = 'before-dashboard';

const BeforeDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [uniqueClientsCount, setUniqueClientsCount] = useState<number>(0);
  const [previousMonthAmount, setPreviousMonthAmount] = useState<number>(0);
  const [previousMonthClients, setPreviousMonthClients] = useState<number>(0);
  const [previousMonthOrders, setPreviousMonthOrders] = useState<number>(0);
  const [userSalesData, setUserSalesData] = useState<SalesProps[]>([]);

  const calculateOrderMetrics = (data) => {
    let totalOrders = 0;
    let totalAmount = 0;
    const uniqueClients = new Set();
    const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
    const sixtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 60));

    let prevMonthTotal = 0;
    let prevMonthOrders = 0;
    const prevMonthClients = new Set();

    data.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      if (orderDate > thirtyDaysAgo) {
        totalOrders += 1;
        totalAmount += order.total;
        uniqueClients.add(order.orderedBy.id);
      } else if (orderDate > sixtyDaysAgo && orderDate <= thirtyDaysAgo) {
        prevMonthOrders += 1;
        prevMonthTotal += order.total;
        prevMonthClients.add(order.orderedBy.id);
      }
    });

    return {
      totalOrders,
      totalAmount,
      totalClients: uniqueClients.size,
      prevMonthOrders,
      prevMonthTotal,
      prevMonthClients: prevMonthClients.size,
    };
  };

  const formatSaleAmount = (amount: number) => `+$${amount.toFixed(2)}`;

  const prepareUserSalesData = (orders) => {
    return orders.map((order) => ({
      id: order.id,
      name: order.name || 'No Name',
      email: order.email || 'no-email@winetime.bg',
      saleAmount: formatSaleAmount(order.total),
    }));
  };

  useEffect(() => {
    fetch('/api/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrdersCount(data.totalDocs);
        setOrders(data.docs);

        const {
          totalOrders,
          totalAmount,
          totalClients,
          prevMonthOrders,
          prevMonthTotal,
          prevMonthClients,
        } = calculateOrderMetrics(data.docs);

        setOrdersCount(totalOrders);
        setTotalAmount(totalAmount);
        setUniqueClientsCount(totalClients);

        setPreviousMonthAmount(prevMonthTotal);
        setPreviousMonthOrders(prevMonthOrders);
        setPreviousMonthClients(prevMonthClients);

        const latestSalesData = prepareUserSalesData(data.docs.slice(0, 5));
        setUserSalesData(latestSalesData);
      });
  }, []);

  const revenueChange =
    previousMonthAmount > 0 ? ((totalAmount - previousMonthAmount) / previousMonthAmount) * 100 : 0;
  const clientsChange =
    previousMonthClients > 0 ? ((uniqueClientsCount - previousMonthClients) / previousMonthClients) * 100 : 0;
  const ordersChange =
    previousMonthOrders > 0 ? ((ordersCount - previousMonthOrders) / previousMonthOrders) * 100 : 0;
  const avgOrderValueChange =
    previousMonthOrders > 0
      ? ((totalAmount / ordersCount - previousMonthAmount / previousMonthOrders) /
          (previousMonthAmount / previousMonthOrders)) *
        100
      : 0;

  const cardData: CardProps[] = [
    {
      label: 'Продажби',
      amount: `${ordersCount}`,
      discription: `${ordersChange >= 0 ? '+' : ''}${ordersChange.toFixed(1)}% за последния месец`,
      icon: CreditCard,
    },
    {
      label: 'Общо приходи',
      amount: `${totalAmount.toFixed(2)} лв.`,
      discription: `${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}% за последния месец`,
      icon: DollarSign,
    },
    {
      label: 'Средна стойност на поръчка',
      amount: `${(totalAmount / ordersCount).toFixed(2)} лв.`,
      discription: `${avgOrderValueChange >= 0 ? '+' : ''}${avgOrderValueChange.toFixed(1)} за последния месец`,
      icon: Activity,
    },
    {
      label: 'Общо клиенти',
      amount: `${uniqueClientsCount}`,
      discription: `${clientsChange >= 0 ? '+' : ''}${clientsChange.toFixed(1)}% за последния месец`,
      icon: Users,
    },
  ];

  return (
    <div className={baseClass}>
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title="Статистика Wine Time" />

        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
          {cardData.map((d, i) => (
            <Card key={i} amount={d.amount} discription={d.discription} icon={d.icon} label={d.label} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
          <CardContent>
            <p className="p-4 font-semibold">Преглед Приходи</p>
            <BarChart />
          </CardContent>
          <CardContent className="flex justify-between gap-4">
            <section>
              <p>Последни Продажби</p>
              <p className="text-sm text-gray-400">Направихте {ordersCount} продажби този месец.</p>
            </section>
            <div className="flex flex-col gap-2">
              {userSalesData.map((d, i) => (
                <a key={i} href={`http://localhost:3000/admin/collections/orders/${d.id}`} className="text-blue-500">
                  <SalesCard email={d.email} name={d.name} saleAmount={d.saleAmount} id={d.id} />
                </a>
              ))}
            </div>
          </CardContent>
          <CardContent>
            <p className="p-4 font-semibold">Продажби по Категории</p>
            <LineCharts />
          </CardContent>
          <CardContent>
            <p className="p-4 font-semibold">Продажби по Продукти</p>
            <PieCharts />
          </CardContent>
        </section>
      </div>
    </div>
  );
};

export default BeforeDashboard;
