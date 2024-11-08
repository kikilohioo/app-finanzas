import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DollarOutlined, UnorderedListOutlined, PieChartOutlined, BellOutlined } from '@ant-design/icons';
import FormsPage from './components/FormsPage';
import ListsPage from './components/ListsPage';
import AlertSettings from './components/AlertSettings';
import Summary from './components/Summary';

const { Header, Content, Footer } = Layout;

function App() {
  const menuItems = [
    {
      key: '1',
      icon: <DollarOutlined />,
      label: <Link to="/">Registrar Gasto</Link>,
    },
    {
      key: '2',
      icon: <UnorderedListOutlined />,
      label: <Link to="/list">Lista de Gastos</Link>,
    },
    {
      key: '3',
      icon: <PieChartOutlined />,
      label: <Link to="/summary">Resumen</Link>,
    },
    {
      key: '4',
      icon: <BellOutlined />,
      label: <Link to="/alerts">Alertas</Link>,
    },
  ];

  return (
    <Router>
      <Layout className="min-h-screen">
        <Header className="bg-white">
          <Menu mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
        </Header>
        <Content className="p-6">
          <Routes>
            <Route path="/" element={<FormsPage />} />
            <Route path="/list" element={<ListsPage />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/alerts" element={<AlertSettings />} />
          </Routes>
        </Content>
        <Footer className="text-center">
          Personal Finance Manager ©2024 Created by You
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;