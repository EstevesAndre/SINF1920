import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import CustomCard from '../CustomCard';
import TableCard from '../TableCard';

import { fetchProductSuppliers } from '../../services/productService';

const headers = [
  { name: 'id', label: 'ID', link: 'suppliers' },
  { name: 'name', label: 'Name' },
  { name: 'value', label: 'Value (€)' },
  { name: 'units', label: 'Units' },
];

const ProductSuppliers = ({ productId }) => {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    const { data } = await fetchProductSuppliers(productId);
    console.log(data);
    setTableData(
      data.map(supplier => ({
        id: supplier.id,
        name: supplier.name,
        value: numeral(supplier.value).format('0.0a'),
        units: numeral(supplier.units).format('0.0a'),
      })),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CustomCard title="Product suppliers" overlay="adflksdofhsd">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

ProductSuppliers.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductSuppliers;