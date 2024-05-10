import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity, ImageBackground, Image ,ScrollView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format, differenceInDays } from 'date-fns';
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import Header from '../components/header';


const CalendarInput = () => {
  const mainBackground = require('../assets/images/main.jpg');
  const { id, price, hotelname, place } = useLocalSearchParams();
  const [isCheckinDatePickerVisible, setCheckinDatePickerVisibility] = useState(false);
  const [isCheckoutDatePickerVisible, setCheckoutDatePickerVisibility] = useState(false);
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [totalNights, setTotalNights] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cvv: '',
    visaNumber: '',
    cardHolderName: '',
    expiryDate: '',
  });
  const [paymentMessage, setPaymentMessage] = useState('');

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUser(data);
            setName(data.username);
            setEmail(data.email);
          } else {
            console.log("No such document!");
            // Handle case where user data does not exist
          }
        } else {
          console.log("No user is currently logged in!");
          // Handle case where no user is logged in
          // For example, redirect the user to the login screen
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user. Please try again later.');
        // Handle error
      }
    };


    handleGetUser();
  }, []);

  const showCheckinDatePicker = () => {
    setCheckinDatePickerVisibility(true);
  };

  const hideCheckinDatePicker = () => {
    setCheckinDatePickerVisibility(false);
  };

  const handleCheckinConfirm = (date) => {
    hideCheckinDatePicker();
    setCheckinDate(date);
  };

  const showCheckoutDatePicker = () => {
    setCheckoutDatePickerVisibility(true);
  };

  const hideCheckoutDatePicker = () => {
    setCheckoutDatePickerVisibility(false);
  };

  const handleCheckoutConfirm = (date) => {
    hideCheckoutDatePicker();
    setCheckoutDate(date);
    calculateNightsAndPrice(date);
  };

  const calculateNightsAndPrice = (checkoutDate) => {
    if (checkinDate && checkoutDate) {
      const nights = differenceInDays(checkoutDate, checkinDate);
  
      // Extract numerical value from price string
      const numericalPrice = parseFloat(price.replace(/\D/g, '')); // Remove non-numeric characters
  
      const totalPrice = numericalPrice * nights;
      setTotalNights(nights);
      setTotalPrice(totalPrice);
      console.log(totalPrice);
      console.log(numericalPrice);
      console.log(nights);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentDetailsChange = (key, value) => {
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const bookNow = async () => {
    try {
      // Ensure required fields are not empty
      if (
        !auth.currentUser ||
        !name ||
        !email ||
        !hotelname ||
        !price ||
        !checkinDate ||
        !checkoutDate ||
        !paymentMethod
      ) {
        throw new Error("Missing required fields.");
      }

      let reservationData = {
        userId: auth.currentUser.uid,
        hotelId: id,
        username: name,
        email: email,
        hotelName: hotelname,
        hotelPrice: price,
        checkinDate: format(checkinDate, 'dd/MM/yyyy'),
        checkoutDate: format(checkoutDate, 'dd/MM/yyyy'),
        totalNights: totalNights,
        totalPrice: totalPrice,
        placehotel: place,
        paymentMethod: paymentMethod,
      };

      // Add payment details based on the selected payment method
      if (paymentMethod === 'visa') {
        reservationData = {
          ...reservationData,
          paymentDetails: paymentDetails,
        };
      } else {
        // Inform the user that the hotel has been informed of the reservation
        setPaymentMessage('We have informed the hotel of your reservation. Thank you!');
      }

      await setDoc(doc(db, "Reservations", auth.currentUser.uid + id), reservationData);
      // Navigate or perform any action after successful booking
    } catch (error) {
      console.error('Error booking:', error);
      // Handle error
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView>
      {/* <ImageBackground source={mainBackground} style={styles.background} > */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>EgyptToGo</Text>
      </View> */}
      <View style={styles.header}>

  <Text style={styles.headerText}>Reservation form</Text>
</View>
      <View style={styles.containerBook}>
        <Text style={styles.titles}> User Name : {name}</Text>
        <Text style={styles.titles}>Email: {email}</Text>
        <Text style={styles.titles}>Hotel Name : {hotelname}</Text>
        <Text style={styles.titles}>Price Per night: {price}</Text>
        <View style={styles.dateContainer}>
          <View style={styles.datePicker}>
          <View style={styles.datePickerContainer}>
  <View style={styles.datePicker}>
    <DateTimePickerModal
      isVisible={isCheckinDatePickerVisible}
      mode="date"
      onConfirm={handleCheckinConfirm}
      onCancel={hideCheckinDatePicker}
    />
    <TextInput
      style={styles.paymentInput}
      placeholder="Check-in Date"
      value={checkinDate ? format(checkinDate, 'dd/MM/yyyy') : ''}
      editable={false}
    />
    <Pressable style={styles.dateButton} onPress={showCheckinDatePicker}>
      <Text>Select</Text>
    </Pressable>
  </View>
  <View style={styles.datePicker}>
    <DateTimePickerModal
      isVisible={isCheckoutDatePickerVisible}
      mode="date"
      onConfirm={handleCheckoutConfirm}
      onCancel={hideCheckoutDatePicker}
    />
    <TextInput
      style={styles.paymentInput}
      placeholder="Check-out Date"
      value={checkoutDate ? format(checkoutDate, 'dd/MM/yyyy') : ''}
      editable={false}
    />
    <Pressable style={styles.dateButton} onPress={showCheckoutDatePicker}>
      <Text>Select</Text>
    </Pressable>
    
  </View>
  <Text style={styles.titles}>Total Nights: {totalNights}</Text>
        <Text style={styles.titles}>Total Price: {totalPrice}</Text>
</View>

          </View>
        </View>
       
        <Text style={styles.paymentMethodText}>Choose Payment Method:</Text>

        <View style={styles.paymentOptions}>
        <TouchableOpacity
  style={[styles.paymentButton, paymentMethod === 'cash' && styles.selectedPayment]}
  onPress={() => handlePaymentMethodChange('cash')}>
  <Text>Cash</Text>
</TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentButton, paymentMethod === 'visa' && styles.selectedPayment]}
            onPress={() => handlePaymentMethodChange('visa')}>
            <Text>Visa</Text>
          </TouchableOpacity>
        </View>
        {paymentMethod === 'visa' && (
          <View style={styles.paymentDetails}>
             <TextInput
    style={styles.paymentInput}
    placeholder="Name"
    value={paymentDetails.cardHolderName}
    onChangeText={(text) => handlePaymentDetailsChange('cardHolderName', text)}
  />
   <TextInput
    style={styles.paymentInput}
    placeholder="Card Number"
    keyboardType="numeric"
    value={paymentDetails.visaNumber}
    onChangeText={(text) => handlePaymentDetailsChange('visaNumber', text)}
  />
  <TextInput
    style={styles.paymentInput}
    placeholder="Expiry Date (MM/YY)"
    maxLength={5} // Maximum length for MM/YY format
    value={paymentDetails.expiryDate}
    onChangeText={(text) => handlePaymentDetailsChange('expiryDate', text)}
  />
            <TextInput
    style={styles.paymentInput}
    placeholder="CVV"
    keyboardType="numeric"
    maxLength={3} // Maximum length for CVV
    value={paymentDetails.cvv}
    onChangeText={(text) => handlePaymentDetailsChange('cvv', text)}
  />
  <Text style={styles.paymentInput}>Amount: {totalPrice}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.bookButton} onPress={bookNow}>
          <Text style={styles.bookTitle}>Book Now</Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
  },
  header: {
    backgroundColor: 'rgba(300, 120, 0, 0.3)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerText: {
    color: '#F4C14C',
    fontSize: 35,
    fontWeight: 'bold',
  },
  containerBook: {
    alignItems: 'center',
    flex: 1
  },
  titles: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    width: 270,
    height: 40,
    borderColor: '#D8A123',
    borderRadius: 20,
    color: 'black'
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  datePickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateInput: {
    width: 200, // Set a specific width
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical:5,
    fontFamily: "Arial",
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#D8A123',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  paymentButton: {
    backgroundColor: '#D8A123',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 35,
    borderRadius: 20,
  },
  selectedPayment: {
    backgroundColor: '#F4C14C',
  },
  paymentDetails: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  paymentInput: {
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D8A123',
    borderRadius: 20,
    width: 200, // Set a specific width
  },
  bookButton: {
    backgroundColor: '#D8A123',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 35,
    borderRadius: 20,
    marginVertical: 10
  },
  bookTitle: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentMethodText: {
    fontWeight: 'bold', // Make the text bold
    fontSize: 20, // Set the font size to be bigger
    paddingVertical: 10, // Add padding top and bottom
  },
  
  
});

export default CalendarInput;
