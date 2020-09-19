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

export default function UpdatePasswordModel(props) {

    const handleClose = () => {
        props.handleClose();
    };

    return (
        <div>
            <Dialog open={props.visible} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        暂不支持手机端修改密码，请在网页端修改密码
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        确定
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
