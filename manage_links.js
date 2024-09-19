var element_with_data = $("#data_list");

chrome.storage.sync.get(["blocked_websites"]).then(function(result) {
    let data = result.blocked_websites;
    console.log(data, 'in script.js');

    if (!data || Object.keys(data).length === 0) {
        element_with_data.text("You have no blocked websites");
        return;
    }
    
    let ul = $("<ul></ul>");
    for (let [blocked_url, time] of Object.entries(data)) {
        let formattedTime = time ? `Blocked for: ${time} minute(s)` : "Blocked indefinitely";
        
        let li = $("<li></li>").text(`${blocked_url} - ${formattedTime}`);

        let deleteButton = $("<button></button>").text("Remove").css({
            "margin-left": "0px",
            "color": "red",
            "cursor": "pointer"
        });

        deleteButton.click(function() {
            delete data[blocked_url];
            chrome.storage.sync.set({"blocked_websites": data}).then(function() {
                li.remove();
                console.log(`${blocked_url} has been removed.`);
                
                if (Object.keys(data).length === 0) {
                    element_with_data.text("You have no blocked websites");
                }
            }).catch(function(error) {
                console.log("Error removing blocked website:", error);
            });
        });

        li.append(deleteButton);
        ul.append(li);
    }

    element_with_data.append(ul);
});



$("#settings-btn").click(function() {
    $("#settings-btn a")[0].click();
    // using default javascript click function 
})