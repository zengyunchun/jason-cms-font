import React from 'react';
import {Card, Table, Button} from 'antd';


interface rowProps {
    val: Number,
    reacord:Object
}

const User : React.FC = (props) => {

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

    return (
        <div>
            <Card>
                <Table  
                columns={columns}
                dataSource={dataSource}
                rowKey={record => record.id.toString()}>

                </Table>
            </Card>
        </div>
    );
}

export default User;
