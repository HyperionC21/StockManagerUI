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
    const [profit1M, setProfit1M] = useState(0)
    const [profit1Q, setProfit1Q] = useState(0)
    const [profit6M, setProfit6M] = useState(0)
    const [profit1Y, setProfit1Y] = useState(0)

    const dummyMetrics = [
      {
        metric: 'Net Asset Value',
        value: nav
      },
      {
        metric: 'Cost Basis',
        value: costBasis
      },
      {
        metric: 'Equity Return - All time',
        value: profit
      },
      {
        metric: 'Equity Return - 1M',
        value: profit1M
      },
      {
        metric: 'Equity Return - last Q',
        value: profit1Q
      },
      {
        metric: 'Equity Return - 6M',
        value: profit6M
      },
      {
        metric: 'Equity Return - 1Y',
        value: profit1Y
      },
      {
        metric: 'Dividend Yield (1Y)',
        value: divYield
      },
      {
        metric: 'Dividend Value (1Y)',
        value: divVal
      },
      {
        metric: 'Equity % Return ',
        value: (profit * 100 / costBasis).toFixed(2)
      },
      {
        metric: 'Equity & Dividend Return',
        value: profit + divVal
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
      period: '10Y',
      metric: 'profit'
    })).then((response) => response.json()).then((data) => setProfit(data.val))

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '1M',
      metric: 'profit'
    })).then((response) => response.json()).then((data) => setProfit1M(data.val))

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '1Q',
      metric: 'profit'
    })).then((response) => response.json()).then((data) => setProfit1Q(data.val))

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '6M',
      metric: 'profit'
    })).then((response) => response.json()).then((data) => setProfit6M(data.val))

    fetch(`${BACKEND_URL}metric?` + new URLSearchParams({
      period: '1Y',
      metric: 'profit'
    })).then((response) => response.json()).then((data) => setProfit1Y(data.val))


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