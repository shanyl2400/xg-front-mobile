import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { listStudentAPI } from '../api/api';

const pageSize = 10;

async function fetchStudent(page, pageSize) {
    const rawRes = await listStudentAPI(page, pageSize);;
    const rawStudents = rawRes.result.students;
    let students = {
        total: rawRes.result.total,
        data: []
    };
    for (let i = 0; i < rawStudents.length; i++) {
        students.data.push({
            id: rawStudents[i].id,
            author: rawStudents[i].author,
            gender: rawStudents[i].gender,
            email: rawStudents[i].email,
            student_name: rawStudents[i].name,
            address: rawStudents[i].address + rawStudents[i].address_ext,
            telephone: rawStudents[i].telephone,
            intent_subject: rawStudents[i].intent_subject,
            status: rawStudents[i].status,
            author: rawStudents[i].authorName
        })
    }
    return students
}

let pageIndex = 1;
function List() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await fetchStudent(1, pageSize)
            setStudents(res.data);
        }
        fetchData();
    }, []);

    let handleUpdateStudents = async () =>{
        pageIndex ++;
        let res = await fetchStudent(pageIndex, pageSize);
        let result = students.concat(res.data);
        setStudents(result);
    }
    return (
        <div style={{ textAlign: "left" }}>
            {students.map((data) => (
                <Card id={data.id} style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }} variant="outlined">
                    <CardContent style={{ paddingBottom: 10 }}>
                        <Typography variant="body2" gutterBottom style={{ margin: "20px 5px" }}>
                            姓名：{data.student_name}
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ margin: "20px 5px" }}>
                            性别：{data.gender ? "男" : "女"}
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ margin: "20px 5px" }}>
                            居住地址：{data.address}
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ margin: "20px 5px" }}>
                            联系电话：{data.telephone}
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ margin: "20px 5px" }}>
                            电子邮件：{data.email}
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ margin: "20px 5px" }}>
                            报名意向：<ul>
                                {data.intent_subject.map((li) => (
                                    <li>{li}</li>
                                ))}
                            </ul>

                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ margin: "20px 5px" }}>
                            备注：{data.note}
                        </Typography>
                        {/* <Typography variant="body2" gutterBottom style={{margin:"20px 5px"}}>
                            状态：{data.status}
                        </Typography> */}
                    </CardContent>
                </Card>
            ))
            }
            <div style={{ textAlign: "center" }}>
                <Button onClick={handleUpdateStudents} color="secondary">查看更多</Button>
            </div>
        </div>
    );
}

export default List;
