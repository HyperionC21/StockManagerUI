import { Dimensions, SafeAreaView, ScrollView, Text } from 'react-native';
import { PortfolioFragment } from '../my_components/PortfolioFragment';

export const PortfolioPage = () => {
    return (
        <SafeAreaView style={{flex: 1,
          paddingTop: 10,
          backgroundColor: '#e6e6ff' }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginBottom: 20, paddingTop: 20 }}> Portfolio </Text>
        <ScrollView style={{
            
            height: Dimensions.get('window').height
          }}>
          <PortfolioFragment/>
      </ScrollView>
    </SafeAreaView>);
}