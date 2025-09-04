import React, { useEffect, useState } from 'react';
import { Grid, MenuItem, Select, FormControl, Checkbox, Dialog, DialogTitle, DialogContent, Typography, Box, DialogActions } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CustomFormLabel from '../.../../../../components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from '../.../../../../components/forms/theme-elements/CustomOutlinedInput';
// import { IconBuildingArch, IconMail, IconMessage2, IconPhone, IconUser } from '@tabler/icons';
import axiosInstance from '../../../axios/axiosInstance';
import { IconUpload, IconFileImport } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

const CreateProduct = () => {
  const [formData, setFormData] = React.useState({
    sku: '',
    ProductName: '',
    eachPrice: '',
    primaryUnitsType: '',
    pricingGroup: '',
    stockLevel: '',
    typesOfPacks: [],
    commerceCategoriesOne: '',
    commerceCategoriesTwo: '',
    commerceCategoriesThree: '',
    pageTitle: '',
    storeDescription: '',
    eachBarcodes: '',
    packBarcodes: '',
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [csvDialogOpen, setCsvDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);


  const handleSubmit = async () => {
    // Validation
    if (!formData.sku.trim()) {
      setError('Please enter a SKU');
      return;
    }
    if (!formData.ProductName) {
      setError('Please enter a product name');
      return;
    }
    if (!formData.eachPrice) {
      setError('Please enter a price');
      return;
    }
    if (!formData.pricingGroup) {
      setError('Please enter a pricing group');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axiosInstance.post('/products/create-product', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Create product response:", res);

      if (res.data.statusCode === 200) {
        // Reset form on success
        setFormData({
          sku: '',
          ProductName: '',
          eachPrice: '',
          stockLevel: '',
          typesOfPacks: [],
          pricingGroup: '',
          commerceCategoriesOne: '',
          commerceCategoriesTwo: '',
          commerceCategoriesThree: '',
          storeDescription: '',
          pageTitle: '',
          eachBarcodes: '',
          packBarcodes: ''
        });

        navigate('/dashboard/products/list');

      } else if (res.data.statusCode === 400) {
        console.log("Create product error:", res.data.message);
      }


    } catch (error) {
      console.error('Create product error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Please select a valid CSV file');
        return;
      }
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
      setLoading(true);
      const formDataForUpload = new FormData();
      // Correct field name for products
      formDataForUpload.append('products', selectedFile);

      // Correct API endpoint for products import
      const res = await axiosInstance.post('/products/import-products', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("CSV imported", res.data);

      if (res.data.statusCode === 200) {
        setCsvDialogOpen(false);
        setSelectedFile(null);
        setError('CSV imported successfully!');
        // Reset file input
        const fileInput = document.getElementById('csv-file-input');
        if (fileInput) fileInput.value = '';

        setTimeout(() => {
          navigate('/dashboard/products/list');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'An error occurred while importing CSV');
      console.error('CSV import error:', error);
    } finally {
      setLoading(false);
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

  const [packTypes, setPackTypes] = useState([]);
  const [pricingGroups, setPricingGroups] = useState([]);
  const [categoryOne, setCategoryOne] = useState([]);
  const [categoryTwo, setCategoryTwo] = useState([]);
  const [categoryThree, setCategoryThree] = useState([]);
  const [typesList, setTypesList] = useState(["Inventory Item", "Kit/Package", "Service", "Non-Inventory Item"]);

  const fetchPackTypesList = async () => {
    try {
      const response = await axiosInstance.get('/packs-types/get-all-packs-types');
      console.log("response pack types list", response);

      if (response.status === 200) {
        setPackTypes(response.data.data.packs);
      }

    } catch (error) {
      console.error('Error fetching pack types list:', error);
      setError(error.message);
    }
  };

  const fetchPricingGroups = async () => {
    try {
      const response = await axiosInstance.get('/pricing-groups/get-pricing-groups');
      console.log("response pricing groups", response);

      if (response.data.statusCode === 200) {
        setPricingGroups(response.data.data);
      }

    } catch (error) {
      console.error('Error fetching pricing groups list:', error);
      setError(error.message);
    }
  };

  const fetchBrandsList = async () => {
    try {
      const response = await axiosInstance.get('/brand/get-brands-list');
      console.log("response brands", response);

      if (response.data.statusCode === 200) {
        // Extract the data array from the response
        setCategoryOne(response.data.data);
      }

    } catch (error) {
      console.error('Error fetching brands list:', error);
      setError(error.message);
    }
  };

  const fetchCategoryList = async () => {
    try {
      const response = await axiosInstance.get('/category/get-categories');
      console.log("response categories", response);

      if (response.data.statusCode === 200) {
        setCategoryTwo(response.data.data);
      }

    } catch (error) {
      console.error('Error fetching category list:', error);
      setError(error.message);
    }
  };

  const fetchSubCategoryList = async () => {
    try {
      const response = await axiosInstance.get('/subcategory/get-sub-categories');
      console.log("response sub categories", response.data.data);

      if (response.data.statusCode === 200) {
        setCategoryThree(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching sub category list:', error);
      setError(error.message);
    }
  };




  React.useEffect(() => {
    fetchPackTypesList();
    fetchPricingGroups();
    fetchBrandsList();
    fetchCategoryList();
    fetchSubCategoryList();
  }, []);


  return (
    <div>
      <Grid container spacing={2}>

        {/* Pack Name */}
        <Grid size={12}>
          <CustomFormLabel htmlFor="pack-name" sx={{ mt: 2 }}>
            SKU
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomOutlinedInput
            id="pack-name"
            fullWidth
            // disabled
            type="text"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            placeholder="Enter SKU"
          />
        </Grid>

        <Grid size={12}>
          <CustomFormLabel
            htmlFor="quantity"
            sx={{ mt: 0 }}
          >
            ProductName
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomOutlinedInput
            id="ProductName"
            fullWidth
            value={formData.ProductName}
            onChange={(e) => setFormData({ ...formData, ProductName: e.target.value })}
            disabled={loading}
            placeholder="Enter ProductName"
          />
        </Grid>

        <Grid size={12}>
          <CustomFormLabel
            htmlFor="quantity"
            sx={{ mt: 0 }}
          >
            Each Price
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomOutlinedInput
            id="eachPrice"
            fullWidth
            value={formData.eachPrice}
            onChange={(e) => setFormData({ ...formData, eachPrice: e.target.value })}
            disabled={loading}
            placeholder="Enter Each Price"
          />
        </Grid>

        <Grid size={12}>
          <CustomFormLabel
            htmlFor="stockLevel"
            sx={{ mt: 0 }}
          >
            Stock Level
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomOutlinedInput
            id="stockLevel"
            fullWidth
            value={formData.stockLevel}
            onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
            disabled={loading}
            placeholder="Enter stock Level"
          />
        </Grid>

        {/* type of packs Selection */}
        {/* <Grid size={12}>
          <CustomFormLabel
            htmlFor="type-select"
            sx={{ mt: 2 }}
          >
            Select Type Of Packs
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <Select
              id="type-select"
              // value={formData.typesOfPacks[0] || ''}
              onChange={(e) => setFormData({ ...formData, typesOfPacks: [...formData.typesOfPacks, e.target.value] })}
              disabled={loading || packTypes.length === 0}
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="" disabled>
                {packTypes.length === 0 ? 'Loading types...' : 'Select a type'}
              </MenuItem>
              {packTypes.map((type) => (
                <MenuItem key={type.name} value={type._id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}

        {/* type of packs Selection - MULTI SELECT */}
        <Grid size={12}>
          <CustomFormLabel
            htmlFor="types-of-packs-select"
            sx={{ mt: 2 }}
          >
            Select Type Of Packs (Multiple)
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <Select
              id="types-of-packs-select"
              multiple // Enable multiple selection
              value={formData.typesOfPacks} // This should be an array
              onChange={(e) => {
                // For multiple select, the value is always an array
                const value = e.target.value;
                setFormData({ ...formData, typesOfPacks: Array.isArray(value) ? value : [value] });
              }}
              disabled={loading || packTypes.length === 0}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return 'Select pack types';
                }
                // Get the names of selected pack types
                const selectedNames = selected.map(id => {
                  const pack = packTypes.find(p => p._id === id);
                  return pack ? pack.name : id;
                });
                return selectedNames.join(', ');
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="" disabled>
                {packTypes.length === 0 ? 'Loading types...' : 'Select pack types'}
              </MenuItem>
              {packTypes.map((type) => (
                <MenuItem key={type._id} value={type._id}>
                  {/* Use Checkbox to indicate selection */}
                  <Checkbox checked={formData.typesOfPacks.indexOf(type._id) > -1} />
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>


        {/* Select PricingGroup */}
        <Grid size={12}>
          <CustomFormLabel
            htmlFor="pricing-group-select"
            sx={{ mt: 2 }}
          >
            Select PricingGroup
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <Select
              id="excluded-units-select"
              value={formData.pricingGroup}
              onChange={(e) => setFormData({ ...formData, pricingGroup: e.target.value })}
              disabled={loading || packTypes.length === 0}
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="" disabled>
                {pricingGroups.length === 0 ? 'Loading types...' : 'Select a type'}
              </MenuItem>
              {pricingGroups.map((group) => (
                <MenuItem key={group.name} value={group._id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>


        {/* commerceCategoryOne selection */}
        <Grid size={12}>
          <CustomFormLabel
            htmlFor="pricing-group-select"
            sx={{ mt: 2 }}
          >
            Select Commerce category One
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <Select
              id="excluded-units-select"
              value={formData.commerceCategoriesOne}
              onChange={(e) => setFormData({ ...formData, commerceCategoriesOne: e.target.value })}
              disabled={loading || packTypes.length === 0}
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="" disabled>
                {categoryOne.length === 0 ? 'Loading types...' : 'Select a type'}
              </MenuItem>
              {categoryOne.map((category) => (
                <MenuItem key={category.name} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* commerceCategoryTwo selection */}
        <Grid size={12}>
          <CustomFormLabel
            htmlFor="pricing-group-select"
            sx={{ mt: 2 }}
          >
            Select Commerce category Two
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <Select
              id="excluded-units-select"
              value={formData.commerceCategoriesTwo}
              onChange={(e) => setFormData({ ...formData, commerceCategoriesTwo: e.target.value })}
              disabled={loading || categoryTwo.length === 0}
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="" disabled>
                {categoryTwo.length === 0 ? 'Loading types...' : 'Select a type'}
              </MenuItem>
              {categoryTwo.map((category) => (
                <MenuItem key={category.name} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>



        {/* commerceCategoryThree selection */}
        <Grid size={12}>
          <CustomFormLabel
            htmlFor="commerceCategoryThree-select"
            sx={{ mt: 2 }}
          >
            Select Commerce category Three
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <Select
              id="excluded-units-select"
              value={formData.commerceCategoriesThree}
              onChange={(e) => setFormData({ ...formData, commerceCategoriesThree: e.target.value })}
              disabled={loading || categoryThree.length === 0}
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="" disabled>
                {categoryThree.length === 0 ? 'Loading types...' : 'Select a type'}
              </MenuItem>
              {categoryThree.map((category) => (
                <MenuItem key={category.name} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>


        <Grid size={12}>
          <CustomFormLabel
            htmlFor="storeDescription"
            sx={{ mt: 0 }}
          >
            Store Description
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomOutlinedInput
            id="storeDescription"
            fullWidth
            value={formData.storeDescription}
            onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
            disabled={loading}
            placeholder="Enter Store Description"
          />
        </Grid>

        <Grid size={12}>
          <CustomFormLabel
            htmlFor="pageTitle"
            sx={{ mt: 0 }}
          >
            Page Title
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomOutlinedInput
            id="pageTitle"
            fullWidth
            value={formData.pageTitle}
            onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
            disabled={loading}
            placeholder="Enter Page Title"
          />
        </Grid>

        <Grid size={12}>
          <CustomFormLabel
            htmlFor="eachBarcodes"
            sx={{ mt: 0 }}
          >
            Each Barcodes
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomOutlinedInput
            id="eachBarcodes"
            fullWidth
            value={formData.eachBarcodes}
            onChange={(e) => setFormData({ ...formData, eachBarcodes: e.target.value })}
            disabled={loading}
            placeholder="Enter Each Barcodes"
          />
        </Grid>

        <Grid size={12}>
          <CustomFormLabel
            htmlFor="packBarcodes"
            sx={{ mt: 0 }}
          >
            Pack Barcodes
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomOutlinedInput
            id="packBarcodes"
            fullWidth
            value={formData.packBarcodes}
            onChange={(e) => setFormData({ ...formData, packBarcodes: e.target.value })}
            disabled={loading}
            placeholder="Enter Pack Barcodes"
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
            {loading ? 'Creating...' : 'Create Product'}
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
          Import Pricing Group Discounts from CSV
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Select a CSV file to import multiple pricing group discounts at once.
              Expected format: pricingGroupId, customerId, productSku, percentage
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
                disabled={loading}
              >
                Choose File
              </Button>

              {selectedFile && (
                <Typography variant="body2" color="primary">
                  {selectedFile.name}
                </Typography>
              )}
            </Box>

            {error && !error.includes('success') && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCsvDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleImportCsvFile}
            variant="contained"
            disabled={!selectedFile || loading}
            startIcon={<IconFileImport size="1.1rem" />}
          >
            {loading ? 'Importing...' : 'Import'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateProduct;