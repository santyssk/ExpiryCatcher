import React, { useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { CheckBox, SearchBar, Button, Header  } from 'react-native-elements';

const HeaderSection = props => {

    const [titleSelected, setTitleSelected] = useState(true);
    const [expirySelected, setExpirySelected] = useState(false);
    const [remindSelected, setRemindSelected] = useState(false);
    const [titleSearch,setTitleSearch] = useState('');

    const performSearch = title =>{
        if(title.length==0){
            setTitleSearch(title);
            cancelSearch();
        }
        else
        if(title.length<titleSearch.length){
            setTitleSearch(title);
            props.searchAll(title);
        }
        else{
            setTitleSearch(title);
            props.search(title);
        }
    };

    const cancelSearch = () =>{
        props.cancel();
    };

    const pressTitleCheckBox = () => {
        setTitleSelected(true);
        setExpirySelected(false);
        setRemindSelected(false);
        props.clickedOrder("Title");
    };

    const pressExpiryCheckBox = () => {
        setTitleSelected(false);
        setExpirySelected(true);
        setRemindSelected(false);
        props.clickedOrder("Expiry");
    };

    const pressRemindCheckBox = () => {
        setTitleSelected(false);
        setExpirySelected(false);
        setRemindSelected(true);
        props.clickedOrder("Remind");
    };

    const performAddEvent = () =>{
        setTitleSearch('');
        props.addNew();
    };
    
    return (
        <View>
            <Header containerStyle={{height:'30%'}} centerComponent={{ text: 'My Title', style: { color: '#fff' } }} />
            <View style={styles.advanceAndAdd}>
                <Button
                    containerStyle={styles.advanceAndAddButtons}
                    title="Advance Filter"
                    iconRight
                    icon={{
                        name: "filter",
                        type:"feather"

                    }}/>
                <Button
                    containerStyle={styles.advanceAndAddButtons}
                    title="Add New Item"
                    iconRight
                    icon={{
                        name: "plus-circle",
                        type:"feather"
                    }}
                    onPress={performAddEvent}/>
            </View>
            <View style={styles.orderContainer}>
                <Text style={{flex:3}}>View by</Text>
                <CheckBox
                    center
                    title='Title'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={titleSelected}
                    containerStyle={styles.optionTitle}
                    onPress={pressTitleCheckBox}/>
                <CheckBox
                    center
                    title='Expiry'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={expirySelected}
                    containerStyle={styles.optionExpiry}
                    onPress={pressExpiryCheckBox}/>
                <CheckBox
                    center
                    title='Remind'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={remindSelected}
                    containerStyle={styles.optionRemind}
                    onPress={pressRemindCheckBox}/>
            </View>
            
            <SearchBar
                placeholder="Search for items"
                onChangeText={performSearch}
                value={titleSearch}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchBar}/>
        </View>
    );
};

const styles = StyleSheet.create({
    advanceAndAdd:{
        flexDirection:'row',
    },
    advanceAndAddButtons:{
        flex:1,
    },
    searchContainer:{
        backgroundColor: "transparent",
        paddingBottom:'2%',
    },
    searchBar:{
        borderRadius: 20,
        width: '100%',
        height:'15%',
        backgroundColor: "transparent"
    },
    orderContainer:{
        flexDirection: 'row',
        justifyContent: "space-evenly",
        paddingHorizontal:'2%',
        alignItems: "center",
    },
    optionTitle:{
        flex:3,
        backgroundColor: "transparent", 
        borderWidth: 0 
    },
    optionExpiry:{
        flex:4,
        backgroundColor: "transparent", 
        borderWidth: 0 
    },
    optionRemind:{
        flex:4,
        backgroundColor: "transparent", 
        borderWidth: 0 
    },
});

export default HeaderSection;
