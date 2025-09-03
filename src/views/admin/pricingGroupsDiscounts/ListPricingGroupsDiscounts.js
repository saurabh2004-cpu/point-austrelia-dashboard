import * as React from 'react';
import { Box } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import { ProductProvider } from '../../../context/EcommerceContext';
import axiosInstance from '../../../axios/axiosInstance'
import ListTable from './ListTable';
import axios from 'axios';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Pricing Groups Discounts',
  },
];

const ListPricingGroupsDiscounts = () => {
  const headCells = [
    {
      id: 'serial',
      numeric: false,
      disablePadding: false,
      label: 'Serial',
    },
    {
      id: 'productSku',
      numeric: false,
      disablePadding: false,
      label: 'Product SKU',
    },
    {
      id: 'pricingGroup',
      numeric: false,
      disablePadding: false,
      label: 'Pricing Group Name',
    },
    {
      id: 'customerId',
      numeric: false,
      disablePadding: false,
      label: 'Customer ID',
    },
    {
      id: 'percentage',
      numeric: false,
      disablePadding: false,
      label: 'Percentage',
    },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: 'Created Date',
    },
    {
      id: 'Actions',
      numeric: false,
      disablePadding: false,
      label: 'Actions',
    },
  ];

  const [tableData, setTableData] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchPricingGroupsDiscounts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/pricing-groups-discount/get-pricing-group-discounts');
      console.log("response pricing groups", response);

      if (response.data.statusCode === 200) {
        setTableData(response.data.data);
      }

    } catch (error) {
      console.error('Error fetching brands list:', error);
      setError(error.message);
    }
  };



  React.useEffect(() => {
    fetchPricingGroupsDiscounts();
  }, []);

  return (
    <ProductProvider>
      <PageContainer title="Pricing Groups List" description="this is Pricing Groups List page">
        {/* breadcrumb */}
        <Breadcrumb title="Pricing Groups List" items={BCrumb} />
        {/* end breadcrumb */}
        <Box>
          <ListTable
            showCheckBox={false}
            headCells={headCells}
            tableData={tableData}
            isBrandsList={true} // Add this prop to identify it's brands data
            setTableData={setTableData}
          />
        </Box>
      </PageContainer>
    </ProductProvider>
  );
};

export default ListPricingGroupsDiscounts;