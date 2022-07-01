import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  TextInput, 
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

  const [text, onChangeText] = useState(null);
  const [resultText, onChangeResultText] = useState(null);
  const [numberLength, setNumberLength] = useState(2);
  const [timeDown, setTimeDown] = useState(10);
  const [win, setWin] = useState(false);

  useEffect(() => {
    var randomWords = require('random-words');
    var english = randomWords({exactly: 1, maxLength: 2});
    onChangeResultText(english);
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(timeDown > 0){
        setTimeDown(timeDown - 1);
      }
      if(timeDown === 0){
        if(text === null){
          navigation.goBack();
          return false;
        }
        if(text.length >= resultText.length){
          setWin(true);
          setTimeDown(10);
          var randomWords = require('random-words');
          setNumberLength(numberLength + 1);
          var english = randomWords({exactly: 1, maxLength: numberLength});
          onChangeResultText(english);
          onChangeText(null);
        }else{
          navigation.goBack();
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  }, [timeDown]);

  const onClickPushButton = () => {
    setTimeDown(0);
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <Image source={win ? images.win : images.lose} style={appStyle.logoImage} />
      <Text style={appStyle.turnText}>{timeDown}</Text>
      <ImageBackground source={images.panel} style={appStyle.panelImage}>
        <Text style={appStyle.labelText}>{resultText}</Text>
      </ImageBackground>
      <Image source={images.barline} style={appStyle.barlineImage} />
      <TextInput
        style={appStyle.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TouchableOpacity onPress={onClickPushButton}>
        <Image source={images.push} style={appStyle.pushBtn} />
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
  input: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.08,
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingLeft: 10,
    fontSize: windowWidth > 640 ? 30 : 25,
    fontFamily: 'Coming Sans Free Trial',
    color: 'rgba(66,40,14,1)',
    alignItems:'center',
    justifyContent: 'center',
    marginVertical: 10,
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
  pushBtn: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    marginVertical: 20,
  },
});

export default HomeScreen;