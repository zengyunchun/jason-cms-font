import {RouterTypes, Route} from 'umi';

// export interface ConnectState {
//     global: GlobalModelState;
//     loading: Loading;
//     settings: SettingModelState;
//     user: UserModelState;
//     login: LoginModelType;
//   }

import {UserModelState, UserListModelState, UserModel} from './user';
import { Dispatch, AnyAction } from 'redux';

export interface ConnectState {
    user: UserModelState,
    //list: Array<UserModel>,
}



export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route,T>> {
    dispatch?: Dispatch<AnyAction>
}