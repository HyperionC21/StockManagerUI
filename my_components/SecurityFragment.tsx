
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';

type propSecurityTypes = {
    width: number,
    text: string,
    price?: number,
    value: number,
    gain: number,
    gain_perc: number,
    cntry: string
}

export const SecurityFragment = (props: propSecurityTypes) => {
    return <>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            width: props.width * .95,
            borderRadius: 10,
            borderWidth: 2,
            height: props.width * .95 / 7,
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }}>
            <View
                style={{
                    flex: 3,
                    paddingLeft: 5,
                    flexDirection: 'column'
                }}
            >
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                }}>
                    {props.text}
                </Text>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                }}>
                    {`${props.price && props.price.toFixed(2)}`}
                </Text>
                <Text style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                }}>
                    {props.cntry}
                </Text>
            </View>
           

            <View
                style={{
                    width: props.width * .5,
                    paddingEnd: props.width * .05,
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    height: props.width * .8 / 7,
                    flex: 6
                }}
            />
            
            <View
                style={{
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    height: props.width * .8 / 7,
                    flex: 2,
                    flexDirection: 'column',
                    marginRight: 10
                }}
            >
                <Text 
                style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'right'
                }}>
                {Math.round(props.value)}
                </Text>
                <Text 
                style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: props.gain_perc > 0 ? 'green' : 'red',
                    textAlign: 'right'
                }}>
                {`${parseFloat(props.gain_perc).toFixed(2)} %`}
                </Text>
                <Text 
                style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: props.gain > 0 ? 'green' : 'red',
                    textAlign: 'right'
                }}>
                {Math.round(props.gain)}
                </Text>

            </View>


            
        </View>
    </>
}