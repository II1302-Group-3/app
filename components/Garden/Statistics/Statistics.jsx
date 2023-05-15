import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatisticsView } from "./StatisticsView";
import {
    getStatistics,
    resetError,
    NUTRITIENT_PATHS
} from "../../../store/slices/garden";
import { DAYS } from "../../../constants";
import { View } from "react-native";

export const Statistics = ({navigation}) => {
    const dispatch = useDispatch();

    const nickname = useSelector(state => state.garden?.nickname ?? "");
    useEffect(() => navigation.setOptions({title: `Statistics for ${nickname}`}), [nickname])

    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState(DAYS[date.getDay()]);
    const [lightXAxis, setLightXAxis] = useState();
    const [lightData, setLightData] = useState([0]);
    const [moistureData, setMoistureData] = useState([0]);
    const [moistureXAxis, setMoistureXAxis] = useState([0]);
    const [humidityData, setHumidityData] = useState([0]);
    const [humidityXAxis, setHumidityXAxis] = useState([0]);
    const [temperatureData, setTemperatureData] = useState([0]);
    const [temperatureXAxis, setTemperatureXAxis] = useState([0]);

    const lightIsLoading = useSelector(state => state.garden.statistics.light.isLoading);
    const moistureIsLoading = useSelector(state => state.garden.statistics.moisture.isLoading);
    const humidityIsLoading = useSelector(state => state.garden.statistics.humidity.isLoading);
    const temperatureIsLoading = useSelector(state => state.garden.statistics.temperature.isLoading);
    const lightError = useSelector(state => state.garden.statistics.light.error);
    const moistureError = useSelector(state => state.garden.statistics.moisture.error);
    const humidityError = useSelector(state => state.garden.statistics.humidity.error);
    const temperatureError = useSelector(state => state.garden.statistics.temperature.error);


    const setNextDay = () => {
        if (day !== 'Sunday') {
            if (lightError || moistureError) dispatch(resetError());
            setDate(new Date(date.setDate(date.getDate() + 1)));
            setDay(DAYS[date.getDay()]);
        }
    }

    const setPrevDay = () => {
        if (day !== 'Monday') {
            if (lightError || moistureError) dispatch(resetError());
            setDate(new Date(date.setDate(date.getDate() - 1)));
            setDay(DAYS[date.getDay()]);
        }
    }

    useEffect(() => {
        const NUTRITIENT = {
            LIGHT: 10764,
            MOISTURE: 100,
            HUMIDITY: 100,
            TEMPERATURE: 100
        }

        // updateAllStatistics()
        updateStatistics(NUTRITIENT.LIGHT, NUTRITIENT_PATHS.LIGHT)
        updateStatistics(NUTRITIENT.MOISTURE, NUTRITIENT_PATHS.MOISTURE)
        updateStatistics(NUTRITIENT.HUMIDITY, NUTRITIENT_PATHS.HUMIDITY)
        updateStatistics(NUTRITIENT.TEMPERATURE, NUTRITIENT_PATHS.TEMPERATURE)

        // function updateAllStatistics() {
        //     Object.keys(NUTRITIENT).forEach((_, index) => updateStatistics(NUTRITIENT[index]), NUTRITIENT_PATHS[index])
        // }

        function updateStatistics(nutritient, nutritientPath) {
            dispatch(getStatistics({ nutritientPath, date })).unwrap().then(data => setStatistics(data));

            function setStatistics(data) {
                let dataSetter;
                let xAxisSetter;
                let converter;

                switch(nutritientPath) {
                    case NUTRITIENT_PATHS.LIGHT:
                        dataSetter = setLightData;
                        xAxisSetter = setLightXAxis;
                        converter = setPercentage;
                        break;
                    case NUTRITIENT_PATHS.MOISTURE:
                        dataSetter = setMoistureData;
                        xAxisSetter = setMoistureXAxis;
                        converter = setPercentage;
                        break;
                    case NUTRITIENT_PATHS.HUMIDITY:
                        dataSetter = setHumidityData;
                        xAxisSetter = setHumidityXAxis;
                        converter = setPercentage;
                        break;
                    case NUTRITIENT_PATHS.TEMPERATURE:
                        dataSetter = setTemperatureData;
                        xAxisSetter = setTemperatureXAxis;
                        converter = setTemperature;
                        break;
                }

                converter(data, nutritient, dataSetter);

                const hours = getArrayOfHours(data);
                xAxisSetter(hours);

                function setPercentage(data, max, setData) {
                    const dataAsPercentage = data.map(hour => ((hour.val / max) * 100))
                    setData(dataAsPercentage)
                }

                function setTemperature(data, max, setData) {
                    setData(data.map(data => data.val));
                }

                function getArrayOfHours(data) {
                    return data.map(hourAndValPair => hourAndValPair['hour']);
                }
            }
        }

    }, [date]);

    return (
        <View>
            <StatisticsView
                lightData={lightData}
                lightXAxis={lightXAxis}
                moistureData={moistureData}
                moistureXAxis={moistureXAxis}
                humidityData={humidityData}
                humidityXAxis={humidityXAxis}
                temperatureData={temperatureData}
                temperatureXAxis={temperatureXAxis}
                day={day}
                setNextDay={setNextDay}
                setPrevDay={setPrevDay}
                lightIsLoading={lightIsLoading}
                moistureIsLoading={moistureIsLoading}
                humidityIsLoading={humidityIsLoading}
                temperatureIsLoading={temperatureIsLoading}
                lightError={lightError}
                moistureError={moistureError}
                humidityError={humidityError}
                temperatureError={temperatureError} />
        </View>
    )
}