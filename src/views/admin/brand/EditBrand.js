import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CustomFormLabel from '../.../../../../components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from '../.../../../../components/forms/theme-elements/CustomOutlinedInput';
import { IconBuildingArch, IconMail, IconMessage2, IconPhone, IconUser } from '@tabler/icons';
import axiosInstance from '../../../axios/axiosInstance';
import { useNavigate, useParams, useSearchParams } from 'react-router';

const EditBrand = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        slug: ''
    });
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const { id } = useParams(); 

    const handleNameChange = (e) => {
        const name = e.target.value;
        const slug = name.trim().replace(/\s+/g, '-').toLowerCase();

        setFormData({
            ...formData,
            name: name,
            slug: slug
        });
    };

    const fetchBrand = async () => {
        try {
            const res = await axiosInstance.get(`/brand/get-brand/${id}`);

            console.log("res", res)

            if (res.data.statusCode === 200) {
                setFormData({
                    name: res.data.data.name,
                    slug: res.data.data.slug
                })
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
            console.error(error.message);
        } 
    };

    const handleSubmit = async()=>{
        try {
            const res = await axiosInstance.put(`/brand/update-brand/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.data.statusCode === 200) {
                navigate('/dashboard/brands/list');
            }
        } catch (error) {
            console.error(error);
            setError('Something went wrong');
        }
    }

    useEffect(() => {
        fetchBrand();
    }, [id]);

    return (
        <div>
            <Grid container>
                {/* 1 */}
                <Grid size={12}>
                    <CustomFormLabel
                        htmlFor="bi-name"
                        sx={{ mt: 0 }}
                    >
                        Brand Name
                    </CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomOutlinedInput
                        id="bi-name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleNameChange(e)}
                    />
                </Grid>
                {/* 2 */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="bi-company">Slug</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomOutlinedInput
                        id="bi-company"
                        fullWidth
                        disabled
                        value={formData.slug}
                    />
                </Grid>

                {error && (
                    <Grid size={12} mt={2}>
                        <div style={{ color: 'red' }}>
                            {error}
                        </div>
                    </Grid>
                )}

                <Grid size={12} mt={3}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default EditBrand;