import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

const Header = props => {
    return (
        <View style={styles.header}>
            <View style={styles.button}>
                <Button title = "Name" color={props.nameColor} onPress = {props.nameSort}/>
            </View>
            <View style={styles.button}>
                <Button title = "Expiry" color={props.expiryColor} onPress = {props.expirySort}/>
            </View>
            <View style={styles.button}>
                <Button title = "Add Event" color="blue" onPress = {props.onAdd.bind(this,true)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'steelblue',
        justifyContent: "space-around",
        maxHeight: '10%',
        marginVertical: 10,
        alignItems: "center",
    },
    button:{
        width: '25%',
    }
});

export default Header;
