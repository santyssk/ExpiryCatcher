import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text>Sort by</Text>
        <Button title = "Name"/>
        <Button title = "Expiry" />
        <Button title = "Add Event" />
      </View>
      <View style={styles.event}>
        <View style={styles.eventhead}>
          <Text style={styles.eventheadtext}>Flix Bus</Text>
        </View>
        <View style={styles.eventbody}>
          <Text>Coupon WQEUIRAO</Text>
          <Text>Expiry 30 March 2021</Text>
          <Text>Remind on 27 Nov 2020</Text>
        </View>
      </View>
      <View style={styles.event}>
        <View style={styles.eventhead}>
          <Text style={styles.eventheadtext}>Flix Bus1</Text>
        </View>
        <View style={styles.eventbody}>
          <Text>March 30 2021</Text>
        </View>
      </View>
      <View style={styles.event}>
        <View style={styles.eventhead}>
          <Text style={styles.eventheadtext}>Flix Bus1</Text>
        </View>
        <View style={styles.eventbody}>
          <Text>March 30 2021</Text>
        </View>
      </View>
      <View style={styles.event}>
        <View style={styles.eventhead}>
          <Text style={styles.eventheadtext}>Flix Bus1</Text>
        </View>
        <View style={styles.eventbody}>
          <Text>March 30 2021</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingBottom: '5%',
    paddingRight: '5%',
    alignItems: "stretch",
    justifyContent: "space-between",
    
  },
  header:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'steelblue',
    justifyContent: "space-between",
    maxHeight: '10%',
    padding: 10,
  },
  event: {
    flex: 1,
    flexDirection: 'column',
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
