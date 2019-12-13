import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import KpiValue from '../kpiValue';

import { fetchProductAverageCost } from '../../services/productService';

const ProductAverageCost = ({ productId }) => {
  const [averageCost, setAverageCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProductAverageCost(productId); // TODO
      setAverageCost(data);
    };
    fetchData();
  }, [productId]);

  return (
    <KpiValue
      title="Average Cost"
      overlayInfo="something something gemp something"
      value={numeral(averageCost).format('0.0a')}
      unit="€"
    />
  );
};

ProductAverageCost.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductAverageCost;
