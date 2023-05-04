import React from "react";
import { Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export const StatisticsView = ({
    data,
    month,
    lightYAxis,
    waterYAxis,
    xAxis,
    lightData,
    waterData
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

    return(
        <View>
  <Text>{month}</Text>
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
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
        strokeWidth: "5",
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
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
</View>
    )
}