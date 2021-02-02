import csv from 'csv';
import Fetcher from './fetcher.js';
import port from '../port';

let ImportCsv = function(files){
    //var file = files[0];
    let newImport =[];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        const headers = data[0];
        console.log(JSON.stringify(headers));

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            if (headers && row.length == headers.length) {
                const dataList = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] == '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] == '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j] !== d && d !== '') {
                            dataList[headers[j]] = d;
                    }
                }

                newImport.push(dataList);
                
                /*Fetcher(`${port}/api/v1/import`, 'POST', dataList).then(function (response) {
                    return response;
                });*/
            }
          /*const name = data[i][0];
          const phoneNumber = data[i][1];
          const address = data[i][2];
          const classType = data[i][3];
          const newData = { "name": name, "phoneNumber": phoneNumber, "address": address, "class": classType };*/
          //dataList.push(newData);

          
        };
      });
    };

    reader.readAsBinaryString(files);

    return newImport;
}

export default ImportCsv;