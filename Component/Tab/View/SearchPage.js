import React, { useState } from "react";
import {StyleSheet, Text, ScrollView, TouchableOpacity, SafeAreaView,Image, View, Linking} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from "react-native";

const SearchPage = (props, {navigation}) => {

  let userId = props.route.params.userId;

  const [loading, setLoading] = useState(false);

  const [ip,setIp] = useState();
  AsyncStorage.getItem("ip").then((value) => {
    setIp(value);
  });

  const [rname, setRname] = useState([]);
  const [rid, setRid] = useState([]);
  const [uid, setUid] = useState([]);

  const [rank, setRank] = useState(["인공지능","빅데이터","풀스택","백엔드","게임","머신러닝","데브옵스","자바","파이썬","데이터베이스",]);

  const [query, setQuery] = useState("");

  //검색상황 반영
  const updateQuery = (query) => {
    setQuery(query);
  }

  function resultAlert(){
      Alert.alert("결과 없음","검색결과가 없습니다.");
  }

  async function searchRoadmap(query){
    
    setLoading(true);

    var newRidArray = [];
    var newUidArray = [];
    var newRnameArray = [];

    const response = await axios.get("http://"+ip+":8083/getsearchroadmap", {
      params : {
        query : query
      }
    });

    const result = response.data;

    if(result.length != 0){
      for (var i = 0; i < result.length; i++){
        newRidArray.push(result[i].RID);
        newUidArray.push(result[i].UID);
        newRnameArray.push(result[i].RNAME);
      }
  
      setRid(newRidArray);
      setUid(newUidArray);
      setRname(newRnameArray);
      setLoading(false);
    }
    else{
      setLoading(false);
      setTimeout(resultAlert,100);
      setRid(newRidArray);
      setUid(newUidArray);
      setRname(newRnameArray);
    }
  }

  const rankList = rank.map((rank, index) =>(
    <TouchableOpacity key = {index} onPress = {() =>{
      setQuery(rank);
      searchRoadmap(rank);
    }}>
        <Text style = {styles.rankname}>{index+1}.  {rank}</Text>
      </TouchableOpacity>
    )
  );

    // 검색결과 로드맵 컴포넌트
    const RoadmapList = rid.map((rid, index) =>(
      <TouchableOpacity key = {index} onPress = {() =>{
        props.navigation.navigate("RoadMapSocial", {roadMapId : rid, ruid : uid[index] ,roadmap : rname[index], userId : userId, ip : ip})
      }}>
        <View style = {styles.element}>

          <View style = {styles.roadmapimageblock}>
            <Image style = {styles.roadmapImage} source = {require("../../img/loadmap_illustrate.png")}></Image>
          </View>

          <View style = {styles.roadmpaNameBlock}>
            <Text style = {styles.roadmapName}>{rname[index]}</Text>
          </View>
          
        </View>
        
        <View style = {styles.line}></View>
        </TouchableOpacity>
    )
  );

    return(

      <SafeAreaView style ={styles.container}>
        <Spinner
          visible = {loading}
          textContent = {"검색 중..."}></Spinner>
        <View style = {{justifyContent : 'center', margin : 10, flexDirection : 'row'}}>
          <SearchBar
              lightTheme = 'true'
              round = "true"
              onChangeText = {updateQuery}
              value = {query}
              autoFocus = {false}
              platform = "ios"
              onClear = {() => {
                
              }}
              containerStyle = {{flex : 4, backgroundColor : 'white', height : 'auto', borderWidth : 1, borderRadius : 10, borderColor : 'gray'}}
              inputContainerStyle = {{backgroundColor : 'white', height : 20}}>
          </SearchBar>

          <TouchableOpacity style = {{flex : 1, alignContent : 'center', justifyContent : 'center', borderColor : 'black', borderWidth : 1, borderRadius : 10, marginLeft : 10}}
            onPress = {() => {searchRoadmap(query)}}>
            <Text style = {{fontSize : 20, fontWeight : 'bold', justifyContent : 'center', textAlign : 'center'}}>검색</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style = {{flex : 1}}>
          {
            query.length == 0
            ? (
              <View style = {styles.roadMapRankArea}>
                {rankList}
              </View>
            )
            : RoadmapList
          }
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
  roadMapRankArea : {
    borderRadius : 10, 
    borderWidth : 4, 
    borderColor : 'gray',
    margin : 10
  },
  rankname : {
    fontWeight : 'bold',
    fontSize : 30,
    padding : 5,
  },
  });

export default SearchPage;