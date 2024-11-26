import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { startOfMonth, endOfMonth } from 'date-fns';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import { DatePicker } from 'antd';
import axios from 'axios';
import { API_URL } from '../utils/consts'

const MyDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);
const { RangePicker } = MyDatePicker;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Summary = ({isMobile}) => {
  const [dateRange, setDateRange] = useState([startOfMonth(new Date()), endOfMonth(new Date())]);
  const [summaryData, setSummaryData] = useState({
    totalExpenses: 0,
    totalIncomes: 0,
    expensesByCategory: [],
    incomesBySource: [],
    expensesByPaymentType: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const [startDate, endDate] = dateRange;

      try {
        const response = await axios.get(API_URL+'/api/summary', {
          params: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
          },
        });

        setSummaryData(response.data);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

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
        <Col span={isMobile ? 24 : 12}>
          <h4>Gastos por Categoría</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={summaryData.expensesByCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                label={renderCustomizedLabel}
                outerRadius={80}>
                {summaryData.expensesByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <h4>Ingresos por Categoría</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={summaryData.incomesBySource}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                label={renderCustomizedLabel}
                outerRadius={80}>
                {summaryData.incomesBySource.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={isMobile ? 24 : 12}>
          <h4>Gastos por Tipo de Pago</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData.expensesByPaymentType}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {summaryData.expensesByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <h4>Gastos por Categoria</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={400}         // Ajusta el ancho de la gráfica
              height={300}        // Ajusta la altura de la gráfica
              data={summaryData.expensesByCategory}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {summaryData.expensesByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </div>
  );
};

export default Summary;
