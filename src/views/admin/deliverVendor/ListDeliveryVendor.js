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
        title: 'Delivery Vendor',
    },
];

const ListDeliveryVendor = () => {
    const headCells = [
        {
            id: 'serial',
            numeric: false,
            disablePadding: false,
            label: 'Serial',
        },
        {
            id: 'vendorName',
            numeric: false,
            disablePadding: false,
            label: 'Vendor Name',
        },
        {
            id: 'vendorTrackingUrl',
            numeric: false,
            disablePadding: false,
            label: 'Vendor Tracking URL',
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

    const fetchDeliveryVendorList = async () => {
        try {
            const response = await axiosInstance.get('/delivery-vendor/get-all-delivery-vendors');
            console.log("response delivery vendor list", response);

            if (response.status === 200) {
                setTableData(response.data);
            }

        } catch (error) {
            console.error('Error fetching delivery vendors list:', error);
            setError(error.message);
        }
    };



    React.useEffect(() => {
        fetchDeliveryVendorList();
    }, []);

    return (
        <ProductProvider>
            <PageContainer title="Delivery Vendor" description="this is Delivery Vendor page">
                {/* breadcrumb */}
                <Breadcrumb title="Delivery Vendor" items={BCrumb} />
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

export default ListDeliveryVendor;