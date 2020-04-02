import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

const Header = props => {
    return (
        <View style={styles.header}>
            <Button title = "Name" onPress = {props.onSort.bind(this,"Name")}/>
            <Button title = "Expiry" onPress = {props.onSort.bind(this,"Expiry")}/>
            <Button title = "Add Event" />
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
});

export default Header;
