import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Event from './codes/get-event';
import Header from './codes/get-header'; 
import Newevent from './codes/add-event';

export default function App() {
  const [sortPreference, setSortPerference] = useState("Expiry");
  const [addEvent, setAddEvent] = useState(false);
  const [nameColor,setNameColor] = useState("blue");
  const [expiryColor,setExpiryColor] = useState("green");

  const sortByName = () => {
    setSortPerference("Name");
    setNameColor("green");
    setExpiryColor("blue");
  };

  const sortByExpiry = () => {
    setSortPerference("Expiry");
    setNameColor("blue");
    setExpiryColor("green");
  };

  const eventAddition = value =>{
    setAddEvent(value);
  }

  return (
    <View style={styles.page}>
      <Header nameSort={sortByName} expirySort ={sortByExpiry} onAdd={eventAddition} nameColor={nameColor} expiryColor={expiryColor}/>
      <Newevent visible={addEvent} onAdd={eventAddition}/>
      <Event title="Amazon" expiry="13-04-2020" />
      <Event title="Amazon" expiry="13-04-2020" />
      <Event title="Amazon" expiry="13-04-2020" />
      <Event title="Amazon" expiry="13-04-2020" />
      <Event title="Amazon" expiry="13-04-2020" />
      <Event title="Amazon" expiry="13-04-2020" />
      <Text>Sorting based on {sortPreference}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingBottom: '5%',
    paddingRight: '5%',
    alignItems: "stretch",
    justifyContent: "space-around",
  },
});
