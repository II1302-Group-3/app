import React, { useRef, useEffect } from "react";
import { View, Dimensions, StyleSheet, Animated } from "react-native";
import { 
    Text,
    Button,
    ActivityIndicator,
    MD2Colors } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

export const StatisticsView = ({
    day,
    lightXAxis,
    lightData,
    moistureXAxis,
    moistureData,
    setNextDay,
    setPrevDay,
    lightIsLoading,
    moistureIsLoading,
    lightError,
    moistureError
}) => {
    const width = Dimensions.get("window").width;
    const height = 220;

    function renderDay() {
        const BUTTON = {
            LEFT: 'left',
            RIGHT: 'right'
        }

        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                { renderButton(BUTTON.LEFT) }
                <Text style={{textAlign: 'center'}} variant="displayMedium">{day}</Text>
                { renderButton(BUTTON.RIGHT) }
            </ View>
        )

        function renderButton(direction) {
            const comparedDay = isDirectionLeftOrRight() ? 'Monday' : 'Sunday';
            const icon = isDirectionLeftOrRight() ? "arrow-left" : 'arrow-right';
            const callback = isDirectionLeftOrRight() ? setPrevDay : setNextDay;

            return day !== comparedDay ?
                 <Button icon={icon} mode="text" onPress={() => callback()} /> :
                 <Text>{ " ".repeat(20) }</Text>

            function isDirectionLeftOrRight() {
                return direction === 'left'
            }
        }
    }

    function renderCharts() {
        const loadingIconStyles = StyleSheet.create({
            wrapper: {
                position: 'absolute',
                width,
                height: height + 36,
                top: 7,
                backgroundColor: 'rgba(230, 230, 100, 0.5)',
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            size: "large",
            color: MD2Colors.red800
        })

        const chartStyles = StyleSheet.create({
            light: {
                color: {
                    from: "#fb8c00",
                    to: "#ffd700"
                }
            },
            moisture: {
                color: {
                    from: "#0000ff",
                    to: "#00ff00"
                }
            }
        })

        const charts = [
            {legend: 'Light', 
            color: chartStyles.light.color, 
            data: lightData,
            xAxis: lightXAxis,
            loading: lightIsLoading,
            error: lightError}, 

            {legend: 'Moisture', 
            color: chartStyles.moisture.color, 
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ],
            xAxis: moistureXAxis,
            loading: moistureIsLoading,
            error: moistureError}
        ];

        const Transition = props => {
            const fadeAnim = useRef(new Animated.Value(0)).current;

            useEffect(() => {
                const toValue = props.loading ? 1 : 0;

                Animated.timing(fadeAnim, {
                  toValue,
                  duration: 500,
                  useNativeDriver: true,
                }).start();
              }, [props.loading]);

              return (
                <Animated.View style={{...props.style, opacity: fadeAnim}}>
                  {props.children}
                </Animated.View>
              );
        }

        return charts.map(chart => 
            <View key={chart.legend}>
                <Transition style={loadingIconStyles.wrapper} loading={chart.loading}>
                    { chart.error ? (
                        <Text>{chart.error}</Text>
                    ) : (
                        <ActivityIndicator size={loadingIconStyles.size} animating={true} color={loadingIconStyles.color} />
                    )}
                    
                </Transition>
                <LineChart
                    data={{
                    labels: chart.xAxis,
                    datasets: [
                        {
                        data: chart.data[0] ? chart.data : [0]
                        }
                    ],
                    legend: [chart.legend]
                    }}
                    width={width} // from react-native
                    height={height}
                    yAxisLabel=""
                    yAxisSuffix="%"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        strokeWidth: "5",
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: chart.color.from,
                    backgroundGradientTo: chart.color.to,
                    decimalPlaces: 0, // optional, defaults to 2dp
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
            { renderDay() }
            { renderCharts() }
        </View>
    )
}