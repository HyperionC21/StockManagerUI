import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useState, useEffect, useRef } from "react";
import { Chip } from 'react-native-paper';

import { SERVER_URL } from "../constants"

const invert = require('invert-color');

var stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}


function renderChip (tickerName) {

  var color = stringToColour(tickerName);
  var revColor = invert(color, true);

  return <Chip style={{
    "marginLeft" : 5,
    "marginBottom" : 3,
    "backgroundColor" : color,    
  }} onPress={() => console.log(tickerName)} selectedColor="black" 
  textStyle={{"color" : revColor}}> {tickerName} </Chip>
}

export const SecuritiesPage = () => {

  const [tickerList, setTickerList] = useState(['AAPL', 'FP']);

  useEffect(() => {
    async function fetch_chips_data() {

      var response = await fetch(`${SERVER_URL}composition?`);
      var actualData = await response.json();
      var tickers = actualData['LABEL'];
      var ret_ = Array();
    
      for (let key in tickers) {
        let ticker = tickers[key];

        ret_.push(ticker);
        
      }

      setTickerList(ret_);

    }

    fetch_chips_data();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#e6e6ff' }}>
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginBottom: 20, paddingTop: 20 }}> Securities </Text>
      <View style={{
          marginTop: 20,
          backgroundColor: '#e6e6ff',
          height: Dimensions.get('window').height,
          flexDirection: "row",
          flexWrap: "wrap"
        }}>
        
        {tickerList.map((tickerName) => renderChip(tickerName))}
      </View>
    </SafeAreaView>);
}