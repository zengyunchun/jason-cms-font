import React from 'react';
import {Card, Table, Button} from 'antd';
import { connect } from 'dva';
import {ConnectState} from '@/models/connect';
import {UserModel, UserModelState, UserListModelState} from '@/models/user';

interface UserProps {
    list?: Array<UserModel>
}

// 改用这种写法
// @connect(({user} : ConnectState) => ({
//     list: user.list
// }))
class User extends React.Component<UserProps> {
    render() {
        let columns = [
            {
                title: "姓名",
                dataIndex: "name",

            },
            {
                title: "邮箱",
                dataIndex: "email",

            },
            {
                title: "性别",
                dataIndex: "gender",
                render: (val: Number, record: Object) => {
                    console.log(record);
                    return val === 1 ? "男": "女"
                }
            },
            {
                title: "操作",
                render: () => {
                    return (
                        <React.Fragment>
                        <Button type="primary">编辑</Button>
                        <Button type="danger">删除</Button>
                        </React.Fragment>
                    )
                },

            },
        ];

        const dataSource = [
            {id: 1, name: "张三", email:"1@qq.com" , gender:1},
            {id: 2, name: "李四", email:"2@qq.com" , gender:0},
            {id: 3, name: "王五", email:"3@qq.com" , gender:1}
        ]
        console.log("user render",this.props);
        const {list}  = this.props;

        return (
            <div>
                <Card>
                    <Table
                    columns={columns}
                    dataSource={list}>
                    </Table>
                </Card>
            </div>
        );
    }

}

//export default User;

// 改用这种写法
export default connect(({user} : ConnectState) => ({
    list: user.list // 注意这里是组件的属性定义
}))(User);





// 目前好像FC写法不能用这种装饰器模式的写法
// @connect(({user}: ConnectState) => ({
//     user: user
// }))
// const User : React.FC = (props) => {

//     let columns = [
//         {
//             title: "姓名",
//             dataIndex: "name",

//         },
//         {
//             title: "邮箱",
//             dataIndex: "email",

//         },
//         {
//             title: "性别",
//             dataIndex: "gender",
//             render: (val: Number, record: Object) => {
//                 console.log(record);
//                 return val === 1 ? "男": "女"
//             }
//         },
//         {
//             title: "操作",
//             render: () => {
//                 return (
//                     <React.Fragment>
//                     <Button type="primary">编辑</Button>
//                     <Button type="danger">删除</Button>
//                     </React.Fragment>
//                 )
//             },

//         },
//     ];

//     const dataSource = [
//         {id: 1, name: "张三", email:"1@qq.com" , gender:1},
//         {id: 2, name: "李四", email:"2@qq.com" , gender:0},
//         {id: 3, name: "王五", email:"3@qq.com" , gender:1}
//     ]

//     const list  = props.name;

//     return (
//         <div>
//             <Card>
//                 <Table
//                 columns={columns}
//                 dataSource={dataSource}
//                 rowKey={record => record.id.toString()}>
//                 </Table>
//             </Card>
//         </div>
//     );
// }


// // 改用这种写法
// export default connect(({user} : ConnectState) => ({
//     ...user
// }))(User);
