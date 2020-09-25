import React, { useState } from 'react';
import logo from '../logo.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { loginAPI } from '../api/api';
import axios from "axios"; //导入axios
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function saveSideInfo(name, res) {
    // sessionStorage.setItem("user_id", res.data.user_id);
    sessionStorage.setItem("user_name", name);
    // sessionStorage.setItem("role_id", res.data.role_id);
    // sessionStorage.setItem("org_id", res.data.org_id);
    sessionStorage.setItem("role_name", res.data.role_name);
    sessionStorage.setItem("org_name", res.data.org_name);
    let auths = ""
    for(let i = 0; i < res.data.auths.length; i ++){
        auths = auths + res.data.auths[i].name + ", ";
    }
    sessionStorage.setItem("auths", auths);
}
function Login(props) {
    const [loginInfo, setLoginInfo] = useState({
        name: "",
        password: "",
    })
    const [errMsg, setErrMsg] = React.useState("");
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrMsg("");
    };
    let handleUpdateLoginInfo = (field, data) => {
        if (field == "name") {
            setLoginInfo({
                name: data,
                password: loginInfo.password
            })
        } else {
            setLoginInfo({
                name: loginInfo.name,
                password: data
            })
        }
    }

    let handleLogin = async e => {
        if (loginInfo.name == "" || loginInfo.password == "") {
            setErrMsg("用户名和密码不能为空");
            return;
        }
        let res = await loginAPI(loginInfo.name, loginInfo.password);
        if (res == null) {
            setErrMsg("用户名或密码错误");
            return;
        }
        sessionStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] = sessionStorage.getItem("token");
        let flag = false
        for(let i = 0; i < res.data.auths.length; i ++){
            if(res.data.auths[i].name == "录单权"){
                flag =true
            }
        }
        if(!flag){
            setErrMsg("该账号无登录手机端权限");
            return;
        }

        saveSideInfo(loginInfo.name, res);
        props.login();
    }
    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errMsg != ""} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errMsg}
                </Alert>
            </Snackbar>
            <div>
                <img src={logo} style={{ width: "60%", marginTop: 40 }} />
            </div>
            <p>
                <TextField id="name" value={loginInfo.name} onChange={(e) => handleUpdateLoginInfo("name", e.target.value)} label="用户名" />
            </p>
            <p>
                <TextField type="password" id="password" value={loginInfo.password} onChange={(e) => handleUpdateLoginInfo("password", e.target.value)} label="密码" />
            </p>
            <p>
                <Button onClick={handleLogin} variant="contained" color="primary">登录</Button>
            </p>
        </div>
    );
}

export default Login;
