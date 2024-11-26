import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import axios from 'axios';
import { API_URL } from '../utils/consts'

const MyDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);
const { RangePicker } = MyDatePicker;
const { Option } = Select;


const IncomeList = () => {
	const [incomes, setIncomes] = useState([]);
	const [dateRange, setDateRange] = useState([startOfMonth(new Date()), endOfMonth(new Date())]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingIncome, setEditingIncome] = useState(null);
	const [form] = Form.useForm();

	useEffect(() => {
		fetchIncomes();
	}, []);

	const fetchIncomes = async () => {
		try {
			const [startDate, endDate] = dateRange;
			const response = await axios.get(API_URL+'/api/incomes', {
				params: {
					startDate: startDate.toISOString().split('T')[0],
					endDate: endDate.toISOString().split('T')[0],
				},
			});
			setIncomes(response.data);
		} catch (error) {
			console.error('Error al obtener los ingresos:', error);
		}
	};

	const handleDateRangeChange = (dates) => {
		setDateRange(dates);
	};

	const showEditModal = (record) => {
		setEditingIncome(record);
		form.setFieldsValue({
			...record,
			date: parseISO(record.date)
		});
		setIsModalVisible(true);
	};

	const updateIncome = async (updatedData) => {
		try {
			await axios.put(API_URL+`/api/incomes/${updatedData.id}`, updatedData);
			setIsModalVisible(false);
			setEditingIncome(null);
			fetchIncomes();
		} catch (error) {
			console.error('Error al actualizar el ingreso:', error);
		}
	};

	const deleteIncome = async (id) => {
		try {
			await axios.delete(API_URL+`/api/incomes/${id}`);
			fetchIncomes();
		} catch (error) {
			console.error('Error al eliminar el ingreso:', error);
		}
	};

	const columns = [
		{ title: 'Monto', dataIndex: 'amount', key: 'amount', render: (text) => `$${text}` },
		{ title: 'Concepto', dataIndex: 'description', key: 'description' },
		{ title: 'Fecha', dataIndex: 'date', key: 'date', render: (date) => new Date(date).toLocaleDateString('es-ES') },
		{
			title: 'Acciones',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
					<Button icon={<DeleteOutlined />} onClick={() => deleteIncome(record.id)} danger />
				</Space>
			),
		},
	];

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Lista de Ingresos</h2>
			<Space className="mb-4">
				<RangePicker
					value={dateRange}
					onChange={handleDateRangeChange}
				/>
				<Button onClick={fetchIncomes}>Buscar</Button>
			</Space>
			<Table columns={columns} dataSource={incomes} rowKey="id" scroll={{ x: 1000 }} />
			<Modal
				title="Editar Ingreso"
				open={isModalVisible}
				onOk={form.submit}
				onCancel={() => setIsModalVisible(false)}
			>
				<Form form={form} layout="vertical" onFinish={updateIncome}>
					<Form.Item name="id" style={{ display: 'none' }}>
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="amount" label="Monto" rules={[{ required: true }]}>
						<Input type="number" prefix="$" />
					</Form.Item>
					<Form.Item name="source" label="Fuente" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="date" label="Fecha" rules={[{ required: true }]}>
						<MyDatePicker className="w-full" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default IncomeList;
