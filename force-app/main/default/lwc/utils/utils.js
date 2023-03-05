export function exportCSV(headers,totalData,fileTitle)
{
    if (!totalData || !totalData.length)
    {
        return null
    }

    const jsonObject = JSON.stringify(totalData)
    
    const result = convertToCSV(jsonObject, headers)
    if (result === null) return
    const blob = new Blob([result])
    const fileName = fileTitle ? fileTitle + '.csv' : 'export.csv'
    
    if (mavigator.msSaveBlob) {
        navigator.msSaveBlob(blob, fileName)
    }
    else if (navigator.userAgent.match(/iPhone|iPad/i)) {
        const link = window.document.createElement('a')
        link.href = 'data:text/csv;charset=utf-8,' + encodeURI(result);
        link.target = '_blank';
        link.download = fileName;
        link.click();
    }
    else {
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute("href", url)
            link.setAttribute('download', fileName)
            link.style.visibility = 'hidden';
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
}


function convertToCSV(obj, headers)
{
    const colDelimiter = ','
    const lineDelimiter = '\r\n'
    const actualHeaderKey = Object.keys(headers)
    const headersToShow = Object.values(headers)

    let str = ''
    
    str += headersToShow.join(colDelimiter)
    str += lineDelimiter
    
    const data=typeof obj !=='object' ? JSON.parse(obj):obj 
    
    data.forEach(o => {
        let line = ''
        actualHeaderKey.forEach(key => {
            if (line != '')
            {
                line+=colDelimiter
            }
            let s=o[key]+''
            line+=s? s.replace(/,/g,''):s
        })
        str += line + lineDelimiter
        
    })
    console.log('str',str)
    return str
}