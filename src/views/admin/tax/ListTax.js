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
        title: 'Tax List',
    },
];

const ListTax = () => {
    const headCells = [
        {
            id: 'serial',
            numeric: false,
            disablePadding: false,
            label: 'Serial',
        },
        {
            id: 'TaxName',
            numeric: false,
            disablePadding: false,
            label: 'Tax Name',
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

    const fetchTaxList = async () => {
        try {
            const response = await axiosInstance.get('/tax/get-all-taxes');
            console.log("response tax list", response);

            if (response.data.statusCode === 200) {
                setTableData(response.data.data);
            }

        } catch (error) {
            console.error('Error fetching brands list:', error);
            setError(error.message);
        }
    };



    React.useEffect(() => {
        fetchTaxList();
    }, []);

    return (
        <ProductProvider>
            <PageContainer title="Tax List" description="this is Tax List page">
                {/* breadcrumb */}
                <Breadcrumb title="Tax List" items={BCrumb} />
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

export default ListTax;