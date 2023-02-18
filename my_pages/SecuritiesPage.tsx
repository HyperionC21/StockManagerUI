import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import TableFragment from "../my_components/TableFragment";
import { useState, useEffect, useRef } from "react";

import { SERVER_URL } from "../constants"

export const SecuritiesPage = () => {
    const [tableHeader, setTableHeader] = useState(['TICKER', 'N_SHARES', 'SECTOR', 'FX', 'COUNTRY'])
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
      async function fetch_portfolio_stats(){
          var response = await fetch(`${SERVER_URL}portfolio_stats`);
          var data = await response.json();
          
          var tickers = data['TICKER'];
          var n_shares = data['N_SHARES'];
          var sectors = data['SECTOR'];
          var fxs = data['FX'];
          var countries = data['COUNTRY'];

          var ret_ = Array();
      
          for (let key in tickers) {
              let ticker = tickers[key];
              let n_share = n_shares[key].toFixed(2);
              let sector = sectors[key];
              let fx = fxs[key];
              let cntry = countries[key];

              var obj  = [ ticker, n_share, sector, fx, cntry ];

              ret_.push(obj);
          }

          console.log(data);
          console.log(ret_);
          setTableRows(ret_)

      }

      fetch_portfolio_stats()

  }, [])

    return (
      <SafeAreaView style={{flex: 1,
          paddingTop: 10 }}>
        <ScrollView style={{
            backgroundColor: '#e6e6ff',
            height: Dimensions.get('window').height
          }}>
            <TableFragment header={tableHeader} rows={tableRows}/>
        </ScrollView>
      </SafeAreaView>);
}