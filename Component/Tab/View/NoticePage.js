import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import{MenuProvider} from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


const NoticePage = (props, {navigation}) => {

  useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribe = props.navigation.addListener('focus', () => {
      getNotice();
    });
    return()=> {
      unsubscribe;
    };
  }, [navigation]);

  let noticeName = props.route.params.noticeName;
  const userId = props.route.params.userId;
  
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
  let [bid, setBid] = useState([]);
  let [btitle, setBtitle] = useState([]);
  let [bdate, setBdate] = useState([]);
  let [buid, setBuid] = useState([]);
  let [buser, setBUser] = useState([]);

  let [getdata,setGetData] = useState(["0"]);

  if(getdata == "0"){
    if(ip != null){
      getNotice()
      setGetData("1");
    }
  }
  
  async function getNotice(){

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

    var newBidArray = [];
    var newBtitleArray = [];
    var newBdateArrray = [];
    var newBuserArray = [];
    var newBuidArray = [];

    const response = await axios.get("http://"+ip+":8082/getboardlist",{
      params : {
        btype : noticeName
      }
    });

    let result = response.data;

    for(let i = 0; i<result.length; i++){
      newBidArray.push(result[i].bid);
      newBtitleArray.push(result[i].btitle);
      newBdateArrray.push(result[i].bDate);
      newBuserArray.push(result[i].userid);
      newBuidArray.push(result[i].uid);
    }
    setBid(newBidArray);
    setBtitle(newBtitleArray)
    setBdate(newBdateArrray);
    setBUser(newBuserArray);
    setBuid(newBuidArray);
  }

  const boardlist = ({index})=>( 
      <TouchableOpacity key={index} style = {styles.commentArea}
            onPress= {()=> {
            props.navigation.navigate("boardContent", {userId : userId, bid : bid[index], buid : buid[index], buser : buser[index], bdate : bdate[index], btitle : btitle[index]});
            }}>
        <View style = {styles.imageandname}>
        <Text style = {styles.buser}>{btitle[index]}</Text>
        </View>
        <Text style = {styles.btitle}>{buser[index]}</Text>
        <Text style = {styles.buid}>{bdate[index]}</Text>

      </TouchableOpacity>
    );

    return(
        // 문단 순서대로 게시판 이름, 글 작성 버튼, 검색 이미지, FlatList(게시글 목록)
      <MenuProvider>
        <SafeAreaView style ={styles.container}>

                {/* 검색, 글쓰기 버튼 */}
            <View style = {styles.buttonArea}>
                 {/* 검색 버튼 */}
              <TouchableOpacity style = {styles.mindMapArea} onPress = {() => {
              props.navigation.navigate("boardSearch", {userId : userId});
            }}>
              <SearchBar
                  lightTheme = 'true'
                  round = "true"
                  onChangeText = {updateQuery}
                  value = {query}
                  autoFocus = {false}
                  platform = "ios"
                  containerStyle = {{flex : 4, backgroundColor : 'white', width: '75%', height : 'auto', borderWidth : 1, borderRadius : 10, borderColor : 'gray'}}
                  // 컨테이너 스타일은 수정해야 함
                  inputContainerStyle = {{backgroundColor : 'white', height : 20}}>
              </SearchBar>
                {/* <Image style = {styles.userimage} source = {require('../../img/search.png')}></Image> */}
                </TouchableOpacity>

               {/* 글쓰기 버튼 */}
              <TouchableOpacity style = {styles.button} onPress = {() =>{
                props.navigation.navigate("boardWriting", {userId : userId, noticeName : noticeName});
              }}>                
              <Text style = {styles.buttonText}>글쓰기</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.line}></View>
            <View style = {{margin : 10, flexDirection : 'row', flex : 1,}}>
         <FlatList 
            data={btitle}
            extraData={buser}
            keyExtractor={bdata => bdata.id}
            renderItem={boardlist}
         />
         </View>
      </SafeAreaView>
      </MenuProvider>
    );
}

const styles = StyleSheet.create({
container: {
  width: '100%',
  flex: 1,
  flexDirection: 'column', // row
  backgroundColor: 'white',
},

category_subtitle:{
  color: 'black',
  fontSize: 20,
  marginTop: 15,
  marginLeft: 15,
},
commentArea : {
  backgroundColor : '#ffffff',
  shadowColor : "#000000",
  shadowOpacity : 0.3,
  shadowOffset : {width : 2, height : 2},
  elevation : 3,
},
buser : {
  fontSize : 20,
  fontWeight : 'bold',
  marginLeft : 10,
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

/*userimage : {
  height : hp('4%'),
  width : wp('9%'),
},*/
bdate : {
  marginLeft : 5,
  marginBottom : 5,
  color : 'gray'
},
btitle : {
  margin : 5,
  fontSize : 18
},
buid : {
  marginLeft : 5,
  marginBottom : 5,
  color : 'gray'
},
imageandname : {
  flexDirection : 'row',
  alignItems : 'center',
  margin : 5
},
userimage : {
  height : hp('4%'),
  width : wp('9%'),
},
line : {
  borderColor : 'lightgray',
  borderWidth : 1,
  marginLeft : 10,
  marginRight : 10,
},
});

export default NoticePage;