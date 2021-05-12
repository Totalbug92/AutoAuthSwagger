window.addEventListener('load', (event) => {
  LoadTable();
})
async function LoadTable () {
  let tableBody = document.getElementById('tableBody');
  await chrome.storage.sync.get(null, items => {

    for (const [key, value] of Object.entries(items)) {

      let row = document.createElement('tr')
      let domain = document.createElement('td')
      domain.appendChild(document.createTextNode(key))
      let apiKey = document.createElement('td')
      apiKey.appendChild(document.createTextNode(value))
      row.appendChild(domain);
      row.appendChild(apiKey);

      let deleteColumn = document.createElement('td');
      let deleteBtn = document.createElement('button')
      deleteBtn.appendChild(document.createTextNode('Delete'))
      deleteBtn.setAttribute('type', 'button');
      deleteBtn.setAttribute('class', 'btn btn-danger');
      deleteBtn.addEventListener('click', () => handleBtnClick(key))

      deleteColumn.appendChild(deleteBtn)

      row.appendChild(deleteColumn)


      tableBody.appendChild(row);
    }
    if(!tableBody.hasChildNodes()){
      tableBody.appendChild(document.createTextNode('You don\'t have any API keys stored '))
    } 
  })
}

async function  handleBtnClick(domain) {
  let tableBody = document.getElementById('tableBody');
  await chrome.storage.sync.remove(domain)
  tableBody.innerHTML = '';
  LoadTable();
}
