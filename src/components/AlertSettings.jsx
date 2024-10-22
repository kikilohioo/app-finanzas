import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, List, Card, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const categories = [
  'General', 'Higiene', 'Comida', 'Impuestos', 'Transporte', 'Entretenimiento',
  'Salud', 'Educación', 'Ropa', 'Hogar', 'Otros'
];

const AlertSettings = () => {
  const [alerts, setAlerts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch existing alerts
    // This is where you'd typically make an API call
    // For now, we'll use mock data
    const mockAlerts = [
      { id: 1, category: 'General', limit: 1000 },
      { id: 2, category: 'Comida', limit: 300 },
      // ... more mock data
    ];
    setAlerts(mockAlerts);
  }, []);

  const showModal = (alert = null) => {
    if (alert) {
      setEditingAlert(alert);
      form.setFieldsValue(alert);
    } else {
      setEditingAlert(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    if (editingAlert) {
      // Update existing alert
      setAlerts(alerts.map(alert => 
        alert.id === editingAlert.id ? { ...alert, ...values } : alert
      ));
      message.success('Alerta actualizada exitosamente');
    } else {
      // Add new alert
      const newAlert = { id: Date.now(), ...values };
      setAlerts([...alerts, newAlert]);
      message.success('Nueva alerta creada exitosamente');
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    message.success('Alerta eliminada exitosamente');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Configuración de Alertas</h2>
      <Button type="primary" onClick={() => showModal()} className="mb-4">
        Crear Nueva Alerta
      </Button>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={alerts}
        renderItem={item => (
          <List.Item>
            <Card
              title={`Alerta: ${item.category}`}
              actions={[
                <EditOutlined key="edit" onClick={() => showModal(item)} />,
                <DeleteOutlined key="delete" onClick={() => handleDelete(item.id)} />
              ]}
            >
              <p>Límite: ${item.limit}</p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={editingAlert ? "Editar Alerta" : "Crear Nueva Alerta"}
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item name="category" label="Categoría" rules={[{ required: true }]}>
            <Select>
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="limit" label="Límite" rules={[{ required: true }]}>
            <Input type="number" prefix="$" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlertSettings;