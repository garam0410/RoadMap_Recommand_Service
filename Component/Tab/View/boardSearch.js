import React, {Component, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList, Image, Button, TextInput} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {SearchBar} from 'react-native-elements';
import{Menu, MenuOption, MenuOptions,MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

const boardSearch = (props, {navigation}) => {

    //서버에 보낼 내용
    let userId = props.route.params.userId;
    const [text,setText] = useState("");  
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

      //검색상황 반영
  const updateQuery = (query) => {
    setQuery(query);
  }

      // App.js ip 받아오기
  const [ip,setIp] = useState();
  AsyncStorage.getItem("ip").then((value) => {
    setIp(value);
  });

  console.log(userId);

    return(
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <Spinner
          visible = {loading}
          textContent = {"검색 중..."}></Spinner>
        <View style = {{justifyContent : 'center', margin : 10, flexDirection : 'row'}}>
          <SearchBar
              lightTheme = 'true'
              round = "true"
              onChangeText = {updateQuery}
              value = {query}
              autoFocus = {true}
              platform = "ios"
              containerStyle = {{flex : 4, backgroundColor : 'white', height : 'auto', borderWidth : 1, borderRadius : 10, borderColor : 'gray'}}
              inputContainerStyle = {{backgroundColor : 'white', height : 20}}>
          </SearchBar>

          <TouchableOpacity style = {{flex : 1, alignContent : 'center', justifyContent : 'center', borderColor : 'black', borderWidth : 1, borderRadius : 10, marginLeft : 10}}
            onPress = {() => alert("검색")}>
            <Text style = {{fontSize : 20, fontWeight : 'bold', justifyContent : 'center', textAlign : 'center'}}>검색</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>  
    );
  } 

const styles = StyleSheet.create({
container: {
  width: '100%',
  flex: 1,
  flexDirection: 'column', // row
  backgroundColor: 'white',
},
line : {
  borderColor : 'lightgray',
  borderWidth : 0.5,
},
element : {
  flexDirection : 'row',
  alignItems : 'center',
},
roadmapimageblock : {
  alignItems : 'center'
},
roadmapImage : {
  height : 60,
  width : 100,
},
roadmpaNameBlock : {
  alignItems : 'center',
  flex : 1
},
roadmapName : {
  fontSize : 20,
  fontWeight : 'bold',
},

});

export default boardSearch;