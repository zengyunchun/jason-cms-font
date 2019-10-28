import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';

// User模型的定义
export interface UserModel {
    userName?: String,
    password?: String,
    email?: String,
    phone?: String,
    gender?: Number,
    birthday?: Date,
    address?: String
}

export interface ListModel {
    id?: Number,
    name?: String,
    email?: String,
    gender: Number,
}


// User模型状态的定义, 用于reducer
export interface UserModelState {
    currentUser?: UserModel
    list?: Array<ListModel>
}

export interface UserListModelState {
    list? :Array<UserModel>
}

// dva的Model的定义
export interface UserModelType {
    namespace: "user",
    state: UserModelState,
    effects: {
        fetch: Effect;
    },
    subscriptions: { setup: Subscription };
    reducers: {
        save: Reducer<UserModelState>
    }
}

const UserModel: UserModelType =  {
    namespace: "user",
    state: {
        currentUser:{},
        list: [
            {id: 1, name: "张三2", email:"1@qq.com" , gender:1},
        ]
    },
    subscriptions : {
        setup({dispatch, history}) {
            // 订阅开始切换路径的时候派发一个动作
            history.listen(({pathname}) => {
                console.log("history.listen");
                if (pathname == "/admin/user") {
                    dispatch({type: 'fetch'})
                }
            })
        }
    },
    effects: {
        *fetch({payload}, {call, put}) {
            console.log("fetch")
            yield put({type: 'save', payload: {
                list: [
                    {id: 1, name: "张三", email:"1@qq.com" , gender:1},
                    {id: 2, name: "李四", email:"2@qq.com" , gender:0},
                    {id: 3, name: "王五", email:"3@qq.com" , gender:1}
                ]
            }
            }); // actionCreate
        }
    },
    reducers: {
        save(state, action) {
            console.log("save", state, action)
            return {
                ...state, ...action.payload
            }
        }
    }
}

export default UserModel;
