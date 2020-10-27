import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TextInput, Alert} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';

const Editevent = props => {
    let off={ top: 10, left: 0 };
    let eventTypes = [{value: 'Food',},{value: 'Coupon',},{value: 'Document',},{value: 'Task',},{value: 'Other',}];
    
    const [selectedExpiryDateTime,setExpiryText] = useState('');
    const [selectedRemindDateTime,setRemindText] = useState('');
    const [isExpirySelected,setIsExpirySelected] = useState(true);
    const [notesText,setNotesText] = useState('');
    const [typeText,setTypeText] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [dateSelected,setDateSelected] = useState('');
    let eventData = props.eventData;
    let current = new Date()

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    
    const confirmDatePicker = (date) => {
        hideDatePicker();
        if(isExpirySelected==true)
            setDateSelected(format(date, 'd MMM yy hh:mm a').toString());
        else  
            setDateSelected(format(date, 'd MMM yy hh:mm a').toString());
        showTimePicker();
    };

    const confirmTimePicker = (date) => {
        hideTimePicker();
        if(isExpirySelected==true){
            var i = dateSelected.indexOf(':')
            let timeSelected = format(date, 'd MMM yy hh:mm a').toString()
            var j = timeSelected.indexOf(':')
            setExpiryText(dateSelected.substr(0,i-2)+timeSelected.substr(j-2));
        }
        else{  
            var i = dateSelected.indexOf(':')
            let timeSelected = format(date, 'd MMM yy hh:mm a').toString()
            var j = timeSelected.indexOf(':')
            setRemindText(dateSelected.substr(0,i-2)+timeSelected.substr(j-2));
        }
    };

    const setExpiryDate = () =>{
        setIsExpirySelected(true);
        showDatePicker();
    };

    const setRemindDate = () =>{
        setIsExpirySelected(false);
        showDatePicker();
    };

    const setNotes = notes =>{
        setNotesText(notes);
    };

    const setType = type =>{
        setTypeText(type);
    };

    const cancel = () =>{
        setExpiryText('');
        setRemindText('');
        setNotesText('');
        setIsExpirySelected(true);
        setTypeText('');
        setDateSelected('');
        props.cancelEdit();
    };

    const cancelEdit = () =>{
        props.store(eventData);
        cancel();
    }

    const displayError = (error,message) =>
    Alert.alert(
      error,
      message,
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );

    const checkCorrectData = data =>{
        if(data.remind>data.expiry){
            displayError("Error in Date","Remind date cannot be after event date")
           return false;
        }
        return true;
    }

    const add = () =>{
        let rdate = eventData.remind
        if(selectedRemindDateTime.length>0)
            rdate = new Date(selectedRemindDateTime)
        let edate = eventData.expiry
        if(selectedExpiryDateTime.length>0)
            edate = new Date(selectedExpiryDateTime)
        let note = eventData.notes
        if(notesText.length>0)
            note = notesText
        let t = eventData.type
        if(typeText.length>0)
            t = typeText
        var data = {title:eventData.title, expiry:edate, remind:rdate, notes:note,type:t}
        if(checkCorrectData(data)){
            props.store(data);
            cancel();
        }
    };

    return (
        <Modal visible = {props.visible} animationType='fade'>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={current}
                onConfirm={confirmDatePicker}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={confirmTimePicker}
                onCancel={hideTimePicker}
            />
            <View style={styles.inputBox}>
            <View style={styles.headerLine}>
                    <Text style={{fontSize: 30, fontWeight:"bold", color:"green"}}>Edit Event</Text>
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Title</Text>
                    <Text style = {styles.inputValue}>{eventData.title}</Text>
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Type</Text>
                    <Dropdown
                        label='Select Type of the Event'
                        data={eventTypes}
                        containerStyle = {styles.inputValue}
                        itemCount={5}
                        dropdownOffset={off}
                        value={eventData.type}
                        onChangeText={setType}
                    />
                   
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Expiry date</Text>
                    <Icon
                        name='calendar-clock'
                        type='material-community'
                        onPress={setExpiryDate}/>
                    {selectedExpiryDateTime.length==0?
                        <Text style = {styles.dateValue}>{format(eventData.expiry, 'd MMM yy hh:mm a').toString()}</Text>
                        :
                        <Text style = {styles.dateValue}>{selectedExpiryDateTime}</Text>
                    }
                </View>
                <View style={styles.inputLine}>
                <Text style={styles.inputKey}>Remind date</Text>
                    <Icon
                        name='calendar-clock'
                        type='material-community'
                        onPress={setRemindDate}/>
                    {selectedRemindDateTime.length==0?
                        <Text style = {styles.dateValue}>{format(eventData.remind, 'd MMM yy hh:mm a').toString()}</Text>
                        :
                        <Text style = {styles.dateValue}>{selectedRemindDateTime}</Text>
                    }
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Notes</Text>
                    <TextInput placeholder="Notes on the Event" multiline numberOfLines = {3} maxLength ={75} style = {styles.notesValue} onChangeText={setNotes} defaultValue={eventData.notes}/>
                </View>
                <View style={styles.buttonLine}>
                    <Icon
                        reverse
                        name='cancel'
                        type='material-community'
                        color='red'
                        onPress={cancelEdit}/>
                    <Icon
                        reverse
                        name='check-circle'
                        type='feather'
                        color='green'
                        onPress={add}/>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: "stretch",
    },
    headerLine:{
        marginTop: 15,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:"space-around",
    },
    inputKey:{
        padding: 10,
        width: '30%',
    },
    inputLine:{
        marginTop: 15,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:"flex-start",
    },
    inputValue:{
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        width: '70%',
    },
    notesValue:{
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        width: '70%',
        height: 100,
    },
    dateValue:{
        marginLeft:10,
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        width: '60%',
    },
    buttonLine:{
        marginTop: 15,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:"space-evenly",
    },
});
export default Editevent;