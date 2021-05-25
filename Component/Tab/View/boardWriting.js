import React, {Component, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList, Image, Button, TextInput} from 'react-native';
import{Menu, MenuOption, MenuOptions,MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

const boardWriting = (props, {navigation}) => {

    //서버에 보낼 내용
    let userId = props.route.params.userId;
    const [text,setText] = useState("");  

      // App.js ip 받아오기
  const [ip,setIp] = useState();
  AsyncStorage.getItem("ip").then((value) => {
    setIp(value);
  });

  console.log(userId);

    return(
      <SafeAreaView style={styles.container}>
        <ScrollView>
            {/* 작성 텍스트, 취소 버튼, 작성 버튼  */}

            {/* 타이틀 */}
            <View style = {styles.titleArea}>
              <TextInput style = {styles.titleView}
              placeholder={"제목"}>
              </TextInput>
            </View>

            <View style = {styles.line}></View>

            {/* 게시글 내용 */}
            <View style = {styles.textArea}>
              <TextInput
                style = {styles.textView}
                placeholder={"내용"}
                value = {text}
                onChangeText = {text => setText(text)}
                multiline = {true}>
              </TextInput>
            </View>
            
            {/* 버튼 구역 */}
            <View style = {styles.buttonArea}>

              <View style = {{flex : 1}}/>

              <TouchableOpacity style = {styles.button}
                onPress = {() =>alert('글 작성 취소')}>
                <Text style = {styles.buttonText}>취소</Text>
              </TouchableOpacity>

              <View style = {{flex : 1}}/>

              <TouchableOpacity style = {styles.button}
                onPress = {() =>alert('글 작성 완료')}>
                <Text style = {styles.buttonText}>작성</Text>
              </TouchableOpacity>

              <View style = {{flex : 1}}/>

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
  borderWidth : 1,
  marginLeft : 10,
  marginRight : 10,
},
titleArea : {
  justifyContent : 'center',
  alignItems : 'center',
  width : "100%",
  height : "100%",
  flex : 1,
  paddingTop : 10,
},
titleView : {
  width : "100%",
  padding : 10,
  fontSize : 30,
},
textArea : {
  justifyContent : 'center',
  alignItems : 'center',
  width : "100%",
  height : 300,
  flex : 1,
  padding : 10,
},
textView : {
  width : "100%",
  height : "100%",
  padding : 10,
  fontSize : 20,
  borderWidth : 1,
  borderColor : 'lightgray'
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
  fontSize : 25,
},
});

export default boardWriting;