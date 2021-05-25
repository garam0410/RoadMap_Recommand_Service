import React, {Component, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList, Image, Button} from 'react-native';
import {SearchBar} from 'react-native-elements';
import{Menu, MenuOption, MenuOptions,MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';


const NoticePage = (props, {navigation}) => {

  let noticeName = props.route.params.noticeName;
  const userId = props.route.params.userId;
  console.log(userId);
  let [bid, setBid] = useState([]);
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

  //let [bindex, setBindex] = useState(["1","1","1","1","1","1","1","1","1"]);
  let [btitle, setBtitle] = useState(["타이틀1","타이틀2","타이틀3","타이틀4","타이틀5","타이틀6","타이틀7","타이틀8"]);
  let [bdate, setBdate] = useState(["2021-02-23 14:57", "2021-02-23 14:57", "2021-02-23 14:57", "2021-02-23 14:57", "2021-02-23 14:57", "2021-02-23 14:57", "2021-02-23 14:57", "2021-02-23 14:57"]);
  let [buid, setBuid] = useState(["1","1","1","1","1","1","1","1","1"]);
  let [buser, setBUser] = useState(["익명1", "익명2", "익명3", "익명4", "익명5", "익명6", "익명7", "익명8"]);

  const renderData = ({item}) => (
    <View style={{flexDirection: "row",
    justifyContent: "center",
    margin: 15,
  }}>
    <TouchableOpacity>
      <View style={{justifyContent: "center", alignItems: "center"}}>
      <View style={{width:60}}>
        <Text style={{textAlign: "center"}}>{item.game}</Text>
        </View>
        </View>
    </TouchableOpacity>
    </View>
); //이거 없어도 됨


  const boardlist = ({index})=>( 
      <TouchableOpacity style = {styles.commentArea}
            onPress= {()=> {
            props.navigation.navigate("boardContent", {userId : userId});
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
                props.navigation.navigate("boardWriting", {userId : userId});
              }}>                
              <Text style = {styles.buttonText}>글쓰기</Text>
              </TouchableOpacity>
            </View>

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

});

export default NoticePage;