
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';

type propSecurityTypes = {
    width: number,
    text: string,
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
            borderRadius: 2,
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
                    backgroundColor: 'black',
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <Text 
                style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'black'
                }}>
                {Math.round(props.value)}
                </Text>
                <Text 
                style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: props.gain_perc > 0 ? 'green' : 'red'
                }}>
                {parseFloat(props.gain_perc).toFixed(2)}
                </Text>
                <Text 
                style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: props.gain > 0 ? 'green' : 'red'
                }}>
                {Math.round(props.gain)}
                </Text>

            </View>


            
        </View>
    </>
}