import React from 'react';
import Link from 'next/link'

import { Paper, Button, IconButton, Avatar } from '@material-ui/core';
import { 
    SearchOutlined as SearchIcon, 
    CreateOutlined as PenIcon, 
    SmsOutlined as MessageIcon, 
    NotificationsOutlined as NotificationsIcon,
    Menu as MenuIcon,
    ExpandMoreOutlined as DownArrow
} from '@material-ui/icons';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
    return (
        <Paper classes={{ root: styles.root }} elevation={0}>
            <div className="d-flex align-center">
                <IconButton> 
                    <MenuIcon />
                </IconButton>

                <Link href="/"> 
                    <a>
                        <svg className={styles.logo} viewBox="0 0 24 25">
                            <path fill="#e8a427" d="M0 19h8.5v6H0v-6z"></path>
                            <path d="M0 7h8.5v18l6.5-6V7h9V0H0v7z"></path>
                            <path fill="rgba(0,0,0,0.15)" d="M7.5 19h1v6l-1-6z"></path>
                        </svg>
                    </a>
                </Link>

                <div className={styles.searchBlock}>
                    <SearchIcon />
                    <input placeholder="Search" />  
                </div>
                <Link href="/">
                    <a>
                        <Button variant="contained" className={styles.penButton}> 
                            Новая запись 
                        </Button>
                    </a>
                </Link>
            </div>

            <div className="d-flex align-center">
                <IconButton> 
                    <MessageIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>

                <Link href="profile/elchin">
                    <a className="d-flex align-center">
                        <Avatar
                            className={styles.avatar} 
                            alt="Elchin Gurbanli" 
                            src="https://leonardo.osnova.io/2f2c0f94-15f5-5811-b5b1-557c6d94f41c/-/scale_crop/108x108/-/format/webp/" 
                        />
                        <DownArrow />
                    </a>
                </Link>
            </div>
        </Paper>
    )
}

export default Header;