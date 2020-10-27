import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TextInput, Alert,KeyboardAvoidingView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';
//import KeyboardSpacer from 'react-native-keyboard-spacer';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Newevent = props => {
    let off={ top: 10, left: 0 };
    let eventTypes = [{value: 'Food',},{value: 'Coupon',},{value: 'Document',},{value: 'Task',},{value: 'Other',}];
    let current = new Date()
    
    const [titleText,setTitleText] = useState('');
    const [selectedExpiryDateTime,setExpiryText] = useState("Pick Date Time for Expiry");
    const [selectedRemindDateTime,setRemindText] = useState("Pick Date Time for Remind");
    const [isExpirySelected,setIsExpirySelected] = useState(true);
    const [notesText,setNotesText] = useState('');
    const [typeText,setTypeText] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [dateSelected,setDateSelected] = useState('');

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

    const setTitle = text =>{
        setTitleText(text);
    };

    const setNotes = notes =>{
        setNotesText(notes);
    };

    const setType = (value, index, data) =>{
        setTypeText(value);
    };

    const displayError = (error,message) =>
    Alert.alert(
      error,
      message,
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );

    const cancel = () =>{
        setTitleText('');
        setExpiryText("Pick Date Time for Expiry");
        setRemindText("Pick Date Time for Remind");
        setNotesText('');
        setIsExpirySelected(true);
        setTypeText('');
        setDateSelected('');
        props.cancelAdd();
    };

    const checkCorrectData = () =>{
        if(titleText.length==0){
            displayError("Error in Title","Event cannot be without title. Please assign a name for the event")
            return false;
        }
        //event can be without expiry ?
        //event can be without remind ?
        //unique id for event to delete and edit. Allow duplicate title name
        if(typeText.length==0){
            displayError("Error in Type","Please select the event type ")
            return false;
        }
        console.log(selectedExpiryDateTime)
        console.log(selectedRemindDateTime)
        if(selectedExpiryDateTime=="Pick Date Time for Expiry"){
            displayError("Error in Date","Please select the date of the event")
            return false;
        }
        if(selectedRemindDateTime=="Pick Date Time for Remind"){
            displayError("Error in Date","Please select the date to reminded about the event")
            return false;
        }
        if(new Date(selectedRemindDateTime)>new Date(selectedExpiryDateTime)){
            displayError("Error in Date","Remind date cannot be after event date")
            return false;
        }
        return true;
    }

    const add = () =>{
        if(checkCorrectData()){
            var data = {title:titleText, expiry:new Date(selectedExpiryDateTime), remind:new Date(selectedRemindDateTime), notes:notesText,type:typeText}
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
                    <Text style={{fontSize: 30, fontWeight:"bold", color:"green"}}>Add Event</Text>
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Title</Text>
                    <TextInput placeholder="Title of the Event" style = {styles.inputValue} onChangeText={setTitle}/>
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Type</Text>
                    <Dropdown
                        label='Select Type of the Event'
                        data={eventTypes}
                        containerStyle = {styles.inputValue}
                        itemCount={5}
                        dropdownOffset={off}
                        onChangeText={setType}
                    />
                   
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Expiry date</Text>
                    <Icon
                        name='calendar-clock'
                        type='material-community'
                        onPress={setExpiryDate}/>
                    <Text style = {styles.dateValue}>{selectedExpiryDateTime}</Text>
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Remind date</Text>
                    <Icon
                        name='calendar-clock'
                        type='material-community'
                        onPress={setRemindDate}/>
                    <Text style = {styles.dateValue}>{selectedRemindDateTime}</Text>
                </View>
                <View style={styles.inputLine}>
                    <Text style={styles.inputKey}>Notes</Text>
                    <TextInput placeholder="Notes on the Event" multiline numberOfLines = {3} maxLength ={75} style = {styles.notesValue} onChangeText={setNotes}/>
                </View>
                <View style={styles.buttonLine}>
                    <Icon
                        reverse
                        name='cancel'
                        type='material-community'
                        color='red'
                        onPress={cancel}/>
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
export default Newevent;