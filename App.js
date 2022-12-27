import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, React } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';

import { PieChart, LineChartBicolor } from "react-native-gifted-charts";
import {renderLegend, renderDot} from "./PortfolioGraphFragment";
import { PerformanceChart } from "./my_components/PerformanceChart";
import { SecurityFragment } from './my_components/SecurityFragment';

const screenWidth = Dimensions.get("window").width;




const BACKEND_URL = "http://192.168.1.3:5001/";
const PROC_OTHER = 2;

 
  
   export default function App() {
  
    [pieData_, setPieData] = useState([]);
    [focusedTicker, setFocusedTicker] = useState('dummy');
    [infoTicker, setInfoTicker] = useState({text: 'dummy', value: 0, gain: 0, gain_perc: 0})

    useEffect(() => {
      async function fetch_pie_data(proc_thresh) {

        response = await fetch(`${BACKEND_URL}composition`);
        actualData = await response.json();
        tickers = actualData['TICKER'];
        values = actualData['TOTAL_VALUE'];
        var ret_ = Array();
      
        for (let key in tickers) {
          ticker = tickers[key];
          value = values[key];
          
          var obj = new Object();
          obj.value = value;
          obj.text = ticker;
          obj.color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")

          ret_.push(obj);
          
        }

        total_ = 0;
        ret_.map((obj) => {
          total_ += obj.value;
        });

        ret_.map((obj) => {
          obj.proc = obj.value / total_;
        });

        ret_ind = ret_.filter(obj => obj.proc >= proc_thresh);
        ret_other = ret_.filter(obj => obj.proc < proc_thresh);

        total_value_other = 0;
        ret_other.map((obj) => {
          total_value_other += obj.value;
        });

        ret_ind.push({
          text : "Other",
          value : total_value_other,
          color : "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
        });

        ret_ind.sort((a, b) => b.value - a.value);

        console.log(ret_ind);

        setPieData(ret_ind);

      }

      fetch_pie_data(PROC_OTHER / 100);
    }, []);

    useEffect(() => {
      async function fetch_security_info() {

        response = await fetch(`${BACKEND_URL}security_info?`+ new URLSearchParams({
          security : focusedTicker
        }));
        data = await response.json();
        
        console.log(data);

        res = {
          text : focusedTicker,
          value : data['TOTAL_VALUE'],
          gain : data['PROFIT'],
          gain_perc : data['PROFIT%'],
          cntry: data['COUNTRY']
        }

        setInfoTicker(res);
      }

      fetch_security_info();

    }, [focusedTicker])

    return (
      <SafeAreaView style={{flex: 1,
        paddingTop: StatusBar.currentHeight,}}>
      <ScrollView style={{
          backgroundColor: '#e6e6ff',
          height: Dimensions.get('window').height
        }}>
        <View
          style={{
            borderRadius: 20,
            margin: 20,
            padding: 16,
            backgroundColor: 'transparent',
            flexDirection: 'column'
          }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}> Portfolio </Text>
        <View
            style={{
              borderRadius: 20,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}>
            <View style={{padding: 20, alignItems: 'center', flexDirection: 'column'}}>
              <PieChart
                data={pieData_}
                textSize={12}
                radius={screenWidth / 4}
                focusOnPress
                labelsPosition={'outward'}
                textColor="black"
                onPress = { (item, index) => {
                  setFocusedTicker(item['text']); 
                  console.log(item)
                }}
                textBackgroundRadius={26}
              />
            </View>
            <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  marginTop: 20,
                }}>
                {pieData_.map((obj) => renderLegend(obj.text, obj.color))}
            </View>
          </View>          
        </View>
        <View style={{
          marginLeft: 5,
          marginRight: 5,
          alignItems: 'center'
        }}>
          <SecurityFragment
            width={screenWidth}
            text={infoTicker['text']}
            value={infoTicker['value']}
            gain={infoTicker['gain']}
            gain_perc={infoTicker['gain_perc']}
            cntry={infoTicker['cntry']}
          />
        </View>
        <PerformanceChart
          screenWidth={screenWidth}
        />
    </ScrollView>
  </SafeAreaView>);
  
  }