import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd';
import { PlusOutlined, UnorderedListOutlined, BarChartOutlined } from '@ant-design/icons';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="min-h-screen">
        <Header className="bg-white px-0">
          <Row justify="center">
            <Col xs={24} sm={24} md={20} lg={16} xl={14}>
              <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<PlusOutlined />}>
                  <Link to="/">Agregar</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                  <Link to="/list">Lista</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<BarChartOutlined />}>
                  <Link to="/summary">Resumen</Link>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content className="p-6">
          <Row justify="center">
            <Col xs={24} sm={24} md={20} lg={16} xl={14}>
              <Routes>
                <Route path="/" element={<ExpenseForm />} />
                <Route path="/list" element={<ExpenseList />} />
                <Route path="/summary" element={<ExpenseSummary />} />
              </Routes>
            </Col>
          </Row>
        </Content>
        <Footer className="text-center">Expense Tracker ©2024 Created by You</Footer>
      </Layout>
    </Router>
  );
}

export default App;