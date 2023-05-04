import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatisticsView } from "./StatisticsView";
import { getStatistics, resetError } from "../../../store/slices/garden";
import { MONTHS } from "../../../constants";

export const Statistics = () => {
    const dispatch = useDispatch();

    const [month, setMonth] = useState(MONTHS[new Date().getMonth()])
    const [lightYAxis, setLightYAxis] = useState([]);
    const [waterYAxis, setWaterYAxis] = useState([]);
    const [xAxis, setXAxis] = useState((() => getDaysOfMonthUntilPresent())());
    const lightData = useSelector(state => state.garden.statistics.light);
    const waterData = useSelector(state => state.garden.statistics.water);
    const error = useSelector(state => state.garden.statistics.error);

    const setNextMonth = () => {
        if(month !== 'December') setMonth(MONTHS[MONTHS.indexOf(month) + 1]);
    }
    const setPrevMonth = () => {
        if(month !== 'January') setMonth(MONTHS[MONTHS.indexOf(month) - 1]);
    }
    console.log(MONTHS)
    console.log(MONTHS.indexOf(month))
    console.log(new Date().getMonth())
    console.log(MONTHS[0])

    const nutritients = ['light', 'water']

    // useEffect(() => {
    //     nutritients.forEach(nutritient => dispatch(getStatistics(nutritient)))
    // }, [])

    useEffect(() => {
        if(error) {
            alert(error)
            dispatch(resetError())
        }
    }, [error])

    return (
        <StatisticsView month={month} xAxis={xAxis} setNextMonth={setNextMonth} setPrevMonth={setPrevMonth} />
    )
}

function getDaysOfMonthUntilPresent() {
    return [...Array(new Date().getDay()).keys()].map(date => ++date);
}