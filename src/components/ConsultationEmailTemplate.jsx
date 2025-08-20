// src/components/ConsultationEmailTemplate.jsx
import React from 'react';

const ConsultationEmailTemplate = ({ consultation, patientName }) => {
  if (!consultation) return null;
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #e0e0e0' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#3b82f6', margin: '0 0 10px 0' }}>Your Consultation is Confirmed</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>Hello {patientName},</p>
      </div>
      
      <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2 style={{ color: '#0369a1', fontSize: '18px', marginTop: '0' }}>Consultation Details</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 0', color: '#666', width: '40%' }}>Doctor:</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{consultation.doctorName}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#666' }}>Specialty:</td>
              <td style={{ padding: '8px 0' }}>{consultation.doctorSpecialty}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#666' }}>Date:</td>
              <td style={{ padding: '8px 0' }}>{consultation.date.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#666' }}>Time:</td>
              <td style={{ padding: '8px 0' }}>{consultation.time}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#666' }}>Duration:</td>
              <td style={{ padding: '8px 0' }}>{consultation.duration} minutes</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#666' }}>Meeting Code:</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{consultation.meetingCode}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#0369a1', fontSize: '18px' }}>How to Join</h2>
        <ol style={{ color: '#333', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Log in to your account at <a href="#" style={{ color: '#3b82f6' }}>our website</a></li>
          <li style={{ marginBottom: '10px' }}>Go to "My Consultations" section</li>
          <li style={{ marginBottom: '10px' }}>Click "Join Consultation" button when it's time</li>
          <li style={{ marginBottom: '10px' }}>Alternatively, use the meeting code: <strong>{consultation.meetingCode}</strong></li>
        </ol>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#0369a1', fontSize: '18px' }}>Preparing for Your Consultation</h2>
        <ul style={{ color: '#333', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Find a quiet, private space with good internet connection</li>
          <li style={{ marginBottom: '8px' }}>Test your camera and microphone beforehand</li>
          <li style={{ marginBottom: '8px' }}>Have your medical records or questions ready</li>
          <li style={{ marginBottom: '8px' }}>Join 5 minutes early to test your connection</li>
        </ul>
      </div>
      
      <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>Need to reschedule?</strong> You can reschedule or cancel your appointment up to 24 hours before the scheduled time from your account.
        </p>
      </div>
      
      <div style={{ textAlign: 'center', borderTop: '1px solid #e0e0e0', paddingTop: '20px', color: '#666', fontSize: '14px' }}>
        <p>Thank you for choosing our medical tourism service.</p>
        <p>If you have any questions, please contact our support team.</p>
      </div>
    </div>
  );
};

export default ConsultationEmailTemplate;
