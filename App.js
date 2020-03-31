import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.eventhead}>
        <Text>Flix Bus</Text>
      </View>
      <View style={styles.eventbody}>
        <Text>Coupon WQEUIRAO</Text>
        <Text>Expiry 30 March 2021</Text>
        <Text>Remind on 27 Nov 2020</Text>
      </View>
      <View style={styles.eventhead}>
        <Text>Flix Bus1</Text>
      </View>
      <View style={styles.eventbody}>
        <Text>March 30 2021</Text>
      </View>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
  },
  eventhead:{
    flex: 2,
    backgroundColor: '#bbc7be',
    fontSize: 30,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 10,
    fontWeight: "bold",
  },
  eventbody:{
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 20,
    marginRight: 10,
    fontSize: 5,
    maxHeight: 40,
  },
});
