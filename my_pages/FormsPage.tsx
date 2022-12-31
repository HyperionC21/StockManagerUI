import { useState, useEffect, useRef } from "react";
import { Picker } from "react-native-form-component";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';
import { TransactionForm } from "../my_components/TransactionForm";
import { DividendForm } from "../my_components/DividendForm";

import TableFragment from "../my_components/TableFragment";



const POST_URL = "http://192.168.1.6:5001/"

const ViewSwitcher = (props: { postURL : string, option: string, cb: Function}) => {
    switch(props.option){
        case 'TRANSACTION':
            return <TransactionForm postURL={props.postURL} cb={props.cb}/>
        case 'DIVIDEND':
            return <DividendForm postURL={props.postURL}/>

    }
}

export const FormsPage = () => {
    const [formOption, setFormOption] = useState('TRANSACTION');
    const [formTicker, setFormTicker] = useState('');
    const tableHeader = ['TICKER', 'DATE', 'N_SHARES']
    
    const [tableRows, setTableRows] = useState([]);


    
    useEffect(() => {
        async function fetch_transacted_tickers(ticker){
            var response = await fetch(`${POST_URL}last_trans?`+ new URLSearchParams({
                ticker : ticker,
                cnt : '10'
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

        if (formOption === 'TRANSACTION') {
            fetch_transacted_tickers(formTicker);
        }

    }, [formOption, formTicker])

    return (
        <SafeAreaView style={{flex: 1,
            paddingTop: 10 }}>
            <ScrollView style={{
                backgroundColor: '#e6e6ff',
                height: Dimensions.get('window').height
                }}>
                <Picker
                    items={[
                    { label: 'TRANSACTION', value: 'TRANSACTION' },
                    { label: 'DIVIDEND', value: 'DIVIDEND' },
                    ]}
                    selectedValue={formOption}
                    onSelection={(item) => setFormOption(item.value.toString())}
                />
                <ViewSwitcher postURL={POST_URL} option={formOption} cb={setFormTicker}/>
                <TableFragment header={tableHeader} rows={tableRows}/>
            </ScrollView>
        </SafeAreaView>
    );
}