import { Status } from '../../constant.tsx'
import { useAppContext } from '../../contexts/Contexts.tsx'
import { closePopup } from '../../reducer/actions/popup.tsx'
import './Popup.css'
import PromotionBox from './PromotionBox.tsx'

const Popup = () => {

    const {appState, dispatch} = useAppContext()

    if (appState.status === Status.ongoing)
        return null

    const onClosePopup = () => {
        dispatch(closePopup())
    }

    return <div className='popup'>
        <PromotionBox onClosePopup = {onClosePopup}/>
    </div>
}

export default Popup