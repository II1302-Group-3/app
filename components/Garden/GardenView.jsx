import React, { useEffect } from 'react';
import { useCardStyle } from '../../style';
import { useColorScheme } from 'react-native';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { useColors } from '../../style';
import { resetGarden } from '../../store/slices/garden';
import { Spinner } from '../Spinner';
import { useSelector, useDispatch } from 'react-redux';

export const GardenView = ({ navigation }) => {
    const dispatch = useDispatch();
    const isSyncing = useSelector(state => state.garden?.syncing ?? true);

    const isDarkMode = useColorScheme() === 'dark';
    const cardStyle = useCardStyle(isDarkMode);

    useEffect(() => {
        return () => dispatch(resetGarden());
    }, [])

    const styles = StyleSheet.create({
        cardStyle: Object.assign(cardStyle, {margin: 50, padding: 50}),
        iconStyle: {width: 50, height: 50},
        color: useColors()
    })

    function renderCards() {
        const cards = [
            {title: 'Environment Settings', img: require('../../assets/Settings.png'), nav: 'EnvironmentSettings'}, 
            {title: 'Statistics', img: require('../../assets/Stats.png'), nav: 'Statistics'}
        ]

        return cards.map(card => 
            <TouchableHighlight 
                key={card.nav}
                style={styles.cardStyle} 
                activeOpacity={0.1}
                underlayColor={styles.color.lightGray}
                onPress={() => navigation.navigate(card.nav)}>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.iconStyle} source={card.img} />
                        <Text>{card.title}</Text>
                    </View>
            </TouchableHighlight>
        )
    }

    if(isSyncing) {
        return <Spinner></Spinner>;
    }

    return(
        <View>
            {renderCards()}
        </View>
    )
}