import { useState, useEffect, useRef } from "react";
import { Picker } from "react-native-form-component";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';
import { TransactionForm } from "../my_components/TransactionForm";
import { DividendForm } from "../my_components/DividendForm";

const POST_URL = "http://192.168.1.6:5001/"

const ViewSwitcher = (props: { postURL : string, option: string}) => {
    switch(props.option){
        case 'TRANSACTION':
            return <TransactionForm postURL={props.postURL}/>
        case 'DIVIDEND':
            return <DividendForm postURL={props.postURL}/>

    }
}

export const FormsPage = () => {
    const [formOption, setFormOption] = useState('TRANSACTION');

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
                <ViewSwitcher postURL={POST_URL} option={formOption}/>

                
                
            </ScrollView>
        </SafeAreaView>
    );
}