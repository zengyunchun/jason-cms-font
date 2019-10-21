import React from 'react'
import {Layout} from 'antd';
import logo from '@/assets/vango.png';
import styles from './index.css';

const AdminHeader: React.FC = props => {
    return (
        <Layout.Header>
            <img src={logo} alt="" className={styles.logo} ></img>
            <span className={styles.welcome} >welcome, jason</span>
        </Layout.Header>
    )
}

export default AdminHeader;
