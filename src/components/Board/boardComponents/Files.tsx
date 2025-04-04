import './Files.css'
import { getCharacter } from '../../../helper'
import { FC } from 'react';

interface FilesProps {
    /**
     * An Array of numbers representing the "files"/"columns" (numbered 1-8).
     */
    files: number[];
}

/**
 * Files Component
 * 
 * This component renders a Div containing spans with letters corresponding to each file.
 * Used to label the columns of the chess board (a-h).
 * Letters are retrieved using the `getCharacter` function.
 * 
 * @component
 * @param {number[]} props.files - An array of numbers representing files.
 * @returns {JSX.Element} A div containing spans with character representations of the files.
 */
const Files: FC<FilesProps> = ({files}) => { 
    return <div className="files">
                {files.map(file=> <span key={file}>{getCharacter(file)}</span>)}
           </div>
}

export default Files
 