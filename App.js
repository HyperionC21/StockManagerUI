import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, React } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';
import { MainPage } from './my_pages/MainPage';
import { FormsPage } from './my_pages/FormsPage';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
const Tab = createBottomTabNavigator();
   
export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MainPage} />
        <Tab.Screen name="Input" component={FormsPage} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}
