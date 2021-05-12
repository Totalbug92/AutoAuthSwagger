
let authInput = document.getElementById('authInput');
let inputWrapper = document.getElementById('inputWrapper');
let notSwaggerInfo = document.getElementById('notSwaggerInfo');
let authBtn = document.getElementById('authBtn');
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


async function run(){
  let tab;
  await getCurrentTab().then(e => {tab = e});
  const domain = new URL(tab.url);

  
  chrome.storage.sync.get(({[domain.hostname]:  apiKey }) => {
    authInput.value = apiKey ?? '';
  })

  authBtn.addEventListener('click', (e) => {
    chrome.storage.sync.set({[domain.hostname]: authInput.value });
  })
}
run();


