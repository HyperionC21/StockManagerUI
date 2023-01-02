import { FlatList, StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';

type metricType = {
    metric: string,
    value: any
}

type propTypes = {
    metrics?: Array<metricType>
}

const Item = (props: metricType) => {
    return <>
        <View
            style={{
                height: 50,
                width: Dimensions.get('window').width,
                flexDirection: 'row',
                marginBottom: 5,
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}
        >
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, flex: 4 }}> {props.metric} </Text>
            <Text style={{ color: 'black', textAlign: 'right', fontWeight: 'bold', fontSize: 20, flex: 1, paddingRight: '5%'}}> {props.value} </Text>
        </View>
    </>
}

export const MetricsFragment = (props: propTypes) => {

    const renderItem = ({ item }) => (
        <Item metric={item.metric} value={item.value}></Item>
      );

    return <>
        <View
            style={{
                marginBottom: 50,
                marginTop: 50,
            }}
        >
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}> Metrics </Text>
            <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }} >
                <View>        
                    <ScrollView horizontal={true} style={{ width: "100%" }}>
                        <FlatList
                            data={props.metrics}
                            renderItem={renderItem}
                            
                            ItemSeparatorComponent={Divider}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    </>
}