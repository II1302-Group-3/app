import React, { useEffect } from 'react';
import { useCardStyle } from '../../style';
import { useColorScheme } from 'react-native';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import { resetGarden } from '../../store/slices/garden';
import { Spinner } from '../Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';

export const GardenView = ({ navigation }) => {
    const dispatch = useDispatch();
    const isSyncing = useSelector(state => state.garden?.syncing ?? true);

    const nickname = useSelector(state => state.garden?.nickname ?? "");
    useEffect(() => navigation.setOptions({title: nickname}), [nickname])

    const isDarkMode = useColorScheme() === 'dark';
    const cardStyle = useCardStyle(isDarkMode);

    useEffect(() => {
        return () => dispatch(resetGarden());
    }, [])

    const tintColor = isDarkMode ? "#e1e1e1" : "#222222";

    const styles = StyleSheet.create({
        cardStyle: Object.assign(cardStyle, {marginHorizontal: 50, marginVertical: 10, padding: 50}),
        iconStyle: {width: 50, height: 50, marginBottom: 20, tintColor: tintColor },
        textStyle: {color: tintColor}
    })

    const settingsIcon = require('../../assets/Settings.png');
    const statsIcon = require('../../assets/Stats.png');

    function renderCards() {
        const cards = [
            {title: 'Environment Settings', img: settingsIcon, nav: 'EnvironmentSettings'},
            {title: 'Statistics', img: statsIcon, nav: 'Statistics'}
        ]

        return cards.map(card =>
            <TouchableOpacity
                key={card.nav}
                style={styles.cardStyle}
                activeOpacity={0.6}
                onPress={() => navigation.navigate(card.nav)}>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.iconStyle} source={card.img} />
                        <Text variant="titleSmall" style={styles.textStyle}>{card.title}</Text>
                    </View>
            </TouchableOpacity>
        )
    }

    const headerHeight = useHeaderHeight();

    if(isSyncing) {
        return <Spinner></Spinner>;
    }

    return(
        <View style={{flexDirection: "column", height: "100%", justifyContent: "center", paddingTop: 30, paddingBottom: 30 + headerHeight}}>
            {renderCards()}
        </View>
    )
}