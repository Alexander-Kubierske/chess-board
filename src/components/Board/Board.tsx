import { useAppContext } from '../../contexts/Contexts';
import Pieces from '../PlayPieces/Pieces';
import Popup from '../Popup/Popup';
import './Board.css';
import Files from './boardComponents/Files'
import Ranks from './boardComponents/Ranks'

/**
 * Chessboard Component
 * 
 * This component renders the chessboard with ranks, files, and pieces.
 * It generates an 8x8 grid as well as labels for the rows and columns 
 * following the standard chessboard pattern.
 * 
 * @component
 * @returns {JSX.Element} The chessboard component with tiles, ranks, files, and pieces.
 */
const Board = () => {

    /**
    * Array structure: `[8, 7, 6, 5, 4, 3, 2, 1]` later converted to h-a
    * @constant {number[]} ranks - An array of rank numbers from 8 (top) to 1 (bottom).
    */
    const ranks = Array(8).fill(null).map((_,row)=> 8-row)
    /**
    * Array structure: `[8, 7, 6, 5, 4, 3, 2, 1]`
    * @constant {number[]} files - An array of file numbers from 1 (left) to 8 (right).
    */
    const files = Array(8).fill(null).map((_,col)=> col+1)

    const {appState} = useAppContext()
    const position = appState.position[appState.position.length -1]

    /**
     * Determines the tile color by checking if the row and column index are odd or even.
     * 
     * @param {number} row - The row index (rank).
     * @param {number} col - The column index (file).
     * @returns {string} The appropriate class name for the tile.
     */
    const getClassName = (row:number,col:number) => {
        let tileClassName = 'tile'
        tileClassName += (row+col) % 2===0? ' tile--dark' : ' tile--light'

        if (appState.availableMoves?.find(m => m[0] === row && m[1] === col)){
            if(position[row][col])
                tileClassName+= ' attacking'
            else
                tileClassName+= ' highlight'
        }

        return tileClassName
    }

    return <div className='board'>

        <Ranks ranks={ranks}/>

        <div className='tiles'>
            {ranks.map((rank,row) =>
                files.map((file,col) =>
                    <div key={`${file}-${rank}`} className={getClassName(7-row,col)}></div>
                )
            )}
        </div>

        <Pieces/>

        <Popup/>

        <Files files={files}/>

    </div>
};

export default Board;