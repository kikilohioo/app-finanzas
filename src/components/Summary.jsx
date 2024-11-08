import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { startOfMonth, endOfMonth } from 'date-fns';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

const MyDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);
const { RangePicker } = MyDatePicker;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Summary = () => {
  const [dateRange, setDateRange] = useState([startOfMonth(new Date()), endOfMonth(new Date())]);
  const [summaryData, setSummaryData] = useState({
    totalExpenses: 0,
    totalIncomes: 0,
    byCategory: [],
    byPaymentType: [],
  });

  useEffect(() => {
    const mockSummaryData = {
      totalExpenses: 1500,
      totalIncomes: 2000,
      byCategory: [{ name: 'Comida', value: 500 }],
      byPaymentType: [{ name: 'Crédito', value: 700 }],
    };
    setSummaryData(mockSummaryData);
  }, [dateRange]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resumen de Ingresos y Gastos</h2>
      <RangePicker
        value={dateRange}
        onChange={handleDateRangeChange}
        className="mb-4"
      />
      <Card className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Total de Gastos: ${summaryData.totalExpenses}</h3>
        <h3 className="text-xl font-semibold">Total de Ingresos: ${summaryData.totalIncomes}</h3>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <h4>Categoría</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={summaryData.byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {summaryData.byCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col span={12}>
          <h4>Método de Pago</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData.byPaymentType}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </div>
  );
};

export default Summary;
