import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DollarOutlined, UnorderedListOutlined, PieChartOutlined, BellOutlined } from '@ant-design/icons';
import FormsPage from './components/FormsPage';
import ListsPage from './components/ListsPage';
import AlertSettings from './components/AlertSettings';
import Summary from './components/Summary';

const { Header, Content, Footer } = Layout;

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuItems = [
    {
      key: '1',
      icon: <DollarOutlined />,
      label: <Link to="/">Registrar</Link>,
    },
    {
      key: '2',
      icon: <UnorderedListOutlined />,
      label: <Link to="/list">Listas</Link>,
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
            <Route path="/" element={<FormsPage isMobile={isMobile} />} />
            <Route path="/list" element={<ListsPage isMobile={isMobile} />} />
            <Route path="/summary" element={<Summary isMobile={isMobile} />} />
            <Route path="/alerts" element={<AlertSettings isMobile={isMobile} />} />
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