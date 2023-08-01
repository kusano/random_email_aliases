document.addEventListener("DOMContentLoaded", async () => {
    const address = (await chrome.storage.local.get({
        email_address: "",
    })).email_address;
    document.getElementById("email_address").value = address;

    document.getElementById("form").addEventListener("submit", async e => {
        e.preventDefault();
        
        document.getElementById("email_address").disabled = true;
        document.getElementById("submit").classList.add("is-loading");

        await chrome.storage.local.set({
            email_address: document.getElementById("email_address").value,
        });

        setTimeout(() => {
            document.getElementById("email_address").disabled = false;
            document.getElementById("submit").classList.remove("is-loading");
        }, 200);
    })
});
