import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';


import { renderLegend } from "../PortfolioGraphFragment";
import { PerformanceFragment } from "../my_components/PerformanceFragment";
import { PortfolioFragment } from '../my_components/PortfolioFragment';


const screenWidth = Dimensions.get("window").width;




export const MainPage = () => {



    return (
      <SafeAreaView style={{flex: 1,
        paddingTop: 10 }}>
      <ScrollView style={{
          backgroundColor: '#e6e6ff',
          height: Dimensions.get('window').height
        }}>
        <PortfolioFragment/>
        <PerformanceFragment
          screenWidth={screenWidth}
        />
    </ScrollView>
  </SafeAreaView>);
}