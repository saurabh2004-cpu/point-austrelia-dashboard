import React from 'react';
import { Grid } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CustomFormLabel from '../.../../../../components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from '../.../../../../components/forms/theme-elements/CustomOutlinedInput';
import { IconBuildingArch, IconMail, IconMessage2, IconPhone, IconUser } from '@tabler/icons';
import axiosInstance from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router';

const CreateBrand = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        slug: ''
    });
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        const name = e.target.value;
        const slug = name.trim().replace(/\s+/g, '-').toLowerCase();
        
        setFormData({
            ...formData,
            name: name,
            slug: slug
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await axiosInstance.post('/brand/create-brand', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(res.data.statusCode === 200){
                setFormData({
                    name: '',
                    slug: ''
                })
                // navigate('/dashboard/brand/list')
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
            console.error(error.message);
        }finally{
            setError('Something went wrong');
        }
    };

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

export default CreateBrand;