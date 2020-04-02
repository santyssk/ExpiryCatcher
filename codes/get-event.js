import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Event = props => {
    return (
      <View style={styles.event}>
        <View style={styles.eventhead}>
          <Text style={styles.eventheadtext}>{props.title}</Text>
        </View>
        <View style={styles.eventbody}>
          <Text>{props.expiry}</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    event: {
      flex: 1,
      flexDirection: 'column',
      marginVertical: 10,
      maxHeight: '20%',
    },
    eventhead:{
      backgroundColor: 'skyblue',
      padding: 10,
      borderColor: 'white',
      borderRadius: 10,
      alignItems: "center"
    },
    eventheadtext:{
      fontSize: 20,
      fontWeight: "bold",
    },
    eventbody:{
      backgroundColor: 'powderblue',
      borderColor: 'white',
      borderRadius: 10,
      padding: 10,
    },
});

export default Event;