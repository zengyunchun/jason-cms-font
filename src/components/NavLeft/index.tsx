import React from 'react'
import { Menu, Icon } from 'antd';
import Link from "umi/link"
import styles from "./index.css";

const NavLeft: React.FC = props => {
    return (
        <Menu 
        className={styles.menus}
        defaultOpenKeys={['/admin/permission' ]}
         defaultSelectedKeys={["/admin/user"]} 
         mode="inline" 
         theme="dark">
            <Menu.SubMenu key='/admin/permission' title={<span><Icon type="lock"></Icon>权限管理</span>}>
                <Menu.Item key="/admin/user">
                    <Link to="/admin/user"><Icon type="user"/>用户管理</Link>
                </Menu.Item>
                <Menu.Item key="/admin/resource">
                    <Link to="/admin/resource"><Icon type="wallet"/>权限管理</Link>
                </Menu.Item>
                <Menu.Item key="/admin/role">
                    <Link to="/admin/role"><Icon type="solution"/>角色管理</Link>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    )
}

export default NavLeft;
