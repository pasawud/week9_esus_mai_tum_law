const { rejects } = require('assert');
const { Console } = require('console');
const fs = require('fs');
const http = require('http');
const { resolve,parse } = require('path');

const hostname = 'localhost';
const port = 3000;


const server = http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type' : 'text/html'});
    readMsg().then(editJson).then(writeMsg).then((out) => {
        var parseData = JSON.parse(out);
        var strData = JSON.stringify(parseData, null,"<br>");
        res.write(strData);
        res.end();
    });
    //ทำการเรียกใช้ promise ในนี้นะ
    //แสดงผลของ json ใหม่ที่เพิ่มจำนวนเสื้อผ้าไปแล้วบน browser
    //ผล json ที่ได้บน browser จะไม่สวย ดังนั้นเราสามารถแก้ได้โดยกำหนด argument ใน JSON.stringify()
    // จะได้ JSON.stringify(<ชื่อตัวแปร JS object>, null, " ")  โดย json string ที่ได้จะมี การเว้นวรรคและบรรทัด


});

let readMsg = () => {
    // อ่านไฟล์ cloth1.json
    console.log("read");
    return new Promise((resolve, rejects) => {
        fs.readFile('cloth1.json', 'utf-8', (err, data) => {
            if (err)
                rejects(err);
            else {
                console.log(data);
                resolve(data);
            }
        });
    })

}

// จำนวนเสื้อผ้าตามที่กำหนด
let editJson = (data) => {
    const stock = {
        item1: 2,
        item2: 3,
        item3: 5,
        item4: 2,
        item5: 5,
        item6: 8,
        item7: 1,
        item8: 9,
        item9: 0
    }
    var keystock = Object.keys(stock);
    var parseData = JSON.parse(data);
    var keysData = Object.keys(parseData);
    return new Promise((resolve,rejects)=>{
        fs.writeFile('new_cloth.json',data,(err)=>{
            if(err)
            {
                rejects(err);
            }
            else{
                for(var i = 0; i<keysData.length;i++){
                    parseData[keysData[i]]['n_stock'] = stock[keystock[i].toString()];
                }
                newData = JSON.stringify(parseData,null," ");
                resolve(newData);
            }
        });
    })

}

let writeMsg = (data) =>{
    //ทำการเขียนไฟล์ใหม่ขึ้นมา

    return new Promise((resolve,rejects) => {

        fs.writeFile('new_cloth.json',data,(err)=>{
            if(err)
            rejects(err);
            else
            outputdata = data;
            console.log(outputdata);
            resolve(data);

        });
    })

}

server.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/`);
});