import { useState, useRef } from 'react'
import './Pieces.scss'
import PlayingPiece from './PlayingPiece'
import { createPosition, copyPosition } from '../../helper'
import { useAppContext } from '../../contexts/Contexts'
import { clearAvailableMoves, makeNewMove } from '../../reducer/actions/movePiece'

interface Coordinates {
    x: number
    y: number
}

const Pieces = () =>{

    const ref = useRef<HTMLDivElement>(null)

    const {appState, dispatch} = useAppContext()

    const currentPosition = appState.position[appState.position.length-1]

    /**
    * Calculates board coordinates based on mouse event position.
    * @param event - Mouse event from drag/drop
    * @returns Object containing x (rank) and y (file)
    */
    const calcCoords = (event: React.DragEvent<HTMLDivElement>): Coordinates => {
        const {width,left,top} = ref.current.getBoundingClientRect()
        const size = width/8
        const y = Math.floor((event.clientX-left)/size)
        const x = 7- Math.floor((event.clientY-top)/size)
        return {x,y}
    }

    /**
    * Handles the drop event for moving a piece on the chessboard and calls dispatch to update the state.
    * 
    * @param {DragEvent} event - The drag event triggered when the user drops a piece.
    */
    const onDropFn = (event: React.DragEvent<HTMLDivElement>) => {
        const newPosition = copyPosition(currentPosition)
        const {x,y} = calcCoords(event)

        const [p,rank,file] = event.dataTransfer.getData('text').split(',')

        if (appState.availableMoves?.find(m => m[0] === x && m[1] === y)){
            // En-passant logic to remove defending pawn
            if(p.endsWith('p') && !newPosition[x][y] && x !== rank && y !== file ){
                newPosition[rank][y] = ''
            }

            newPosition[rank][file] = ''
            newPosition[x][y] = p
            dispatch(makeNewMove({newPosition}))
        }

        dispatch(clearAvailableMoves())
    }

    const onDragOverFn = event => event.preventDefault()

    return <div 
                ref={ref}
                onDrop={onDropFn} 
                onDragOver={onDragOverFn}
                className='pieces'>
        {currentPosition.map((r,rank)=>
            r.map((f,file)=> currentPosition[rank][file]
            ? <PlayingPiece
                key={`${file}-${rank}`}
                rank={rank}
                file={file}
                piece={currentPosition[rank][file]}
                />
            : null)
        )}
    </div>
}

export default Pieces