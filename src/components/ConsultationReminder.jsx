// src/components/ConsultationReminder.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton,
  Collapse,
  Divider
} from '@mui/material';
import {
  Videocam,
  AccessTime,
  Close,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';

const ConsultationReminder = ({ consultation, onJoin, onDismiss }) => {
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [showReminder, setShowReminder] = useState(false);
  
  useEffect(() => {
    if (!consultation) return;
    
    const consultDate = new Date(consultation.date);
    const [hours, minutes] = consultation.time.split(':');
    consultDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // Calculate time difference
    const updateTimeLeft = () => {
      const now = new Date();
      const diffMs = consultDate - now;
      
      if (diffMs <= 0) {
        // Consultation is now or in the past
        if (diffMs >= -(consultation.duration * 60 * 1000)) {
          // Consultation is happening now
          setTimeLeft('now');
          setShowReminder(true);
        } else {
          // Consultation is over
          setShowReminder(false);
        }
        return;
      }
      
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      
      // Show reminder if consultation is within 30 minutes
      if (diffMinutes <= 30) {
        setShowReminder(true);
        
        if (diffMinutes <= 1) {
          setTimeLeft('1 minute');
        } else {
          setTimeLeft(`${diffMinutes} minutes`);
        }
      } else {
        setShowReminder(false);
      }
    };
    
    // Update immediately and then every minute
    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 60000);
    
    return () => clearInterval(timer);
  }, [consultation]);
  
  if (!showReminder || !consultation) return null;
  
  return (
    <Collapse in={showReminder}>
      <Paper 
        elevation={3} 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          width: { xs: 'calc(100% - 32px)', sm: 350 },
          zIndex: 1000,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Videocam sx={{ mr: 1 }} />
            <Typography variant="subtitle1">
              Upcoming Consultation
            </Typography>
          </Box>
          <Box>
            <IconButton 
              size="small" 
              color="inherit"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton 
              size="small" 
              color="inherit"
              onClick={onDismiss}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTime fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              {timeLeft === 'now' ? 'Starting now' : `Starting in ${timeLeft}`}
            </Typography>
          </Box>
          
          <Typography variant="subtitle1" gutterBottom>
            {consultation.doctorName}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            {consultation.doctorSpecialty}
          </Typography>
          
          <Collapse in={expanded}>
            <Divider sx={{ my: 1 }} />
            
            <Typography variant="body2" paragraph>
              <strong>Date:</strong> {consultation.date.toLocaleDateString()}
            </Typography>
            
            <Typography variant="body2" paragraph>
              <strong>Time:</strong> {consultation.time}
            </Typography>
            
            <Typography variant="body2" paragraph>
              <strong>Meeting Code:</strong> {consultation.meetingCode}
            </Typography>
            
            {consultation.notes && (
              <Typography variant="body2" paragraph>
                <strong>Notes:</strong> {consultation.notes}
              </Typography>
            )}
          </Collapse>
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Videocam />}
            onClick={() => onJoin(consultation)}
          >
            Join Consultation
          </Button>
        </Box>
      </Paper>
    </Collapse>
  );
};

export default ConsultationReminder;
