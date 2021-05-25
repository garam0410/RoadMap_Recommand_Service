import React, {Component, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList, Image, Button, TextInput} from 'react-native';
import {SearchBar} from 'react-native-elements';
import{Menu, MenuOption, MenuOptions,MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

const boardContent = (props, {navigation}) => {

    //서버에 보낼 내용
    let userId = props.route.params.userId;
    const [text,setText] = useState("");  
    let [inputText, setInputText] = useState([""]);

      // App.js ip 받아오기
  const [ip,setIp] = useState();
  AsyncStorage.getItem("ip").then((value) => {
    setIp(value);
  });
  

  console.log(userId);

    return(
      <SafeAreaView style={styles.container}>
        <ScrollView> 

        <View style = {styles.buttonArea}>
            <View style = {{flex : 5}}/>
              <TouchableOpacity style = {styles.button}
               onPress = {() => {
                props.navigation.navigate("boardWriting", {userId : userId});
                }}>     

                {/* alert('글 수정')}> */}
                  <Text style = {styles.buttonText}>수정</Text>
                </TouchableOpacity>
            </View>
          {/* UserArea*/}


          <View style = {styles.UserArea}>
            {/* 상단 작성자 */}
          <View style = {styles.imageandname}>
            <Image style = {styles.userimage} source = {require('../../img/user.png')}></Image>
            <Text style = {styles.user}>사용자1</Text>
            </View>
          <Text style = {styles.date}>2021. 5. 22. 오후 11:59:59</Text>
          </View>

          <View style = {styles.line}></View>

          {/* contentArea */}
          <View style = {styles.contentArea}>
            {/* contentView */}
            <Text style = {styles.contentView}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
            </View>

            <View style = {styles.line}></View>

            {/* 댓글 작성자 */}
            <View style = {styles.insertcomment}>
                <TextInput style = {styles.comment} onChangeText = {
                  (inputText) => setInputText(inputText) 
                }>
                </TextInput>
                <TouchableOpacity style = {{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', borderColor : 'gray', borderWidth : 1,borderRadius : 10, marginLeft : 5}}
                onPress = {() =>alert("등록")}>
                  <Text style = {styles.insert}>▷</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.line}></View>

          <View style = {styles.imageandname}>
            <Image style = {styles.userimage} source = {require('../../img/user.png')}></Image>
            <Text style = {styles.user}>사용자2</Text>
            </View>
          <Text style = {styles.usercomment}>댓글 내용</Text>
          <Text style = {styles.date}>2021. 5. 22. 오후 11:59:59</Text>

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

buttonArea : {
  flexDirection : 'row',
  padding : 10,
},

button : {
  flex : 1,
  borderRadius : 20,
  backgroundColor : 'skyblue',
  padding : 10,
},

buttonText : {
  textAlign : 'center',
  color : 'white',
  fontWeight : 'bold',
  fontSize : 20,
},

UserArea: {
  justifyContent : 'center',
  // alignItems : 'center',
  width : "100%",
  height : "100%",
  flex : 1,
  paddingTop : 10,
  marginLeft: 10,
  marginRight: 10
},

line : {
  borderColor : 'lightgray',
  borderWidth : 1,
  marginLeft : 10,
  marginRight : 10,
},

contentArea: {
  justifyContent : 'center',
  alignItems : 'center',
  width : "100%",
  height : 300,
  flex : 1,
  padding : 10,
},

contentView : {
  width : "100%",
  height : "100%",
  padding : 10,
  fontSize : 17,
  borderWidth : 1,
  borderColor : 'lightgray'
},

commentArea : {
  backgroundColor : '#ffffff',
  shadowColor : "#000000",
  shadowOpacity : 0.3,
  shadowOffset : {width : 2, height : 2},
  elevation : 3,
},

insertcomment : {
  margin : 10,
  flexDirection : 'row',
  flex : 1,
  
},
comment : {
  height : 30,
  borderColor : 'gray',
  borderWidth : 1,
  borderRadius : 10,
  flex : 6
},

imageandname : {
  flexDirection : 'row',
  alignItems : 'center',
  margin : 5,
  marginLeft: 10,
  marginRight: 10
},

user : {
  fontSize : 20,
  fontWeight : 'bold',
  marginLeft : 10,
},
userimage : {
  height : hp('4%'),
  width : wp('9%'),
},
usercomment : {
  margin : 5,
  fontSize : 18
},
date : {
  marginLeft : 10,
  marginBottom : 5,
  color : 'gray'
},



});

export default boardContent;