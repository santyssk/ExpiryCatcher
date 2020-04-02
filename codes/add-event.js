import React from 'react';
import {View, Text, StyleSheet, Modal, TextInput, Button} from 'react-native';

const Newevent = props => {
    return (
        <Modal visible = {props.visible} animationType='slide'>
            <View style={styles.inputbox}>
                <View style={styles.inputline}>
                    <Text style={{fontSize: 30, fontWeight:"bold", color:"green"}}>New Event</Text>
                </View>
                <View style={styles.inputline}>
                    <Text style={styles.inputkey}>Title</Text>
                    <TextInput placeholder="Title of the Event" style = {styles.inputvalue}/>
                </View>
                <View style={styles.inputline}>
                    <Text style={styles.inputkey}>Coupon</Text>
                    <TextInput placeholder="Coupon code for the Event" style = {styles.inputvalue}/>
                </View>
                <View style={styles.inputline}>
                    <Text style={styles.inputkey}>Expiry date</Text>
                    <TextInput placeholder="Expiry date of the Event" style = {styles.inputvalue}/>
                </View>
                <View style={styles.inputline}>
                    <Text style={styles.inputkey}>Notes</Text>
                    <TextInput placeholder="Notes on the Event" style = {styles.inputvalue}/>
                </View>
                <View style={styles.inputline}>
                    <Text style={styles.inputkey}>Link</Text>
                    <TextInput placeholder="Links to the Event" style = {styles.inputvalue}/>
                </View>
                <View style={styles.inputline}>
                    <View style={styles.button}>
                        <Button title="Cancel"color="red" onPress={props.onAdd.bind(this,false)}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Add" color="green"/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputbox:{
        flex: 2,
        justifyContent: 'center',
        alignItems: "stretch",
    },
    inputkey:{
        padding: 10,
        width: '40%',
    },
    inputline:{
        marginTop: 15,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:"space-evenly",
    },
    inputvalue:{
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        width: '60%',
    },
    button:{
        width: '40%',
    }
});
export default Newevent;