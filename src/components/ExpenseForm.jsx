import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import axios from 'axios';
import { API_URL } from '../utils/consts'

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
      const response = await axios.post(API_URL+'/api/expenses', expense);
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
        <Form.Item name="amount" label="Monto" rules={[{ required: true }]}>
          <Input type="number" placeholder="Ingrese el monto" prefix="$" />
        </Form.Item>
        <Form.Item name="store" label="Tienda" rules={[{ required: true }]}>
          <Input placeholder="Ingresa una tienda"/>
        </Form.Item>
        <Form.Item name="paymentType" label="Tipo de Pago" rules={[{ required: true }]}>
          <Select placeholder="Seleccione tipo de pago">
            <Option value="credit">Crédito</Option>
            <Option value="debit">Débito</Option>
            <Option value="cash">Efectivo</Option>
          </Select>
        </Form.Item>
        <Form.Item name="date" label="Fecha" initialValue={new Date()} rules={[{ required: true }]}>
          <MyDatePicker className="w-full" format="dd/MM/yyyy" />
        </Form.Item>
        <Form.Item name="category" label="Categoría" rules={[{ required: true }]}>
          <Select placeholder="Seleccione una categoria">
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Agregar Gasto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExpenseForm;