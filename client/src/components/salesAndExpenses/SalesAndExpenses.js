import React, { useState, useEffect } from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

import CustomCard from '../CustomCard/CustomCard';

import fetchAccountBalance from '../../services/financialService';

const accountCodes = {
  sales: '61611', // FOR TEST PURPOSES; in reality, all account codes that start with 61 are related to expenses
  expenses: '7111', // FOR TEST PURPOSES; in reality, all account codes that start with 71 are related to revenue
};

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

/*
const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '2em',
        color: 'yellow',
        backgroundColor: 'red',
      },
    },
  },
});
const styles = {
  tooltip: {
    color: 'lightblue',
    backgroundColor: 'green',
  },
};
*/

const SalesAndExpenses = () => {
  // eslint-disable-next-line
  const [salesAccountBalance, setSalesAccountBalance] = useState(null);
  // eslint-disable-next-line
  const [expensesAccountBalance, setExpensesAccountBalance] = useState(null);

  async function fetchData() {
    const salesResponse = await fetchAccountBalance(
      accountCodes.sales,
      2018,
      true,
    ); // TODO
    setSalesAccountBalance(salesResponse.data);
    const expensesResponse = await fetchAccountBalance(
      accountCodes.expenses,
      2018,
      true,
    ); // TODO
    setExpensesAccountBalance(expensesResponse.data);
    console.log(salesResponse.data);
    console.log(expensesResponse.data);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <CustomCard title="Sales vs Expenses" overlay="Testing">
      <BarChart width={730} height={250} data={data} styles={{ margin: '0' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#fffba1" />
        <Bar dataKey="uv" fill="#BE6E46" />
      </BarChart>
    </CustomCard>
  );
};

export default SalesAndExpenses;
