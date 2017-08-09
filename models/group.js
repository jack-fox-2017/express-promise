class Group{
    findAll(conn){
      return new Promise((resolve, reject) => {
        conn.all(`select * from CG`, (err, dataCG) => {
          this.manipulasi(conn, dataCG, (data) => {
            this.manipulasiAll(conn, data, (allData) =>{
              this.finalManipulate(allData, (finalData) => {
                if(!err){
                  resolve(finalData)
                } else {
                  reject(err)
                }
              })
            })
          })
        })
      })
    }

    static createData(conn, body){
      conn.run(`INSERT INTO Grup (name) VALUES ('${body.name}')`);
    }

    static findById(conn, params){
      return new Promise((resolve, reject) => {
        conn.all(`select * from Grup where id='${params.id}'`, (err, data) => {
          if(!err){
            resolve(data)
          } else {
            reject(err)
          }
        })
      });
    }

    static updateData(conn, params, body){
      conn.run(`UPDATE Grup set name='${body.name}' where id=${params.id}`)
    }

    static destroyData(conn, params){
      conn.run(`delete from Grup where id=${params.id}`)
    }

    manipulasi(conn, dataCG, callback) {
      let count = 0
      dataCG.forEach(row => {
        conn.all(`select * from Contact WHERE id=${row.ContactId}`, (err, getData) => {
          // console.log(getData);
          row['contact_name'] = getData[0].name
          row['company'] = getData[0].company

          count++
          if(count == dataCG.length){
            callback(dataCG)
          }
        })
      })
    }

    manipulasiAll(conn, data, callback) {
      let count = 0
      data.forEach(row => {
        conn.all(`select * from Grup where id=${row.GrupId}`, (err, result) => {
          // console.log(result);
          row['group_name'] = result[0].name

          count++
          if(count == data.length){
            callback(data)
          }
        })
      })
    }

    finalManipulate(allData, callback){
      let count = 0
      let result = []
      let dataObj = {}
      let nameArr = []
      for(let i = 0; i < allData.length; i++){
        if(i == 0){
          nameArr.push(allData[i].contact_name)
          dataObj['GrupId'] = allData[i].GrupId;
          dataObj['group_name'] = allData[i].group_name
          dataObj['contact_name'] = nameArr
        } else {
            if(allData[i].GrupId === dataObj.GrupId){
              nameArr.push(allData[i].contact_name)
            } else {
              result.push(dataObj);
              dataObj = {}
              nameArr = []
              nameArr.push(allData[i].contact_name)
              dataObj['GrupId'] = allData[i].GrupId;
              dataObj['group_name'] = allData[i].group_name
              dataObj['contact_name'] = nameArr
            }
        }
      }
      result.push(dataObj)
      // console.log(result);
      callback(result);
    }

    static createAssign(conn, body, params){
      conn.run(`INSERT INTO CG (ContactId, GrupId) VALUES (${body.ContactId}, ${params.id})`)
    }

}

module.exports = Group;
