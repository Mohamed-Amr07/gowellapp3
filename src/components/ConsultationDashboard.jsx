// src/components/ConsultationDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Divider, 
  Chip,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Videocam,
  CalendarToday,
  AccessTime,
  Person,
  Edit,
  Delete,
  Add,
  Close,
  ContentCopy,
  EventAvailable
} from '@mui/icons-material';

const ConsultationDashboard = ({ bookingReference, patientName }) => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock data for consultations
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const mockConsultations = [
      {
        id: 'c1',
        doctorName: 'Dr. Sarah Smith',
        doctorSpecialty: 'Dental Surgery',
        doctorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        time: '14:30',
        duration: 30, // minutes
        meetingCode: 'VC-ABC123',
        status: 'scheduled',
        notes: 'Pre-treatment consultation for dental implants'
      },
      {
        id: 'c2',
        doctorName: 'Dr. Raj Patel',
        doctorSpecialty: 'Prosthodontics',
        doctorPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        time: '10:15',
        duration: 30, // minutes
        meetingCode: 'VC-DEF456',
        status: 'completed',
        notes: 'Follow-up consultation after initial assessment'
      },
      {
        id: 'c3',
        doctorName: 'Dr. Li Chen',
        doctorSpecialty: 'Oral Surgery',
        doctorPhoto: 'https://randomuser.me/api/portraits/women/79.jpg',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        time: '09:00',
        duration: 45, // minutes
        meetingCode: 'VC-GHI789',
        status: 'scheduled',
        notes: 'Detailed treatment plan discussion'
      }
    ];
    
    setConsultations(mockConsultations);
  }, []);
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Function to check if a consultation is joinable
  const isConsultationJoinable = (consultation) => {
    const consultDate = new Date(consultation.date);
    const [hours, minutes] = consultation.time.split(':');
    consultDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const diffMs = consultDate - currentTime;
    
    // Joinable if within 10 minutes before or 30 minutes after scheduled time
    return diffMs <= 10 * 60 * 1000 && diffMs >= -(consultation.duration * 60 * 1000);
  };
  
  // Function to get time until consultation
  const getTimeUntilConsultation = (consultation) => {
    const consultDate = new Date(consultation.date);
    const [hours, minutes] = consultation.time.split(':');
    consultDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const diffMs = consultDate - currentTime;
    
    if (diffMs <= 0) return 'now';
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}, ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}, ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    }
  };
  
  // Function to join consultation
  const joinConsultation = (consultation) => {
    // In a real app, this would navigate to the video consultation page
    // For now, we'll just show an alert
    setNotification({
      open: true,
      message: `Joining consultation with ${consultation.doctorName}. Meeting code: ${consultation.meetingCode}`,
      severity: 'success'
    });
    
    // This is where you would navigate to the video consultation page
    // window.setCurrentView('videoConsultation');
    // window.setMeetingCode(consultation.meetingCode);
  };
  
  // Function to copy meeting code
  const copyMeetingCode = (code) => {
    navigator.clipboard.writeText(code);
    setNotification({
      open: true,
      message: 'Meeting code copied to clipboard',
      severity: 'success'
    });
  };
  
  // Function to add to calendar
  const addToCalendar = (consultation) => {
    const consultDate = new Date(consultation.date);
    const [hours, minutes] = consultation.time.split(':');
    consultDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const endDate = new Date(consultDate.getTime() + consultation.duration * 60 * 1000);
    
    const event = {
      title: `Medical Consultation with ${consultation.doctorName}`,
      description: `Video consultation for medical treatment. Meeting code: ${consultation.meetingCode}`,
      startTime: consultDate,
      endTime: endDate,
      location: 'Online Video Consultation'
    };
    
    // Create Google Calendar link
    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.append('text', event.title);
    googleCalendarUrl.searchParams.append('details', event.description);
    googleCalendarUrl.searchParams.append('location', event.location);
    googleCalendarUrl.searchParams.append('dates', 
      `${consultDate.toISOString().replace(/-|:|\.\d+/g, '')}/` +
      `${endDate.toISOString().replace(/-|:|\.\d+/g, '')}`
    );
    
    // Open in new tab
    window.open(googleCalendarUrl.toString(), '_blank');
  };
  
  // Function to handle consultation reschedule
  const handleReschedule = () => {
    // In a real app, you would make an API call to reschedule the consultation
    setConsultations(prevConsultations => 
      prevConsultations.map(c => 
        c.id === selectedConsultation.id 
          ? { ...c, date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), time: '15:00' } 
          : c
      )
    );
    
    setNotification({
      open: true,
      message: `Consultation with ${selectedConsultation.doctorName} has been rescheduled`,
      severity: 'success'
    });
    
    setIsRescheduleDialogOpen(false);
    setSelectedConsultation(null);
  };
  
  // Function to handle consultation cancellation
  const handleCancel = () => {
    // In a real app, you would make an API call to cancel the consultation
    setConsultations(prevConsultations => 
      prevConsultations.map(c => 
        c.id === selectedConsultation.id 
          ? { ...c, status: 'cancelled' } 
          : c
      )
    );
    
    setNotification({
      open: true,
      message: `Consultation with ${selectedConsultation.doctorName} has been cancelled`,
      severity: 'info'
    });
    
    setIsCancelDialogOpen(false);
    setSelectedConsultation(null);
  };
  
  // Function to close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  // Group consultations by status
  const upcomingConsultations = consultations.filter(c => c.status === 'scheduled');
  const pastConsultations = consultations.filter(c => c.status === 'completed' || c.status === 'cancelled');
  
  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        My Consultations
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your scheduled video consultations with medical specialists.
      </Typography>
      
      {/* Upcoming Consultations */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Upcoming Consultations
      </Typography>
      
      {upcomingConsultations.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography color="text.secondary">
            You don't have any upcoming consultations.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            sx={{ mt: 2 }}
            onClick={() => alert('This would open the consultation scheduling page')}
          >
            Schedule New Consultation
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {upcomingConsultations.map(consultation => (
            <Grid item xs={12} md={6} lg={4} key={consultation.id}>
              <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={consultation.doctorPhoto} sx={{ width: 56, height: 56, mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{consultation.doctorName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {consultation.doctorSpecialty}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">Date:</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {consultation.date.toLocaleDateString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">Time:</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{consultation.time}</Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">Patient:</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{patientName || 'You'}</Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2, p: 1.5, bgcolor: 'primary.50', borderRadius: 1 }}>
                    <Typography variant="subtitle2">Meeting Code:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {consultation.meetingCode}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => copyMeetingCode(consultation.meetingCode)}
                        color="primary"
                      >
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 2, p: 1.5, bgcolor: 'success.50', borderRadius: 1 }}>
                    <Typography variant="subtitle2">Time until consultation:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                      {getTimeUntilConsultation(consultation)}
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color={isConsultationJoinable(consultation) ? "success" : "primary"}
                    startIcon={<Videocam />}
                    fullWidth
                    disabled={!isConsultationJoinable(consultation)}
                    onClick={() => joinConsultation(consultation)}
                  >
                    {isConsultationJoinable(consultation) ? "Join Now" : "Join"}
                  </Button>
                </CardActions>
                
                <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    startIcon={<EventAvailable />}
                    onClick={() => addToCalendar(consultation)}
                  >
                    Add to Calendar
                  </Button>
                  
                  <Box>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => {
                        setSelectedConsultation(consultation);
                        setIsRescheduleDialogOpen(true);
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => {
                        setSelectedConsultation(consultation);
                        setIsCancelDialogOpen(true);
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Past Consultations */}
      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Past Consultations
      </Typography>
      
      {pastConsultations.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography color="text.secondary">
            You don't have any past consultations.
          </Typography>
        </Paper>
      ) : (
        <Paper variant="outlined">
          {pastConsultations.map((consultation, index) => (
            <React.Fragment key={consultation.id}>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={1}>
                    <Avatar src={consultation.doctorPhoto} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle1">{consultation.doctorName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {consultation.doctorSpecialty}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body2" color="text.secondary">Date</Typography>
                    <Typography variant="body2">
                      {consultation.date.toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body2" color="text.secondary">Time</Typography>
                    <Typography variant="body2">{consultation.time}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip 
                      size="small" 
                      label={consultation.status === 'completed' ? 'Completed' : 'Cancelled'} 
                      color={consultation.status === 'completed' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => alert('This would show consultation details and notes')}
                    >
                      View Details
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {index < pastConsultations.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Paper>
      )}
      
      {/* Reschedule Dialog */}
      <Dialog 
        open={isRescheduleDialogOpen} 
        onClose={() => setIsRescheduleDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Reschedule Consultation
          <IconButton
            aria-label="close"
            onClick={() => setIsRescheduleDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedConsultation && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Current appointment with {selectedConsultation.doctorName}
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedConsultation.date.toLocaleDateString()} at {selectedConsultation.time}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Select a new date and time:
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="New Date"
                    type="date"
                    defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="New Time"
                    type="time"
                    defaultValue="15:00"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Note: Rescheduling is subject to doctor availability. You will receive a confirmation email once the new time is confirmed.
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRescheduleDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleReschedule}
          >
            Reschedule
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Cancel Dialog */}
      <Dialog 
        open={isCancelDialogOpen} 
        onClose={() => setIsCancelDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Cancel Consultation
          <IconButton
            aria-label="close"
            onClick={() => setIsCancelDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedConsultation && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Are you sure you want to cancel your consultation with {selectedConsultation.doctorName}?
              </Typography>
              <Typography variant="body2" paragraph>
                Scheduled for {selectedConsultation.date.toLocaleDateString()} at {selectedConsultation.time}
              </Typography>
              
              <Alert severity="warning" sx={{ mt: 2 }}>
                Cancellations made less than 24 hours before the appointment may incur a fee.
              </Alert>
              
              <TextField
                label="Reason for cancellation (optional)"
                multiline
                rows={3}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCancelDialogOpen(false)}>
            Keep Appointment
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleCancel}
          >
            Cancel Appointment
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConsultationDashboard;
