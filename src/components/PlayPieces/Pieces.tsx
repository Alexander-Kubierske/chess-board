import { useState, useRef } from 'react'
import './Pieces.scss'
import PlayingPiece from './PlayingPiece'
import { createPosition, copyPosition } from '../../helper'
import { useAppContext } from '../../contexts/Contexts'
import { makeNewMove } from '../../reducer/actions/movePiece'

const Pieces = () =>{

    const ref = useRef()

    const {appState, dispatch} = useAppContext()

    console.log(appState)

    const currentPosition = appState.position[appState.position.length-1]

    const calcCoords = e => {
        const {width,left,top} = ref.current.getBoundingClientRect()
        const size = width/8
        const y = Math.floor((e.clientX-left)/size)
        const x = 7- Math.floor((e.clientY-top)/size)
        return {x,y}
    }

    const onDropFn = e => {
        const newPosition = copyPosition(currentPosition)
        const {x,y} = calcCoords(e)

        const [p,rank,file] = e.dataTransfer.getData('text').split(',')

        newPosition[rank][file] = ''
        newPosition[x][y] = p
        dispatch(makeNewMove({newPosition}))

    }

    const onDragOverFn = e => e.preventDefault()

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