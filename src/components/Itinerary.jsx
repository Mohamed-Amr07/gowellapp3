import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Divider,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  LocalHospitalOutlined,
  FlightOutlined,
  HotelOutlined,
  DirectionsCarOutlined,
  PhoneOutlined,
  LanguageOutlined,
  HeadsetMicOutlined,
  LocalHospitalRounded,
  GetAppOutlined,
  ShareOutlined,
  ArrowBack,
  FlightTakeoffOutlined,
  FlightLandOutlined,
  PersonOutlined,
  AccessTimeOutlined
} from '@mui/icons-material';

const Itinerary = ({ bookingReference, completeData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (dateString) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
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
  
  // Calculate treatment date (arrival date + 1 day)
  const getTreatmentDate = () => {
    const arrivalDate = new Date(completeData.date);
    const treatmentDate = new Date(arrivalDate);
    treatmentDate.setDate(arrivalDate.getDate() + 1);
    return treatmentDate;
  };
  
  // Calculate departure date based on duration
  const getDepartureDate = () => {
    const arrivalDate = new Date(completeData.date);
    const departureDate = new Date(arrivalDate);
    
    if (completeData.duration === '3-5') {
      departureDate.setDate(arrivalDate.getDate() + 4);
    } else if (completeData.duration === '7-10') {
      departureDate.setDate(arrivalDate.getDate() + 8);
    } else if (completeData.duration === '14') {
      departureDate.setDate(arrivalDate.getDate() + 14);
    } else if (completeData.duration === '21') {
      departureDate.setDate(arrivalDate.getDate() + 21);
    }
    
    return departureDate;
  };
  
  const shareItinerary = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Medical Tourism Itinerary',
          text: `My Medical Tourism Itinerary - Reference: ${bookingReference}\n\n` +
            `Treatment: ${completeData.treatment}\n` +
            `Destination: ${completeData.destination}\n` +
            `Arrival: ${formatDate(completeData.date)}\n` +
            `Departure: ${formatDate(getDepartureDate())}`
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert('Web Share API not supported in your browser');
    }
  };
  
  const handlePrintItinerary = () => {
    window.print();
  };
  
  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', p: { xs: 2, md: 3 } }}>
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        p: 3, 
        borderRadius: 2,
        mb: 3,
        textAlign: 'center'
      }}>
        <Typography variant="h4" gutterBottom>
          Your Itinerary
        </Typography>
        <Typography variant="subtitle1">
          Booking Reference: {bookingReference}
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Traveler Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {completeData.documents.photo ? (
                  <Avatar 
                    src={URL.createObjectURL(completeData.documents.photo)} 
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                ) : (
                  <Avatar sx={{ width: 80, height: 80, mr: 2, bgcolor: 'grey.300' }}>
                    <PersonOutlined fontSize="large" />
                  </Avatar>
                )}
                
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {completeData.personalInfo.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {completeData.personalInfo.nationality}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Passport: {completeData.personalInfo.passportNumber}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Emergency Contact
              </Typography>
              
              <Typography variant="body2">
                {completeData.personalInfo.emergencyContact || 'Not specified'}
              </Typography>
              
              <Typography variant="body2">
                {completeData.personalInfo.emergencyPhone || 'Not specified'}
              </Typography>
            </CardContent>
          </Card>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneOutlined sx={{ mr: 1 }} color="primary" />
                Support Contacts
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <LocalHospitalOutlined color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Medical Coordinator" 
                    secondary="+1 (555) 123-4567" 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <LanguageOutlined color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Translator" 
                    secondary="+1 (555) 987-6543" 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <HeadsetMicOutlined color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Customer Support" 
                    secondary="+1 (800) 555-1234" 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <LocalHospitalRounded color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Emergency (Local)" 
                    secondary="112" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalHospitalOutlined sx={{ mr: 1 }} color="primary" />
                Treatment Details
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="h6" color="primary.main">
                  {completeData.treatment}
                </Typography>
                
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {getDestinationFlag(completeData.destination)} {completeData.destination}
                </Typography>
                
                <Typography variant="body1" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <AccessTimeOutlined fontSize="small" sx={{ mr: 0.5 }} />
                  Scheduled for: {formatDate(getTreatmentDate())}
                </Typography>
                
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  bgcolor: 'primary.50', 
                  borderRadius: 1,
                  borderLeft: 3,
                  borderColor: 'primary.main'
                }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Pre-Treatment Instructions:
                  </Typography>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      <li>Avoid eating or drinking 8 hours before the procedure</li>
                      <li>Bring all your medical records</li>
                      <li>Arrive 1 hour before your scheduled appointment</li>
                      <li>Wear comfortable clothing</li>
                    </ul>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <FlightOutlined sx={{ mr: 1 }} color="primary" />
                Flight Information
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1">Outbound Flight</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(completeData.date)}
                  </Typography>
                </Box>
                
                <Paper variant="outlined" sx={{ p: 2 }}>
                  {completeData.selectedFlight ? (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6">
                            {formatTime(completeData.selectedFlight.itineraries[0].segments[0].departure.at)}
                          </Typography>
                          <Typography variant="body2">
                            {completeData.selectedFlight.itineraries[0].segments[0].departure.iataCode}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', px: 2 }}>
                          <Divider sx={{ flex: 1 }} />
                          <FlightTakeoffOutlined sx={{ mx: 1, color: 'text.secondary' }} />
                          <Divider sx={{ flex: 1 }} />
                        </Box>
                        
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6">
                            {formatTime(completeData.selectedFlight.itineraries[0].segments[completeData.selectedFlight.itineraries[0].segments.length - 1].arrival.at)}
                          </Typography>
                          <Typography variant="body2">
                            {completeData.selectedFlight.itineraries[0].segments[completeData.selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                        <Typography variant="body2">
                          Flight: {completeData.selectedFlight.itineraries[0].segments[0].carrierCode} 
                          {completeData.selectedFlight.itineraries[0].segments[0].number}
                        </Typography>
                        <Typography variant="body2">
                          Class: Economy
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6">TBD</Typography>
                          <Typography variant="body2">
                            {completeData.departureCity}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', px: 2 }}>
                          <Divider sx={{ flex: 1 }} />
                          <FlightTakeoffOutlined sx={{ mx: 1, color: 'text.secondary' }} />
                          <Divider sx={{ flex: 1 }} />
                        </Box>
                        
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6">TBD</Typography>
                          <Typography variant="body2">
                            {completeData.destination}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                        <Typography variant="body2" color="text.secondary">
                          Flight details will be confirmed 48 hours before departure
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1">Return Flight</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(getDepartureDate())}
                  </Typography>
                </Box>
                
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">TBD</Typography>
                        <Typography variant="body2">
                          {completeData.destination}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', px: 2 }}>
                        <Divider sx={{ flex: 1 }} />
                        <FlightLandOutlined sx={{ mx: 1, color: 'text.secondary' }} />
                        <Divider sx={{ flex: 1 }} />
                      </Box>
                      
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">TBD</Typography>
                        <Typography variant="body2">
                          {completeData.departureCity}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                      <Typography variant="body2" color="text.secondary">
                        Return flight details will be confirmed during your stay
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </CardContent>
          </Card>
          
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <HotelOutlined sx={{ mr: 1 }} color="primary" />
                Accommodation
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                {completeData.selectedHotel ? (
                  <>
                    <Typography variant="h6">
                      {completeData.selectedHotel.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {completeData.selectedHotel.location}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Check-in
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(completeData.date)}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Check-out
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(getDepartureDate())}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Room Type: {completeData.accommodation === 'standard' ? 'Standard Room' : 
                                 completeData.accommodation === 'deluxe' ? 'Deluxe Room' : 
                                 completeData.accommodation === 'suite' ? 'Suite' : 'Recovery Room'}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">
                      {completeData.accommodation === 'standard' ? 'Standard Hotel' : 
                       completeData.accommodation === 'deluxe' ? 'Deluxe Hotel' : 
                       completeData.accommodation === 'suite' ? 'Suite Accommodation' : 'Recovery Center'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {completeData.destination}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Check-in
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(completeData.date)}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Check-out
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(getDepartureDate())}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Room Type: {completeData.accommodation === 'standard' ? 'Standard Room' : 
                                 completeData.accommodation === 'deluxe' ? 'Deluxe Room' : 
                                 completeData.accommodation === 'suite' ? 'Suite' : 'Recovery Room'}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                      Hotel details will be confirmed 48 hours before arrival
                    </Typography>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <DirectionsCarOutlined sx={{ mr: 1 }} color="primary" />
                Transportation
              </Typography>
              
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <FlightLandOutlined color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Airport Pickup" 
                    secondary={`Date: ${formatDate(completeData.date)}`}
                  />
                  <Chip label="Included" size="small" color="success" variant="outlined" />
                </ListItem>
                
                <Typography variant="body2" color="text.secondary" sx={{ ml: 9, mb: 2 }}>
                  A driver will meet you at the arrivals hall with your name on a sign
                </Typography>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <LocalHospitalOutlined color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Hospital Transfer" 
                    secondary={`Date: ${formatDate(getTreatmentDate())}`}
                  />
                  <Chip label="Included" size="small" color="success" variant="outlined" />
                </ListItem>
                
                <Typography variant="body2" color="text.secondary" sx={{ ml: 9, mb: 2 }}>
                  Transportation to and from the medical facility is included
                </Typography>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <FlightTakeoffOutlined color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Airport Drop-off" 
                    secondary={`Date: ${formatDate(getDepartureDate())}`}
                  />
                  <Chip label="Included" size="small" color="success" variant="outlined" />
                </ListItem>
                
                <Typography variant="body2" color="text.secondary" sx={{ ml: 9 }}>
                  A driver will pick you up from your hotel 3 hours before your flight
                </Typography>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
        <Button 
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        
        <Box>
          <Button 
            variant="contained"
            startIcon={<GetAppOutlined />}
            onClick={handlePrintItinerary}
            sx={{ mr: 2 }}
          >
            Print Itinerary
          </Button>
          
          <Button 
            variant="outlined"
            startIcon={<ShareOutlined />}
            onClick={shareItinerary}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Itinerary;
