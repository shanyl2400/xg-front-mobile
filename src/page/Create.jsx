import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IntentSubjectForm from '../components/IntentSubjectForm';
import Button from '@material-ui/core/Button';
import { listOrderSourcesAPI, createStudentAPI } from '../api/api';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import options from '../components/address';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    field: {
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

let index = 0;
function Create() {
    const classes = useStyles();
    const [orderSourceItems, setOrderSourceItems] = useState([]);
    const [gender, setGender] = useState(true);
    const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [addrCity, setAddrCity] = useState({ name: "", label: "", children: null });
    const [addrRegion, setAddrRegion] = useState("");
    const [orderSource, setOrderSource] = useState("");
    const [note, setNote] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [intentSubjects, setIntentSubjects] = useState([]);

    let addIntentSubject = data => {
        index++;
        let x = intentSubjects.concat({
            id: index,
            subject: data.subject,
            subject2: data.subject2,
            note: data.note
        });
        setIntentSubjects(x);
    }

    let removeIntentSubject = id => {
        let x = [];
        for (let i = 0; i < intentSubjects.length; i++) {
            if (intentSubjects[i].id == id) {
                continue;
            }
            x.push(intentSubjects[i]);
        }
        setIntentSubjects(x);
    }
    let handleChangeCity = e => {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value == e.target.value) {
                setAddrCity(options[i]);
            }
        }
    }

    let resetFormData = () => {
        setGender(true);
        setName("");
        setTelephone("");
        setEmail("");
        setAddrCity({ name: "", label: "", children: null });
        setAddrRegion("");
        setOrderSource("");
        setNote("");
        setIntentSubjects([]);
    }
    let checkFormData = () => {
        if (name == "") {
            setErrMsg("学生姓名不能为空");
            return false;
        }
        if (telephone == "") {
            setErrMsg("学生电话不能为空");
            return false;
        }
        if (addrCity == null || addrCity.name == "") {
            setErrMsg("居住城市不能为空");
            return false;
        }
        if (addrRegion == "") {
            setErrMsg("居住地区不能为空");
            return false;
        }
        if (orderSource == "") {
            setErrMsg("订单来源不能为空");
            return false;
        }
        if (intentSubjects.length < 1) {
            setErrMsg("报名意向不能为空");
            return false;
        }
        return true
    }
    let handleSave = async e => {
        let noErr = checkFormData();
        if (!noErr) {
            return;
        }
        let address = addrCity.name + addrRegion;
        let intentSubjectData = [];
        for (let i = 0; i < intentSubjects.length; i++) {
            intentSubjectData.push(intentSubjects[i].subject + "-" + intentSubjects[i].subject2 + "-" + intentSubjects[i].note)
        }
        let res = await createStudentAPI({
            "name": name,
            "gender": gender,
            "telephone": telephone,
            "email": email,
            "address": address,
            "intent_subject": intentSubjectData,
            "note": note,
            "order_source_id": orderSource
        });
        if (res.err_msg == "success") {
            switch (res.result.status) {
                case 1:
                    //status 1 创建成功
                    setSuccessMsg('创建成功');
                    break;
                case 2:
                    //status 2 挑战失败
                    setErrMsg('创建成功，挑战失败');
                    break;
                case 3:
                    //status 3 挑战成功
                    setSuccessMsg('创建成功，挑战成功');
                    break;
                default:
                    setErrMsg('创建失败，未知状态');
            }

        } else {
            console.log(res);
            //创建失败
            setErrMsg('创建失败:' + res.err_msg);
        }
        resetFormData();
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrMsg("");
    };
    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMsg("");
    };

    useEffect(() => {
        const fetchData = async () => {
            const orderSources = await listOrderSourcesAPI();
            if (orderSources.err_msg != "success") {
                setErrMsg("获取订单来源失败，" + orderSources.err_msg);
            }
            setOrderSourceItems(orderSources.sources);
        }
        fetchData();
    }, [])

    return (
        <div className={classes.root} style={{ marginTop: 20, overflow: "auto" }}>
            <TextField value={name} onChange={(e) => { setName(e.target.value) }} className={classes.field} id="standard-basic" label="姓名" />
            <div>
                <FormControl className={classes.field} component="fieldset">
                    <RadioGroup row aria-label="gender" name="gender" label="性别" value={gender} onChange={(e) => setGender(e.target.value == "true")}>
                        <FormControlLabel value={true} control={<Radio />} label="男" />
                        <FormControlLabel value={false} control={<Radio />} label="女 " />
                    </RadioGroup>
                </FormControl>
            </div>

            <TextField value={telephone} onChange={(e) => { setTelephone(e.target.value) }} className={classes.field} id="standard-basic" label="手机号" />
            <TextField value={email} onChange={(e) => { setEmail(e.target.value) }} className={classes.field} id="standard-basic" label="电子邮箱" />
            <div className={classes.field}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-select">城市</InputLabel>
                    <Select id="grouped-select"
                        value={addrCity.value}
                        onChange={e => handleChangeCity(e)}>
                        {options.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.value}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-select">地区</InputLabel>
                    <Select
                        id="grouped-select"
                        value={addrRegion}
                        onChange={e => { setAddrRegion(e.target.value) }}>
                        {addrCity.children != null && addrCity.children.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className={classes.field}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-select">订单来源</InputLabel>
                    <Select id="grouped-select"
                        value={orderSource}
                        onChange={e => { setOrderSource(e.target.value) }}>
                        {orderSourceItems != null && orderSourceItems.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <IntentSubjectForm
                    intentSubjects={intentSubjects}
                    addIntentSubject={addIntentSubject}
                    removeIntentSubject={removeIntentSubject}
                />
            </div>

            <TextField
                className={classes.field}
                id="outlined-multiline-static"
                label="备注"
                value={note}
                onChange={e => setNote(e.target.value)}
                multiline
                rows={6}
                variant="outlined"
            />

            <p>
                <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
            </p>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errMsg != ""} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errMsg}
                </Alert>
            </Snackbar>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={successMsg != ""} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success">
                    {successMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Create;
