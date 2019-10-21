import React from 'react';
import { Layout } from 'antd';
import AdminHeader from '@/components/AdminHeader';
const { Header, Sider, Content, Footer } = Layout;
import NavLeft from '@/components/NavLeft';

const AdminLayout: React.FC = props => {
  return (
    <Layout>
      <AdminHeader></AdminHeader>
      <Layout>
        <Sider>
          <NavLeft></NavLeft>
        </Sider>
        <Content>
          {props.children}
        </Content>
      </Layout>
      <Footer style={{textAlign:"center"}}>
         Jason Zeng CMS @ 2018
      </Footer>
    </Layout>
  );
}

export default AdminLayout;
