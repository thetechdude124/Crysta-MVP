import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import * as Iocons from 'react-icons/io';
import { SideMenuData } from './SideMenuData';
import './SideMenu.css';
import { IconContext } from 'react-icons';
import CrystaLogo from './CrystaLogo.svg';

function SideMenu() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Link to="#" className = 'open-menu-arrow' class = "flex m-3 text-2xl flex hover:bg-green-200 rounded-md z-40 fixed">
                    <Iocons.IoIosArrowForward onClick ={showSidebar}/>
                </Link>
                {/* <div className = 'SideMenu' class = " z-50 fixed flex items-center bg-gray-50 shadow-md h-9 w-screen rounded-r-lg">

                </div> */}
            </IconContext.Provider>
            
            <nav className={sidebar ? "side-menu active" : 'side-menu'}>
                <ul className = 'side-menu-items' onClick = {showSidebar}>
                    <li className = "side-menu-toggle">
                        <Link to = "#" className = 'open-menu-arrow' class = "text-2xl -pl3 hover:bg-green-200 rounded-md">
                            <Iocons.IoIosArrowBack />
                        </Link> 
                    </li>
                    <div className = "crysta-logo" class = "ml-10 -mt-14 mb-5">
                        <img src = {CrystaLogo} alt = "CrystaLogo" class = "content-between"/>
                    </div>
                    {SideMenuData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName} class = "flex flex-col text-xl pl-3 pt-9 font-semibold hover:bg-green-200 rounded-lg -pt-5 pb-6 pl-20 pr-16">
                                <Link to = {item.path}> 
                                    <div class = "-ml-9 -mb-6">{item.icon}</div>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>    
            </nav>
        </>
    );
}

export default SideMenu;
