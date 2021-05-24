import React, { useState } from "react";
import {Modal,StyleSheet, Text, ScrollView, TouchableOpacity, SafeAreaView,Image, View, Linking} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const MainPage = (props,{navigation}) => {

  const userId = props.userId;
  const api = "KakaoAK aef53ecb905e1cbffcf4b411286c0ca0";
  
  // App.js ip 받아오기
  const [ip,setIp] = useState();
  AsyncStorage.getItem("ip").then((value) => {
    setIp(value);
  });

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [sort, setSort] = useState([['a1','b','c','d','e','f','g','h','i','j','k'],['a2','b','c','d','e','f','g','h','i','j','k'],
      ['a3','b','c','d','e','f','g','h','i','j','k'],['a4','b','c','d','e','f','g','h','i','j','k'],['a5','b','c','d','e','f','g','h','i','j','k']])

  // const [sort,setSort] = useState();

  // const userId = props.route.params.userId;
  var [bookName, setBookName] = useState(["-", "-", "-", "-", "-"]);
  const [bookSrc, setBookSrc] = useState(["-","-","-","-","-"]);
  const [bookUrl, setBookUrl] = useState(["-","-","-","-","-"]);
  const [roadmap, setRoadMap] = useState(["-","-","-","-","-"])
  const [roadMapId, setRoadMapId] = useState(["-","-","-","-","-"])
  const [roadmapUid, setRoadmapUid] = useState(["-","-","-","-","-"])

  const [getbook, setGetBook] = useState(["0"]);

  const [userRoadmap, setUserRoadmap] = useState([]);
  const [userRoadmapId, setUserRoadmapId] = useState([]);
  const [ruid, setRuid] = useState([]);

  const [viewState, setViewState] = useState("즐겨찾기");
  const [foot, setFoot] = useState("다음");
  const [cnt, setCnt] = useState(1);

  if(getbook == "0"){
    if (ip != null){
      checkUserInterest();
      getinterest();
      getTopBook();
      getTopRoadmap();
      getloveroadmap();
      setGetBook("1");
      setLoading(false);
    }
  }

  // 분야항목 가져오기
  async function getinterest(){
    try {
      const response = await axios.get("http://172.20.10.6:8000/test",{

      });

      const result = response.data;

      var newInterestArray = [];

      for(let i = 0; i<5; i++){
        newInterestArray.push(result[i]);
      }

      setSort(newInterestArray);
      console.log(newInterestArray);

    } catch (error) {
      console.log(error)
    }
  }

  // 흥미분야 검사
  async function checkUserInterest(){
    try{
      const response = await axios.get("http://172.20.10.6:8000/checkuserinterest",{
        params : {
          userId : userId
        }
      });
      
      const result = response.data;

      console.log(result);

      //result가 null이라면, 검사 페이지로 이동
      if(result == 0){
        setModalVisible(true);
        console.log("검사시작");
      }
      //아니라면 유지

    }catch(error){
      console.log(error);
    }
  }

  //좋아요 로드맵 가져오기
  async function getloveroadmap(){
    setLoading(true);
    try{
      var newRoadmapArray = [];
      var newRoadmapIdArray = [];
      var newRuidArray = [];

      const response = await axios.get("http://"+ip+":8083/getuserloveroadmap", {
        params : {
          userId : userId
        }
      });

      let result = response.data;

      if (result != null){
        for (var i = 0; i < result.length; i++){
          newRoadmapArray.push(result[i].RNAME);
          newRoadmapIdArray.push(result[i].RID);
          newRuidArray.push(result[i].UID);
        }
        
        setUserRoadmap(newRoadmapArray);
        setUserRoadmapId(newRoadmapIdArray);
        setRuid(newRuidArray);
      }

    }catch(error){
      console.log(error);
    }
    setLoading(false);
  }

  //책 순위 가져오기
  async function getTopBook(){
    try{
      var newBookNameArray = [...bookName];

      const response = await axios.get("http://"+ip+":8081/gettopbook");

      let result = response.data;

      for (var i = 0; i<result.length; i++){
        newBookNameArray[i] = result[i].BNAME;
      }

      setBookName(newBookNameArray);
      getBookInfo(newBookNameArray);
    }catch(error){
      console.log(error);
    }
  }

  //추천 로드맵 가져오기
  async function getRecommandRoadmap(sort){
    if(sort == 1){
      alert(sort);
    }
    else if (sort == 2){
      alert(sort);
    }
  }

  //카카오 api 책정보
  // https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book
  async function getBookInfo(bookarray){
    var newSrcArray = [...bookSrc];
    var newUrlArray = [...bookUrl];

    for(var i = 0; i<bookName.length; i++){
      try {
        const response = await axios.get("https://dapi.kakao.com/v3/search/book?",{
          params : {
            sort : 'accuracy',
            page : 1,
            size : 1,
            query : bookarray[i]
          },
          headers: {
            Authorization: api
          }
        });
  
        let result = response.data;
        newSrcArray[i] = result.documents[0].thumbnail;
        newUrlArray[i] = result.documents[0].url;
  
      } catch (error) {
        console.error(error);
      }
    }
  
    setBookSrc(newSrcArray);
    setBookUrl(newUrlArray);
  }

  //로드맵 순위 가져오기 => 클러스터링 로드맵 순위로 번경해야함
  async function getTopRoadmap(){
    try{
      var newRoadmapArray = [...roadmap];
      var newRoadmapIdArray = [...roadMapId];
      var newRoadmapUIDArray = [...roadmapUid];
      const response = await axios.get("http://"+ip+":8081/gettoprank");

      for(var i = 0; i<5; i++){
        newRoadmapArray[i] = response.data[i].RNAME;
        newRoadmapIdArray[i] = response.data[i].RID;
        newRoadmapUIDArray[i] = response.data[i].UID;
      }

      setRoadMap(newRoadmapArray);
      setRoadMapId(newRoadmapIdArray);
      setRoadmapUid(newRoadmapUIDArray);
      
    } catch(error){
      console.error(error);
    }
  }

  // 흥미분야 탐색 컴포넌트
  const interestList = sort[cnt-1].map((sort, index) => 
  (              
    <TouchableOpacity key = {index} style = {styles.interestThing} onPress = {() => {
      alert(sort);
    }}>
      <Text style = {styles.interestText}>{sort}</Text>
    </TouchableOpacity>
  )
  );

  const modalHeader = (
    <View style = {styles.modalHeader}>
      <View style = {styles.headerView}>
        <Text style = {styles.headerCnt}>{cnt}/5</Text>
        <Text style = {styles.headerText}>{userId}님의 흥미분야 탐색</Text>
      </View>
      <View style = {styles.divider}></View>
    </View>
  )

  const modalBody=(
    <View style = {styles.modalBody}>
      <View style = {styles.bodyView}>
        {interestList}
      </View>
    </View>
  )
  
  const modalFooter=(
    <View style = {styles.modalFooter}>
      <TouchableOpacity style = {{justifyContent : "center", backgroundColor : 'skyblue', alignItems : 'center', borderRadius : 5}}
        onPress = {() => {
          if(foot == "다음"){
            if(cnt == 4){
              setFoot("완료")
            }
            setCnt(cnt+1);
          }
          else if(foot == "완료"){
            setModalVisible(!modalVisible);
          }
        }}
      >
        <Text style = {{textAlign : 'center', fontWeight : 'bold', color : 'white', fontSize : 30, padding : 10}}>{foot}</Text>
      </TouchableOpacity>
    </View>
  )

  const modalContainer = (
    <View style = {styles.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  )

  const modal = (
    <Modal
      animationType = 'fade'
      transparent={true}
      visible = {modalVisible}
    >
      <View style = {styles.modal}>
        <View>
          {modalContainer}
        </View>
      </View>
    </Modal>
  )

  //책 목록 컴포넌트화
  const bookList = bookSrc.map((bookSrc, index) => 
    (              
      <TouchableOpacity key = {index} style = {styles.imageArea} onPress ={() =>{
        //Linking.openURL(bookUrl[index])
        props.navigation.navigate("bookinfo", {bookUrl : bookUrl[index]});
      }}>
        <Image style = {styles.image} source = {{uri : bookSrc}}></Image> 
        <Text style = {styles.imageName}>{bookName[index]}</Text>
      </TouchableOpacity>
    )
  );

  //사용자 좋아요 로드맵 컴포넌트화
  const userList = userRoadmap.map((userRoadmap, index) => 
  (            
    <TouchableOpacity key = {index} style = {styles.imageArea} onPress ={() =>{
      props.navigation.navigate("RoadMapSocial", {ruid : ruid[index], roadmap : userRoadmap, roadMapId : userRoadmapId[index], userId : userId, ip : ip});
    }}>
      <Image style = {styles.roadmapImage} source = {require("../img/loadmap_illustrate.png")}></Image> 
      <Text style = {styles.imageName}>{userRoadmap}</Text>
    </TouchableOpacity>
  )
  );

  //로드맵 순위 컴포넌트화
  const roadMapList = roadmap.map((roadmap, index) =>(
    <TouchableOpacity key = {index} onPress = {() =>{
      props.navigation.navigate("RoadMapSocial", {ruid : roadmapUid[index], roadMapId : roadMapId[index], roadmap : roadmap, userId : userId, ip : ip})
    }}>
        <Text style = {styles.roadMapName}>{index+1}.  {roadmap}</Text>
      </TouchableOpacity>
    )
  );

  const show = false;

  return(
    <SafeAreaView style={styles.container}>
      {modal}
      <ScrollView>
            {/* 사용자 정보 및 검색창 */}
            <View style = {{flex : 1, margin : 10}}>
              <View style = {{flexDirection : 'row', justifyContent : 'space-between'}}>
                <TouchableOpacity style = {{flexDirection : 'row', flex : 1}} onPress = {() =>{
                  props.navigation.navigate("MyPage", {userId : userId, ip : ip})
                }}>
                  <Image style = {{width : 50, height : 50, padding : 10}} source ={require("../img/user.png")}></Image>
                  <Text style = {styles.userName}>{userId}</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {{flex : 1, justifyContent : 'center', marginLeft : 10, marginRight : 10}} onPress = {() => {
                  props.navigation.navigate("SearchPage", {userId : userId, ip : ip})
                }}>
                  <SearchBar
                    lightTheme = 'true'
                    round = "true"
                    platform = "android"
                    disabled = "true"
                    leftIconContainerStyle = {{marginRight : "80%"}}
                    containerStyle = {{backgroundColor : 'white', height : 'auto', borderWidth : 1, borderRadius : 10, borderColor : 'gray'}}
                    inputContainerStyle = {{backgroundColor : 'white', height : 20}}>
                  </SearchBar>
                </TouchableOpacity>

              </View>
                
                {/* 즐겨찾기 및 추천 버튼 */}
              <View style = {{flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                
                
                <View style = {{flex : 1}}>

                </View>
                
                <View style = {{flexDirection : 'row'}}>
                  <TouchableOpacity style = {{justifyContent : 'center', margin : 10}} onPress = {() =>{
                      getloveroadmap();
                      setViewState("즐겨찾기");
                      console.log(viewState);
                    }}>
                    <Text style = {{color : 'blue', fontSize : 20}}>즐겨찾기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {{justifyContent : 'center', margin : 10}} onPress = {() =>{
                      setViewState("추천");
                      console.log(viewState);
                    }}>
                    <Text style = {{color : 'blue', fontSize : 20}}>추천</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 로드맵 뷰 */}
              <View style = {styles.roadMapArea} >
                <Spinner visible = {loading} textContent = {""}></Spinner>
                  <ScrollView horizontal = {true}>
                    {
                     userRoadmap.length == 0
                     ? ( viewState == "추천"
                        ? <View style = {{justifyContent : 'center', alignContent : 'center', padding : 30, flexDirection : 'row'}}>
                            <TouchableOpacity style = {styles.recommandButton} onPress = {() => {
                              getRecommandRoadmap(1);
                            }}>
                              <Text style = {styles.recommandText}>추천 1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.recommandButton} onPress = {() => {
                              getRecommandRoadmap(2);
                            }}>
                              <Text style = {styles.recommandText}>추천 2</Text>
                            </TouchableOpacity>
                          </View>
                        : <View style = {{justifyContent : 'center', alignContent : 'center', padding : 30}}>
                            <Text style = {{justifyContent : 'center', alignItems : 'center', fontSize : 20, fontWeight : 'bold', textAlign : 'center'}}>데이터가 없습니다</Text>
                          </View>
                     )
                     : ( viewState == "즐겨찾기"
                          ? userList
                          : (
                            <View style = {{justifyContent : 'center', alignContent : 'center', padding : 30, flexDirection : 'row'}}>
                              <TouchableOpacity style = {styles.recommandButton} onPress = {() => {
                                getRecommandRoadmap(1);
                              }}>
                                <Text style = {styles.recommandText}>추천 1</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style = {styles.recommandButton} onPress = {() => {
                                getRecommandRoadmap(2);
                              }}>
                                <Text style = {styles.recommandText}>추천 2</Text>
                              </TouchableOpacity>
                            </View>
                          )
                     )
                    }
                </ScrollView>
              </View>
            </View>

          {/* 비슷한 사용자의 인기 로드맵 */}
          <View style = {styles.rankArea}>
            <Text style = {styles.rankName}>직장인의 눈</Text>
                  <View style = {styles.roadMapRankArea}>
                    {roadMapList}
                  </View>
          </View>

          <View style = {styles.line}></View>

          {/* 인기 책순위  */}
          <View style = {styles.rankArea} >

            <Text style = {styles.rankName}>인기 책 순위</Text>

            <ScrollView horizontal = {true}>
                {bookList}
            </ScrollView>
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
    borderWidth : 2,
  },

  recommandButton : {
    borderColor : 'skyblue',
    borderWidth : 2,
    padding : 12,
    margin : 12
  },
  recommandText : {
    fontSize : 20,
    fontWeight : 'bold',
    textAlign : 'center',
  },
  mindMapArea : {
    flex : 1,
    borderColor : 'skyblue',
    borderWidth : 4,
    borderRadius : 10,
    justifyContent : 'center'
  },

  mindMapImage : {
    height : hp("20%"),
    width : wp("90%"),
    justifyContent : 'center',
  },
  roadMapArea : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderColor : 'lightgray',
    borderWidth : 1,
    paddingBottom : 10
  },
  rankArea : {
    flex : 1,
    margin : 10
  },
  userName : {
    fontSize : 30,
    fontWeight : 'bold',
    padding : 10
  },
  rankName : {
    fontSize : 30,
    fontWeight : 'bold',
    padding : 10
  },
  imageArea : {
    justifyContent : 'center'
  },
  image : {
    height : 150,
    width : 100,
    margin : 10,
    borderColor : 'lightgray',
    borderWidth : 1
  },
  roadmapImage : {
    height : 100,
    width : 150,
    margin : 10,
    borderColor : 'lightgray',
    borderWidth : 1
  },
  imageName : {
    fontSize : 15,
    fontWeight : 'normal',
    textAlign : 'center',
  },

  roadMapRankArea : {
    borderRadius : 10, 
    borderWidth : 4, 
    borderColor : 'gray',
    margin : 10
  },
  roadMapName : {
    fontSize : 20,
    fontWeight : 'bold',
    margin : 10
  },
  modal : {
    backgroundColor:"white",
    flex:1,
    height : "100%",
    width : "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer : {
    backgroundColor:"white",
    width: 360,
    height : "90%",
    borderRadius:5
  },
  modalHeader : {
    padding : 10,
  },
  headerView : {

  },
  headerCnt : {
    textAlign : 'center',
    color : 'gray',
    fontWeight : 'bold',
    fontSize : 20,
    
  },
  headerText : {
    textAlign : 'center',
    fontWeight : 'bold',
    fontSize : 30
  },
  modalBody : {
    backgroundColor : 'white',
    height : "95%",
    paddingVertical:20,
    paddingHorizontal:10
  },
  bodyView : {
    height : "100%",
    width : "100%",
  },
  modalFooter : {
  },
  divider:{
    width:"100%",
    height:1,
    backgroundColor:"lightgray"
  },
  interestThing : {
    backgroundColor : 'lightblue',
    borderRadius : 10,
    marginBottom : 10,
  },
  interestText : {
    fontWeight : 'bold',
    fontSize : 23,
    color : 'white',
    margin : 10,
    textAlign : 'center',
  }
});

export default MainPage;