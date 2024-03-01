import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardArray } from '../../Constants/StaticData';
import { shuffleArray } from '../../Constants/commoFunction';
import CardItem from '../../Components/CardItem';
import { styles } from './styles';

type Props = {}

const HomeScreen: React.FC<Props> = (props) => {

    const [cardData, setCardData] = useState<Array<string>>([]);
    const [openIndex, setOpenIndex] = useState<any>({});
    const [totalAttempts, setTotalAttempts] = useState<number>(0);
    const [isPressActive, setIsPressActive] = useState<boolean>(false);
    const [successCount, setSuccessCount] = useState<number>(0);
    const [restartGame, setrestartGame] = useState<boolean>(false);

    function setRandomArray() {
        let ary = shuffleArray([...CardArray]);
        setCardData(ary);
    }

    useEffect(() => {
        setRandomArray();
    }, []);

    useEffect(() => {
        if (openIndex["1st"] !== undefined && openIndex["2nd"] !== undefined) {
            setIsPressActive(true);
            const _id = setTimeout(() => {
                checkOpenCards();
                clearTimeout(_id);
                setIsPressActive(false);
                setOpenIndex({});
            }, 2000);
        }
    }, [openIndex])

    function onPressItem(n: number) {
        setOpenIndex((prev: any) => {
            if (prev["1st"] === undefined) {
                return { ...prev, "1st": n };
            } else {
                return { ...prev, "2nd": n };
            }
        });
    }

    function checkOpenCards() {
        let char1 = openIndex["1st"], char2 = openIndex["2nd"]
        if (cardData[char1] === cardData[char2]) {
            let newAry = [...cardData].map((ele) => {
                return ele === cardData[char1] ? "" : ele
            });
            setrestartGame(newAry.every((ele: any) => ele.length === 0));
            setCardData(newAry);
            setSuccessCount((prev) => ++prev);
        }
        setOpenIndex({})
        setTotalAttempts((prev) => ++prev);
    }

    function restarGame() {
        setRandomArray();
        setOpenIndex({});
        setTotalAttempts(0);
        setSuccessCount(0);
        setIsPressActive(false);
    }

    return (
        <SafeAreaView>
            <FlatList
                numColumns={4}
                data={cardData}
                renderItem={({ item, index }) => <CardItem
                    item={item}
                    disabled={isPressActive}
                    openIndex={openIndex}
                    index={index}
                    onPressItem={onPressItem}
                />}
            />

            <View style={styles.padding}>
                <Text>{"Attempts : " + totalAttempts}</Text>
                <Text>{"Success : " + successCount}</Text>
                {restartGame &&
                    <TouchableOpacity onPress={restarGame} style={styles.btnRestart}>
                        <Text >{"Restart"}</Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen