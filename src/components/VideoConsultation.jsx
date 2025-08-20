// src/components/VideoConsultation.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  IconButton,
  TextField,
  Menu,
  MenuItem, // Import MenuItem from MUI
  Divider,
  Avatar,
  Tooltip,
  CircularProgress
} from '@mui/material'; // Make sure to import all MUI components you're using

import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  ScreenShare,
  StopScreenShare,
  Chat,
  Close,
  Send,
  Settings,
  CallEnd,
  VolumeUp,
  VolumeOff,
  MoreVert,
  ContentCopy
} from '@mui/icons-material';

const VideoConsultation = ({ bookingReference, doctorId, patientName, scheduledTime }) => {
  // State variables
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState('good'); // 'good', 'fair', 'poor'
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Timer for call duration
  useEffect(() => {
    let timer;
    if (isConnected) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isConnected]);
  
  // Format elapsed time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Simulate connection to the call
  const connectToCall = () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      
      // Add a welcome message
      setMessages([
        {
          id: 1,
          sender: 'System',
          text: `Welcome to your consultation. Meeting ID: ${bookingReference}`,
          timestamp: new Date()
        }
      ]);
      
      // Simulate doctor joining after 3 seconds
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: 2,
            sender: doctorId,
            text: `Hello ${patientName}, how are you feeling today?`,
            timestamp: new Date()
          }
        ]);
      }, 3000);
    }, 2000);
  };
  
  // Handle camera toggle
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    // In a real implementation, you would turn the camera on/off here
  };
  
  // Handle microphone toggle
  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    // In a real implementation, you would turn the mic on/off here
  };
  
  // Handle screen sharing
  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In a real implementation, you would handle screen sharing here
  };
  
  // Handle chat toggle
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  // Handle sending a message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: patientName,
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate doctor response after 2 seconds
    if (messages.length % 2 === 0) {
      setTimeout(() => {
        const responses = [
          "I understand. Let me explain the procedure in more detail.",
          "That's good to hear. Have you been following the pre-treatment instructions?",
          "Do you have any questions about the medication I prescribed?",
          "I'll make a note of that in your medical record.",
          "Let's schedule a follow-up consultation after your procedure."
        ];
        
        const responseMessage = {
          id: messages.length + 2,
          sender: doctorId,
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };
  
  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Handle settings menu
  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  
  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };
  
  // Handle audio mute
  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    // In a real implementation, you would mute/unmute the audio here
  };
  
  // Handle call end
  const endCall = () => {
    // In a real implementation, you would disconnect from the call here
    if (window.confirm('Are you sure you want to end the consultation?')) {
      setIsConnected(false);
      setElapsedTime(0);
    }
  };
  
  // Copy meeting ID to clipboard
  const copyMeetingId = () => {
    navigator.clipboard.writeText(bookingReference);
    alert('Meeting ID copied to clipboard');
    handleSettingsClose();
  };
  
  // Simulate random connection quality changes
  useEffect(() => {
    if (isConnected) {
      const qualityTimer = setInterval(() => {
        const qualities = ['good', 'fair', 'poor'];
        const weights = [0.7, 0.2, 0.1]; // 70% chance of good, 20% fair, 10% poor
        
        const random = Math.random();
        let qualityIndex = 0;
        let sum = weights[0];
        
        while (random > sum && qualityIndex < weights.length - 1) {
          qualityIndex++;
          sum += weights[qualityIndex];
        }
        
        setConnectionQuality(qualities[qualityIndex]);
      }, 10000); // Check every 10 seconds
      
      return () => clearInterval(qualityTimer);
    }
  }, [isConnected]);
  
  // Get connection quality indicator color
  const getQualityColor = () => {
    switch (connectionQuality) {
      case 'good': return 'success.main';
      case 'fair': return 'warning.main';
      case 'poor': return 'error.main';
      default: return 'success.main';
    }
  };
  
  // Get connection quality text
  const getQualityText = () => {
    switch (connectionQuality) {
      case 'good': return 'Good Connection';
      case 'fair': return 'Fair Connection';
      case 'poor': return 'Poor Connection';
      default: return 'Good Connection';
    }
  };
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.900' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'background.paper', 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Videocam color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Medical Consultation
          </Typography>
          {isConnected && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              ml: 2,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: 'grey.100'
            }}>
              <Typography variant="body2" color="text.secondary">
                {formatTime(elapsedTime)}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isConnected && (
            <Tooltip title={getQualityText()}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: getQualityColor(),
                mr: 2
              }} />
            </Tooltip>
          )}
          
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            Meeting ID: {bookingReference}
          </Typography>
          
          <IconButton 
            size="small" 
            onClick={handleSettingsClick}
            aria-controls="settings-menu"
            aria-haspopup="true"
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="settings-menu"
            anchorEl={settingsAnchorEl}
            open={Boolean(settingsAnchorEl)}
            onClose={handleSettingsClose}
          >
            <MenuItem onClick={copyMeetingId}>
              <ContentCopy fontSize="small" sx={{ mr: 1 }} />
              Copy Meeting ID
            </MenuItem>
            <MenuItem onClick={handleSettingsClose}>
              <Settings fontSize="small" sx={{ mr: 1 }} />
              Audio/Video Settings
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      
      {/* Main content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden'
      }}>
        {/* Video area */}
        <Box sx={{ 
          flex: isChatOpen ? 3 : 1, 
          position: 'relative',
          bgcolor: 'grey.900',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {!isConnected ? (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h5" color="white" gutterBottom>
                Ready to join your consultation?
              </Typography>
              <Typography variant="body1" color="grey.400" paragraph>
                Consultation with {doctorId}
              </Typography>
              <Typography variant="body2" color="grey.500" paragraph>
                Scheduled for: {new Date(scheduledTime).toLocaleString()}
              </Typography>
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={connectToCall}
                disabled={isConnecting}
                startIcon={isConnecting ? <CircularProgress size={20} color="inherit" /> : <Videocam />}
                sx={{ mt: 2 }}
              >
                {isConnecting ? 'Connecting...' : 'Join Consultation'}
              </Button>
            </Box>
          ) : (
            <>
              {/* Remote video (doctor) */}
              <Box 
                component="div"
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  bgcolor: 'grey.800',
                  position: 'relative'
                }}
              >
                {/* Placeholder for remote video */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}>
                  <Avatar 
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                    alt={doctorId}
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                  />
                  <Typography variant="h6" color="white">
                    {doctorId}
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Doctor
                  </Typography>
                </Box>
                
                {/* Local video (patient) - small overlay */}
                <Paper
                  elevation={8}
                  sx={{ 
                    position: 'absolute', 
                    bottom: 16, 
                    right: 16,
                    width: 180,
                    height: 120,
                    bgcolor: 'grey.700',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 2
                  }}
                >
                  {isCameraOn ? (
                    <Box 
                      ref={localVideoRef}
                      component="div"
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        bgcolor: 'grey.600',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {/* Placeholder for local video */}
                      <Avatar 
                        sx={{ width: 48, height: 48 }}
                        alt={patientName}
                      >
                        {patientName?.charAt(0) || 'P'}
                      </Avatar>
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center' }}>
                      <VideocamOff sx={{ color: 'grey.500', mb: 1 }} />
                      <Typography variant="caption" color="grey.500">
                        Camera Off
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Box>
            </>
          )}
        </Box>
        
        {/* Chat area */}
        {isConnected && isChatOpen && (
          <Paper
            sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              borderLeft: 1,
              borderColor: 'divider',
              height: { xs: 300, md: '100%' }
            }}
          >
            <Box sx={{ 
              p: 2, 
              borderBottom: 1, 
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="subtitle1">
                Chat
              </Typography>
              <IconButton size="small" onClick={toggleChat}>
                <Close fontSize="small" />
              </IconButton>
            </Box>
            
            <Box 
              ref={chatContainerRef}
              sx={{ 
                flex: 1, 
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              {messages.map(message => (
                <Box 
                  key={message.id}
                  sx={{ 
                    alignSelf: message.sender === patientName ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{ 
                      p: 1.5,
                      bgcolor: message.sender === 'System' 
                        ? 'grey.100' 
                        : message.sender === patientName 
                          ? 'primary.light' 
                          : 'background.paper',
                      borderRadius: 2,
                      ...(message.sender === patientName && {
                        color: 'white'
                      })
                    }}
                  >
                    {message.sender !== patientName && message.sender !== 'System' && (
                      <Typography variant="caption" fontWeight="bold" display="block">
                        {message.sender}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      {message.text}
                    </Typography>
                    <Typography variant="caption" color={message.sender === patientName ? 'grey.200' : 'text.secondary'} sx={{ display: 'block', mt: 0.5, textAlign: 'right' }}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
            
            <Box sx={{ 
              p: 2, 
              borderTop: 1, 
              borderColor: 'divider',
              display: 'flex',
              gap: 1
            }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<Send />}
                onClick={sendMessage}
              >
                Send
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
      
      {/* Controls */}
      {isConnected && (
        <Paper
          elevation={3}
          sx={{ 
            p: 2, 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Tooltip title={isMicOn ? "Turn off microphone" : "Turn on microphone"}>
            <IconButton 
              color={isMicOn ? "primary" : "default"}
              onClick={toggleMic}
              sx={{ 
                bgcolor: isMicOn ? 'primary.50' : 'grey.200',
                '&:hover': {
                  bgcolor: isMicOn ? 'primary.100' : 'grey.300',
                }
              }}
            >
              {isMicOn ? <Mic /> : <MicOff />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isCameraOn ? "Turn off camera" : "Turn on camera"}>
            <IconButton 
              color={isCameraOn ? "primary" : "default"}
              onClick={toggleCamera}
              sx={{ 
                bgcolor: isCameraOn ? 'primary.50' : 'grey.200',
                '&:hover': {
                  bgcolor: isCameraOn ? 'primary.100' : 'grey.300',
                }
              }}
            >
              {isCameraOn ? <Videocam /> : <VideocamOff />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isScreenSharing ? "Stop sharing screen" : "Share screen"}>
            <IconButton 
              color={isScreenSharing ? "primary" : "default"}
              onClick={toggleScreenShare}
              sx={{ 
                bgcolor: isScreenSharing ? 'primary.50' : 'grey.200',
                '&:hover': {
                  bgcolor: isScreenSharing ? 'primary.100' : 'grey.300',
                }
              }}
            >
              {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isAudioMuted ? "Unmute audio" : "Mute audio"}>
            <IconButton 
              color={!isAudioMuted ? "primary" : "default"}
              onClick={toggleAudio}
              sx={{ 
                bgcolor: !isAudioMuted ? 'primary.50' : 'grey.200',
                '&:hover': {
                  bgcolor: !isAudioMuted ? 'primary.100' : 'grey.300',
                }
              }}
            >
              {isAudioMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isChatOpen ? "Close chat" : "Open chat"}>
            <IconButton 
              color={isChatOpen ? "primary" : "default"}
              onClick={toggleChat}
              sx={{ 
                bgcolor: isChatOpen ? 'primary.50' : 'grey.200',
                '&:hover': {
                  bgcolor: isChatOpen ? 'primary.100' : 'grey.300',
                }
              }}
            >
              <Chat />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="End call">
            <IconButton 
              color="error"
              onClick={endCall}
              sx={{ 
                bgcolor: 'error.50',
                '&:hover': {
                  bgcolor: 'error.100',
                }
              }}
            >
              <CallEnd />
            </IconButton>
          </Tooltip>
        </Paper>
      )}
    </Box>
  );
};

export default VideoConsultation;
