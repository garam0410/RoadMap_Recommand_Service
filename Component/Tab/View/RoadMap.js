import React, {Component, useState} from 'react';
import {TextInput, Modal, View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Linking, FlatList, ScrollView} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; // width, height
import{Menu, MenuOptions,MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import TreeView from 'react-native-final-tree-view';

import axios from 'axios';

const RoadMap = (props, {navigation}) => {

  // 모달에 전달할 내용들(제목, 내용, 레벨 등)
  const [numLevel, setnumLevel] = useState(0);
  const [dataTitle, setdataTitle] = useState(null);
  const [dataTexts, setdataTexts] = useState(null);

  //모달 - 책 관련 변수
  const [bookSrc, setBookSrc] = useState(null);
  const [bookUrl, setBookUrl] = useState(null);
  const [bookauthor, setBookauthor] = useState(null);
  const [bookpublisher, setBookpublisher] = useState(null);

  //리스트 형식과 그래프 형식 상태 변수
  const [Viewstate, setViewstate] = useState(true);

  //모달 뷰 관련 변수
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBooksid, setBooksid] = useState(null);

  const [secondmodalVisible, setsecondmodalVisible] = useState(false);

  let roadMapId = props.route.params.roadMapId;
  let roadmap = props.route.params.roadmap;

  console.log(roadMapId);

  const api = "KakaoAK aef53ecb905e1cbffcf4b411286c0ca0";

  const state = {
    triz: [
      {
        key : 0,
        id: 'Root',
        title : '웹',
        texts : '월드 와이드 웹(World Wide Web)이란 인터넷에 연결된 사용자들이 서로의 정보를 공유할 수 있는 공간을 의미합니다. 간단히 줄여서 WWW나 W3라고도 부르며, 간단히 웹(Web)이라고 가장 많이 불립니다. 인터넷과 같은 의미로 많이 사용되고 있지만, 정확히 말해 웹은 인터넷상의 인기 있는 하나의 서비스일 뿐입니다. 하지만 현재에는 인터넷과 웹이라는 단어가 서로 혼용되어 사용될 만큼 인터넷의 가장 큰 부분을 차지하고 있습니다.',
        children: [
          {
            key : 1,
            id: 'Trunk1',
            title : '벡엔드',
            texts : '백엔드는 소프트웨어 개발 프로세스에서 서버 측 개발 분야입니다. 백엔드에서는 데이터를 저장하고 관리한다',
            children: [
              {
                key : 3,
                id: 'Branch1',
                title : 'Node.js',
                texts : '노드는 크로스 플랫폼의 오픈소스 런타임(run time) 환경으로써, 브라우저의 외부에서 자바스크립트 코드를 실행할 수 있게 해줍니다. 노드는 프로그래밍 언어도 아니고, 프레임워크도 아닙니다. 노드는 모바일이나 웹 어플리케이션용 API와 같은 백엔드 서비스 개발을 위해서 사용됩니다. 이미 페이팔, 우버, 월마트, 넷플릭스 등 포춘지 선정 500대 기업에서 많이들 사용하고 있죠.',
                children: [
                  {
                    key : 4,
                    id: 'leaf1',
                    title : 'NOde.js 디자인 패턴',
                    texts : 'NOde.js 디자인 패턴',
                  },

                ],
              },
              {
                key : 2,
                id: 'Branch2',
                title : 'Git',
                texts: '컴퓨터 파일의 변경사항을 추적하고 여러 명의 사용자들 간에 해당 파일들의 작업을 조율하기 위한 분산 버전 관리 시스템이다. 소프트웨어 개발에서 소스 코드 관리에 주로 사용되지만 어떠한 집합의 파일의 변경사항을 지속적으로 추적하기 위해 사용될 수 있다.',
              },

              {
                key : 5,
                id: 'Branch3',
                title : 'Javascript',
                texts : '자바스크립트는 "동적 표현"을 하기 위한 언어이다. 모바일 메뉴를 보기 위해 햄버거 모양(三)의 아이콘을 눌렀을 때 메뉴가 나타나게 해주는 것이 자바스크립트의 역할이라고 보면 된다. 타 프로그래밍 언어에 비해 진입 장벽이 낮은 편이지만 깊이 들어갈수록 어렵다. 웹퍼블리셔는 자바스크립트로 자신이 원하는 동작을 스스로 코딩할 수 있을 정도로 마스터하는 것이 중요하다고 생각한다.',
                children: [
                  {
                    key : 6,
                    id: 'Leaf2',
                    title : '자바스크립트 + jQuery 완전정복 스터디 3',
                    texts : '자바스크립트 + jQuery 완전정복 스터디 3',
                  },
                ],
              },
              {
                key : 7,
                id: 'Branch4',
                title : 'PHP',
                texts : '특별히 웹 애플리케이션 개발을 위해서 고안된 서버 측 스크립트 언어입니다. PHP는 서버 측에서 실행되기 때문에, 특히 서버 측 언어로서 많은 인기를 얻고 있습니다.',
                children: [
                  {
                    key : 8,
                    id: 'Leaf3',
                    title : '러닝 PHP',
                    texts : '러닝 PHP',
                  },
                ],
              },

            ],
          },
        ],
      },
    ],
  };

  
  const data = [
    { data: state.triz[0]},
    { data: state.triz[0].children[0]},
    { data: state.triz[0].children[0].children[0]},
    { data: state.triz[0].children[0].children[1]},
    { data: state.triz[0].children[0].children[0].children[0]},
    { data: { source: 'Root', target: 'Trunk1', label: 'Edge from Node1 to Node2' } },
    { data: { source: 'Trunk1', target: 'Branch1', label: 'Edge from Node1 to Node2' } },
    { data: { source: 'Trunk1', target: 'Branch2', label: 'Edge from Node1 to Node2' } },
    { data: { source: 'Branch1', target: 'leaf1', label: 'Edge from Node1 to Node2' } },
 ];
  
  const getIndicator = (isExpanded, hasChildrenNodes) => {
    if (!hasChildrenNodes) {
      //노드가 더이상 없을 경우
      return '*';
    } else if (isExpanded) {
      //노드가 있고, 펼친 상태
      return '-';
    } else {
      //노드가 있는 경우
      return '+';
    }
  };

    //카카오 api 책정보
  async function getBookInfo(bookarray){
    var newSrcArray = bookSrc;
    var newUrlArray = bookUrl;
    var newauthor = bookauthor;
    var newpublisher = bookpublisher;

    try {
      const response = await axios.get("https://dapi.kakao.com/v3/search/book?",{
        params : {
          sort : 'accuracy',
          page : 1,
          size : 1,
          query : bookarray
        },
        headers: {
          Authorization: api
        }
      });

      let result = response.data;
      newSrcArray = result.documents[0].thumbnail;
      newUrlArray = result.documents[0].url;
      newauthor = result.documents[0].authors;
      newpublisher = result.documents[0].publisher;

    } catch (error) {
      console.error(error);
    }
    
  
    setBookSrc(newSrcArray);
    setBookUrl(newUrlArray);
    setBookauthor(newauthor);
    setBookpublisher(newpublisher);
  }

  // 모달 수정클릭 이벤트
  const updateModalView = () => {
    setModalVisible(!modalVisible);
    setsecondmodalVisible(!secondmodalVisible);
  }


  return(
    <MenuProvider>
      <SafeAreaView style ={styles.container}>
        <View style = {styles.container}>
            <Text style = {styles.Texts}>
                {roadmap}
            </Text>

          <View style = {styles.roadview}>

            <View style = {styles.top}>
        
              {/* 뷰 형식 선택 && 더보기 */}
                <View style = {{flexDirection : 'column', flex : 1}}>
                  
                  <View style = {{flex : 1, flexDirection : 'row', justifyContent: 'space-between'}}>
                    
                    {/* 뷰 선택 아이콘 변경 */}
                    {Viewstate ? 
                    (
                    <View style = {{flex : 1.5, justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
                      <TouchableOpacity style = {styles.clickicons}>
                        <Icon name='list'size={25} color="white"></Icon> 
                      </TouchableOpacity>
                      <TouchableOpacity style = {styles.nonclickicons} onPress = {() => {setViewstate(!Viewstate)}}>
                        <Icon name='share-social-outline'size={25} color="#0067A3"></Icon> 
                      </TouchableOpacity>
                    </View>
                    ) 
                    : 
                    (
                    <View style = {{flex : 1.5, justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
                      <TouchableOpacity style = {styles.nonclickicons} onPress = {() => {setViewstate(!Viewstate)}}>
                        <Icon name='list'size={25} color="#0067A3"></Icon> 
                      </TouchableOpacity>
                      <TouchableOpacity style = {styles.clickicons}>
                        <Icon name='share-social-outline'size={25} color="white"></Icon> 
                      </TouchableOpacity>
                    </View>
                    )}
                    


                    <View style = {{flex : 5, justifyContent : 'center', alignItems : 'center'}}>
                    </View>

                    {/* 더보기 */}
                    <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                        <Menu>
                          <MenuTrigger style = {{margin : 10}}> 
                            <Icon name='ellipsis-vertical'size={30} color="black"></Icon>
                          </MenuTrigger>
                          <MenuOptions>
                          <MenuOptions><TouchableOpacity style = {[styles.menuText]} onPress = {() => {
                            props.navigation.navigate("ModifyRoadMap", {roadMapId : roadMapId, roadmap : roadmap})
                          }}><Text>수정</Text></TouchableOpacity></MenuOptions>

                          <MenuOptions><TouchableOpacity style = {[styles.menuText]}>
                            <Text>삭제</Text>
                            </TouchableOpacity></MenuOptions>
                          </MenuOptions>
                        </Menu>
                    </View>
                  </View>
                  
                </View>

              {/* 로드맵 줄 - 리스트와 그래프 */}
                
              <View style = {styles.scrolls}>

                {Viewstate ? 
                    (
                      // 리스트 형식
                    <TreeView
                      data={state.triz}
                      renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
                        return (
                          <View style={{
                            flexDirection: 'column',
                          }}>
                            <Text
                              style={{
                                height : 20 ,
                                marginLeft: 25 * level,
                                marginTop : 3,
                                fontSize: 15,
                                color : "black",
                              }}>
                              {getIndicator(isExpanded, hasChildrenNodes)} {node.title}
                            </Text>
                          </View>
                        )
                      }}

                      // 리스트 노드를 길게 눌렀을 때 발생하는 이벤트들
                      onNodeLongPress={({node, level})=> {
                        setBooksid(node.id); // 클릭한 적이 있는지 없는지
                        setnumLevel(level);  // 해당 노드의 레벨 확인(4인경우 다른 뷰)
                        setdataTitle(node.title); // 노드의 제목
                        setdataTexts(node.texts); // 노드의 내용
                        setModalVisible(true); // 모달을 보여주기 위한 설정
                        if(level === 3){
                          getBookInfo(node.title);
                        }
                      }}
                    />
                    ) 
                  :(
                    <View style = {{height : "100%", width : "100%"}}>

                    </View>
                  )}
                  

                  {/* Modal 모달 부분 */}
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible)
                    }}
                  >

                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        {modalBooksid ?
                        (
                          <View style = {{height : hp("30%"), marginTop: 10, marginBottom : 10}}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                              <Icon name='close'size={20} color="#0067A3"></Icon>
                            </TouchableOpacity>
                            <Text style = {{fontSize : 18, fontWeight : 'bold', alignSelf : "center"}}>{dataTitle}</Text>
                            
                            {/* Leaf일때만 책 가져오고 나머지는 글가져오기 */}
                            <ScrollView horizontal = {false} style = {styles.modalTextStyle}>
                              { numLevel === 3 ?
                                (
                                  <View>
                                    <View style={styles.bookmodalstyle}>
                                      <View style = {{flex : 1}}>
                                        <TouchableOpacity  onPress ={() =>{
                                          Linking.openURL(bookUrl)
                                        }}>
                                        <Image style = {styles.image} source = {{uri : bookSrc}}></Image> 
                                        </TouchableOpacity>
                                      </View>

                                      <View style = {styles.booksDataStyle}>
                                        <Text>{dataTitle}</Text>
                                        <Text>저자 : {bookauthor}</Text>
                                        <Text>출판사 : {bookpublisher}</Text>
                                      </View>
                                    </View>

                                    <Text style = {styles.Texts}>Comment</Text>
                                    <View style = {styles.insertcomment}>
                                      <TextInput style = {styles.comment}>
                                      </TextInput>
                                      <TouchableOpacity style = {{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', borderColor : 'gray', borderWidth : 1,borderRadius : 10, marginLeft : 5}}>
                                        <Text style = {styles.insert}>▷</Text>
                                      </TouchableOpacity>
                                  </View>d
                                </View>
                                ) 
                                :
                                (
                                  <View>
                                  <View>
                                    <Text style = {styles.modalTitleStyle}>{dataTexts}</Text>
                                  </View>

                                  <Text style = {styles.Texts}>Comment</Text>
                                  <View style = {styles.insertcomment}>
                                      <TextInput style = {styles.comment}>
                                      </TextInput>
                                      <TouchableOpacity style = {{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', borderColor : 'gray', borderWidth : 1,borderRadius : 10, marginLeft : 5}}>
                                        <Text style = {styles.insert}>▷</Text>
                                      </TouchableOpacity>
                                  </View>

                                  </View>
                                )
                              }
                            </ScrollView>
    
                          </View>
                          
                        )
                        :
                        (
                        <View style = {{borderColor : "black", borderWidth : 2, marginTop: 10, marginBottom : 10}}>
                          <Icon name='close' size={20} color="#0067A3"></Icon>
                          <Text>modalBooksid 잘못된 접근입니다.</Text>
                          </View>)
                        }

                        <View style = {{flexDirection : "row"}}>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => updateModalView()}
                          >
                            <Text style={styles.textStyle}>수정</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                          >
                            <Text style={styles.textStyle}>삭제</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>


                  {/* 수정하기 두번째 modal(모달) */}
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={secondmodalVisible}
                    onRequestClose={() => {
                      setsecondmodalVisible(!secondmodalVisible)
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>

                        {modalBooksid ?
                        (
                          <View style = {{height : hp("30%"), marginTop: 10, marginBottom : 10}}>

                            <TouchableOpacity onPress={() => updateModalView()}>
                              <Icon name='close'size={20} color="#0067A3"></Icon>
                            </TouchableOpacity>
                            <TextInput style = {[styles.inputstyle]} defaultValue={dataTitle} inputProps={{ 'aria-label': 'description' }} />
                          
                            <ScrollView horizontal = {false} style = {styles.modalTextStyle}>

                            { numLevel === 3 ?
                              (<View>
                                
                                  <View style={styles.bookmodalstyle}>
                                    <View style = {{flex : 1}}>
                                      <TouchableOpacity  onPress ={() =>{
                                        Linking.openURL(bookUrl)
                                      }}>
                                      <Image style = {styles.image} source = {{uri : bookSrc}}></Image> 
                                      </TouchableOpacity>
                                    </View>

                                    <View style = {styles.booksDataStyle}>
                                      <Text>{dataTitle}</Text>
                                      <Text>저자 : {bookauthor}</Text>
                                      <Text>출판사 : {bookpublisher}</Text>
                                    </View>
                                  </View>

                                  <Text style = {styles.Texts}>Comment</Text>
                                  <View style = {styles.insertcomment}>
                                    <TextInput style = {styles.comment}>
                                    </TextInput>
                                    <TouchableOpacity style = {{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', borderColor : 'gray', borderWidth : 1,borderRadius : 10, marginLeft : 5}}>
                                      <Text style = {styles.insert}>▷</Text>
                                    </TouchableOpacity>
                                  </View>

                              </View>
                              ) 
                              :
                              (
                                <View>
                                  <TextInput style = {[styles.inputareastyle]} multiline defaultValue={dataTexts} inputProps={{ 'aria-label': 'description' }} />
                                </View>
                              )
                            }
                            </ScrollView> 

                          </View>
                        )
                        :
                        (<Text>modalBooksid 거짓인 경우</Text>)
                        }

                        <View style = {{flexDirection : "row"}}>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => updateModalView()}
                          >
                            <Text style={styles.textStyle}>확인</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                          >
                            <Text style={styles.textStyle}>삭제</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
              
              </View>  
            </View>
          </View>

        </View>
      </SafeAreaView>
      <View>
      </View>
    </MenuProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column', // row
    backgroundColor: 'white',
    alignItems : "center",
  },
  roadview : {
    height : hp("70%"),
    width : wp("95%"),
    backgroundColor : "#BFC8D7",
    elevation : 3,
    margin : 5,
    borderRadius : 10
  },
  EditView : {
    flex: 1,
    height : hp("20%"),
    width : wp("90%"),
    borderColor : "#909FA6",
    borderWidth : 10,
    borderRadius : 25,
    marginTop : 5,
    flexDirection : "row",
    alignItems : "center",
    paddingHorizontal : 10,
  },
  Texts : {
    fontSize : 20,
    marginBottom : 10,
    marginTop : 10,
    fontWeight : 'bold'
  },
  modalTitleStyle : {
    marginTop : 10,
    marginBottom : 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
    marginRight : 10
  },
  buttonClose: {
    backgroundColor: "#f95965",
  },
  top : {
    flex : 1,
  },
  scrolls : {
    flex : 9, 
    justifyContent : 'center', 
    alignItems : 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
    
  },
  modalView: {
    flexDirection : "column",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom : 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bookmark : {
    alignItems: "center",
    fontSize : 15,
    width : 40,
    height : 60,
    borderColor : "black",
    borderWidth : 1,
    margin : 20,
    textAlign : "center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imageName : {
    fontSize : 15,
    fontWeight : 'normal',
    textAlign : 'center',
  },
  clickicons : {
    backgroundColor : "#696969",
    borderColor : "black",
    borderWidth : 1
  },
  nonclickicons : {
    backgroundColor : "white",
    borderColor : "black",
    borderWidth : 1
  },
  inputstyle : {
    fontSize : 20,
    fontWeight : 'normal',
    textAlign : 'center',
    borderColor : "lightgray",
    borderWidth : 2,
    marginTop : 10,
    marginBottom : 10,
    borderRadius : 10
  },
  inputareastyle : {
    fontSize : 15,
    textAlign : 'center',
    borderColor : "lightgray",
    borderWidth : 2,
    marginTop : 10,
    marginBottom : 10,
    borderRadius : 10
  },
  menuText : {
    fontSize : 12,
    marginTop : 2,
    marginBottom : 2,
    marginLeft : 5
  },
  //모달 책 관련
  modalTextStyle : {
    width : hp("40%")
  },
  image : {
    height : 150,
    width : 100,
    margin : 10,
    borderColor : 'lightgray',
    borderWidth : 2
  },
  booksDataStyle : {
    flex : 1, 
    marginTop : 10, 
    justifyContent : 'space-between',
  },
  bookmodalstyle : {
    flexDirection: 'row',
    justifyContent : 'space-between',
    marginTop : 10,
  },
  // 코멘트 관련
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
  insert : {
    fontSize : 20,
  },
});

export default RoadMap;