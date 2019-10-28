
// export interface ConnectState {
//     global: GlobalModelState;
//     loading: Loading;
//     settings: SettingModelState;
//     user: UserModelState;
//     login: LoginModelType;
//   }

import {UserModelState, UserListModelState, UserModel} from './user';

export interface ConnectState {
    user: UserModelState,
    //list: Array<UserModel>,
}
