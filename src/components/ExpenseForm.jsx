import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import axios from 'axios';

const MyDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);

const { Option } = Select;

const categories = [
  'Higiene', 'Comida', 'Impuestos', 'Transporte', 'Entretenimiento',
  'Salud', 'Educación', 'Ropa', 'Hogar', 'Otros'
];

const ExpenseForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const expense = {
      id: uuidv4(),
      ...values,
      date: format(values.date, 'yyyy-MM-dd'),
    };
    
    // Here you would typically save the expense to your state or backend
    try {
      const response = await axios.post('http://localhost:3000/api/expenses', expense);
      console.log(response); // "Gasto registrado con éxito."
      message.success('Gasto registrado exitosamente');
      form.resetFields();
    } catch (error) {
      console.error('Error al registrar el gasto:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registrar Nuevo Gasto</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
        <Form.Item name="date" label="Fecha" initialValue={new Date()} rules={[{ required: true }]}>
          <MyDatePicker className="w-full" />
        </Form.Item>
        <Form.Item name="category" label="Categoría" rules={[{ required: true }]}>
          <Select>
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Registrar Gasto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExpenseForm;