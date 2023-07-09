import React from 'react'
import { Layout } from "antd";
import Maps from '../components/GoogleMap/Maps';


const Homepage = () => {
    return (
        <Layout style={{ width: '100vw', height: '100vh' }}>
            <Maps />
        </Layout>
    );
};

export default Homepage;