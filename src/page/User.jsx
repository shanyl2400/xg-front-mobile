import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UpdatePasswordModel from '../components/UpdatePasswordModel';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

function User() {
    const classes = useStyles();

    const [userInfo, setUserInfo] = useState({
        "name": sessionStorage.getItem("user_name"),
        "role": sessionStorage.getItem("role_name")
    })

    let handleSignOut = e => {
        sessionStorage.removeItem("token");
        window.location.reload();
    }

    const [showUpdatePasswordModel, setShowUpdatePasswordModel] = useState(false)
    return (
        <div >
            <Card style={{ paddingBottom: 10, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }} variant="outlined">
                <CardContent style={{ paddingBottom: 10 }}>
                    <Avatar style={{ float: "left" }} className={classes.large}>OP</Avatar>
                    <div style={{ float: "left", marginLeft: 20, marginTop: 10 }}>
                        <Typography variant="h6" gutterBottom style={{ margin: "20px 5px" }}>
                            {userInfo.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ margin: "20px 5px" }}>
                            {userInfo.role}
                        </Typography>
                    </div>
                    <div style={{ clear: "both" }}></div>

                </CardContent>
            </Card>
                <div style={{ textAligh:"center", paddingBottom: 10, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
                <Button onClick={()=>{setShowUpdatePasswordModel(true)}} size="large" variant="contained">修改密码</Button>
                </div>
                <div style={{ textAligh:"center", paddingBottom: 10, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
               <Button onClick={handleSignOut} size="large" variant="contained" color="primary">
                    注销
                </Button>
                </div>
                <UpdatePasswordModel 
                    visible={showUpdatePasswordModel}
                    handleClose={()=>{
                        setShowUpdatePasswordModel(false);
                    }}
                />
        </div>
    );
}

export default User;
