import * as React from 'react';
import { Box } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import { ProductProvider } from '../../../context/EcommerceContext';
import axiosInstance from '../../../axios/axiosInstance'
import ListTable from './ListTable';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Brands',
    },
];

const BadgeList = () => {
    const headCells = [
        {
            id: 'serial',
            numeric: false,
            disablePadding: false,
            label: 'Serial',
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Badge Name',
        },
        {
            id: 'Background ',
            numeric: false,
            disablePadding: false,
            label: 'Background ',
        },
        {
            id: 'Text ',
            numeric: false,
            disablePadding: false,
            label: 'Text ',
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

    const fetchBadges = async () => {
        try {
            const response = await axiosInstance.get('/badge/get-badges');
            console.log("response badges", response);

            if(response.data.statusCode === 200){
                setTableData(response.data.data);
            }

        } catch (error) {
            console.error('Error fetching brands list:', error);
            setError(error.message);
        }
    };

    

    React.useEffect(() => {
        fetchBadges();
    }, []);

    return (
        <ProductProvider>
            <PageContainer title="Brands List" description="this is Brands List page">
                {/* breadcrumb */}
                <Breadcrumb title="Brands List" items={BCrumb} />
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

export default BadgeList;