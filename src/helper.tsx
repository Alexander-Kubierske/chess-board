/**
 * Converts a file number into a corresponding Unicode character. 
 * It targets the Unicode characters starting from lower case a.
 * 
 * @param {number} file - The file number to convert (expected range: 1-26).
 * @returns {string} The corresponding lowercase letter.
 */
export const getCharacter = (file:number) => String.fromCharCode(file+96);

export const createPosition = () => {

    const position = new Array(8).fill('').map(x=> new Array(8).fill(''))

    //pawns//

    // for (let i = 0; i<8; i++){
    //     position[1][i]='wp'
    //     position[6][i]='bp'
    // }


    //white side//
    position[0][0]='wr'
    // position[0][1]='wn'
    // position[0][2]='wb'
    // position[0][3]='wq'
    position[0][4]='wk'
    // position[0][5]='wb'
    // position[0][6]='wn'
    position[0][7]='wr'
    // //black side//
    position[7][0]='br'
    // position[7][1]='bn'
    // position[7][2]='bb'
    // position[7][3]='bq'
    position[7][4]='bk'
    // position[7][5]='bb'
    // position[7][6]='bn'
    position[7][7]='br'

    return position
}

export const copyPosition = position => {
    const newPosition = new Array(8).fill('').map(x=> new Array(8).fill(''))

    for ( let rank = 0; rank<8 ;rank++ ){
        for ( let file = 0; file<8 ;file++ ){
            newPosition[rank][file] = position [rank][file]
        }
    }

    return newPosition
}