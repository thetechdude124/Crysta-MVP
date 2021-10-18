import React from 'react';
import * as Io5cons from 'react-icons/io5';
import * as BsIcons from 'react-icons/bs';
import * as BIcons from 'react-icons/bi';


export const SideMenuData = [
    {
        title: 'CALENDAR',
        path: '/pages/Calendar',
        icon: <BsIcons.BsCalendar/>, 
        cName: 'side-menu-text'
    },
    {
        title: 'TASKS',
        path: '/pages/Tasks',
        icon: <Io5cons.IoCheckmarkSharp/>,
        cName: 'side-menu-text'
    },
    {
        title: 'ENERGY',
        path: '/pages/Energy',
        icon: <BsIcons.BsGraphUp/>, 
        cName: 'side-menu-text'
    },
    {
        title: 'LOG OUT',
        path: '/pages/Logout',
        icon: <BIcons.BiExit/>, 
        cName: 'side-menu-text'
    }
]