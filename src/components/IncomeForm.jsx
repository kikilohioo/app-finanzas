import React from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import axios from 'axios';

const MyDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);

const IncomeForm = () => {
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const income = {
			id: uuidv4(),
			...values,
			date: format(values.date, 'yyyy-MM-dd'),
		};

		try {
			const response = await axios.post('http://localhost:3000/api/incomes', income);
			message.success('Ingreso registrado exitosamente');
			form.resetFields();
		} catch (error) {
			console.error('Error al registrar el ingreso:', error);
		}
	};

	return (
		<div className="max-w-lg mx-auto">
			<h2 className="text-2xl font-bold mb-4">Registrar Nuevo Ingreso</h2>
			<Form
				form={form}
				layout="vertical"
				onFinish={onFinish}
			>
				<Form.Item
					label="Monto"
					name="amount"
					rules={[{ required: true, message: 'Por favor ingresa el monto' }]}
				>
					<Input type="number" placeholder="Ingresa el monto" />
				</Form.Item>

				<Form.Item
					label="Fuente"
					name="source"
					rules={[{ required: true, message: 'Por favor selecciona una fuente' }]}
				>
					<Select placeholder="Selecciona la fuente">
						<Option value="Sueldo">Sueldo</Option>
						<Option value="Otros">Otros</Option>
					</Select>
				</Form.Item>
				<Form.Item name="date" label="Fecha" rules={[{ required: true }]}>
					<MyDatePicker className="w-full" />
				</Form.Item>
				<Form.Item
					label="Descripción"
					name="description"
					rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}
				>
					<Input placeholder="Descripción del ingreso" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="w-full">
						Agregar Ingreso
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default IncomeForm;
