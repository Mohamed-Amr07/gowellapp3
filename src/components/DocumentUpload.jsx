import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Avatar
} from '@mui/material';
import { 
  DescriptionOutlined, 
  CloudUploadOutlined, 
  CheckCircleOutline,
  InsertDriveFileOutlined,
  LocalHospitalOutlined,
  CreditCardOutlined,
  PhotoCameraOutlined,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const DocumentUpload = ({ formData, onNext, onBack }) => {
  const [documents, setDocuments] = useState({
    passport: null,
    medicalRecords: null,
    insuranceCard: null,
    photo: null
  });
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    dateOfBirth: null,
    nationality: '',
    passportNumber: '',
    expiryDate: null,
    emergencyContact: '',
    emergencyPhone: '',
    allergies: '',
    medications: '',
    specialRequirements: ''
  });
  
  const handleFileChange = (event, documentType) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments({
        ...documents,
        [documentType]: file
      });
    }
  };
  
  const handleInputChange = (field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value
    });
  };
  
  const validateForm = () => {
    // Check required documents
    if (!documents.passport) {
      alert('Please upload your passport');
      return false;
    }
    
    // Check required personal info
    if (!personalInfo.fullName || !personalInfo.nationality || !personalInfo.passportNumber) {
      alert('Please fill in all required fields');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // Combine all data
    const completeData = {
      ...formData,
      personalInfo,
      documents
    };
    
    // Pass data to parent component
    onNext(completeData);
  };
  
  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Required Documents
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please upload the necessary documents for your medical tourism booking
        </Typography>
        
        <Stepper activeStep={5} alternativeLabel sx={{ mb: 4 }}>
          <Step completed>
            <StepLabel>Treatment</StepLabel>
          </Step>
          <Step completed>
            <StepLabel>Flights</StepLabel>
          </Step>
          <Step completed>
            <StepLabel>Accommodation</StepLabel>
          </Step>
          <Step completed>
            <StepLabel>Details</StepLabel>
          </Step>
          <Step completed>
            <StepLabel>Add-ons</StepLabel>
          </Step>
          <Step active>
            <StepLabel>Documents</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm</StepLabel>
          </Step>
        </Stepper>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name (as in passport) *"
                value={personalInfo.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={personalInfo.dateOfBirth}
                  onChange={(date) => handleInputChange('dateOfBirth', date)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  maxDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nationality *"
                value={personalInfo.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Passport Number *"
                value={personalInfo.passportNumber}
                onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Passport Expiry Date"
                  value={personalInfo.expiryDate}
                  onChange={(date) => handleInputChange('expiryDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  minDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Emergency Contact Name"
                value={personalInfo.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Emergency Contact Phone"
                value={personalInfo.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                fullWidth
                margin="normal"
                type="tel"
              />
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Medical Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Allergies"
                value={personalInfo.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Current Medications"
                value={personalInfo.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Special Requirements"
                value={personalInfo.specialRequirements}
                onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Document Upload
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <DescriptionOutlined color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Passport Copy *" 
                secondary="First and last page of your passport" 
              />
              <ListItemSecondaryAction>
                <input
                  accept="image/*,application/pdf"
                  style={{ display: 'none' }}
                  id="passport-upload"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'passport')}
                />
                <label htmlFor="passport-upload">
                  <Button 
                    variant={documents.passport ? "outlined" : "contained"}
                    color={documents.passport ? "success" : "primary"}
                    component="span"
                    startIcon={documents.passport ? <CheckCircleOutline /> : <CloudUploadOutlined />}
                  >
                    {documents.passport ? 'Uploaded' : 'Upload'}
                  </Button>
                </label>
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <LocalHospitalOutlined color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Medical Records" 
                secondary="Relevant medical history for your treatment" 
              />
              <ListItemSecondaryAction>
                <input
                  accept="image/*,application/pdf"
                  style={{ display: 'none' }}
                  id="medical-upload"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'medicalRecords')}
                />
                <label htmlFor="medical-upload">
                  <Button 
                    variant={documents.medicalRecords ? "outlined" : "contained"}
                    color={documents.medicalRecords ? "success" : "primary"}
                    component="span"
                    startIcon={documents.medicalRecords ? <CheckCircleOutline /> : <CloudUploadOutlined />}
                  >
                    {documents.medicalRecords ? 'Uploaded' : 'Upload'}
                  </Button>
                </label>
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <CreditCardOutlined color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Insurance Card" 
                secondary="Your health or travel insurance information" 
              />
              <ListItemSecondaryAction>
                <input
                  accept="image/*,application/pdf"
                  style={{ display: 'none' }}
                  id="insurance-upload"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'insuranceCard')}
                />
                <label htmlFor="insurance-upload">
                  <Button 
                    variant={documents.insuranceCard ? "outlined" : "contained"}
                    color={documents.insuranceCard ? "success" : "primary"}
                    component="span"
                    startIcon={documents.insuranceCard ? <CheckCircleOutline /> : <CloudUploadOutlined />}
                  >
                    {documents.insuranceCard ? 'Uploaded' : 'Upload'}
                  </Button>
                </label>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="subtitle1" gutterBottom>
              Profile Photo
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please upload a recent photo for identification purposes
            </Typography>
            
            {documents.photo ? (
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  src={URL.createObjectURL(documents.photo)}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload-change"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'photo')}
                />
                <label htmlFor="photo-upload-change">
                  <Button 
                    variant="outlined"
                    color="primary"
                    component="span"
                  >
                    Change Photo
                  </Button>
                </label>
              </Box>
            ) : (
              <Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'photo')}
                />
                <label htmlFor="photo-upload">
                  <Button 
                    variant="outlined"
                    color="primary"
                    component="span"
                    startIcon={<PhotoCameraOutlined />}
                    size="large"
                    sx={{ p: 3 }}
                  >
                    Upload Photo
                  </Button>
                </label>
              </Box>
            )}
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button 
            variant="outlined"
            onClick={onBack}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          
          <Button 
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            endIcon={<ArrowForward />}
          >
            Continue
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DocumentUpload;
