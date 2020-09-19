import React, { useState,useEffect } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';

import Create from './Create';
import List from './List';
import User from './User';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

function Main() {

    const classes = useStyles();
    const [value, setValue] = useState('add')
    let appDiv;

    let main = <Create />
    if(value == "list"){
        main = <List />
    }else if (value == "user"){
        main = <User />
    }
    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Typography variant="h6" className={classes.title}>
                    学果网-销售系统
                </Typography>
            </AppBar>
            {main}
            <div style={{height:50}}></div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                style={{ width: "100%", position: "fixed", bottom: 0 }}
            >
                <BottomNavigationAction value="add" label="添加报名" icon={<PersonAddIcon />} />
                <BottomNavigationAction value="list" label="学员名单" icon={<GroupIcon />} />
                <BottomNavigationAction value="user" label="个人中心" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </div>
    );
}

export default Main;
