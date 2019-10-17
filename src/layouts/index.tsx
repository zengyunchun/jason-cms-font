import React from 'react';
import styles from './index.css';
import {  Layout, Slider } from "antd";
const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi! dd</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
