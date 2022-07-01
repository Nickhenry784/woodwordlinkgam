import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  FlatList, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const points = useSelector(state => state.points);

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = (item) => {
    if(points.value === 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Play");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
            <View style={appStyle.turnView}>
              <Image source={images.buy} style={appStyle.buyImage} />
              <Text style={appStyle.turnText}>{points.value}</Text>
            </View>
        </TouchableOpacity>
      </View>
      <Image source={images.win} style={appStyle.logoImage} />
      <ImageBackground source={images.panel} style={appStyle.panelImage}>
        <Text style={appStyle.labelText}>Play Game</Text>
      </ImageBackground>
      <Image source={images.barline} style={appStyle.barlineImage} />
      <TouchableOpacity onPress={onClickStartButton} style={appStyle.playButton}>
        <Text style={appStyle.playText}>Play Game</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  logoImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  appBar: {
    position: 'absolute',
    top: '5%',
    right: '3%',
  },
  barlineImage: {
    width: windowWidth,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  playButton: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.08,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  panelImage: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontFamily: 'Coming Sans Free Trial',
    color: 'white',
  },
  playText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontFamily: 'Coming Sans Free Trial',
    color: 'rgba(66,40,14,1)',
  },
  labelText: {
    fontSize: windowWidth > 640 ? 40 : 35,
    fontFamily: 'Coming Sans Free Trial',
    color: 'brown',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default HomeScreen;