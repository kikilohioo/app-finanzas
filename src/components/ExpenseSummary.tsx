import React from 'react';
import { Card, Statistic, List, Row, Col } from 'antd';
import { PieChart } from 'lucide-react';

const ExpenseSummary: React.FC = () => {
  // Aquí iría la lógica para calcular el resumen de gastos
  const summary = {
    total: 100,
    byCategory: [
      { category: 'Comida', amount: 50 },
      { category: 'Higiene', amount: 20 },
      { category: 'Ocio', amount: 30 },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resumen de Gastos</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Card>
            <Statistic
              title="Total Gastado"
              value={summary.total}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card>
            <List
              header={<div>Gastos por Categoría</div>}
              dataSource={summary.byCategory}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.category}
                  />
                  <div>${item.amount.toFixed(2)}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row justify="center" className="mt-8">
        <Col>
          <PieChart size={120} className="text-blue-500" />
        </Col>
      </Row>
    </div>
  );
};

export default ExpenseSummary;