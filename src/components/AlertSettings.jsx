import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, List, Card, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';  // Importación de la librería uuid
import axios from 'axios';
import { API_URL } from '../utils/consts'


const { Option } = Select;

const categories = [
  'General', 'Higiene', 'Comida', 'Impuestos', 'Transporte', 'Entretenimiento',
  'Salud', 'Educación', 'Ropa', 'Hogar', 'Otros'
];

const AlertSettings = ({isMobile}) => {
  const [alerts, setAlerts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch existing alerts from the API
    axios.get(API_URL+'/api/alerts')
      .then(response => setAlerts(response.data))
      .catch(error => console.error('Error fetching alerts:', error));
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

  const handleOk = async (values) => {
    try {
      if (editingAlert) {
        // Update existing alert
        const updatedAlert = { ...editingAlert, ...values };
        await axios.put(API_URL+`/api/alerts/${editingAlert.id}`, updatedAlert);
        setAlerts(alerts.map(alert => (alert.id === editingAlert.id ? updatedAlert : alert)));
        message.success('Alerta actualizada exitosamente');
      } else {
        // Create new alert with generated UUID
        const newAlert = { id: uuidv4(), ...values };
        await axios.post(API_URL+'/api/alerts', newAlert);
        setAlerts([...alerts, newAlert]);
        message.success('Nueva alerta creada exitosamente');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving alert:', error);
      message.error('Hubo un problema al guardar la alerta');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL+`/api/alerts/${id}`);
      setAlerts(alerts.filter(alert => alert.id !== id));
      message.success('Alerta eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting alert:', error);
      message.error('Hubo un problema al eliminar la alerta');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Configuración de Alertas</h2>
      <Button type="primary" onClick={() => showModal()} className="mb-4">
        Crear Nueva Alerta
      </Button>
      <List
        grid={{ gutter: 16, column: isMobile ? 1 : 3 }}
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
        open={isModalVisible}
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