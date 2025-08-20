import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import { 
  DescriptionOutlined,
  LocalHospitalOutlined,
  CreditCardOutlined,
  FlightOutlined,
  HotelOutlined,
  CheckCircleOutline,
  ArrowBack,
  ArrowForward,
  DirectionsCarOutlined
} from '@mui/icons-material';

const ReservationSummary = ({ completeData, onBack, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const getDestinationFlag = (destination) => {
    const flags = {
      'Turkey': '🇹🇷',
      'Mexico': '🇲🇽',
      'Morocco': '🇲🇦',
      'Tunisia': '🇹🇳',
      'Egypt': '🇪🇬',
      'Thailand': '🇹🇭',
      'India': '🇮🇳',
      'Costa Rica': '🇨🇷',
      'Brazil': '🇧🇷',
      'Colombia': '🇨🇴'
    };
    
    return flags[destination] || '';
  };
  
  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to submit booking
    try {
      // In a real app, you would upload documents and submit data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random booking reference
      const reference = 'MT' + Math.floor(100000 + Math.random() * 900000);
      setBookingReference(reference);
      setBookingComplete(true);
      
      // Pass the booking reference to parent component
      if (onComplete) {
        onComplete(reference);
      }
    } catch (error) {
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (bookingComplete) {
    return (
      <Box sx={{ maxWidth: 900, margin: '0 auto', p: 3 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircleOutline sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          
          <Typography variant="h4" gutterBottom>
            Booking Confirmed!
          </Typography>
          
          <Typography variant="body1" paragraph>
            Your medical tourism booking has been successfully submitted and confirmed.
          </Typography>
          
          <Box sx={{ 
            bgcolor: 'success.light', 
            p: 3, 
            borderRadius: 2, 
            mb: 4,
            maxWidth: 400,
            mx: 'auto'
          }}>
            <Typography variant="subtitle2" color="success.dark">
              Booking Reference:
            </Typography>
            <Typography variant="h5" color="success.dark" sx={{ fontWeight: 'bold' }}>
              {bookingReference}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            We've sent a confirmation email with all the details to your registered email address.
            Our customer service team will contact you within 24 hours to discuss the next steps.
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => window.location.href = '/itinerary/' + bookingReference}
              sx={{ mb: 2, width: '100%', maxWidth: 300 }}
            >
              View Your Itinerary
            </Button>
            
            <Button 
              variant="outlined"
              onClick={() => window.location.href = '/'}
              sx={{ width: '100%', maxWidth: 300 }}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }
  
  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Reservation Summary
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please review your booking details before confirming
        </Typography>
        
        <Stepper activeStep={6} alternativeLabel sx={{ mb: 4 }}>
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
          <Step completed>
            <StepLabel>Documents</StepLabel>
          </Step>
          <Step active>
            <StepLabel>Confirm</StepLabel>
          </Step>
        </Stepper>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalHospitalOutlined sx={{ mr: 1 }} color="primary" />
                  Treatment Details
                </Typography>
                
                <Box sx={{ ml: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Treatment:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {completeData.treatment}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Destination:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {getDestinationFlag(completeData.destination)} {completeData.destination}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Date:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {formatDate(completeData.date)}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Duration:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {completeData.duration === '3-5' ? '3-5 days' : 
                         completeData.duration === '7-10' ? '1 week' : 
                         completeData.duration === '14' ? '2 weeks' : 
                         completeData.duration === '21' ? '3 weeks' : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
            
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <FlightOutlined sx={{ mr: 1 }} color="primary" />
                  Travel Details
                </Typography>
                
                <Box sx={{ ml: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Departure:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {completeData.departureCity}, {completeData.departureCountry}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Travelers:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {completeData.passengers}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                {completeData.selectedFlight && (
                  <Box sx={{ mt: 2, bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Flight
                    </Typography>
                    <Typography variant="body2">
                      From: {completeData.selectedFlight.itineraries[0].segments[0].departure.iataCode}
                    </Typography>
                    <Typography variant="body2">
                      To: {completeData.selectedFlight.itineraries[0].segments[completeData.selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode}
                    </Typography>
                    <Typography variant="body2">
                      Price: ${completeData.selectedFlight.price.total} per person
                    </Typography>
                  </Box>
                )}
                
                {completeData.selectedHotel && (
                  <Box sx={{ mt: 2, bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Accommodation
                    </Typography>
                    <Typography variant="body2">
                      {completeData.selectedHotel.name}
                    </Typography>
                    <Typography variant="body2">
                      {completeData.selectedHotel.location}
                    </Typography>
                    <Typography variant="body2">
                      ${completeData.selectedHotel.price} per night
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionOutlined sx={{ mr: 1 }} color="primary" />
                  Uploaded Documents
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionOutlined color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Passport" />
                    <ListItemSecondaryAction>
                      <Chip 
                        label="Uploaded" 
                        color="success" 
                        size="small" 
                        variant="outlined" 
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  {completeData.documents.medicalRecords && (
                    <ListItem>
                      <ListItemIcon>
                        <LocalHospitalOutlined color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Medical Records" />
                      <ListItemSecondaryAction>
                        <Chip 
                          label="Uploaded" 
                          color="success" 
                          size="small" 
                          variant="outlined" 
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                  
                  {completeData.documents.insuranceCard && (
                    <ListItem>
                      <ListItemIcon>
                        <CreditCardOutlined color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Insurance Card" />
                      <ListItemSecondaryAction>
                        <Chip 
                          label="Uploaded" 
                          color="success" 
                          size="small" 
                          variant="outlined" 
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
                
                {completeData.documents.photo && (
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Profile Photo
                    </Typography>
                    <Avatar
                      src={URL.createObjectURL(completeData.documents.photo)}
                      sx={{ width: 100, height: 100 }}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionOutlined sx={{ mr: 1 }} color="primary" />
                  Personal Information
                </Typography>
                
                <Box sx={{ ml: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Full Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {completeData.personalInfo.fullName}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Date of Birth:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {formatDate(completeData.personalInfo.dateOfBirth)}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Nationality:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {completeData.personalInfo.nationality}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Passport:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {completeData.personalInfo.passportNumber}
                      </Typography>
                    </Grid>
                    
                    {completeData.personalInfo.allergies && (
                      <>
                        <Grid item xs={4}>
                          <Typography variant="body2" color="text.secondary">
                            Allergies:
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2">
                            {completeData.personalInfo.allergies}
                          </Typography>
                        </Grid>
                      </>
                    )}
                    
                    {completeData.personalInfo.medications && (
                      <>
                        <Grid item xs={4}>
                          <Typography variant="body2" color="text.secondary">
                            Medications:
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2">
                            {completeData.personalInfo.medications}
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
            
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Cost
                </Typography>
                
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Treatment</TableCell>
                        <TableCell align="right">
                          ${completeData.treatment === 'Dental Implants' ? '1,200' :
                            completeData.treatment === 'Cosmetic Surgery' ? '3,500' :
                            completeData.treatment === 'Eye Surgery' ? '2,000' :
                            completeData.treatment === 'Heart Surgery' ? '8,000' :
                            completeData.treatment === 'Hip Replacement' ? '4,500' :
                            completeData.treatment === 'Weight Loss Surgery' ? '5,000' : '2,500'}
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>Flight</TableCell>
                        <TableCell align="right">
                          ${completeData.selectedFlight ? 
                            (parseFloat(completeData.selectedFlight.price.total) * completeData.passengers).toFixed(2) : 
                            '800.00'}
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>Accommodation</TableCell>
                        <TableCell align="right">
                          ${completeData.selectedHotel ? 
                            (completeData.selectedHotel.price * (
                              completeData.duration === '3-5' ? 4 : 
                              completeData.duration === '7-10' ? 8 : 
                              completeData.duration === '14' ? 14 : 21
                            )).toFixed(2) : 
                            ((completeData.accommodation === 'standard' ? 80 : 
                              completeData.accommodation === 'deluxe' ? 150 : 
                              completeData.accommodation === 'suite' ? 250 : 120) * (
                              completeData.duration === '3-5' ? 4 : 
                              completeData.duration === '7-10' ? 8 : 
                              completeData.duration === '14' ? 14 : 21
                            )).toFixed(2)}
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>Transportation & Support</TableCell>
                        <TableCell align="right">$300.00</TableCell>
                      </TableRow>
                      
                      {completeData.insurance && (
                        <TableRow>
                          <TableCell>Insurance</TableCell>
                          <TableCell align="right">$250.00</TableCell>
                        </TableRow>
                      )}
                      
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Total</Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ borderBottom: 'none' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            ${calculateTotalCost(completeData).toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Terms and Conditions
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  By confirming this booking, you agree to our terms and conditions, including cancellation policy and medical liability waiver. Please ensure all provided information is accurate.
                </Typography>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  Your payment will be processed securely after confirmation. You can cancel or modify your booking up to 72 hours before your scheduled arrival without penalty.
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button 
            variant="outlined"
            onClick={onBack}
            startIcon={<ArrowBack />}
            disabled={isSubmitting}
          >
            Edit Information
          </Button>
          
          <Button 
            variant="contained"
            color="primary"
            onClick={handleSubmitBooking}
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ArrowForward />}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

// Helper function to calculate total cost
const calculateTotalCost = (data) => {
  let total = 0;
  
  // Treatment cost
  const treatmentCosts = {
    'Dental Implants': 1200,
    'Cosmetic Surgery': 3500,
    'Eye Surgery': 2000,
    'Heart Surgery': 8000,
    'Hip Replacement': 4500,
    'Weight Loss Surgery': 5000
  };
  total += treatmentCosts[data.treatment] || 2500;
  
  // Flight cost
  if (data.selectedFlight) {
    total += parseFloat(data.selectedFlight.price.total) * data.passengers;
  } else {
    total += 800; // Default flight cost
  }
  
  // Accommodation cost
  let nights = 0;
  if (data.duration === '3-5') nights = 4;
  else if (data.duration === '7-10') nights = 8;
  else if (data.duration === '14') nights = 14;
  else if (data.duration === '21') nights = 21;
  
  if (data.selectedHotel) {
    total += data.selectedHotel.price * nights;
  } else {
    const accommodationRates = {
      'standard': 80,
      'deluxe': 150,
      'suite': 250,
      'recovery': 120
    };
    total += nights * (accommodationRates[data.accommodation] || 80);
  }
  
  // Transportation & support
  total += 300;
  
  // Insurance
  if (data.insurance) {
    total += 250;
  }
  
  return total;
};

export default ReservationSummary;
