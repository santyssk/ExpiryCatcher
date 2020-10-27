import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView } from 'react-native';

import Event from './pages/get-event';
import HeaderSection from './pages/get-header'; 
import Newevent from './pages/add-event';
import Editevent from './pages/edit-event';
import getTitleSortedEvents from './hooks/sort-title-events';
import getExpirySortedEvents from './hooks/sort-expiry-events';
import getRemindSortedEvents from './hooks/sort-remind-events';
import getSearchBarEvents from './hooks/search-bar-events';
import AsyncStorage from '@react-native-community/async-storage';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function App() {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  allEvents = [{title:"Title", expiry:new Date(), remind:new Date(), notes:"This is Note 1",type:"Other"},
  {title:"Title1", expiry:new Date(), remind:tomorrow, notes:"This is note 2\n And is second line\n And is third line\n And is fourth line\n And is second line",type:"Other"},
  {title:"Title2", expiry:new Date(), remind:new Date(),notes:"",type:"Other"},
  {title:"Title3", expiry:tomorrow, remind:new Date(), notes:"Notes3",type:"Other"},
  {title:"Santhosh", expiry:new Date(), remind:new Date(),notes:"",type:"Document"},
  {title:"Title5", expiry:new Date(), remind:new Date(), notes:"Notes5",type:"Food"}];

  allEvents = getTitleSortedEvents(allEvents);

  const [data,setData] = useState(allEvents);
  const [eventsdata,setAllEvents] = useState(allEvents);
  const [sortPreference, setSortPerference] = useState("Title");
  const [addNewEvent, setAddNewEvent] = useState(false);
  const [editCurrentEvent, setEditCurrentEvent] = useState(false);
  const [editEventData, setEditEventData] = useState({title:"Title", expiry:new Date(), remind:new Date(), notes:"This is Note 1"});

  const performSearch = key =>{
    temp = getSearchBarEvents(eventsdata,key);
    setAllEvents(temp);
  };

  const searchAllEvents = key =>{
    temp = getSearchBarEvents(data,key);
    performSort(sortPreference,temp);
  };

  const cancelSearch = () =>{
    performSort(sortPreference,data);
  };

  const performSort = (value,data) => {
    setSortPerference(value);
    if(value=="Title"){
      temp = getTitleSortedEvents(data);
      setAllEvents(temp);
    }
    else
    if(value=="Expiry"){
      temp = getExpirySortedEvents(data);
      setAllEvents(temp);
    }
    else{
      temp = getRemindSortedEvents(data);
      setAllEvents(temp);
    }    
  };

  const clickedSort = value =>{
    if(sortPreference!=value)
      performSort(value,eventsdata);
  };

  const addEvent = () =>{
    setAddNewEvent(true);
  };

  const cancelAddEvent = () =>{
    setAddNewEvent(false);
  };

  const editEvent = value =>{
    clearEvent(value.title); 
    setEditEventData(value);
    setEditCurrentEvent(true);
  };

  const cancelEditEvent = () =>{
    setEditCurrentEvent(false);
  };

  const clearEvent = value => {
    temp = data.filter(function( event ) {
      return event.title !== value;
    });
    setData(temp);
    setAllEvents(temp);
  };

  const storeEvent = value => {
    /*try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(value.title, jsonValue);
    } catch (e) {
        // saving error
    }*/
    temp = data;
    temp.push(value);
    //console.log("Added")
    //console.log(value)
    setData(temp);
    performSort(sortPreference,temp);
}

  return (
    <View style={styles.page}>
      <View style={styles.constants}>
        <Newevent visible={addNewEvent} cancelAdd={cancelAddEvent} store={storeEvent}/>
        <Editevent visible={editCurrentEvent} cancelEdit={cancelEditEvent} store={storeEvent} eventData={editEventData}/>
        <HeaderSection addNew={addEvent} clickedOrder={clickedSort} search={performSearch} cancel={cancelSearch} searchAll={searchAllEvents}/>
      </View>
      {eventsdata.length>0?
        <ScrollView style={styles.eventsContainter}>
          {eventsdata.map(event => (
            <View key={event.title}>
              <Event eventData={event} edit={editEvent} clear={clearEvent}/>
            </View>
          ))}
        </ScrollView>
        :
        <View style={styles.noEvents}>
          <Text>You have no events now!!</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height:'100%',
    flexDirection: 'column',
    paddingBottom:'2%',
    justifyContent: "flex-start",
  },
  constants:{
    height:'25%',
  },
  eventsContainter:{
    paddingHorizontal:'2%',
    marginTop:'3%',
  },
  noEvents:{
    marginTop:'50%',
    alignItems:'center'
  }
});
