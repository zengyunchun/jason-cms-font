import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import * as service from "@/services/user"


// User模型的定义
export interface UserModel {
    id?: number,
    username?: String,
    password?: String,
    email?: String,
    phone?: String,
    gender?: Number,
    birthday?: Date,
    address?: String
}


export interface ListModel {
    id: number,
    name?: String,
    email?: String,
    gender: Number,
}


// User模型状态的定义, 用于reducer
export interface UserModelState {
    currentUser?: UserModel,
    list?: Array<ListModel>,
    editVisible?: boolean,
    record: UserModel,
    selectedRowKeys: Array<string> ,
    selectedRows? : ListModel
}

export interface UserListModelState {
    list?: Array<UserModel>
}

// dva的Model的定义
export interface UserModelType {
    namespace: "user",
    state: UserModelState,
    effects: {
        fetch: Effect,
        store: Effect,
        del: Effect,
        delAll: Effect
    },
    subscriptions: { setup: Subscription };
    reducers: {
        save: Reducer<UserModelState>
    }
}

const UserModel: UserModelType = {
    namespace: "user",
    state: {
        currentUser: {},
        list: [],
        editVisible: false,
        record: {
            gender:1
        },
        selectedRowKeys: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            // 订阅开始切换路径的时候派发一个动作
            history.listen(({ pathname }) => {
                console.log("history.listen");
                if (pathname == "/admin/user") {
                    dispatch({ type: 'fetch' })
                }
            })
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            let list = yield call(service.queryList); // 发送请求用call
            console.log("fetch", list);
            yield put({ // 触发reducers用put
                type: 'save', payload: { list }

                // yield put({type: 'save', payload: {
                //     list: [
                //         {id: 1, name: "张三", email:"1@qq.com" , gender:1},
                //         {id: 2, name: "李四", email:"2@qq.com" , gender:0},
                //         {id: 3, name: "王五", email:"3@qq.com" , gender:1}
                //     ]
                // }
            }); // actionCreate
        },
        *store({ payload }, { call, put }) {
            yield call(payload.id ? service.update: service.add, payload); // 增加用户 
            yield put({ type: "fetch" }); // 重复派发请求，获取最新数据
            yield put({ type: "save", payload: { editVisible: false } })
        },

        *del({ payload }, { call, put }) {
            yield call(service.del, payload); // 增加用户 
            yield put({ type: "fetch" }); // 重复派发请求，获取最新数据
        },
        *delAll({ payload }, { call, put }) {
            yield call(service.delAll, payload); // 增加用户 
            yield put({ type: "fetch" }); // 重复派发请求，获取最新数据
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
