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

export const Statistics = () => {
    const dispatch = useDispatch();

    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState(DAYS[date.getDay()]);
    const [lightXAxis, setLightXAxis] = useState();
    const [lightData, setLightData] = useState([]);
    const [moistureData, setMoistureData] = useState([]);
    const [moistureXAxis, setMoistureXAxis] = useState([0]);
    const lightIsLoading = useSelector(state => state.garden.statistics.light.isLoading);
    const moistureIsLoading = useSelector(state => state.garden.statistics.moisture.isLoading);
    const lightError = useSelector(state => state.garden.statistics.light.error);
    const moistureError = useSelector(state => state.garden.statistics.moisture.error);

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
            HUMIDITY: 0,
            TEMPERATURE: 0
        }

        // updateAllStatistics()
        updateStatistics(NUTRITIENT.LIGHT, NUTRITIENT_PATHS.LIGHT)

        function updateAllStatistics() {
            Object.keys(NUTRITIENT).forEach((_, index) => updateStatistics(NUTRITIENT[index]), NUTRITIENT_PATHS[index])
        }

        function updateStatistics(nutritient, nutritientPath) {
            dispatch(getStatistics({ nutritientPath, date })).unwrap().then(data => setStatistics(data));

            function setStatistics(data) {
                let dataSetter;
                let xAxisSetter;
    
                switch(nutritient) {
                    case NUTRITIENT.LIGHT:
                        dataSetter = setLightData;
                        xAxisSetter = setLightXAxis;
                        break;
                    case NUTRITIENT.MOISTURE:
                        dataSetter = setMoistureData;
                        xAxisSetter = setMoistureXAxis;
                        break;
                }
    
                setPercentage(data, nutritient, dataSetter);
                const hours = getArrayOfHours(data);
                xAxisSetter(hours);

                function setPercentage(data, max, setData) {
                    const dataAsPercentage = data.map(hour => ((hour.val / max) * 100))
                    setData(dataAsPercentage)
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
                day={day}
                setNextDay={setNextDay}
                setPrevDay={setPrevDay}
                lightIsLoading={lightIsLoading}
                moistureIsLoading={moistureIsLoading}
                lightError={lightError}
                moistureError={moistureError} />
        </View>
    )
}