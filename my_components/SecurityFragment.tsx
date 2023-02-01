
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import { LineChart} from 'react-native-chart-kit';

import { SERVER_URL } from "../constants"

type propSecurityTypes = {
    width: number,
    height: number,
    text: string,
    price?: number,
    value: number,
    gain: number,
    gain_perc: number,
    cntry: string,
    filter_kind: string
}



export const SecurityFragment = (props: propSecurityTypes) => {

    const [lineData_, setLineData] = useState({
        labels : ['test', 'test2'],
        data: [1, 2]
      });
    
      useEffect(() => {
        async function fetch_line_data() {

          var response = await fetch(`${SERVER_URL}performance?` + new URLSearchParams({
            kind: 'Absolute',
            step: 1,
            default_interval: '1M',
            filters: props.text,
            filter_kind: props.filter_kind
          }))
          var data_ = await response.json();
  
          var dates_ = data_['date'];
          var values_ = data_['profit'];
  
          var ret_ = {
            labels : [],
            data : []
          }
          
          for (let key in dates_) {
            var date_ = dates_[key];
            var value_ = values_[key];
            ret_.labels.push(date_);
            ret_.data.push(value_);
          }
  
          setLineData(ret_);
          
          console.log(ret_);

        }
  
        fetch_line_data();
  
      }, [props.text]);
    
    return <>
        <View style={{
            flexDirection: 'row',
            width: props.width * .95,
            borderRadius: 10,
            height: props.height,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View
                style={{
                    flex: 2,
                    paddingLeft: 5,
                    flexDirection: 'column',
                    height: props.height * .95,
                    justifyContent: 'center',
                }}
            >
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    margin: 2
                }}>
                    {props.text}
                </Text>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    margin: 2
                }}>
                    {`${props.price && props.price.toFixed(2)}`}
                </Text>
                <Text style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    margin: 2
                }}>
                    {props.cntry}
                </Text>
            </View>
           

            <View
                style={{
                    paddingEnd: props.width * .05,
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    height: props.height * .95,
                    alignContent: 'center',
                    justifyContent: 'center',
                    flex: 5
                }}
            >
                <LineChart
                    data={{
                    labels: lineData_.labels,
                    datasets: [
                        {
                        data: lineData_.data,
                        strokeWidth: 3,
                        color: () => `green`,
                        },
                    ],
                    }}
                    width={props.width * .7}
                    transparent
                    segments={5}
                    height={props.height * .95}
                    withShadow={false}
                    withDots={false}
                    withHorizontalLines={false}
                    withHorizontalLabels={false}
                    withVerticalLines={false}
                    withOuterLines={false}
                    chartConfig={{
                        //backgroundColor: 'white',
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: '#efefef',
                        barPercentage: 0,
                        //decimalPlaces: 2,
                        //color: (opacity = 1) => `rgba(0, 1, 0, ${opacity})`,
                        color: () => `rgba(0, 1, 0, 1)`,
                    }}
                    
                    style={{
                        borderRadius: 16,
                        marginLeft: -props.width * .15,
                    }}
                    bezier
                />
            </View>
            
            <View
                style={{
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    height: props.width * .8 / 7,
                    flex: 2,
                    flexDirection: 'column',
                    marginRight: 10,
                }}
            >
                <Text 
                style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'right',
                    margin: 2
                }}>
                {Math.round(props.value)}
                </Text>
                <Text 
                style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: props.gain_perc > 0 ? 'green' : 'red',
                    textAlign: 'right',
                    margin: 2
                }}>
                {`${parseFloat(props.gain_perc).toFixed(2)} %`}
                </Text>
                <Text 
                style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: props.gain > 0 ? 'green' : 'red',
                    textAlign: 'right',
                    margin: 2
                }}>
                {Math.round(props.gain)}
                </Text>

            </View>


            
        </View>
    </>
}