import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';


import { PerformanceFragment } from "../my_components/PerformanceFragment";
import { PortfolioFragment } from '../my_components/PortfolioFragment';
import { MetricsFragment } from '../my_components/MetricsFragment';

const screenWidth = Dimensions.get("window").width;

const BACKEND_URL = "http://192.168.1.6:5001/";


export const MainPage = () => {

    const [divYield, setDivYield] = useState(0)
    const [divVal, setDivVal] = useState(0)
    const [nav, setNav] = useState(0)
    const [costBasis, setCostBasis] = useState(0)
    const [profit, setProfit] = useState(0)

    const dummyMetrics = [
      {
        metric: 'Dividend Yield (1Y)',
        value: divYield
      },
      {
        metric: 'Dividend Value (1Y)',
        value: divVal
      },
      {
        metric: 'Net Asset Value (NAV)',
        value: nav
      },
      {
        metric: 'Cost Basis',
        value: costBasis
      },
      {
        metric: 'Profit',
        value: profit
      }
    ]

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '1Y',
      metric: 'div_yield'
    })).then((response) => response.json()).then((data) => setDivYield(data.val * 100));

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '1Y',
      metric: 'div_val'
    })).then((response) => response.json()).then((data) => setDivVal(data.val))

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '1Y',
      metric: 'nav'
    })).then((response) => response.json()).then((data) => setNav(data.val))

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '1Y',
      metric: 'cost_basis'
    })).then((response) => response.json()).then((data) => setCostBasis(data.val))

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '1Y',
      metric: 'profit'
    })).then((response) => response.json()).then((data) => setProfit(data.val))

    return (
      <SafeAreaView style={{flex: 1,
        paddingTop: 10 }}>
      <ScrollView style={{
          backgroundColor: '#e6e6ff',
          height: Dimensions.get('window').height
        }}>
        <PortfolioFragment/>
        <MetricsFragment metrics={dummyMetrics} />
        <PerformanceFragment
          screenWidth={screenWidth}
        />
    </ScrollView>
  </SafeAreaView>);
}