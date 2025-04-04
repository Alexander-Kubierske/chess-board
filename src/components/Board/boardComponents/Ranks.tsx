import { FC } from 'react';
import './Ranks.css'

interface RanksProps {
    /**
     * An Array of numbers representing the "ranks"/"rows" (numbered 1-8).
     */
    ranks: number[];
}

/**
 * Ranks Component
 * 
 * This component renders a Div containing spans with numbers corresponding to each rank.
 * Used to label the rows of the chess board (1-8).
 * 
 * @component
 * @param {number[]} props.ranks - An array of numbers representing Ranks.
 * @returns {JSX.Element} A div containing spans with number representations of the Ranks.
 */
const Ranks: FC<RanksProps> = ({ranks}) => { 
    return <div className="ranks">
                {ranks.map(rank=> <span key={rank}>{rank}</span>)}
           </div> 
}

export default Ranks