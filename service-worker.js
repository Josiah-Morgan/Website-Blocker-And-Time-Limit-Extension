chrome.webNavigation.onBeforeNavigate.addListener(
   function(details) {
     let url = new URL(details.url).hostname.split('.').slice(-2).join(".");
     // https://github.com/indexerrowaty/StopWatchingPornOrGetAssaded/blob/master/script.js
     let id = details.tabId;
 
     chrome.storage.sync.get(["blocked_websites"]).then(function(result) {
         let data = result.blocked_websites;

         if (data == null) {
            return;
         }

         if (Object.keys(data).length === 0) {
           return;
         }
 
         for (let [blocked_url, time] of Object.entries(data)) {
           if (url === blocked_url) {
             chrome.tabs.remove(id);
             chrome.tabs.create({ url: "blocked.html" });
           }
         }
       }).catch(function(error) {
         console.log(error, 'service worker');
       });
   },
   { url: [{ schemes: ['http', 'https'] }] }
);
 

setInterval(function() {
   chrome.storage.sync.get(["blocked_websites"]).then(function(result) {
      let data = result.blocked_websites;

      if (data == null) {
         return;
      }

      if (Object.keys(data).length === 0) {
         return;
      }

      for (let [blocked_url, time] of Object.entries(data)) {

         if (time == null) {
            return;
         }

         // The time would be 0 after this
         if (time == 1) {
            delete data[blocked_url];
            chrome.storage.sync.set({"blocked_websites": data});
            return;
         }


         data[blocked_url] = time - 1;
         chrome.storage.sync.set({"blocked_websites": data});
      } 


   })

}, 60000) // 60 seconds
