document.addEventListener("DOMContentLoaded", async () => {
    const address = (await chrome.storage.local.get({
        email_address: "",
    })).email_address;

    if (address==="") {
        document.getElementById("options_page").style.display = "block";

        document.getElementById("options").addEventListener("click", e => {
            e.preventDefault();
            chrome.runtime.openOptionsPage();
        });
    } else {
        document.getElementById("main").style.display = "block";

        document.getElementById("copy1").addEventListener("click", e => {
            e.preventDefault();

            document.getElementById("copy1").classList.add("is-loading");

            navigator.clipboard.writeText(document.getElementById("alias1").value);

            setTimeout(() => {
                document.getElementById("copy1").classList.remove("is-loading");
            }, 200);
        });

        document.getElementById("copy2").addEventListener("click", e => {
            e.preventDefault();

            document.getElementById("copy2").classList.add("is-loading");

            navigator.clipboard.writeText(document.getElementById("alias2").value);

            setTimeout(() => {
                document.getElementById("copy2").classList.remove("is-loading");
            }, 200);
        });

        const generate = () => {
            const match = address.match(/^(.*?)(\+.*?)?(@.*)?$/);
            const host = match[1] || "";
            const domain = match[3] || "";

            const uint32 = new Uint32Array(1);

            let alias1 = host+"+";
            const A = "abcdefghijklmnopqrstuvwxyz0123456789";
            for (let i=0; i<8; i++) {
                crypto.getRandomValues(uint32);
                alias1 += A[uint32[0]%A.length];
            }
            alias1 += domain;
            document.getElementById("alias1").value = alias1;

            let alias2 = "";
            let first = true;
            for (let c of host.replaceAll(".", "")) {
                if (!first) {
                    crypto.getRandomValues(uint32);
                    if (uint32[0]%2==0) {
                        alias2 += ".";
                    }
                }
                first = false;
                alias2 += c;
            }
            alias2 += domain;
            document.getElementById("alias2").value = alias2;
        };
        generate();

        document.getElementById("regenerate").addEventListener("click", e => {
            e.preventDefault();
            generate();
        });
    }
});
