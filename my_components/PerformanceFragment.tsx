import { LineChartBicolor } from "react-native-gifted-charts";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Switch} from 'react-native';
import { LineChart} from 'react-native-chart-kit';

type propTypes = {
    screenWidth: number
}

import { SERVER_URL } from "../constants"


const lineData = ['January', 'February', 'March', 'April', 'May', 'June'];
const TIME_INTERVALS = ['1W', '1M', '1Q', '6M', 'YTD', '1Y', '3Y', '5Y', 'MAX']

const INTERVALS_TO_STEPS = {
  '1W' : 1,
  '1M' : 2,
  '1Q' : 7,
  '6M' : 14,
  'YTD' : 14,
  '1Y' : 60,
  '3Y' : 90,
  '5Y' : 120,
  'MAX' : 180
}

type propDefaultTimeEntryTypes = {
  val: string,
  activeColor: string,
  inactiveColor: string,
  isPress: boolean,
  index: number | boolean,
  cb: Function
}

type propMyLineChart = {
  labels: string[],
  data: number[],
  height?: number,
  width?: number
}

export const MyLineChart = (props: propMyLineChart) => {
  return (
    <>
      <LineChart
        data={{
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              strokeWidth: 2,
            },
          ],
        }}
        verticalLabelRotation={90}
        width={props.width ? props.width : Dimensions.get('window').width - 16}
        transparent
        segments={10}
        height={props.height && props.height}
        chartConfig={{
          //backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: '#efefef',
          //decimalPlaces: 2,
          //color: (opacity = 1) => `rgba(0, 1, 0, ${opacity})`,
          color: () => `rgba(0, 0, 0, 1)`,
          style: {
            borderRadius: 16,
          },
        }}
        
        style={{
          marginVertical: 8,
          borderRadius: 16,
          
        }}
        bezier
      />
    </>
  );
};

const DefaultTimeEntry = (props: propDefaultTimeEntryTypes) => {
  var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnNormal: {
      backgroundColor: props.inactiveColor,
      borderRadius: 10,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',    
    },
    btnPress: {
      backgroundColor: props.activeColor,
      borderRadius: 10,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',    
    }
  });

  var touchProps = {
    activeOpacity: 1,                         
    style: props.isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onPress: () => buttonClickedHandler(),                 // <-- "onPress" is apparently required
  };

  const buttonClickedHandler = () => {
      props.cb(props.index);
      // do something
  };

  return (
      <View style={styles.container}>
          <TouchableHighlight {...touchProps} >
              <Text style={{ fontWeight: 'bold'}}>{props.val}</Text>
          </TouchableHighlight>
      </View>
  );
}


export const PerformanceFragment = (props: propTypes) => {

    const [lineData_, setLineData] = useState({
      labels : ['test'],
      data: [1]
    });

    const [graphToggle, setGraphToggle] = useState(false);
    
    const [focusIndex, setFocusIndex] = useState(0);

    useEffect(() => {
        async function fetch_line_data() {
          const focusedInterval = TIME_INTERVALS[focusIndex]
          const step = INTERVALS_TO_STEPS[focusedInterval]
          console.log(focusedInterval)


          var response = await fetch(`${SERVER_URL}performance?` + new URLSearchParams({
            kind: graphToggle ? 'Percentage' : 'Absolute',
            step: step,
            default_interval: focusedInterval
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
  
      }, [focusIndex, graphToggle]);
    
    return <>
        
        <View
            style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                paddingBottom: 50
              }}>
            {TIME_INTERVALS.map((obj, index) => DefaultTimeEntry(
              {val:obj, 
              activeColor: 'green', 
              inactiveColor: 'gray', 
              isPress:index == focusIndex, 
              index: index, 
              cb: setFocusIndex}))}
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={graphToggle ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          
          onValueChange={() => setGraphToggle(graphToggle => !graphToggle)}
          value={false}
        />

        <MyLineChart
          labels= {lineData_.labels}
          data= {lineData_.data}
          height={500}
        >
          
        </MyLineChart>
        </>
}
