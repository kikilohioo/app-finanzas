import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { startOfMonth, endOfMonth } from 'date-fns';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

const MyDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);
const { RangePicker } = MyDatePicker;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

const ExpenseSummary = () => {
  const [dateRange, setDateRange] = useState([startOfMonth(new Date()), endOfMonth(new Date())]);
  const [summaryData, setSummaryData] = useState({
    totalExpenses: 0,
    byCategory: [],
    byPaymentType: []
  });

  useEffect(() => {
    // Fetch summary data based on date range
    // This is where you'd typically make an API call
    // For now, we'll use mock data
    const mockSummaryData = {
      totalExpenses: 1500,
      byCategory: [
        { name: 'Comida', value: 500 },
        { name: 'Transporte', value: 300 },
        { name: 'Entretenimiento', value: 200 },
        { name: 'Salud', value: 150 },
        { name: 'Otros', value: 350 }
      ],
      byPaymentType: [
        { name: 'Crédito', value: 700 },
        { name: 'Débito', value: 500 },
        { name: 'Efectivo', value: 300 }
      ]
    };
    setSummaryData(mockSummaryData);
  }, [dateRange]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resumen de Gastos</h2>
      <RangePicker
        value={dateRange}
        onChange={handleDateRangeChange}
        className="mb-4"
      />
      <Card className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Total de Gastos: ${summaryData.totalExpenses}</h3>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Gastos por Categoría">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summaryData.byCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {summaryData.byCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Gastos por Tipo de Pago">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={summaryData.byPaymentType}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExpenseSummary;