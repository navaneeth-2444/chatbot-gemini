async function getAnswer() {
    const question = document.getElementById("inputBox").value;
    const outputDiv = document.getElementById("output");

    if (!question) {
        alert("Please enter a question!");
        return;
    }

    outputDiv.innerText = "Thinking...";

    try {
        // Adjust the URL to match the Gemini endpoint you've set up in the server code
        const response = await fetch("/api/chat", {  // Now pointing to /api/chat
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question }) // Sending question in the request body
        });

        // Handle errors from the server response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || 'Failed to get response');
        }

        // Process the response JSON and display the answer in the output div
        const data = await response.json();
        outputDiv.innerText = data.completion || "No response received.";
    } catch (error) {
        outputDiv.innerText = `Error: ${error.message}`;
        console.error("Error:", error);
    }
}
