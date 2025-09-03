import React from 'react';
import { 
  Grid,
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography,
  Box
} from '@mui/material';
import CustomFormLabel from '../.../../../../components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from '../.../../../../components/forms/theme-elements/CustomOutlinedInput';
import { IconUpload, IconFileImport } from '@tabler/icons-react';
import axiosInstance from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router';

const CreateBadge = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        slug: '',
        backgroundColor: '',
        text: ''
    });
    const [error, setError] = React.useState('');
    const [csvDialogOpen, setCsvDialogOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        const name = e.target.value;
        const slug = name.trim().replace(/\s+/g, '-')?.toLowerCase();

        setFormData({
            ...formData,
            name: name,
            slug: slug
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await axiosInstance.post('/badge/create-badge', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Badge creation response:", res.data);

            if (res.data.statusCode === 200) {
                setFormData({
                    name: '',
                    slug: '',
                    backgroundColor: '',
                    text: ''
                });
                setError('Badge created successfully!');
                navigate('/dashboard/badge/list');
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'An error occurred');
            console.error(error.message);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setError('');
        }
    };

    const handleImportCsvFile = async () => {
        if (!selectedFile) {
            setError('Please select a CSV file first');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('badges', selectedFile);

            const res = await axiosInstance.post('/badge/import-badges', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("csv imported", res.data)

            if (res.data.statusCode === 200) {
                setCsvDialogOpen(false);
                setSelectedFile(null);
                setError('CSV imported successfully!');
                // Reset file input
                const fileInput = document.getElementById('csv-file-input');
                if (fileInput) fileInput.value = '';

                navigate('/dashboard/badge/list');
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'An error occurred while importing CSV');
            console.error('CSV import error:', error);
        }
    };

    const handleCloseCsvDialog = () => {
        setCsvDialogOpen(false);
        setSelectedFile(null);
        setError('');
        // Reset file input
        const fileInput = document.getElementById('csv-file-input');
        if (fileInput) fileInput.value = '';
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
                <Grid size={12}>
                    <CustomFormLabel
                        htmlFor="bi-background-color"
                        sx={{ mt: 0 }}
                    >
                        Background Color
                    </CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomOutlinedInput
                        id="bi-background-color"
                        fullWidth
                        value={formData.backgroundColor}
                        onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                    />
                </Grid>
                <Grid size={12}>
                    <CustomFormLabel
                        htmlFor="bi-text"
                        sx={{ mt: 0 }}
                    >
                        Text
                    </CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomOutlinedInput
                        id="bi-text"
                        fullWidth
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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
                        <div style={{ color: error.includes('success') ? 'green' : 'red' }}>
                            {error}
                        </div>
                    </Grid>
                )}

                <Grid item={12} mt={3}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => setCsvDialogOpen(true)}
                        sx={{ ml: 2 }}
                    >
                        Import CSV
                    </Button>
                </Grid>
            </Grid>

            {/* CSV Import Dialog */}
            <Dialog 
                open={csvDialogOpen} 
                onClose={handleCloseCsvDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Import Badges from CSV
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            Select a CSV file to import multiple badges at once.
                        </Typography>
                        
                        <input
                            id="csv-file-input"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        
                        <Box display="flex" alignItems="center" gap={2}>
                            <Button
                                variant="outlined"
                                component="label"
                                htmlFor="csv-file-input"
                                startIcon={<IconUpload size="1.1rem" />}
                            >
                                Choose File
                            </Button>
                            
                            {selectedFile && (
                                <Typography variant="body2" color="primary">
                                    {selectedFile.name}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCsvDialog}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleImportCsvFile}
                        variant="contained"
                        disabled={!selectedFile}
                        startIcon={<IconFileImport size="1.1rem" />}
                    >
                        Import
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateBadge;