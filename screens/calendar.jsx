import React, { useState } from 'react';
import { View, Text, Button, TextInput ,Pressable} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

const CalendarInput = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    console.log(typeof(selectedDate))
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable style={{backgroundColor:'rgba(300, 120, 0, 0.3)'}} onPress={showDatePicker} >
        <Text>select date</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TextInput
        style={{ marginTop: 20, padding: 10, borderWidth: 1, width: 200 }}
        placeholder="Selected Date"
        value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
        editable={false}
      />
     
     
    </View>
  );
};

export default CalendarInput;