import { Dimensions, SafeAreaView, ScrollView, Text } from 'react-native';

import { PerformanceFragment } from "../my_components/PerformanceFragment";



const screenWidth = Dimensions.get("window").width;


export const PerformancePage = () => {

    return (
      <SafeAreaView style={{flex: 1,
        backgroundColor: '#e6e6ff',
        paddingTop: 50 }}>
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, paddingBottom: 50, paddingTop: 20 }}> Performance </Text>
      <ScrollView style={{
          
          height: Dimensions.get('window').height
        }}>
        <PerformanceFragment
          screenWidth={screenWidth}
        />
    </ScrollView>
  </SafeAreaView>);
}