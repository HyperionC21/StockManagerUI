import { SecurityFragment } from './SecurityFragment';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';
import { PieChart} from "react-native-gifted-charts";
import DropDownPicker from 'react-native-dropdown-picker';

import { SERVER_URL } from "../constants"

const PROC_OTHER = 2;

const renderLegend = (text, proc, color) => {
  proc = (proc * 100).toFixed(2)
  return (
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <View
              style={{
                  height: 18,
                  width: 18,
                  marginRight: 10,
                  borderRadius: 4,
                  backgroundColor: color || 'white',
              }} />
          <View style={{ flexDirection: 'column', marginBottom: 2 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{text || ''}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>{`${proc} %`}</Text>
          </View>
          
      </View>);
}

export const PortfolioFragment = () => {

    const [pieData_, setPieData] = useState([]);
    const [focusedTicker, setFocusedTicker] = useState('dummy');
    const [infoTicker, setInfoTicker] = useState({text: 'dummy', value: 0, gain: 0, gain_perc: 0})
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('TICKER');
    const [items, setItems] = useState([
      {label: 'Ticker', value: 'TICKER' },
      {label: 'Country', value: 'COUNTRY'},
      {label: 'FX', value: 'FX'},
      {label: 'Sector', value: 'SECTOR'}
    ]);


    useEffect(() => {
      async function fetch_pie_data(proc_thresh) {

        var response = await fetch(`${SERVER_URL}composition?`+ new URLSearchParams({
          hue : value
        }));
        var actualData = await response.json();
        var tickers = actualData['LABEL'];
        var values = actualData['VALUE'];
        var ret_ = Array();
      
        for (let key in tickers) {
          let ticker = tickers[key];
          let value = values[key];
          
          var obj  = {
            value: value,
            text: ticker,
            color:  "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
          }

          ret_.push(obj);
          
        }

        var total_ = 0;
        ret_.map((obj) => {
          total_ += obj.value;
        });

        ret_.map((obj) => {
          obj.proc = obj.value / total_;
        });

        var ret_ind = ret_.filter(obj => obj.proc >= proc_thresh);
        var ret_other = ret_.filter(obj => obj.proc < proc_thresh);

        var total_value_other = 0;
        ret_other.map((obj) => {
          total_value_other += obj.value;
        });

        ret_ind.push({
          text : "Other",
          value : total_value_other,
          color : "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"),
          proc : total_value_other / total_
        });

        ret_ind.sort((a, b) => b.value - a.value);
        console.log('FETCH PIE DATA')
        console.log(ret_ind);
        console.log(actualData);

        setPieData(ret_ind);

      }

      fetch_pie_data(PROC_OTHER / 100);
    }, [value]);

    useEffect(() => {
      async function fetch_security_info() {

        var response = await fetch(`${SERVER_URL}security_info?`+ new URLSearchParams({
          security : focusedTicker,
          hue : value
        }));
        var data = await response.json();
        
        console.log(data);

        var res = {
          text : focusedTicker,
          value : data['TOTAL_VALUE'],
          price : data['PRICE'],
          gain : data['PROFIT'],
          gain_perc : data['PROFIT%'],
          cntry: data['COUNTRY'],
          filter_kind: value
        }

        setInfoTicker(res);
      }

      fetch_security_info();

    }, [focusedTicker])

    return <>
        <View
          style={{
            borderRadius: 20,
            margin: 20,
            padding: 16,
            backgroundColor: 'transparent',
            flexDirection: 'column'
          }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, textAlign: "left"}}> Portfolio </Text>
        <DropDownPicker
                placeholder='Select Hue'
                itemSeparator={true}
                style={{
                  width: Dimensions.get('window').width * .8,
                  alignSelf: "center",
                  marginLeft: -10,
                  padding: 10,
                  backgroundColor: "transparent"
                }}
                dropDownContainerStyle={{
                  width: Dimensions.get('window').width * .8,
                  borderRadius: 10,
                  backgroundColor: '#e6e6ff',
                }}
                open={open}
                value={value}
                items={items}
                zIndex={10}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />    
        <View
            style={{
              borderRadius: 20,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}>
            <View style={{padding: 20, alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
              <PieChart
                data={pieData_}
                textSize={12}
                radius={Dimensions.get('window').width / 4}
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
                {pieData_.map((obj) => renderLegend(obj.text, obj.proc, obj.color))}
            </View>
          </View>      
        </View>
        <View style={{
          marginLeft: 5,
          marginRight: 5,
          paddingBottom: 20,
          alignItems: 'center'
        }}>
          <SecurityFragment
            height={Dimensions.get('window').height / 10}
            width={Dimensions.get('window').width}
            text={infoTicker['text']}
            price={infoTicker['price']}
            value={infoTicker['value']}
            gain={infoTicker['gain']}
            gain_perc={infoTicker['gain_perc']}
            cntry={infoTicker['cntry']}
            filter_kind={infoTicker['filter_kind']}
          />
        </View>
    </>
}