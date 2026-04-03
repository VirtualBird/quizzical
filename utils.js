export function shuffle(array){
    // Making a copy of array because just incase React freaks out
    let copyArr = array
    
    let remaining = copyArr.length, temp, index;

    // While there remain elements to shuffle...
    while (remaining) {
        
        // Pick a remaining element...
        index = Math.floor(Math.random() * remaining--)
        
        // And swap it with the current element.
        temp = copyArr[remaining]
        copyArr[remaining] = copyArr[index];
        copyArr[index] = temp
    }
    return copyArr
}