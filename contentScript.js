let isAuthenticated = false;
let isSwaggerDocument = document.getElementById('swagger-ui') ? true : false;
const setAuthKey = async () => {
  let authWrapper;
  const domain = new URL(location.href);
  await chrome.storage.sync.get(({[domain.hostname]:  apiKey }) => {
    if(apiKey && !isAuthenticated && isSwaggerDocument){
      function callback(mut) {
        

          let form = authWrapper?.querySelector('form');

          let input = form?.querySelector('input');

          let changeEvent = new Event('change', { bubbles: true });

          let buttons = form?.querySelectorAll('button'); // Buttons inside the form element

          
          if(input) {
            input.value = apiKey;

            input.dispatchEvent(changeEvent)
          }

          
          if(buttons) {
            buttons[0]?.click(); // Auth button

            buttons[1]?.click();	// close button
          }
          isAuthenticated = true;
      }
      setTimeout(() => {

        authWrapper = document.querySelector('.auth-wrapper')

        

        let observer = new MutationObserver(callback)

        observer.observe(authWrapper, {childList: true})

        authWrapper.querySelector('button').click()

      }, 500)
    }
  })
}
  
if(!isAuthenticated) {
  setAuthKey();
}