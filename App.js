import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Event from './codes/get-event';
import Header from './codes/get-header'; 

export default function App() {
  const [sortPreference, setSortPerference] = useState("Expiry");
  const sortBy = sort => {
    setSortPerference(sort);
  };

  return (
    <View style={styles.page}>
      <Header onSort={sortBy}/>
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
