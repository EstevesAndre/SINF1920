import React from 'react';
import Layout from '../components/layout/Layout';
import TopProducts from '../components/topProducts';
import TopCustomers from '../components/topCustomers';
import SalesLocation from '../components/salesLocation';
import GrossProfitMargin from '../components/grossProfitMargin';

const Sales = () => (
  <Layout>
    <TopProducts />
    <TopCustomers />
    <SalesLocation />
    <GrossProfitMargin />
  </Layout>
);

export default Sales;
