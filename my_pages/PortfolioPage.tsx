import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { PortfolioFragment } from '../my_components/PortfolioFragment';

export const PortfolioPage = () => {
    return (
        <SafeAreaView style={{flex: 1,
          paddingTop: 10 }}>
        <ScrollView style={{
            backgroundColor: '#e6e6ff',
            height: Dimensions.get('window').height
          }}>
          <PortfolioFragment/>
      </ScrollView>
    </SafeAreaView>);
}