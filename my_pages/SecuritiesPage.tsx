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


function renderChip (tickerName, cb) {

  var color = stringToColour(tickerName);
  var revColor = invert(color, true);

  return <Chip style={{
    "marginLeft" : 5,
    "marginBottom" : 3,
    "backgroundColor" : color,    
  }} onPress={() => cb(tickerName)} selectedColor="black" 
  textStyle={{"color" : revColor}}> {tickerName} </Chip>
}

function renderMetric(metric) {

  return <View
  style={{
    marginTop: 10,
    backgroundColor: '#e6e6ff',
    width: Dimensions.get('window').width * .9,
    //height: Dimensions.get('window').height / 2,
    flexDirection: "row",
  }}>
    <Text style={{ color: 'black', width: '65%', fontWeight: 'bold', fontSize: 15, marginLeft: 15}} > {metric.metric_name} </Text>
    <Text style={{ color: 'black', width: '35%', fontWeight: 'bold', fontSize: 15, marginRight: 100, textAlign: 'right'}} > {metric.metric_val} </Text>
  </View>
}

export const SecuritiesPage = () => {


  const [tickerList, setTickerList] = useState(['AAPL', 'FP']);
  const [focusedTicker, setFocusedTicker] = useState(tickerList[0])

  const [p_e, setPe] = useState(0.5);
  const [total_div_amt, setTotalDivAmt] = useState(0);
  const [total_cost_basis_amt, setTotalCostBasisAmt] = useState(0);
  const [total_security_equity_gain_amt, setTotalSecurityEquityGainAmt] = useState(0);

  useEffect(() => {
    async function fetch_PE() {

      var response = await fetch(`${SERVER_URL}metric?`+ new URLSearchParams({
        ticker: focusedTicker,
        metric: 'PE'
      }));
      var actualData = await response.json();
      var p_e_val = actualData['val']
    
  
      setPe(p_e_val)
    }

    fetch_PE();

  }, [focusedTicker])

  useEffect(() => {
    async function fetch_total_div_amt() {

      var response = await fetch(`${SERVER_URL}metric?`+ new URLSearchParams({
        ticker: focusedTicker,
        metric: 'security_div_amt'
      }));
      var actualData = await response.json();
      var total_div_amt = actualData['val']
    
  
      setTotalDivAmt(total_div_amt)
    }

    fetch_total_div_amt();

  }, [focusedTicker])

  useEffect(() => {
    async function fetch_total_cost_basis_amt() {

      var response = await fetch(`${SERVER_URL}metric?`+ new URLSearchParams({
        ticker: focusedTicker,
        metric: 'security_cost_basis_amt'
      }));
      var actualData = await response.json();
      var total_div_amt = actualData['val']
    
  
      setTotalCostBasisAmt(total_div_amt)
    }

    fetch_total_cost_basis_amt();

  }, [focusedTicker])

  useEffect(() => {
    async function fetch_total_security_equity_gain_amt() {

      var response = await fetch(`${SERVER_URL}metric?`+ new URLSearchParams({
        ticker: focusedTicker,
        metric: 'security_equity_gain_amt'
      }));
      var actualData = await response.json();
      var total_div_amt = actualData['val']
    
  
      setTotalSecurityEquityGainAmt(total_div_amt)
    }

    fetch_total_security_equity_gain_amt();

  }, [focusedTicker])

  var metricsList = [{
    'metric_name' : 'P/E',
    'metric_val' : p_e
  },
  {
    'metric_name' : 'Cost Basis Amount',
    'metric_val' : total_cost_basis_amt
  },
  {
    'metric_name' : 'Dividend Amount',
    'metric_val' : total_div_amt
  },
  {
    'metric_name' : 'Equity Gain Amount',
    'metric_val' : total_security_equity_gain_amt
  },    
  ];



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
    <SafeAreaView style={{ backgroundColor: '#e6e6ff', flex: 1 }}>
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginBottom: 20, paddingTop: 20 }}> Securities </Text>
      <View style={{
          marginTop: 20,
          backgroundColor: '#e6e6ff',
          //height: Dimensions.get('window').height / 2,
          flexDirection: "row",
          flexWrap: "wrap"
        }}>
        
        {tickerList.map((tickerName) => renderChip(tickerName, setFocusedTicker))}
        
      </View>
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginBottom: 20, paddingTop: 20 }}> Security Metrics </Text>
      <View style={{
          marginTop: 20,
          backgroundColor: '#e6e6ff',
          //height: Dimensions.get('window').height / 2,
          flexDirection: "column",
        }} >
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginBottom: 20, paddingTop: 20 }}> {focusedTicker} </Text>
        {metricsList.map((metric) => renderMetric(metric))}
      </View>
      
    </SafeAreaView>);
}