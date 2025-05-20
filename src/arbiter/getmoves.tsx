export const getRookMoves = (position, piece, rank, file) => {
    console.log('rook start')
    const moves = []
    const us = piece[0]
    const enemy = us === 'w' ? 'b' : 'w'

    const direction = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ]

    direction.forEach(dir =>{
        for (let i = 1; i < 8; i++){
            const x = rank + (i*dir[0]);
            const y = file + (i*dir[1]);
            if (position?.[x]?.[y]===undefined)
                break
            if (position[x][y].startsWith(enemy)){
                moves.push([x,y])
                break
            }
            if (position[x][y].startsWith(us)){
                break
            }

            moves.push([x,y])
        }
    })

    return moves
}

export const getKnightMoves = (position, rank, file) => {
    console.log('knight start')
    const moves = []
    const enemy = position[rank][file].startsWith('w') ? 'b' : 'w'
    

    const candidates = [
        [-2,-1],
        [-2,1],
        [2,-1],
        [2,1],
        [-1,-2],
        [-1,2],
        [1,-2],
        [1,2],
    ]
    candidates.forEach(c=>{
        const cell = position?.[rank+c[0]]?.[file+c[1]]
        if (cell!== undefined && (cell.startsWith(enemy) || cell === ''))
            moves.push([rank+c[0],file+c[1]])
    })

    return moves
}

export const getBishopMoves = (position, piece, rank, file) => {
    console.log('bishop start')
    const moves = []
    const us = piece[0]
    const enemy = us === 'w' ? 'b' : 'w'

    const direction = [
        [-1,-1],
        [-1,1],
        [1,-1],
        [1,1]
    ]

    direction.forEach(dir =>{
        for (let i = 1; i < 8; i++){
            const x = rank + (i*dir[0]);
            const y = file + (i*dir[1]);
            if (position?.[x]?.[y]===undefined)
                break
            if (position[x][y].startsWith(enemy)){
                moves.push([x,y])
                break
            }
            if (position[x][y].startsWith(us)){
                break
            }

            moves.push([x,y])
        }
    })

    return moves
}

export const getQueenMoves = (position, piece, rank, file) => {
    console.log('queen start')
    const moves = []
    const us = piece[0]
    const enemy = us === 'w' ? 'b' : 'w'

    const direction = [
        [-1,-1],
        [-1,1],
        [1,-1],
        [1,1],
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ]

    direction.forEach(dir =>{
        for (let i = 1; i < 8; i++){
            const x = rank + (i*dir[0]);
            const y = file + (i*dir[1]);
            if (position?.[x]?.[y]===undefined)
                break
            if (position[x][y].startsWith(enemy)){
                moves.push([x,y])
                break
            }
            if (position[x][y].startsWith(us)){
                break
            }

            moves.push([x,y])
        }
    })

    return moves
}

export const getKingMoves = (position, piece, rank, file) => {
    console.log('king start')
    const moves = []
    const us = piece[0]

    const direction = [
        [1,-1],[1,0],[1,1],
        [0,-1],      [0,1],
        [-1,-1],[-1,0],[-1,1],
    ]

    direction.forEach(dir =>{
            const x = rank + dir[0];
            const y = file + dir[1];
            if (position?.[x]?.[y]!==undefined && !position[x][y].startsWith(us))
                moves.push([x,y])
    })

    return moves
}

export const getPawnMoves = (position, piece, rank, file) => {
    console.log('pawn start')
    const moves = []
    const dir = piece === 'wp' ? 1 : -1
    
    if (!position?.[rank+dir][file]){
        moves.push([rank+dir,file])
    }

    if(rank % 5 === 1){
        if (position?.[rank+dir]?.[file] === '' && position?.[rank+dir+dir]?.[file] === ''){
        moves.push([rank+dir+dir,file])
        }
    }
    
    return moves
}

export const getPawnCaptures = (position, prevPosition, piece, rank, file) => {
    console.log('pawn capture start')
    const moves = []
    const dir = piece === 'wp' ? 1 : -1
    const enemy = piece[0] === 'w' ? 'b' : 'w'
    
    //capture to left
    if (position?.[rank+dir]?.[file-1] && position?.[rank+dir]?.[file-1].startsWith(enemy)){
        moves.push([rank+dir,file-1]) 
    }
    //capture to right
    if (position?.[rank+dir]?.[file+1] && position?.[rank+dir]?.[file+1].startsWith(enemy)){
        moves.push([rank+dir,file+1]) 
    }

    // En-Passant Logic
    const enemyPawn = dir === 1 ? 'bp': 'wp'
    const adjacentFiles = [file-1,file+1]
    // checks if the attacking pawn has moved 3 ranks 
    if (prevPosition){
        // checks if the advancing pawn is on the correct rank to en-passant
        if((dir=== 1 && rank === 4) || (dir === -1 && rank === 3)){
            adjacentFiles.forEach(f => {
                if (position?.[rank]?.[f] === enemyPawn && //  checks if there is a pawn adjacent to the advancing pawn
                    position?.[rank+dir+dir]?.[f] === '' && // checks where the defending pawn started (must be empty)
                    prevPosition?.[rank]?.[f] === '' && // checks if defending pawns current position was empty 1 move before
                    prevPosition?.[rank+dir+dir]?.[f] === enemyPawn){ // checks if defending pawn was 2 blocks before its current position
                        moves.push([rank+dir,f])
                }
            })
        }
    }
    
    return moves
}