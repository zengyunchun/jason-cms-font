import React, { Component } from 'react';
import { Card, Table, Button, Modal, Form, Input, Radio, message, Popconfirm } from 'antd';
import { connect } from 'dva';
import { ConnectState, ConnectProps } from '@/models/connect';
import { ListModel, UserModel } from '@/models/user';
import { FormComponentProps } from 'antd/lib/form';

interface UserPropsType extends ConnectProps {
    list?: Array<ListModel>,
    editVisible?: boolean,
    record: UserModel,
    selectedRowKeys:  Array<string>,
    selectedRows ?: ListModel
}
// 改用这种写法
// @connect(({user} : ConnectState) => ({
//     list: user.list
// }))
class User extends Component<UserPropsType> {

    save = (payload: object): void => {
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch({
                type: "user/save",
                payload
            })
        }
    }

    handleAdd = () => {
        this.save({
            editVisible: true, // 显示弹窗
            record: { // 重置记录
                gender: 1
            }
        })
    }

    // 更新和新增的保存
    handleStore = () => {
        this.editForm.props.form.validateFields((err: any, values: any) => {
            if (err) { // 验证错误
                message.warn("你输入的表单数据不合法")
            } else { // 验证正确
                const { dispatch } = this.props;
                if (dispatch) { // 派发请求
                    dispatch({
                        type: "user/store",
                        payload: values
                    })
                }
            }
        });
    }


    handleEdit = (record: UserModel): void => {
        this.save({
            record: record,
            editVisible: true
        })
    }

    handleDele = (id: string | undefined) => {
        const { dispatch } = this.props;
        if (dispatch) { // 派发请求
            dispatch({
                type: "user/del",
                payload: id
            })
        }
    }

    handleDelAll = (selectedRowKeys:  Array<string>) => {
        const { dispatch } = this.props;
        if (dispatch) { // 派发请求
            dispatch({
                type: "user/delAll",
                payload: selectedRowKeys
            })
        }
    }

    editForm: FormComponentProps['wrappedComponentRef'] | undefined | null = undefined;
    render() {
        let columns = [
            {
                title: "姓名",
                dataIndex: "username",

            },
            {
                title: "邮箱",
                dataIndex: "email",

            },
            {
                title: "性别",
                dataIndex: "gender",
                render: (val: Number, record: Object) => {
                    return val === 1 ? "男" : "女"
                }
            },
            {
                title: "住址",
                dataIndex: "address",
            },
            {
                title: "操作",
                render: (record: UserModel) => {
                    return (
                        <React.Fragment>
                            <Button type="primary" onClick={() => this.handleEdit(record)}>编辑</Button>
                            <Popconfirm title="你确定删除吗？" okText="是" cancelText="否" onConfirm={() => this.handleDele((record.id ? record.id.toString(): undefined))} >
                                <Button type="danger">删除</Button>
                            </Popconfirm>
                        </React.Fragment>
                    )
                },
            },
        ];


        console.log("user render", this.props);
        let { list, editVisible, record, selectedRowKeys } = this.props;
        return (
            <div>
                <Card>
                    <Button type="primary" icon="plus-circle" onClick={this.handleAdd}>增加</Button>
                    <Button style={{ marginLeft: 8 }} type="primary" icon="delete" onClick={() => this.handleDelAll(selectedRowKeys)}>批量删除</Button>
                    <Table
                        columns={columns}
                        dataSource={list}
                        rowKey={item => item.id.toString()}
                        onRow={record => ({
                            onClick: () => {
                                let index = selectedRowKeys.indexOf(record.id.toString());
                                if (index == -1) { // 没有在选中列里面
                                    selectedRowKeys = [...selectedRowKeys, record.id.toString()]; // 解构重新赋值，这里必须是新数组
                                } else  { 
                                    selectedRowKeys = selectedRowKeys.filter(key => key != record.id.toString()); // 选中的就取消选中，这里也要是新数组
                                }
                                this.save({selectedRowKeys})
                            }
                        })}

                        rowSelection={{
                            type:"checkbox",
                            selectedRowKeys: selectedRowKeys|| [] ,
                            onChange: (selectedRowKeys, selectedRows) => { // 选中行的key和数据
                                this.save({
                                    selectedRowKeys,
                                    selectedRows
                                })
                            }
                        }}
                    >
                    </Table>
                </Card>
                <WrapEditModal
                    // 把弹出框的实例传递出来
                    record={record}
                    wrappedComponentRef={inst => this.editForm = inst}
                    visible={editVisible}
                    onOk={this.handleStore}
                    onCancel={() => this.save({ editVisible: false })} // 这里用闭包包一下
                ></WrapEditModal>
            </div>
        );
    }
}

interface EditModalPropType {
    visible?: boolean, // 显示与否的标识
    record: UserModel, // 记录
    // 用form.create包装时必须声明form属性, 才可以用form验证的东西
    form: FormComponentProps['form'], // 从定义类型中动态获取类型，获取表单实例
    onOk?: () => void, // ok回调
    onCancel?: () => void, // 取消回调
    wrappedComponentRef?: (inst: FormComponentProps["wrappedComponentRef"]) => void// 把当前组件的实例传递出去外部调用
}

// 模态弹出窗
class EditModal extends Component<EditModalPropType> {
    render() {
        let { visible, form: { getFieldDecorator }, onOk, onCancel, record } = this.props;
        console.log("record", record);
        return (
            <Modal
                title="增加用户"
                visible={visible}
                onOk={onOk}
                okText="确定"
                cancelText="取消"
                onCancel={onCancel}>
                <Form>
                    <Form.Item >
                        {
                            getFieldDecorator("id", { // 隐藏一个id
                                initialValue: record.id,
                            })(<Input type="hidden" />)
                        }
                    </Form.Item>
                    <Form.Item label="用户名">
                        {
                            getFieldDecorator("username", {
                                initialValue: record.username,
                                rules: [ // 校验规则
                                    {
                                        required: true,
                                        message: "输入用户名",
                                    }
                                ]
                            })(<Input placeholder="用户名" />)
                        }
                    </Form.Item>
                    <Form.Item label="邮箱">
                        {
                            getFieldDecorator("email", {
                                initialValue: record.email,
                                rules: [ // 校验规则
                                    {
                                        required: true,
                                        message: "输入邮箱",
                                    },
                                    {
                                        type: "email",
                                        message: "请输入合法的邮箱地址"
                                    }
                                ]
                            })(<Input placeholder="邮箱" />)
                        }
                    </Form.Item>
                    <Form.Item label="地址">
                        {
                            getFieldDecorator("address", {
                                initialValue: record.address,

                                rules: [ // 校验规则
                                    {
                                        required: true,
                                        message: "输入地址",
                                    },
                                ]
                            })(<Input placeholder="地址" />)
                        }
                    </Form.Item>
                    <Form.Item label="性别">
                        {
                            getFieldDecorator("gender", {
                                initialValue: record.gender,
                                rules: [ // 校验规则
                                    {
                                        required: true,
                                        message: "请选择性别",
                                    }
                                ]
                            })(
                                <Radio.Group>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

// 包装组件和属性，在组件内部可以获取form验证的方法等, 外面使用包装后的组件
let WrapEditModal = Form.create<EditModalPropType>()(EditModal);

//export default User;

// 改用这种写法
// 一定要连接过来才可以更新呢
export default connect(({ user }: ConnectState) => ({
    list: user.list, // 注意这里是组件的属性定义,
    editVisible: user.editVisible,
    record: user.record,
    selectedRowKeys: user.selectedRowKeys ,
    selectedRows : user.selectedRows
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
