import { PerformancePage } from './my_pages/PerformancePage';
import { PortfolioPage } from './my_pages/PortfolioPage';
import { MetricsPage } from './my_pages/MetricsPage';
import { FormsPage } from './my_pages/FormsPage';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
const Tab = createBottomTabNavigator();
   
export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Portfolio') {
              iconName = 'pie-chart'
            } else if (route.name === 'Metrics') {
              iconName = 'stats-chart'
            } else if (route.name === 'Performance') {
              iconName = 'rocket'
            } else if (route.name === 'Input') {
              iconName = 'book'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false
        })}
      >
        <Tab.Screen name="Performance" component={PerformancePage} />
        <Tab.Screen name="Portfolio" component={PortfolioPage} />
        <Tab.Screen name="Metrics" component={MetricsPage} />
        <Tab.Screen name="Input" component={FormsPage} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}
