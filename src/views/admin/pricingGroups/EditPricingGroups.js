import React, { useEffect } from 'react';
import { Grid, MenuItem, Select, FormControl } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CustomFormLabel from '../.../../../../components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from '../.../../../../components/forms/theme-elements/CustomOutlinedInput';
import { IconBuildingArch, IconMail, IconMessage2, IconPhone, IconUser } from '@tabler/icons';
import axiosInstance from '../../../axios/axiosInstance';
import { useNavigate, useParams } from 'react-router';
import { use } from 'react';

const CreatePricingGroups = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        slug: '',
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    const handleNameChange = (e) => {
        const name = e.target.value;
        const slug = name.trim().replace(/\s+/g, '-')?.toLowerCase();

        setFormData({
            ...formData,
            name: name,
            slug: slug,
        });
    };

   

    const handleSubmit = async () => {
        // Validation
        if (!formData.name.trim()) {
            setError('Category name is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await axiosInstance.put(`/pricing-groups/update-pricing-group/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Create category response:", res);

            if (res.data.statusCode === 200) {
                // Reset form on success
                setFormData({
                    name: '',
                    slug: '',
                });

                navigate('/dashboard/pricing-groups/list');

            } else if (res.data.statusCode === 400) {
                console.log("Create pricing group error:", res.data.message);
            }


        } catch (error) {
            console.error('Create pricing group error:', error);
            setError(error.response?.data?.message || error.message || 'Failed to create pricing group');
        } finally {
            setLoading(false);
        }
    };

    const fetchPricingGroup = async()=>{
        try {
            const res = await axiosInstance.get(`/pricing-groups/get-pricing-group/${id}`);
            if (res.data.statusCode === 200) {
                setFormData({
                    name: res.data.data.name,
                    slug: res.data.data.slug,
                });
            }
        } catch (error) {
            console.error('Error fetching pricing group:', error);
            setError('Failed to fetch pricing group');
        }
    }

    useEffect(() => {
        fetchPricingGroup();
    }, [id]);

    return (
        <div>
            <Grid container spacing={2}>
                {/* Category Name */}
                <Grid size={12}>
                    <CustomFormLabel
                        htmlFor="pricing-group-name"
                        sx={{ mt: 0 }}
                    >
                        Pricing Group Name
                    </CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomOutlinedInput
                        id="pricing-group-name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleNameChange(e)}
                        disabled={loading}
                        placeholder="Enter pricing group name"
                    />
                </Grid>

                {/* Slug */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="pricing-group-slug" sx={{ mt: 2 }}>
                        Slug
                    </CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomOutlinedInput
                        id="pricing-group-slug"
                        fullWidth
                        disabled
                        value={formData.slug}
                        placeholder="Auto-generated from pricing group name"
                    />
                </Grid>

                {/* Error Message */}
                {error && (
                    <Grid size={12} mt={2}>
                        <div
                            style={{
                                color: 'red',
                                padding: '10px',
                                backgroundColor: '#ffebee',
                                borderRadius: '4px',
                                border: '1px solid #ffcdd2'
                            }}
                        >
                            {error}
                        </div>
                    </Grid>
                )}

                {/* Submit Button */}
                <Grid size={12} mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ minWidth: '120px' }}
                    >
                        {loading ? 'Updating...' : 'Update Pricing Group'}
                    </Button>
                    {/* <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setFormData({ name: '', slug: '', brand: '' });
                            setError('');
                        }}
                        disabled={loading}
                        sx={{ ml: 2, minWidth: '120px' }}
                    >
                        Clear
                    </Button> */}
                </Grid>
            </Grid>
        </div>
    );
};

export default CreatePricingGroups;