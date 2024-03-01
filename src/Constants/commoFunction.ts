export function shuffleArray(ary: Array<string>) {
    let newAry = [];
    while (ary.length !== 0) {
        if (ary.length !== 1) {
            let num = randomBtwTwo(0, ary.length);
            newAry.push(ary.splice(num, 1)[0]);
        } else {
            newAry.push(ary.splice(0, 1)[0]);
        }
    }
    return newAry;
}

export function randomBtwTwo(start: number, end: number) {

    return Math.floor(Math.random() * (start - end + 1) + end);
}