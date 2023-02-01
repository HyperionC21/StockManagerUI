import { Dimensions, SafeAreaView, ScrollView } from 'react-native';

import { PerformanceFragment } from "../my_components/PerformanceFragment";



const screenWidth = Dimensions.get("window").width;


export const PerformancePage = () => {

    return (
      <SafeAreaView style={{flex: 1,
        paddingTop: 50 }}>
      <ScrollView style={{
          backgroundColor: '#e6e6ff',
          height: Dimensions.get('window').height
        }}>
        <PerformanceFragment
          screenWidth={screenWidth}
        />
    </ScrollView>
  </SafeAreaView>);
}