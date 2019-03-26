import Axios from 'axios';
import {local} from '../config';

const Ajax = {
    get: url => {
		console.log(local)
        return Axios.get( local+url )
    },
    post: ( url, params ) => {
        return Axios.post( local+url, params )
    },
}

export default Ajax;