let xlsx = null;
try{ 
    xlsx = require('xlsx');
} catch(e) {
    xlsx = null;
}

const excelUtil = {

    convertExcelFileToArray: function(excelFilePath, startRowNumber, startColumnAlphabet, jsonColumInfoString, excelKeyInfo) {

        const workbook = xlsx.readFile(excelFilePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        let rangeInfo = worksheet['!ref'];
        let endCellInfo = rangeInfo.substr(rangeInfo.indexOf(':') + 1);
        let endColumnAlphabet = endCellInfo.substr(0, 1);
        let endRowNumber = Number(endCellInfo.substr(1));
        let convertArrayData = [];

        for(; startRowNumber<=endRowNumber; startRowNumber++) {
            let rowData = {};
            let rowParseColumnAlphabet = startColumnAlphabet;
            for(; ; rowParseColumnAlphabet = String.fromCharCode(rowParseColumnAlphabet.charCodeAt() + 1)) {
                const cellInfo = worksheet[rowParseColumnAlphabet + startRowNumber];
                if(cellInfo) {
                    if(jsonColumInfoString.indexOf(rowParseColumnAlphabet) !== -1) {
                        rowData[excelKeyInfo[rowParseColumnAlphabet]] = JSON.parse(cellInfo.v);
                    } else {
                        rowData[excelKeyInfo[rowParseColumnAlphabet]] = cellInfo.v;
                    }
                } else {
                    rowData[excelKeyInfo[rowParseColumnAlphabet]] = null;
                }
                if(rowParseColumnAlphabet === endColumnAlphabet) {
                    break;
                }
            }
            convertArrayData.push(rowData);
        }
        return convertArrayData;
    }

};

module.exports = excelUtil;