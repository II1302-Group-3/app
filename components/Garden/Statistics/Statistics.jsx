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
    const [lightYAxis, setLightYAxis] = useState([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    const [moistureYAxis, setMoistureYAxis] = useState([]);
    const [xAxis, setXAxis] = useState();
    const [lightData, set_light_percentage] = useState([]);
    const [moistureData, setMoistureData] = useState([]);
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

    const getPercentage = (lightData) => {
        const lightData_as_percentage = lightData.map(hour => ((hour / 10764) * 100))
        set_light_percentage(lightData_as_percentage)
    }

    useEffect(() => {
        dispatch(getStatistics({
            nutritientPath: NUTRITIENT_PATHS.LIGHT,
            date
        })).unwrap().then(lightData => {
            getPercentage(lightData);
            setXAxis(getDaysOfMonthUntilPresent(lightData.length));
        });

        // dispatch(getStatistics({
        //     nutritientPath: NUTRITIENT_PATHS.MOISTURE,
        //     date
        // })).unwrap().then(moistureData => setMoistureData(moistureData));
    }, [date]);

    return (
        <View>
            <StatisticsView
                lightData={lightData}
                day={day}
                setNextDay={setNextDay}
                setPrevDay={setPrevDay}
                xAxis={xAxis}
                lightIsLoading={lightIsLoading}
                moistureIsLoading={moistureIsLoading}
                lightError={lightError}
                moistureError={moistureError} />
        </View>
    )
}

function getDaysOfMonthUntilPresent(length) {
    return [...Array(length).keys()].map(zeroIndexedDate => ++zeroIndexedDate);
}