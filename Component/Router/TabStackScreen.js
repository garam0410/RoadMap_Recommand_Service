import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";

import Icon from 'react-native-vector-icons/Ionicons';

import LoginPage from "../Login/LoginPage";
import SignUp from "../Login/SignUp";

import RoadMapCategoryPage from "../Tab/RoadMapCategoryPage"
import NoticeListPage from "../Tab/NoticeListPage"
import MainPage from "../Tab/MainPage"

import NoticePage from "../Tab/View/NoticePage";
import MyPage from "../Tab/View/MyPage";
import RoadMapSocial from "../Tab/View/RoadMapSocial";
import RoadMap from "../Tab/View/RoadMap";
import bookinfo from "../Tab/View/bookinfo";
import MyLoadmap from "../Tab/View/MyLoadmap";
import SearchPage from "../Tab/View/SearchPage";
import boardWriting from "../Tab/View/boardWriting";
import boardContent from "../Tab/View/boardContent";
import boardSearch from "../Tab/View/boardSearch";



const TabStack = createBottomTabNavigator();
const SignUpStack = createStackNavigator();

const MainStack = createStackNavigator();
const RoadMapCategoryStack = createStackNavigator();
const NoticeListStack = createStackNavigator();

const AppStack = createStackNavigator();

const MainStackScreen = ({userId, ip}) => {
    return(
        <MainStack.Navigator>
            <MainStack.Screen
                name = "로드맵 추천 서비스" children={({navigation})=><MainPage userId={userId} ip = {ip} navigation={navigation}/>}
                options = {{headerShown : false}}/>
            <MainStack.Screen name = "MyPage" component = {MyPage}/>
            <MainStack.Screen name = "SearchPage" component = {SearchPage}/>
            <MainStack.Screen name = "MyLoadmap" component = {MyLoadmap}/>
            <MainStack.Screen name = "RoadMapSocial" component = {RoadMapSocial}/>
            <MainStack.Screen name = "RoadMap" component = {RoadMap}/>
            <MainStack.Screen name = "bookinfo" component={bookinfo}/>
        </MainStack.Navigator>
    );
}
const RoadMapCategoryStackScreen = ({userId, ip}) => {
    return(
        <RoadMapCategoryStack.Navigator>
            <RoadMapCategoryStack.Screen name = "로드맵 카테고리" children={({navigation})=><RoadMapCategoryPage userId={userId} ip = {ip} navigation={navigation}/>}
            options = {{headerShown : false}}/>
            <MainStack.Screen name = "MyPage" component = {MyPage}/>
            <MainStack.Screen name = "SearchPage" component = {SearchPage}/>
            <MainStack.Screen name = "MyLoadmap" component = {MyLoadmap}/>
            <MainStack.Screen name = "RoadMapSocial" component = {RoadMapSocial}/>
        </RoadMapCategoryStack.Navigator>
    );
}
const NoticeListStackScreen = ({userId, ip}) => {
    return(
        <NoticeListStack.Navigator>
            <NoticeListStack.Screen name = "게시판" children={({navigation})=><NoticeListPage userId={userId} ip = {ip} navigation={navigation}/>}
            options = {{headerShown : false}}/>
            <NoticeListStack.Screen name = "NoticePage" component={NoticePage}/>
            <MainStack.Screen name = "MyPage" component = {MyPage}/>
            <MainStack.Screen name = "SearchPage" component = {SearchPage}/>
            <MainStack.Screen name = "MyLoadmap" component = {MyLoadmap}/>
            <MainStack.Screen name = "RoadMapSocial" component = {RoadMapSocial}/>
            <MainStack.Screen name = "boardWriting" component = {boardWriting}/>
            <MainStack.Screen name = "boardContent" component = {boardContent}/>
            <MainStack.Screen name = "boardSearch" component = {boardSearch}/>

        </NoticeListStack.Navigator>
    );
}

const TabStackScreen = (props, {ip}) => {
    const userId = props.route.params.userId;
    return(
        <TabStack.Navigator initialRouteName = "홈"
            screenOptions={({route}) => ({
                tabBarIcon : ({ focused, color, size}) => {
                    let iconName;

                    if (route.name == '카테고리'){
                        iconName = focused
                        ? 'list'
                        : 'list-outline';
                    }

                    else if (route.name == '게시판'){
                        iconName = focused
                        ? 'md-reader'
                        : 'md-reader-outline';
                    }

                    else if (route.name == '홈'){
                        iconName = focused
                        ? 'home'
                        : 'home-outline';
                    }

                    return <Icon name = {iconName} size = {size} color = {color}/>
                },
            })}
            tabBarOptions = {{
                activeTintColor : 'skyblue',
                inactiveTintColor : 'gray',
            }}
        >
            <TabStack.Screen name="카테고리"  children={({navigation})=><RoadMapCategoryStackScreen userId={userId} ip = {ip} navigation={navigation}/>}/>
            {/* <TabStack.Screen name="홈" component={MainStackScreen} /> */}
            <TabStack.Screen name="홈" children={({navigation})=><MainStackScreen userId={userId} ip = {ip} navigation={navigation}/>}/>
            <TabStack.Screen name="게시판"  children={({navigation})=><NoticeListStackScreen userId={userId} ip = {ip} navigation={navigation}/>}/>
        </TabStack.Navigator>
    );
}

const SignUpScreen = ({ip}) => {
    return(
        <SignUpStack.Navigator>
            <SignUpStack.Screen name = "회원가입" children={({navigation})=><SignUp ip = {ip} navigation={navigation}/>}/>
        </SignUpStack.Navigator>
    );
}

const Main = (props) => {
    //console.log(props.ip);
    const ip = props.ip;
    return(
        <AppStack.Navigator screenOptions={{headerShown:false}}>
            <AppStack.Screen name = "login" children={({navigation})=><LoginPage ip = {ip} navigation={navigation}/>}/>
            <AppStack.Screen name = "회원가입" children={({navigation})=><SignUpScreen ip = {ip} navigation={navigation}/>}/>
            {/* <AppStack.Screen name = "main" children={({navigation})=><TabStackScreen ip = {ip} navigation={navigation}/>}/> */}
            <AppStack.Screen name = "main" component={TabStackScreen}/>
            {/* <AppStack.Screen name = "main" component={TabStackScreen}/> */}
        </AppStack.Navigator>
    );
}

export default Main;