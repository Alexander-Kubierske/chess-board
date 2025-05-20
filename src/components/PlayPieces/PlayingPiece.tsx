import arbiter from "../../arbiter/arbiter";
import { useAppContext } from "../../contexts/Contexts";
import { generateAvailableMoves } from "../../reducer/actions/movePiece";

interface PlayingPieceProps {
    /**Horizontal row in which the piece is placed (a-h) represented as a number (0-7)*/
    rank: number; 
    /**Vertical column in which the piece is placed (1-8) represented as a number (0-7)*/
    file: number;
    /**The 2 letter shorthand for a piece*/
    piece: string; 
}

/**
 * Chess Playing Piece Component
 * 
 * This component renders a draggable chess piece at a given rank and file position.
 * The class names determine the piece type and position.
 * 
 * @component
 * @param {number} props.rank - The rank (row) where the piece is placed (0-7).
 * @param {number} props.file - The file (column) where the piece is placed (0-7).
 * @param {string} props.piece - The two-letter shorthand for the piece type.
 * @returns {JSX.Element} A draggable chess piece.
 */
const PlayingPiece: React.FC<PlayingPieceProps> = ({rank,file,piece}) => {

    const {appState, dispatch} = useAppContext()
    const {turn, position} = appState;
    const currentPosition = position[position.length-1]

    

    const onDragStartFn = e =>{
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain',`${piece},${rank},${file}`)
        setTimeout(()=>{e.target.style.display = 'none'},0)
        if (turn === piece[0]) {
            const availableMoves = 
                    arbiter.getValidMoves({
                        position:currentPosition,
                        prevPosition: position[position.length-2],
                        piece, 
                        rank, 
                        file
                    })
            dispatch(generateAvailableMoves({availableMoves}))
        }
    }

    const onDragEndFn = e => e.target.style.display = 'block'

    return <div 
                className={`piece ${piece} p-${7 - rank}${file}`} 
                draggable={true}
                onDragStart={onDragStartFn}
                onDragEnd={onDragEndFn}
           />
}

export default PlayingPiece