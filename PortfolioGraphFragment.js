import { useState, useEffect, React, useContext, useCallback, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';

 

export function renderLegend(text, color) {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <View
                style={{
                    height: 18,
                    width: 18,
                    marginRight: 10,
                    borderRadius: 4,
                    backgroundColor: color || 'white',
                }} />
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{text || ''}</Text>
        </View>);
}