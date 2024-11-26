import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { startOfMonth, endOfMonth, format, parseISO } from 'date-fns';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import axios from 'axios';
import { API_URL } from '../utils/consts'

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
    fetchExpenses()
  }, []);

  const fetchExpenses = async () => {
    try {
      const [startDate, endDate] = dateRange;
      console.log(API_URL);
      
      const response = await axios.get(API_URL+'/api/expenses', {
        params: {
          startDate: startDate.toISOString().split('T')[0], // Formato dd/MM/yyyy
          endDate: endDate.toISOString().split('T')[0],
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error al obtener los gastos:', error);
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const showEditModal = (record) => {
    console.log(record);

    setEditingExpense(record);
    form.setFieldsValue({
      ...record,
      date: parseISO(record.date)
    });
    setIsModalVisible(true);
  };

  const updateExpense = async (updatedData) => {
    try {
      await axios.put(API_URL+`/api/expenses/${updatedData.id}`, updatedData);
      setIsModalVisible(false);
      setEditingExpense(null)
      fetchExpenses();
    } catch (error) {
      console.error('Error al actualizar el gasto:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(API_URL+`/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  const columns = [
    { title: 'Valor', dataIndex: 'amount', key: 'amount', render: (text) => `$${text}` },
    { title: 'Tienda', dataIndex: 'store', key: 'store' },
    { title: 'Tipo de Pago', dataIndex: 'paymentType', key: 'paymentType' },
    { title: 'Fecha', dataIndex: 'date', key: 'date', render: (date) => new Date(date).toLocaleDateString('es-ES') },
    { title: 'Categoría', dataIndex: 'category', key: 'category' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => deleteExpense(record.id)} danger />
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
        <Button onClick={fetchExpenses}>Buscar</Button>
      </Space>
      <Table columns={columns} dataSource={expenses} rowKey="id" scroll={{ x: 1000 }} />
      <Modal
        title="Editar Gasto"
        open={isModalVisible}
        onOk={form.submit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={updateExpense}>
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input type="hidden" />
          </Form.Item>
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