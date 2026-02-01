import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div>
            Home Layout
            <Outlet />
        </div>
    );
}

export default HomeLayout;
