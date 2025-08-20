import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';

const ItineraryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingReference, completeData } = route.params || {};
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (dateString) => {
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
    try {
      const result = await Share.share({
        message: `My Medical Tourism Itinerary - Reference: ${bookingReference}\n\n` +
          `Treatment: ${completeData.treatment}\n` +
          `Destination: ${completeData.destination}\n` +
          `Arrival: ${formatDate(completeData.date)}\n` +
          `Departure: ${formatDate(getDepartureDate())}\n\n` +
          `Download the app for more details.`,
        title: 'My Medical Tourism Itinerary'
      });
    } catch (error) {
      alert('Error sharing itinerary');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Itinerary</Text>
        <Text style={styles.reference}>Booking Ref: {bookingReference}</Text>
      </View>
      
      <View style={styles.travelerInfo}>
        <View style={styles.travelerHeader}>
          <Text style={styles.travelerTitle}>Traveler Information</Text>
          <TouchableOpacity onPress={shareItinerary}>
            <Ionicons name="share-outline" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.travelerDetails}>
          <View style={styles.travelerPhotoContainer}>
            {completeData.documents.photo ? (
              <Image 
                source={{ uri: completeData.documents.photo.uri }} 
                style={styles.travelerPhoto} 
              />
            ) : (
              <View style={styles.noPhotoContainer}>
                <FontAwesome5 name="user" size={40} color="#9ca3af" />
              </View>
            )}
          </View>
          
          <View style={styles.travelerData}>
            <Text style={styles.travelerName}>{completeData.personalInfo.fullName}</Text>
            <Text style={styles.travelerDetail}>
              <Text style={styles.detailLabel}>Nationality:</Text> {completeData.personalInfo.nationality}
            </Text>
            <Text style={styles.travelerDetail}>
              <Text style={styles.detailLabel}>Passport:</Text> {completeData.personalInfo.passportNumber}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="hospital" size={18} color="#3b82f6" style={styles.sectionIcon} />
          Treatment Details
        </Text>
        
        <View style={styles.treatmentCard}>
          <Text style={styles.treatmentName}>{completeData.treatment}</Text>
          <Text style={styles.treatmentLocation}>
            {getDestinationFlag(completeData.destination)} {completeData.destination}
          </Text>
          <Text style={styles.treatmentDate}>
            Scheduled for: {formatDate(getTreatmentDate())}
          </Text>
          
          <View style={styles.treatmentNotes}>
            <Text style={styles.notesTitle}>Pre-Treatment Instructions:</Text>
            <Text style={styles.notesText}>
              • Avoid eating or drinking 8 hours before the procedure{'\n'}
              • Bring all your medical records{'\n'}
              • Arrive 1 hour before your scheduled appointment{'\n'}
              • Wear comfortable clothing
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="plane" size={18} color="#3b82f6" style={styles.sectionIcon} />
          Flight Information
        </Text>
        
        <View style={styles.flightCard}>
          <View style={styles.flightHeader}>
            <Text style={styles.flightTitle}>Outbound Flight</Text>
            <Text style={styles.flightDate}>{formatDate(completeData.date)}</Text>
          </View>
          
          {completeData.selectedFlight ? (
            <View style={styles.flightDetails}>
              <View style={styles.flightRoute}>
                <View style={styles.flightPoint}>
                  <Text style={styles.flightTime}>
                    {formatTime(completeData.selectedFlight.itineraries[0].segments[0].departure.at)}
                  </Text>
                  <Text style={styles.flightCity}>
                    {completeData.selectedFlight.itineraries[0].segments[0].departure.iataCode}
                  </Text>
                </View>
                
                <View style={styles.flightLine}>
                  <View style={styles.line} />
                  <FontAwesome5 name="plane" size={16} color="#6b7280" />
                </View>
                
                <View style={styles.flightPoint}>
                  <Text style={styles.flightTime}>
                    {formatTime(completeData.selectedFlight.itineraries[0].segments[completeData.selectedFlight.itineraries[0].segments.length - 1].arrival.at)}
                  </Text>
                  <Text style={styles.flightCity}>
                    {completeData.selectedFlight.itineraries[0].segments[completeData.selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode}
                  </Text>
                </View>
              </View>
              
              <View style={styles.flightInfo}>
                <Text style={styles.flightInfoText}>
                  Flight: {completeData.selectedFlight.itineraries[0].segments[0].carrierCode} 
                  {completeData.selectedFlight.itineraries[0].segments[0].number}
                </Text>
                <Text style={styles.flightInfoText}>
                  Class: Economy
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.flightDetails}>
              <View style={styles.flightRoute}>
                <View style={styles.flightPoint}>
                  <Text style={styles.flightTime}>TBD</Text>
                  <Text style={styles.flightCity}>{completeData.departureCity}</Text>
                </View>
                
                <View style={styles.flightLine}>
                  <View style={styles.line} />
                  <FontAwesome5 name="plane" size={16} color="#6b7280" />
                </View>
                
                <View style={styles.flightPoint}>
                  <Text style={styles.flightTime}>TBD</Text>
                  <Text style={styles.flightCity}>{completeData.destination}</Text>
                </View>
              </View>
              
              <View style={styles.flightInfo}>
                <Text style={styles.flightInfoText}>
                  Flight details will be confirmed 48 hours before departure
                </Text>
              </View>
            </View>
          )}
          
          <Divider style={styles.divider} />
          
          <View style={styles.flightHeader}>
            <Text style={styles.flightTitle}>Return Flight</Text>
            <Text style={styles.flightDate}>{formatDate(getDepartureDate())}</Text>
          </View>
          
          <View style={styles.flightDetails}>
            <View style={styles.flightRoute}>
              <View style={styles.flightPoint}>
                <Text style={styles.flightTime}>TBD</Text>
                <Text style={styles.flightCity}>{completeData.destination}</Text>
              </View>
              
              <View style={styles.flightLine}>
                <View style={styles.line} />
                <FontAwesome5 name="plane" size={16} color="#6b7280" style={styles.returnPlane} />
              </View>
              
              <View style={styles.flightPoint}>
                <Text style={styles.flightTime}>TBD</Text>
                <Text style={styles.flightCity}>{completeData.departureCity}</Text>
              </View>
            </View>
            
            <View style={styles.flightInfo}>
              <Text style={styles.flightInfoText}>
                Return flight details will be confirmed during your stay
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="hotel" size={18} color="#3b82f6" style={styles.sectionIcon} />
          Accommodation
        </Text>
        
        <View style={styles.hotelCard}>
          {completeData.selectedHotel ? (
            <>
              <Text style={styles.hotelName}>{completeData.selectedHotel.name}</Text>
              <Text style={styles.hotelAddress}>{completeData.selectedHotel.location}</Text>
              <View style={styles.hotelDates}>
                <View style={styles.dateBlock}>
                  <Text style={styles.dateLabel}>Check-in</Text>
                  <Text style={styles.dateValue}>{formatDate(completeData.date)}</Text>
                </View>
                <View style={styles.dateBlock}>
                  <Text style={styles.dateLabel}>Check-out</Text>
                  <Text style={styles.dateValue}>{formatDate(getDepartureDate())}</Text>
                </View>
              </View>
              <Text style={styles.hotelRoom}>
                Room Type: {completeData.accommodation === 'standard' ? 'Standard Room' : 
                           completeData.accommodation === 'deluxe' ? 'Deluxe Room' : 
                           completeData.accommodation === 'suite' ? 'Suite' : 'Recovery Room'}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.hotelName}>
                {completeData.accommodation === 'standard' ? 'Standard Hotel' : 
                 completeData.accommodation === 'deluxe' ? 'Deluxe Hotel' : 
                 completeData.accommodation === 'suite' ? 'Suite Accommodation' : 'Recovery Center'}
              </Text>
              <Text style={styles.hotelAddress}>{completeData.destination}</Text>
              <View style={styles.hotelDates}>
                <View style={styles.dateBlock}>
                  <Text style={styles.dateLabel}>Check-in</Text>
                  <Text style={styles.dateValue}>{formatDate(completeData.date)}</Text>
                </View>
                <View style={styles.dateBlock}>
                  <Text style={styles.dateLabel}>Check-out</Text>
                  <Text style={styles.dateValue}>{formatDate(getDepartureDate())}</Text>
                </View>
              </View>
              <Text style={styles.hotelRoom}>
                Room Type: {completeData.accommodation === 'standard' ? 'Standard Room' : 
                           completeData.accommodation === 'deluxe' ? 'Deluxe Room' : 
                           completeData.accommodation === 'suite' ? 'Suite' : 'Recovery Room'}
              </Text>
              <Text style={styles.hotelNote}>
                Hotel details will be confirmed 48 hours before arrival
              </Text>
            </>
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="car" size={18} color="#3b82f6" style={styles.sectionIcon} />
          Transportation
        </Text>
        
        <View style={styles.transportCard}>
          <View style={styles.transportItem}>
            <View style={styles.transportIcon}>
              <FontAwesome5 name="plane-arrival" size={18} color="#3b82f6" />
            </View>
            <View style={styles.transportInfo}>
              <Text style={styles.transportTitle}>Airport Pickup</Text>
              <Text style={styles.transportDetail}>
                Date: {formatDate(completeData.date)}
              </Text>
              <Text style={styles.transportDetail}>
                A driver will meet you at the arrivals hall with your name on a sign
              </Text>
            </View>
          </View>
          
          <View style={styles.transportItem}>
            <View style={styles.transportIcon}>
              <FontAwesome5 name="hospital-alt" size={18} color="#3b82f6" />
            </View>
            <View style={styles.transportInfo}>
              <Text style={styles.transportTitle}>Hospital Transfer</Text>
              <Text style={styles.transportDetail}>
                Date: {formatDate(getTreatmentDate())}
              </Text>
              <Text style={styles.transportDetail}>
                Transportation to and from the medical facility is included
              </Text>
            </View>
          </View>
          
          <View style={styles.transportItem}>
            <View style={styles.transportIcon}>
              <FontAwesome5 name="plane-departure" size={18} color="#3b82f6" />
            </View>
            <View style={styles.transportInfo}>
              <Text style={styles.transportTitle}>Airport Drop-off</Text>
              <Text style={styles.transportDetail}>
                Date: {formatDate(getDepartureDate())}
              </Text>
              <Text style={styles.transportDetail}>
                A driver will pick you up from your hotel 3 hours before your flight
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="phone-alt" size={18} color="#3b82f6" style={styles.sectionIcon} />
          Support Contacts
        </Text>
        
        <View style={styles.contactsCard}>
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <FontAwesome5 name="user-nurse" size={18} color="#3b82f6" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Medical Coordinator</Text>
              <Text style={styles.contactDetail}>+1 (555) 123-4567</Text>
              <Text style={styles.contactDetail}>Available 24/7 during your stay</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <FontAwesome5 name="language" size={18} color="#3b82f6" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Translator</Text>
              <Text style={styles.contactDetail}>+1 (555) 987-6543</Text>
              <Text style={styles.contactDetail}>Available during medical appointments</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <FontAwesome5 name="headset" size={18} color="#3b82f6" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Customer Support</Text>
              <Text style={styles.contactDetail}>+1 (800) 555-1234</Text>
              <Text style={styles.contactDetail}>support@medicaltourism.com</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <FontAwesome5 name="ambulance" size={18} color="#ef4444" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Emergency (Local)</Text>
              <Text style={styles.contactDetail}>112</Text>
              <Text style={styles.contactDetail}>For immediate medical assistance</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={() => alert('Itinerary downloaded to your device')}
        >
          <FontAwesome5 name="file-pdf" size={16} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.downloadButtonText}>Download PDF</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={shareItinerary}
        >
          <Ionicons name="share-outline" size={16} color="#3b82f6" style={styles.buttonIcon} />
          <Text style={styles.shareButtonText}>Share Itinerary</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  reference: {
    fontSize: 14,
    color: '#e0f2fe',
    marginTop: 4,
  },
  travelerInfo: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  travelerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e7ff',
  },
  travelerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  travelerDetails: {
    flexDirection: 'row',
    padding: 16,
  },
  travelerPhotoContainer: {
    marginRight: 16,
  },
  travelerPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  noPhotoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  travelerData: {
    flex: 1,
  },
  travelerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  travelerDetail: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 2,
  },
  detailLabel: {
    fontWeight: '500',
    color: '#6b7280',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 8,
  },
  treatmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  treatmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  treatmentLocation: {
    fontSize: 16,
    color: '#4b5563',
    marginTop: 4,
  },
  treatmentDate: {
    fontSize: 15,
    color: '#3b82f6',
    fontWeight: '500',
    marginTop: 8,
  },
  treatmentNotes: {
    marginTop: 16,
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  notesText: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  flightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  flightDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  flightDetails: {
    marginBottom: 16,
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  flightPoint: {
    alignItems: 'center',
    width: 80,
  },
  flightTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  flightCity: {
    fontSize: 14,
    color: '#6b7280',
  },
  flightLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  line: {
    height: 1,
    backgroundColor: '#d1d5db',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  returnPlane: {
    transform: [{ rotate: '180deg' }],
  },
  flightInfo: {
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 6,
  },
  flightInfoText: {
    fontSize: 13,
    color: '#4b5563',
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#e5e7eb',
  },
  hotelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  hotelAddress: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  hotelDates: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 12,
  },
  dateBlock: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  hotelRoom: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  hotelNote: {
    fontSize: 13,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 12,
  },
  transportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transportItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  transportIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transportInfo: {
    flex: 1,
  },
  transportTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transportDetail: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 2,
  },
  contactsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f6',
    marginLeft: 8,
  },
  shareButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default ItineraryScreen;
