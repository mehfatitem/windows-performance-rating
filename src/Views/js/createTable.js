
const tableStartContent = '<table id="score-table" class="table table-striped table-bordered">';
  
function createTable (obj , headerTitleArr , title , blackList) {
    let titleContent = createTableTitle(title);
    let headerContent = createHeaderContent(headerTitle);
    let dataContent = createTableDataContent(obj , blackList);

    return `${titleContent}${tableStartContent}${headerContent}${dataContent}`;
 }

 function createTableTitle(title) {
  return `<p class="table-title" align="center">${title}</p>`;
 }

 function createHeaderContent(titleArr) {
  let headerContent = '<tr>';
  for(let i=0;i<titleArr.length;i++) {
    headerContent += `<th>${titleArr[i]}</th>`;
  }
  headerContent += '</tr>';
  return `<thead>${headerContent}</thead>`;
 }

 function createTableDataContent(obj , blackList) {
    let tableContent = '<tbody><tr>';
    for(var item in obj) {
        if(!blackList.includes(item)) {
          tableContent += `<td>${obj[item][0]}</td>`;
        }
    }
    tableContent += '</tr></table>';

    return tableContent;
 }