import React from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const ExpenseForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('Gasto guardado exitosamente');
    navigate('/list');
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Agregar Gasto</h2>
      <Form
        form={form}
        name="expense"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="store"
          label="Tienda"
          rules={[{ required: true, message: 'Por favor ingrese el nombre de la tienda' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Monto"
          rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
        >
          <InputNumber
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Categoría"
          rules={[{ required: true, message: 'Por favor seleccione una categoría' }]}
        >
          <Select placeholder="Seleccione una categoría">
            <Option value="limpieza">Limpieza</Option>
            <Option value="higiene">Higiene Personal</Option>
            <Option value="comida">Comida</Option>
            <Option value="ocio">Ocio</Option>
            <Option value="otros">Otros</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Fecha"
          rules={[{ required: true, message: 'Por favor seleccione una fecha' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Guardar Gasto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExpenseForm;