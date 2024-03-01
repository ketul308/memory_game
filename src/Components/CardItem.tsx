import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'

type Props = {
    item: string
    index: number
    openIndex?: { '1st': number, "2nd": number }
    onPressItem?: (s: number) => void
    disabled?: boolean
}

const CardItem = (props: Props) => {

    const { index, item, onPressItem, openIndex, disabled } = props;
    const isDone = item.length == 0;
    const isOpen = (openIndex?.['1st'] == index || openIndex?.['2nd'] == index);

    return (
        <TouchableOpacity
            disabled={disabled || isOpen}
            onPress={() => onPressItem && onPressItem(index)}
            style={[styles.item, { backgroundColor: isDone ? "transparent" : "#82B2A1" }]}
        >
            <Text style={styles.textChar}>{isOpen ? item : ""}</Text>
        </TouchableOpacity>
    )
}

export default CardItem