import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';

const Event = props => {
  const eventData = props.eventData;
  let expiryDate = format(eventData.expiry, 'd MMM yy hh:mm a').toString();
  let remindDate = format(eventData.remind, 'd MMM yy hh:mm a').toString();
  let type = 4
  if(eventData.type=="Food")
    type=0
  else
  if(eventData.type=="Coupon")
    type=1
  else
  if(eventData.type=="Document")
    type=2
  else
  if(eventData.type=="Task")
    type=3
  let iconNames = ["food-variant", "attach-money", "text-document", "tasks", "progress-empty"]
  let iconTypes = ["material-community", "material", "entypo", "font-awesome-5","entypo"]

  //console.log(eventData.title)
  //console.log(iconNames[type])
  //console.log(iconTypes[type])
  const edit = () =>{
    props.edit(eventData);
  };

  const done = () =>{
    props.clear(eventData.title);
  }
    return (
      <View style={styles.event}>
        <View style={styles.eventFirstRow}>
          <View style={styles.eventTypeIcon}>
            <Icon
              color='blue'
              name = {iconNames[type]}
              type = {iconTypes[type]}/>
          </View>
          <Text style={styles.eventTitle}>{eventData.title}</Text>
          <View style={styles.eventDoneButton}>
            <Icon
              raised
              reverse
              color='blue'
              name='bookmark-remove'
              type='material-community'
              onPress={done}/>
          </View>
          <View style={styles.eventEditButton}>
            <Icon
              raised
              reverse
              color='blue'
              name='edit'
              type='font-awesome'
              onPress={edit} />
          </View>
        </View>
        <View style={styles.eventSecondRow}>
          <View style={styles.eventSecondRowIcon}>
            <Icon
                name='exclamation-triangle'
                size={15}
                type='font-awesome'/>
          </View>
            <Text style={styles.eventSecondRowText}>{expiryDate}</Text>
          <View style={styles.eventSecondRowIcon}>
            <Icon
                name='bell-ring'
                size={15}
                type='material-community'/>
          </View>
          <Text style={styles.eventSecondRowText}>{remindDate}</Text>
        </View>
        {eventData.notes.length>0? <View style={styles.eventThirdRow}><Text>{eventData.notes}</Text></View>:<View/>}
      </View>
    );
};

const styles = StyleSheet.create({
    event: {
      flexDirection: 'column',
      marginTop: '1%',
      marginBottom: '1%',
      justifyContent: "flex-start",
    },
    eventFirstRow:{
      flexDirection:'row',
      backgroundColor: 'skyblue',
      padding: 10,
      maxHeight: 50,
      borderColor: 'black',
      borderRadius: 10,
      alignItems: "center",
    },
    eventTypeIcon:{
      flex:2
    },
    eventTitle:{
      flex:12,
      fontSize: 20,
      fontWeight: "bold",
    },
    eventDoneButton:{
      flex:3,
    },
    eventEditButton:{
      flex:3,
    },
    eventSecondRow:{
      flexDirection:'row',
      backgroundColor: 'powderblue',
      borderColor: 'white',
      borderRadius: 10,
      padding: 10,
      fontSize: 20,
      justifyContent: "space-between",
    },
    eventSecondRowIcon:{
      flex:1,
    },
    eventSecondRowText:{
      flex:4,
    },
    eventThirdRow:{
      backgroundColor: 'powderblue',
      borderColor: 'white',
      borderRadius: 10,
      maxHeight:100,
      padding: 10,
      fontSize: 20,
    },
});

export default Event;