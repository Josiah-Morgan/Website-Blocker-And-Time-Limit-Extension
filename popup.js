function getCurrentTab(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        callback(tabs[0]);
    });
}


var status_display = $("#status-display");
$(document).ready(function() {
    getCurrentTab(function(_tab) {
        let url = new URL(_tab.url).hostname.split('.').slice(-2).join(".");
        status_display.text(url);
    })

    // Creates a database if the user does not have one
    chrome.storage.sync.get(["blocked_websites"]).then(function(result) {
        let data = result.blocked_websites;

        if (data == undefined) {
            chrome.storage.sync.set({"blocked_websites": {}});
            return;
        }
    });
})


function blockWebsite(block_duration) {
    // block_duration: in minutes or null
    chrome.storage.sync.get(["blocked_websites"]).then(function(result) {
        let data = result.blocked_websites || {};
        getCurrentTab(function(tab) {

            if (!tab.url.startsWith("http")) {
                status_display.text("This extension only works for urls that start with http and https");
                return;
            }

            let url = new URL(tab.url).hostname.split('.').slice(-2).join(".");
            data[url] = block_duration;

            chrome.storage.sync.set({"blocked_websites": data}, function() {
                let display_text = block_duration 
                ? ` ${url} will be blocked for ${block_duration} minute(s)` 
                : `${url} will be blocked indefinitely`;

                status_display.text(display_text);

                if (!$("#refresh-btn").length) {

                    $("#refresh-button-place-holder").append("<button id='refresh-btn'>Refresh</button>")
                    $("body").css({"height": "340px"})
                }
            });
        });
    });
}


$("#block-inf-btn").click(function() {
    blockWebsite(null);
});


$("#block-15-btn").click(function() {
    blockWebsite(15);
});


$("#block-30-btn").click(function() {
    blockWebsite(30);
});


$("#block-45-btn").click(function() {
    blockWebsite(45);
});


$("#block-60-btn").click(function() {
    blockWebsite(60);
});


$("#custom-block-btn").click(function() {
    let value = $("#custom-block-input").val();

    if (!value) {
        status_display.text("Put a number in the text box");
        return;
    }

    if (!/^\d+$/.test(value)) {
        status_display.text("You can only put numbers, 0 - 9");
        return;
    }

    blockWebsite(value);
});
 

$("#settings-btn").click(function() {
    $("#settings-btn a")[0].click();
    // using default javascript click function 
});

$(document).on("click", "#refresh-btn", function() {
    chrome.tabs.reload();
});