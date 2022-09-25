import { useSelector, useDispatch } from "react-redux";
import { Alert, ButtonToggle} from "reactstrap";
import {alertAction} from "../../slices/Alert/thunk"

const AlertCommon = () => {
    const {showHide,color,message } = useSelector((state: any) => ({
        showHide: state.alert.showHide,
        color:state.alert.color,
        message: state.alert.message
      }));
    const dispatch = useDispatch();
    const toggle=()=>{
        dispatch(alertAction({showHide:false,message:"",color:""}));
    }
    return (
        <Alert color={color} isOpen={showHide} toggle={toggle}>{message} </Alert>
    )
};

export default AlertCommon;
