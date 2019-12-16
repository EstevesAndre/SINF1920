import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchProductInfo } from '../../services/productService';

import KpiInfoList from '../kpiInfoList';

const ProductInfo = ({ productId }) => {
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        if (productId) {
          const response = await fetchProductInfo(productId);
          setInfo(
            Object.keys(response.data).map(item => ({
              label: item,
              description: response.data[item],
            })),
          );
        }
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <KpiInfoList
      title="Product information"
      overlayInfo="ah finalmente estamos a fazer alguma coisa"
      data={info}
      error={error}
    />
  );
};

ProductInfo.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductInfo;

// TODO list kpi
