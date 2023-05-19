
import { actions as resetPlayerProfileSlice } from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
import {reset as resetGetAllPlayerDealSlice} from "../../Slice/Player/PlayerDeal/PlayerDealSlice"
import { useDispatch } from "react-redux";
import {reset as resetScoutProfileSlice } from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice";
import {reset as resetPlayerVisitSlice } from "../../Slice/Player/PlayerView/PlayerViewSlice";
import {reset as resetGetPlayerSlice} from '../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage'
import {reset as resetLoginSlice} from '../../Slice/auth/Login'


export const UserLogout= async () =>{
    const dispatch = useDispatch()
    await dispatch(resetPlayerProfileSlice.resetState())
    await dispatch(resetGetAllPlayerDealSlice())
    await dispatch(resetScoutProfileSlice())
    await dispatch(resetPlayerVisitSlice())
    await dispatch(resetGetPlayerSlice())
    await dispatch(resetLoginSlice())
}