
import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';
import Constant from './Constant';

export  const client = new KindeSDK(
    Constant.KINDE_ISSUER_URL,
    Constant.KINDE_POST_CALLBACK_URL,
    Constant.KINDE_CLIENT_ID,
    Constant.KINDE_POST_LOGOUT_REDIRECT_URL,
 
     );

