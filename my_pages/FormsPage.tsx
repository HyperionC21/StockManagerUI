import { useState, useEffect, useRef } from "react";
import { Picker } from "react-native-form-component";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';
import { TransactionForm } from "../my_components/TransactionForm";
import { DividendForm } from "../my_components/DividendForm";
import { QuoteForm } from "../my_components/QuoteForm";

import TableFragment from "../my_components/TableFragment";

import { SERVER_URL } from "../constants"

const ViewSwitcher = (props: { postURL : string, option: string, cb: Function}) => {
    switch(props.option){
        case 'TRANSACTION':
            return <TransactionForm postURL={props.postURL} cb={props.cb}/>
        case 'DIVIDEND':
            return <DividendForm postURL={props.postURL} cb={props.cb}/>
        case 'QUOTE':
            return <QuoteForm postURL={props.postURL}/>

    }
}

export const FormsPage = () => {
    const [formOption, setFormOption] = useState('TRANSACTION');
    const [formTicker, setFormTicker] = useState('');
    const [tableHeader, setTableHeader] = useState(['TICKER', 'DATE', 'N_SHARES'])
    
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        if (formOption == 'TRANSACTION') {
            setTableHeader(['TICKER', 'DATE', 'N_SHARES'])
        } else if (formOption == 'DIVIDEND') {
            setTableHeader(['TICKER', 'DATE', 'AMT'])
        }
    }, [formOption])
    
    useEffect(() => {
        async function fetch_transacted_tickers(ticker){
            var response = await fetch(`${SERVER_URL}last_trans?`+ new URLSearchParams({
                ticker : ticker,
                cnt : '5'
              }));
            var data = await response.json();
            
            var tickers = data['TICKER'];
            var dates = data['DATE'];
            var n_shares = data['N_SHARES'];

            var ret_ = Array();
        
            for (let key in tickers) {
                let ticker = tickers[key];
                let date = dates[key];
                let n_share = n_shares[key];
                
                var obj  = [ ticker, date, n_share ];

                ret_.push(obj);
            }

            console.log(data);
            console.log(ret_);
            setTableRows(ret_)

        }

        async function fetch_dividends_ticker(ticker){
            var response = await fetch(`${SERVER_URL}last_dividends?`+ new URLSearchParams({
                ticker : ticker,
                cnt : '5'
              }));
            var data = await response.json();
            
            var tickers = data['TICKER'];
            var dates = data['DATE'];
            var div_amt = data['AMT'];

            var ret_ = Array();
        
            for (let key in tickers) {
                let ticker = tickers[key];
                let date = dates[key];
                let div_amt_ = div_amt[key];
                
                var obj  = [ ticker, date, div_amt_ ];

                ret_.push(obj);
            }

            console.log(data);
            console.log(ret_);
            setTableRows(ret_)

        }

        if (formOption === 'TRANSACTION') {
            fetch_transacted_tickers(formTicker);
        } else if (formOption == 'DIVIDEND') {
            fetch_dividends_ticker(formTicker)
        }

    }, [formOption, formTicker])

    return (
        <SafeAreaView style={{flex: 1,
            paddingTop: 10,
            backgroundColor: '#e6e6ff' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginBottom: 20, paddingTop: 20 }}> Input Forms </Text>
            <ScrollView style={{
                
                marginTop: 20,
                height: Dimensions.get('window').height
                
                }}>
                
                <Picker
                    
                    items={[
                    { label: 'TRANSACTION', value: 'TRANSACTION' },
                    { label: 'DIVIDEND', value: 'DIVIDEND' },
                    { label: 'QUOTE', value: 'QUOTE' }
                    ]}
                    selectedValue={formOption}
                    onSelection={(item) => setFormOption(item.value.toString())}
                />
                <ViewSwitcher postURL={SERVER_URL} option={formOption} cb={setFormTicker}/>
                <TableFragment header={tableHeader} rows={tableRows}/>
            </ScrollView>
        </SafeAreaView>
    );
}