let token="https://"
async function execute() {

    if(token.substr(0,8)==="https://"){
        token=prompt("Replace this URL with the read/write token from data.world.  To find the token, log in to your account at data.workld then go to the URL below and ", "https://data.world/settings/advanced");
    }
    if(token.substr(0,8)==="https://" || token===""){return}

    const editor = ace.edit("editor")
    const options = {
        'authorization': 'Bearer ' + token,
      };
    const query=encodeURIComponent(editor.getSession().getValue())  

        let response = await fetch('https://api.data.world/v0/sql/hudsonu/store?includeTableSchema=true&query=' + query,{
            headers: options
        });
        let data = await response.text();
       //console.log(data);
        const result=document.getElementById("result-wrapper")
        try{
            let json =JSON.parse(data)
           //console.log(json);
            const table=["<table><thead><tr>"]
            const headers=json.shift().fields
           //console.log("headers",headers)
            const columns = []

            for(let x=0; x<headers.length;x++){
                //console.log("====")
                //console.log(headers[x])
                columns.push(headers[x].name)
                
                table.push("<th>"+headers[x].name+"</th>")
            }
            table.push("</tr></thead><tbody>")

           //console.log("columns",columns)
            for(const row of json){
               //console.log("====")
               //console.log(row)
                const tr=["<tr>"]
                for(col of columns){
                    if(row[col]){
                        tr.push("<td>" + row[col] + "</td>")
                    }else{
                        tr.push("<td>&nbsp;</td>")
                    }
                }
                tr.push("</tr>")
                table.push(tr.join(""))


            }
            table.push("</tr></tbody></table>")
           //console.log(table.join(""))
            result.innerHTML=table.join("")

        }catch(e){
            result.innerHTML=data
        }
}

async function execute_post() {
    //not working because of CORS restrictions

    const options = {
        headers:{
        'authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50Omh1ZHNvbnUiLCJpc3MiOiJhZ2VudDpodWRzb251Ojo4NTY5ZjhkMS0wYzMwLTQxMGYtOTdiOC1kOTYzZmQzMTI2MTEiLCJpYXQiOjE2Mzc5NDMwNjksInJvbGUiOlsidXNlcl9hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZSwic2FtbCI6e319.AQ-QNe2GCsXODUEGXQ_fD1SvRLl5vF-mRgd8yD4Oyu-onRpyJyXkJTP1EpqRZ0kpDbYzShhu7qUaoCnEaAKA3g',
        'Content-Type':'application/json',
        },
        method:'POST',
        body:'{"query":"select * from product","includeTableSchema":true,"queryRunToken":"string"}'
      };

    let response = await fetch('https://api.data.world/v0/sql/hudsonu/store',{
        headers: options
      });
    let data = await response.text();
   //console.log(data);
}