import React, { useState } from 'react';
import { Switch, Typography } from 'antd';
import ExpensesList from './ExpenseList';
import IncomeList from './IncomeList';

const { Text } = Typography;

const ListsPage = () => {
	const [isIncome, setIsIncome] = useState(false); // Estado inicial: muestra gastos (isIncome = false)

	const handleToggle = (checked) => {
		setIsIncome(checked);
	};

	return (
		<div className="income-expense-toggle">
			<div className="toggle-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
				<Text strong style={{ marginRight: '10px' }}>
					{isIncome ? 'Ingresos' : 'Gastos'}
				</Text>
				<Switch checked={isIncome} onChange={handleToggle} />
			</div>
			{isIncome ? <IncomeList /> : <ExpensesList />}
		</div>
	);
};

export default ListsPage;
