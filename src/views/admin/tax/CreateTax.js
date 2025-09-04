import React, { useEffect } from 'react';
import { Grid, MenuItem, Select, FormControl } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CustomFormLabel from '../.../../../../components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from '../.../../../../components/forms/theme-elements/CustomOutlinedInput';
import { IconBuildingArch, IconMail, IconMessage2, IconPhone, IconUser } from '@tabler/icons';
import axiosInstance from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router';

const CreateTax = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        percentage: 0,
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async () => {
        // Validation
        if (!formData.name.trim()) {
            setError('Tax name is required');
            return;
        }
        if (!formData.percentage) {
            setError('Please enter a percentage');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await axiosInstance.post('/tax/create-tax', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Create category response:", res);

            if (res.data.statusCode === 200) {
                // Reset form on success
                setFormData({
                    name: '',
                    percentage: 0,
                });

                navigate('/dashboard/tax/list');

            } else if (res.data.statusCode === 400) {
                console.log("Create category error:", res.data.message);
            }


        } catch (error) {
            console.error('Create category error:', error);
            setError(error.response?.data?.message || error.message || 'Failed to create category');
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div>
            <Grid container spacing={2}>
                {/* Category Name */}
                <Grid size={12}>
                    <CustomFormLabel
                        htmlFor="tax-name"
                        sx={{ mt: 0 }}
                    >
                        Tax Name
                    </CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomOutlinedInput
                        id="tax-name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={loading}
                        placeholder="Enter Tax name"
                    />
                </Grid>

                {/* percentage */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="tax-percentage" sx={{ mt: 2 }}>
                        percentage
                    </CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomOutlinedInput
                        id="category-percentage"
                        fullWidth
                        // disabled
                        type="number"
                        value={formData.percentage}
                        onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                        placeholder="Enter percentage"
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
                        {loading ? 'Creating...' : 'Create Tax'}
                    </Button>
                    <Button
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
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default CreateTax;