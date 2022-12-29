import { useState, useEffect, useRef } from "react";

import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';
import { TransactionForm } from "../my_components/TransactionForm";


const POST_URL = "http://192.168.1.6:5001/"

export const FormsPage = () => {

    return (
        <SafeAreaView style={{flex: 1,
            paddingTop: 10 }}>
            <ScrollView style={{
                backgroundColor: '#e6e6ff',
                height: Dimensions.get('window').height
                }}>
                <TransactionForm postURL={POST_URL}/>
                
            </ScrollView>
        </SafeAreaView>
    );
}