import React from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<any>>;
};
const DrawerList = ({ setOpen }: Props) => {
    const [selectedItem, setSelectedItem] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        switch (window.location.pathname) {
            case "/":
                setSelectedItem(0)
                break;
            case "/urls":
                setSelectedItem(1)
                break;
            default:
                // setSelectedItem(0)
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname])
    
    const lists = [
        {
            text: 'Home',
            icon: <HomeIcon/>,
            onclick: () => navigate('/')
        },
        {
            text: 'All Links',
            icon: <LinkIcon />,
            onclick: () => navigate('/urls')
        }
    ]
    return (
        <>
            <List sx={{
                // selected and (selected + hover) states
                '&& .Mui-selected, && .Mui-selected:hover': {
                    bgcolor: '#1f2936',
                    '&, & .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                    },
                },
                // hover states
                '& .MuiListItemButton-root:hover': {
                    bgcolor: '#1f2936',
                    '&, & .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                    },
                },
            }}>
                {lists.map(({ text, icon, onclick }, index) => (
                    <ListItem key={text} disablePadding selected={selectedItem === index}>
                        <ListItemButton
                            onClick={() => { onclick(); setSelectedItem(index); setOpen && setOpen(false) }}
                        >
                            <ListItemIcon sx={{ color: 'white' }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default DrawerList;