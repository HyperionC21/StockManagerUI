import { Form, FormItem, Picker } from 'react-native-form-component';
import { useState, useEffect, useRef } from "react";

type propTypes = {
    postURL : string
}

export const QuoteForm = (props: propTypes) => {
    const tickerInput = useRef('');
    const [ticker, setTicker] = useState(tickerInput.current);

    const sectorInput = useRef('');
    const [sector, setSector] = useState(sectorInput.current);

    const countryInput = useRef('');
    const [country, setCountry] = useState(countryInput.current);

    const fxInput = useRef('1');
    const [fx, setFx] = useState(fxInput.current);

    const marketInput = useRef('');
    const [market, setMarket] = useState(marketInput.current);

    const srcInput = useRef('');
    const [src, setSrc] = useState(srcInput.current);

    const dataPost = () => {
        const data = {
            ticker: ticker,
            sector: sector,
            country: country,
            fx: fx,
            market: market,
            src: src
        }

        fetch(`${props.postURL}new_quote`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
          })
        
        setTicker('');
        setCountry('');
        setSector('');
        setFx('1');
        setMarket('');
        setSrc('');
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
            value={sector}
            ref={sectorInput}
            onChangeText={(text) => setSector(text)}
            placeholder='Finance'
            asterik
            label="SECTOR"
        />
        <FormItem
            value={country}
            ref={countryInput}
            onChangeText={(text) => setCountry(text)}
            placeholder='US'
            asterik
            label="COUNTRY"
        />
        <FormItem
            value={`${fx}`}
            ref={fxInput}
            onChangeText={(text) => setFx(text)}
            placeholder='USD/RON'
            asterik
            label="FX"
        />
        <FormItem
            value={market}
            ref={marketInput}
            onChangeText={(text) => setMarket(text)}
            placeholder='NYSE'
            asterik
            label="MARKET"
        />
        <Picker
            items={[
            { label: 'YF', value: 'YF' },
            { label: 'BVB', value: 'BVB' },
            { label: 'OTHER', value: 'OTHER' }
            ]}
            label="KIND"
            selectedValue={src}
            onSelection={(item) => setSrc(item.value.toString())}
        />

    </Form>
    </>
}