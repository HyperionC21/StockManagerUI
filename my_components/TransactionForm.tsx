import { Form, FormItem, Picker } from 'react-native-form-component';
import { useState, useEffect, useRef } from "react";

type propTypes = {
    postURL : string
}

export const TransactionForm = (props: propTypes) => {
    const tickerInput = useRef('');
    const [ticker, setTicker] = useState(tickerInput.current);

    const dateInput = useRef('');
    const [date, setDate] = useState(dateInput.current);

    const amountInput = useRef(0);
    const [amount, setAmount] = useState(amountInput.current);

    const priceInput = useRef(0);
    const [price, setPrice] = useState(priceInput.current);

    const feeInput = useRef(0);
    const [fee, setFee] = useState(feeInput.current);

    const fxInput = useRef(0);
    const [fx, setFx] = useState(fxInput.current);

    const [kind, setKind] = useState('BUY');

    const dataPost = () => {
        const data = {
            ticker: ticker,
            date: date,
            amount: amount,
            kind: kind,
            fx: fx,
            fee: fee,
            price: price
        }

        fetch(`${props.postURL}new_transaction`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
          })
        
        setTicker('');
        setAmount(0);
        setDate('');
        setPrice(0);
        setFee(0);
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
            value={price}
            ref={priceInput}
            asterik
            onChangeText={(text) => setPrice(text)}
            placeholder='225.6'
            label="PRICE"
        />
        <FormItem
            value={fee}
            ref={feeInput}
            onChangeText={(text) => setFee(text)}
            placeholder='0'
            label="FEE"
        />
        <FormItem
            value={fx}
            ref={fxInput}
            onChangeText={(text) => setFx(text)}
            placeholder='1'
            label="FX"
        />
        <Picker
            items={[
            { label: 'BUY', value: 'BUY' },
            { label: 'SELL', value: 'SELL' },
            ]}
            label="KIND"
            selectedValue={kind}
            onSelection={(item) => setKind(item.value.toString())}
        />
    </Form>
    </>
}