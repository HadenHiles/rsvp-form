document.getElementById("rsvpForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const responseText = document.getElementById("response");

    const response = await fetch("/rsvp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message")
        })
    });

    const result = await response.json();
    responseText.textContent = result.message;
});
