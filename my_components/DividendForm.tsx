import { Form, FormItem, Picker } from 'react-native-form-component';
import { useState, useEffect, useRef } from "react";

type propTypes = {
    postURL : string
}

export const DividendForm = (props: propTypes) => {
    const tickerInput = useRef('');
    const [ticker, setTicker] = useState(tickerInput.current);

    const dateInput = useRef('');
    const [date, setDate] = useState(dateInput.current);

    const amountInput = useRef(0);
    const [amount, setAmount] = useState(amountInput.current);

    const fxInput = useRef(0);
    const [fx, setFx] = useState(fxInput.current);

    const dataPost = () => {
        const data = {
            ticker: ticker,
            date: date,
            amount: amount,
            fx: fx,
        }

        fetch(`${props.postURL}new_dividend`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
          })
        
        setTicker('');
        setAmount(0);
        setDate('');
        setFx(1);
    }

    return <>
    <Form onButtonPress={() => dataPost()} style={{
        padding:15
    }}>
        <FormItem
            value={ticker}
            ref={tickerInput}
            onChangeText={(text) => setTicker(text)}
            placeholder='AAPL'
            asterik
            label="TICKER"
        />
        <FormItem
            value={date}
            ref={dateInput}
            onChangeText={(text) => setDate(text)}
            placeholder='2022-01-01'
            label="DATE"
        />
        <FormItem
            value={amount}
            ref={amountInput}
            asterik
            onChangeText={(text) => setAmount(text)}
            placeholder='5'
            label="AMOUNT"
        />
        <FormItem
            value={fx}
            ref={fxInput}
            onChangeText={(text) => setFx(text)}
            placeholder='1'
            label="FX"
        />
    </Form>
    </>
}