import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Expense {
  id: number;
  store: string;
  amount: number;
  category: string;
  date: string;
}

const columns: ColumnsType<Expense> = [
  {
    title: 'Tienda',
    dataIndex: 'store',
    key: 'store',
  },
  {
    title: 'Monto',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => `$${amount.toFixed(2)}`,
  },
  {
    title: 'Categoría',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
  },
];

const ExpenseList: React.FC = () => {
  // Aquí iría la lógica para obtener la lista de gastos
  const expenses: Expense[] = [
    { id: 1, store: 'Supermercado', amount: 50, category: 'Comida', date: '2024-03-15' },
    { id: 2, store: 'Farmacia', amount: 20, category: 'Higiene', date: '2024-03-14' },
    { id: 3, store: 'Cine', amount: 30, category: 'Ocio', date: '2024-03-13' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Gastos</h2>
      <Table 
        columns={columns} 
        dataSource={expenses} 
        rowKey="id" 
        scroll={{ x: true }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ExpenseList;