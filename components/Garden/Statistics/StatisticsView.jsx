import React from "react";
import { View, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const StatisticsView = ({
    data,
    month,
    lightYAxis,
    waterYAxis,
    xAxis,
    lightData,
    waterData,
    setNextMonth,
    setPrevMonth
}) => {
    // const data = {
    //     labels: ["January", "February", "March", "April", "May", "June"],
    //     datasets: [
    //       {
    //         data: [20, 45, 28, 80, 99, 43],
    //         color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    //         strokeWidth: 2 // optional
    //       }
    //     ],
    //     legend: ["Rainy Days"] // optional
    //   };

    const screenWidth = Dimensions.get("window").width;
    
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    function renderCharts() {
        const charts = [{legend: 'Light', color: '#fb8c00'}, {legend: 'Water', color: '#00FF00'}];

        return charts.map(chart => <View>
            <LineChart
                data={{
                labels: xAxis,
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ],
                legend: [chart.legend]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    strokeWidth: "5",
                backgroundColor: "#e26a00",
                backgroundGradientFrom: chart.color,
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
        </View>)
    }

    return(
        <View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button icon="arrow-left" mode="text" onPress={() => setPrevMonth()} />
                <Text style={{textAlign: 'center'}} variant="displayLarge">{month}</Text>
                <Button icon="arrow-right" mode="text" onPress={() => setNextMonth()} />
            </View>
            { renderCharts() }
        </View>
    )
}