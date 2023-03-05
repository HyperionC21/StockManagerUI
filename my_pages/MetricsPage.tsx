import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useState } from "react";

import { MetricsFragment } from '../my_components/MetricsFragment';
import { SERVER_URL } from "../constants"

export const MetricsPage = () => {

  const [divYield, setDivYield] = useState(0)
  const [divVal, setDivVal] = useState(0)
  const [nav, setNav] = useState(0)
  const [costBasis, setCostBasis] = useState(0)
  const [profit, setProfit] = useState(0)
  
  const [fee, setFee] = useState(0)
  const [annualized_profit_val_at_1Y, setAnnualizedProfitValAt1Y] = useState(0)
  const [annualized_profit_val_at_3M, setAnnualizedProfitValAt3M] = useState(0)

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
      metric: 'Fee',
      value: fee.toFixed(0)
    },
    {
      metric: 'Equity Return',
      value: profit
    },
    {
      metric: 'Dividends',
      value: divVal
    },
    {
      metric: 'Equity & Dividend Return',
      value: profit + divVal
    },
    {
      metric: 'Equity Return % ',
      value: (profit * 100 / costBasis).toFixed(2)
    },
    {
      metric: 'Dividend Yield % @1Y',
      value: divYield.toFixed(2)
    },
    {
      metric: 'Annualized Profit @1Y',
      value: annualized_profit_val_at_1Y.toFixed(0)
    },
    {
      metric: 'Annualized Profit @3M',
      value: annualized_profit_val_at_3M.toFixed(0)
    }
  ]

  fetch(`${SERVER_URL}metric?` + new URLSearchParams({
    period: '1Y',
    metric: 'div_yield'
  })).then((response) => response.json()).then((data) => setDivYield(data.val * 100));

  fetch(`${SERVER_URL}metric?` + new URLSearchParams({
    period: '10Y',
    metric: 'div_val'
  })).then((response) => response.json()).then((data) => setDivVal(data.val))

  fetch(`${SERVER_URL}metric?` + new URLSearchParams({
    period: '1Y',
    metric: 'nav'
  })).then((response) => response.json()).then((data) => setNav(data.val))

  fetch(`${SERVER_URL}metric?` + new URLSearchParams({
    period: '1Y',
    metric: 'cost_basis'
  })).then((response) => response.json()).then((data) => setCostBasis(data.val))

  fetch(`${SERVER_URL}metric?` + new URLSearchParams({
    period: '10Y',
    metric: 'profit'
  })).then((response) => response.json()).then((data) => setProfit(data.val))

  fetch(`${SERVER_URL}metric?` + new URLSearchParams({
    period: '1Y',
    metric: 'annualized_profit_period'
  })).then((response) => response.json()).then((data) => setAnnualizedProfitValAt1Y(data.val))

  fetch(`${SERVER_URL}metric?` + new URLSearchParams({
    period: '3M',
    metric: 'annualized_profit_period'
  })).then((response) => response.json()).then((data) => setAnnualizedProfitValAt3M(data.val))


  fetch(`${SERVER_URL}metric?` + new URLSearchParams({
    period: '1Y',
    metric: 'fee'
  })).then((response) => response.json()).then((data) => setFee(data.val))

  return (
      <SafeAreaView style={{flex: 1,
        paddingTop: 10 }}>
      <ScrollView style={{
          backgroundColor: '#e6e6ff',
          height: Dimensions.get('window').height
        }}>
        <MetricsFragment metrics={dummyMetrics} />
    </ScrollView>
  </SafeAreaView>);
}