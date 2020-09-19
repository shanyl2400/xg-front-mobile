import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IntentSubjectItemModel from './IntentSubjectItemModel';
import {listSubjects} from '../api/api';
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

async function getSubjects() {
    let subjects = [];
    if (subjects.length < 1) {
      let rawSubjects = await listSubjects();
      for (let i = 0; i < rawSubjects.length; i++) {
        if (rawSubjects[i].level == 1) {
          subjects = subjects.concat({
            id: rawSubjects[i].id,
            parent_id: rawSubjects[i].parent_id,
            level: rawSubjects[i].level,
            name: rawSubjects[i].name,
            children: []
          })
        }
      }
  
      for (let i = 0; i < rawSubjects.length; i++) {
        if (rawSubjects[i].level == 2) {
          for (let j = 0; j < subjects.length; j++) {
            if (rawSubjects[i].parent_id == subjects[j].id) {
              subjects[j].children = subjects[j].children.concat({
                id: rawSubjects[i].id,
                parent_id: rawSubjects[i].parent_id,
                level: rawSubjects[i].level,
                name: rawSubjects[i].name,
              })
            }
          }
        }
      }
    }
    return subjects
  }

function IntentSubjectForm(props) {
    const classes = useStyles();
    const [showIntentModel, setShowIntentModel] = useState(false);
    const [subjects, setSubjects] = useState([])

    let handleAddIntentSubjectModel = e => {
        setShowIntentModel(true);
    }
    let handleCloseIntentSubject = () => {
        setShowIntentModel(false);
    }

    useEffect(() => {
        const fetchData = async () => {
          const sub = await getSubjects();
          console.log(sub);
          setSubjects(sub);
        }
        fetchData();
      }, [])

    return (
        <div>
            {props.intentSubjects.map((key) => (
                <Card id={key.id} className={classes.root} style={{ marginBottom: 10 }} variant="outlined">
                    <CardContent style={{ paddingBottom: 10 }}>
                        <Typography variant="h6" component="h2">
                            {key.subject} - {key.subject2}
                        </Typography>
                    
                        <Typography variant="body2" component="p">
                            {key.note}
                        </Typography>
                        <Button size="small" color="secondary" onClick={()=>props.removeIntentSubject(key.id)}>删除</Button>
                    </CardContent>
                </Card>
            ))
            }

            <div style={{ marginTop: 10 }}>
                <Button size="small" onClick={handleAddIntentSubjectModel} >添加意向</Button>
            </div>
            <div>
                <IntentSubjectItemModel
                    visible={showIntentModel}
                    handleClose={handleCloseIntentSubject}
                    addIntentSubject={props.addIntentSubject}
                    subjects = {subjects}
                />
            </div>
        </div>
    );
}

export default IntentSubjectForm;
