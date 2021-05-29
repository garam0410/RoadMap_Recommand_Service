import React, {Component, useState, useEffect} from 'react';
import {Modal,View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList, Image, Button, TextInput,KeyboardAvoidingView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { StackActions } from '@react-navigation/routers';

const boardContent = (props, {navigation}) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getBoardText();
      getBoardComment();
    });
    return()=> {
      unsubscribe();
    };
  }, [navigation]);

    //서버에 보낼 내용

    // 현재 사용자 아이디
    let userId = props.route.params.userId;
    //게시글 아이디
    let bid = props.route.params.bid;
    //게시글 작성자 고유 아이디
    let buid = props.route.params.buid;
    // 게시글 작성자 아이디
    let buser = props.route.params.buser;
    //게시글 등록 날짜
    let bdate = props.route.params.bdate;
    //게시글 이름
    let btitle = props.route.params.btitle;

    const [btext, setBtext] = useState("");

    const [cuser,setCuser] = useState([]);
    const [userComment,setUserComment] = useState([]);
    const [date,setDate] = useState([]);

    const [check, setCheck] = useState(true);
    const [button, setButton] = useState(["수정", "삭제"]);

    const [text,setText] = useState("");  
    let [inputText, setInputText] = useState("");

      // App.js ip 받아오기
  const [ip,setIp] = useState();
  AsyncStorage.getItem("ip").then((value) => {
    setIp(value);
  });
  
  let [moddifyindex, setModifyIndex] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [head, setHead] = useState(["삭제 하시겠습니까?"]);
  const [body, setBody] = useState([""]);

  let [getdata,setGetData] = useState(["0"]);

  if(getdata == "0"){
    if(ip != null){
      getBoardText();
      getBoardComment();

      if(buser == userId){
        setCheck(false);
      }else{
        setButton("");
      }
      setGetData("1");
    }
  }

  //게시글 내용 가져오기
  async function getBoardText(){
    const response = await axios.get("http://"+ip+":8082/getboardtext",{
      params : {
        bid : bid
      }
    });

    let result = response.data;
    console.log(result);
    setBtext(result);
  }

  //댓글 가져오기
  async function getBoardComment(){
    var newCuserArray = []
    var newUserCommentArray = []
    var newDateArray = []

    const response = await axios.get("http://"+ip+":8082/getboardcomment",{
      params : {
        bid : bid
      }
    });

    let result = response.data;

    for(let i = 0; i < result.length; i++){
      newCuserArray.push(result[i].userid);
      newUserCommentArray.push(result[i].bcomment);
      newDateArray.push(result[i].cdate);
    }
    setCuser(newCuserArray);
    setUserComment(newUserCommentArray);
    setDate(newDateArray);
    setLoading(false);
  }

  //댓글 삭제 함수
  async function delectComment(){
    const response = await axios.get("http://"+ip+":8082/deleteboardcomment",{
      params : {
        uid : cuser[moddifyindex],
        udate : date[moddifyindex]
      }
    });
    
    const result = response.data
 
    console.log(result);
    if(result == "success"){
      var newUserArray = [...cuser];
      var newUserCommentArray = [...userComment];
      var newDateArray = [...date];

      newUserArray.splice(moddifyindex,1);
      newUserCommentArray.splice(moddifyindex,1);
      newDateArray.splice(moddifyindex,1);

      setCuser(newUserArray);
      setUserComment(newUserCommentArray);
      setDate(newDateArray);
    }
  }

  //댓글 저장
  async function insertComment(uid, text, date){
    try{
      const response = await axios.get("http://"+ip+":8082/insertboardcomment",{
        params : {
          bid : bid,
          uid : uid,
          bcomment : text,
          cdate : date
        }
      });
      getBoardComment();
    }catch(error){
      console.log(error);
    }
  }

  //댓글 등록
  const handleCommentButtonPress = () =>{
    setLoading(true);
    if(inputText == ""){
    }

    else{
  
      var currentTime = new Date();

      var time = currentTime.toLocaleString();

      insertComment(userId, inputText, time.toString());
      setInputText("");
    }

  }

  async function deleteBoard(){
    const response = await axios.get("http://"+ip+":8082/deleteboard",{
      params : {
        bid : bid
      }
    });
  }

  const commentlist = cuser.map((cuser, index) => 
  (              
    <TouchableOpacity key={index} style = {styles.commentArea} onLongPress = {()=> {
      if(cuser == userId){
        setModalVisible(true);
        setModifyIndex(index);
      }
    }}>
      <View style = {styles.imageandname}>
        <Image style = {styles.userimage} source = {require('../../img/user.png')}></Image>
        <Text style = {styles.user}>{cuser}</Text>
      </View>
      <Text style = {styles.usercomment}>{userComment[index]}</Text>
      <Text style = {styles.date}>{date[index]}</Text>
    </TouchableOpacity>
  )
);

  const modalHeader=(
    <View style={styles.modalHeader}>
      <Text style={styles.title}>{head}</Text>
      <View style={styles.divider}></View>
    </View>
  )
  const modalBody=(
    <View style={styles.modalBody}>
      <Text style={styles.bodyText}>{body}</Text>
    </View>
  )
  const modalFooter=(
    <View style={styles.modalFooter}>
      <View style={styles.divider}></View>
      <View style={{flexDirection:"row-reverse",margin:10}}>
        <TouchableOpacity style={{...styles.actions,backgroundColor:"#db2828"}} 
          onPress={() => {
            delectComment();
            setModalVisible(!modalVisible);
          }}>
          <Text style={styles.actionText}>삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.actions,backgroundColor:"#21ba45"}}
          onPress = {() => {
            setModalVisible(!modalVisible);
          }}>
          <Text style={styles.actionText}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  const modalContainer = (
    <View style = {styles.modalContainer}>
      {modalHeader}
      {/* {modalBody} */}
      {modalFooter}
    </View>
  )

  const modal = (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modal}>
        <View>
          {modalContainer}
        </View>
      </View>
    </Modal>
  )

    return(
      <KeyboardAvoidingView keyboardVerticalOffset = {100} behavior = {Platform.OS == 'ios' ? 'padding' : 'height'}  style ={styles.container}>
        <Spinner visible = {loading} textContent = {""}></Spinner>
        <SafeAreaView style={styles.container}>
          {modal}
          <ScrollView> 
            {/* UserArea*/}
            <View style = {styles.UserArea}>
            
              {/* 상단 작성자 */}
            <View style = {styles.imageandname}>
              <Image style = {styles.userimage} source = {require('../../img/user.png')}></Image>
              <Text style = {styles.user}>{buser}</Text>
              <View style = {{flex : 3}}></View>
              <TouchableOpacity style = {styles.button} disabled = {check}
                onPress = {() => {
                  props.navigation.navigate("boardWriting", {userId : userId, btitle : btitle, btext : btext, bid : bid, buser:buser, bdate : bdate});
                  }}>     

                  {/* alert('글 수정')}> */}
                    <Text style = {styles.buttonText}>{button[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} disabled = {check}
                onPress = {() => {
                  deleteBoard();
                  props.navigation.goBack();
                }}>     

                  {/* alert('글 수정')}> */}
                    <Text style = {styles.buttonText}>{button[1]}</Text>
              </TouchableOpacity>
            </View>
            <Text style = {styles.date}>{bdate}</Text>
            </View>

            {/* contentArea */}
            <View style = {styles.contentArea}>
              {/* contentView */}
              <Text style = {{fontSize : 30, fontWeight : 'bold', padding : 10}}>{btitle}</Text>
              <Text style = {styles.contentView}>{btext}</Text>
              </View>


              {/* 댓글 작성자 */}
              <View style = {styles.insertcomment}>
                  <TextInput style = {styles.comment} value = {inputText} onChangeText = {
                    (inputText) => setInputText(inputText) 
                  }>
                  </TextInput>
                  <TouchableOpacity style = {{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', borderColor : 'gray', borderWidth : 1,borderRadius : 10, marginLeft : 5}}
                  onPress = {handleCommentButtonPress}>
                    <Text style = {styles.insert}>▷</Text>
                  </TouchableOpacity>
              </View>

            {commentlist}

          </ScrollView>
        </SafeAreaView>  
      </KeyboardAvoidingView>
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
},

buttonText : {
  textAlign : 'center',
  color : 'blue',
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
  width : "100%",
  height : "100%",
  flex : 1,
  padding : 10,
},

contentView : {
  width : "100%",
  padding : 10,
  fontSize : 20,
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

commentArea : {
  backgroundColor : '#ffffff',
  shadowColor : "#000000",
  shadowOpacity : 0.3,
  shadowOffset : {width : 2, height : 2},
  elevation : 3,
},
modal:{
  backgroundColor:"#00000099",
  flex:1,
  alignItems: 'center',
  justifyContent: 'center',
},
modalContainer:{
  backgroundColor:"#f9fafb",
  width:"80%",
  borderRadius:5
},
modalHeader:{
  
},
title:{
  fontWeight:"bold",
  fontSize:20,
  padding:15,
  color:"#000"
},
divider:{
  width:"100%",
  height:1,
  backgroundColor:"lightgray"
},
modalBody:{
  backgroundColor:"#fff",
  paddingVertical:20,
  paddingHorizontal:10
},
modalFooter:{
},
actions:{
  borderRadius:5,
  marginHorizontal:10,
  paddingVertical:10,
  paddingHorizontal:20
},
actionText:{
  color:"#fff"
}
});

export default boardContent;