import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { startOfMonth, endOfMonth, format, parseISO } from 'date-fns';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

const MyDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);
const { RangePicker } = MyDatePicker;

const { Option } = Select;

const categories = [
  'Higiene', 'Comida', 'Impuestos', 'Transporte', 'Entretenimiento',
  'Salud', 'Educación', 'Ropa', 'Hogar', 'Otros'
];

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [dateRange, setDateRange] = useState([startOfMonth(new Date()), endOfMonth(new Date())]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch expenses based on date range
    // This is where you'd typically make an API call
    // For now, we'll use mock data
    const mockExpenses = [
      { id: 1, amount: 50, store: 'Supermarket', paymentType: 'debit', date: '2024-03-01', category: 'Comida' },
      { id: 2, amount: 30, store: 'Pharmacy', paymentType: 'credit', date: '2024-03-05', category: 'Salud' },
      // ... more mock data
    ];
    setExpenses(mockExpenses);
  }, [dateRange]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const showEditModal = (record) => {
    setEditingExpense(record);
    form.setFieldsValue({
      ...record,
      date: parseISO(record.date)
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    // Delete logic here
    setExpenses(expenses.filter(expense => expense.id !== id));
    message.success('Gasto eliminado exitosamente');
  };

  const handleEdit = (values) => {
    // Edit logic here
    setExpenses(expenses.map(expense => 
      expense.id === editingExpense.id ? { ...expense, ...values, date: format(values.date, 'yyyy-MM-dd') } : expense
    ));
    setIsModalVisible(false);
    message.success('Gasto actualizado exitosamente');
  };

  const columns = [
    { title: 'Valor', dataIndex: 'amount', key: 'amount', render: (text) => `$${text}` },
    { title: 'Tienda', dataIndex: 'store', key: 'store' },
    { title: 'Tipo de Pago', dataIndex: 'paymentType', key: 'paymentType' },
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
    { title: 'Categoría', dataIndex: 'category', key: 'category' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Gastos</h2>
      <Space className="mb-4">
        <RangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
        />
      </Space>
      <Table columns={columns} dataSource={expenses} rowKey="id" />
      
      <Modal
        title="Editar Gasto"
        open={isModalVisible}
        onOk={form.submit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleEdit}>
          <Form.Item name="amount" label="Valor" rules={[{ required: true }]}>
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item name="store" label="Tienda" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="paymentType" label="Tipo de Pago" rules={[{ required: true }]}>
            <Select>
              <Option value="credit">Crédito</Option>
              <Option value="debit">Débito</Option>
              <Option value="cash">Efectivo</Option>
            </Select>
          </Form.Item>
          <Form.Item name="date" label="Fecha" rules={[{ required: true }]}>
            <MyDatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="category" label="Categoría" rules={[{ required: true }]}>
            <Select>
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseList;