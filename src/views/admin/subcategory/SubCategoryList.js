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

const SubCategoryList = () => {
    const headCells = [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Category Name',
        },
        {
            id: 'category',
            numeric: false,
            disablePadding: false,
            label: 'Brand ',
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

    const fetchSubCategoryList = async () => {
        try {
            const response = await axiosInstance.get('/subcategory/get-sub-categories');
            console.log("response sub categories", response.data.data);

            if(response.data.statusCode === 200){
                setTableData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching brands list:', error);
            setError(error.message);
        }
    };

    

    React.useEffect(() => {
        fetchSubCategoryList();
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

export default SubCategoryList;