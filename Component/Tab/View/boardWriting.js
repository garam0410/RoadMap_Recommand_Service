import React, {Component, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList, Image, Button, TextInput} from 'react-native';
import{Menu, MenuOption, MenuOptions,MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { StackActions } from '@react-navigation/routers';

const boardWriting = (props, {navigation}) => {

    //서버에 보낼 내용
    let userId = props.route.params.userId;
    let btitle = props.route.params.btitle;
    let btext = props.route.params.btext;
    let bid = props.route.params.bid;
    let noticeName = props.route.params.noticeName;

    console.log(noticeName);

    const [title,setTitle] = useState("");
    const [text,setText] = useState("");  

    const [button, setButton] = useState("");

      // App.js ip 받아오기
  const [ip,setIp] = useState();
  AsyncStorage.getItem("ip").then((value) => {
    setIp(value);
  });

  let [getdata,setGetData] = useState(["0"]);

  if(getdata == "0"){
    if(ip != null){
      setTitle(btitle);
      setText(btext);

      if(noticeName == null){
        setButton("수정");
      }
      else{
        setButton("작성");
      }

      setGetData("1");
    }
  }

  // 게시글 수정
  async function modifyBoard(){
    const response = await axios.get("http:/"+ip+":8082/modifyboard", {
      params : {
        bid : bid,
        btitle : title,
        btext : text
      }
    })
  }

  //게시글 작성
  async function insertBoard(){

    if(noticeName == "자유게시판"){
      noticeName = "jayu";
    }
    else if (noticeName == "조언방"){
      noticeName = "joun";
    }
    else if (noticeName == "토론방"){
      noticeName = "toron";
    }
    else if (noticeName == "질문방"){
      noticeName = "jilmun";
    }

    var currentTime = new Date();

    var time = currentTime.toLocaleString();

    const response = await axios.get("http://"+ip+":8082/insertboard",{
      params : {
        btype : noticeName,
        uid : userId,
        btitle : title,
        btext : text,
        bdate : time.toString()
      }
    })
  }

    return(
      <SafeAreaView style={styles.container}>
        <ScrollView>
            {/* 작성 텍스트, 취소 버튼, 작성 버튼  */}

            {/* 타이틀 */}
            <View style = {styles.titleArea}>
              <TextInput style = {styles.titleView}
              placeholder={"제목"}
              value = {title}
              onChangeText = {title => setTitle(title)}>
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
                onPress = {() =>{
                  props.navigation.goBack();
                }}>
                <Text style = {styles.buttonText}>취소</Text>
              </TouchableOpacity>

              <View style = {{flex : 1}}/>

              <TouchableOpacity style = {styles.button}
                onPress = {() =>{
                  if(button == "수정"){
                    modifyBoard();
                    props.navigation.goBack();
                  }
                  else{
                    insertBoard();
                    props.navigation.goBack();
                  }
                }}>
                <Text style = {styles.buttonText}>{button}</Text>
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