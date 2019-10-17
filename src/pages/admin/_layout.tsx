import React from 'react';
import {Layout} from 'antd';
import AdminHeader from '@/components/AdminHeader';
const {Header, Sider, Content, Footer} = Layout;


const AdminLayout : React.FC = props => {
  return (
    <Layout>
       <AdminHeader></AdminHeader>
       <Layout>
           <Sider>
             左边菜单树
           </Sider>
           <Content>
             没用吗
             {props.children}
           </Content>
         </Layout>
    </Layout>
  );
}

export default AdminLayout;
