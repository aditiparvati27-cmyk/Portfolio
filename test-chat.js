
async function testChat() {
    try {
        const response = await fetch('http://localhost:5001/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: "Hello, who are you?",
                history: []
            })
        });

        if (!response.ok) {
            console.error("Error status:", response.status);
            const text = await response.text();
            console.error("Error body:", text);
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            console.log("Received chunk:", decoder.decode(value));
        }
    } catch (e) {
        console.error("Fetch error:", e);
    }
}

testChat();
