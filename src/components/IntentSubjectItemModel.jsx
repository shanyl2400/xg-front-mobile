import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function IntentSubjectItemModel(props) {
    const [subject, setSubject1] = useState("");
    const [subject2, setSubject2] = useState("");
    const [note, setNote] = useState("基础课");
    const [curSubject, setCurSubject] = useState({})

    const handleClose = () => {
        props.handleClose();
    };

    const handleSave = () => {
        if(subject == "" || subject2 == "") {
            return;
        }
        props.addIntentSubject({
            subject: subject,
            subject2: subject2,
            note: note
        })
        props.handleClose();
        setSubject1("")
        setSubject2("")
        setNote("")
    }

    const getSubjects2 = (name) => {
        for(let i = 0; i < props.subjects.length; i ++){
            if(props.subjects[i].name == name){
                setCurSubject(props.subjects[i])
            }
        }
    }

    return (
        <div>
            <Dialog open={props.visible} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">添加意向</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        为学生添加报名意向，请在学科和子学科栏目中选择学生希望报名的科目，并在补充栏目中填写补充内容，一个学生可以添加多个报名意向
                    </DialogContentText>
                    <div>
                        <FormControl style={{ marginTop: 20 }}>
                            <InputLabel htmlFor="grouped-select">学科</InputLabel>
                            <Select
                                value={subject}
                                onChange={(e) => { setSubject1(e.target.value);getSubjects2(e.target.value) }}
                                id="grouped-select"
                                style={{ minWidth: 140 }}>
                                {props.subjects.map(item=>(
                                    <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{ marginTop: 20 }}>
                            <InputLabel htmlFor="grouped-select">子学科</InputLabel>
                            <Select
                                id="grouped-select"
                                value={subject2}
                                onChange={(e) => { setSubject2(e.target.value) }}
                                style={{ minWidth: 140 }}>
                                    {curSubject.children != undefined && curSubject.children.map(item =>(
                                      <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </div>
                    <TextField
                        id="standard-basic"
                        label="补充"
                        value={note}
                        onChange={(e) => { setNote(e.target.value) }}
                        style={{ marginTop: 20 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
          </Button>
                    <Button onClick={handleSave} color="primary">
                        保存
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
