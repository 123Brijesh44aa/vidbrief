
export function formatResponse(response: string) {
	// Handle code blocks separately to preserve formatting
	const codeBlockRegex = /```javascript([\s\S]*?)```/gim;
	let formatted = response.replace(codeBlockRegex, (_match, code) => {
		return `<pre style="background-color: #d6e1ff; padding: 10px; border-radius: 5px; overflow-x: auto;">
              <code style="font-family: 'Fira Code Medium',serif font-size: large; font-weight: bold; color: #5b0fbd; padding: 5px;">${code}</code>
            </pre>`;
	});

	// Replace other Markdown syntax
	formatted = formatted.replace(/## (.*$)/gim, '<h2 style="font-size: xx-large; margin-top: 20px; margin-bottom: 10px; color: #333;">$1</h2>')
		.replace(/\*\*(.*?)\*\*/gim, '<strong style="font-weight: bold; color: #000; font-size: large;">$1</strong>')  // Bold text
		.replace(/\*(.*?)\*/gim, '<em style="font-style: italic; color: #555;">$1</em>')              // Italic text
		.replace(/\* (.*$)/gim, '<li style="margin-bottom: 5px;">$1</li>') // Bullet points
		.replace(/<\/li><br>/gim, '</li>'); // Remove <br> after <li>

	// Wrap bullet points in <ul> with inline styles
	formatted = formatted.replace(/(<li style="margin-bottom: 5px;">.*<\/li>)/gim, '<ul style="list-style-type: disc; margin-left: 20px;">$1</ul>');

	// Convert remaining newlines to <br>
	formatted = formatted.replace(/\n/gim, '<br>');

	return formatted.trim(); // Remove any leading or trailing whitespace
}





// // Example usage:
// const rawResponse = "Your raw response string here...";
// const beautifiedResponse = formatResponse(rawResponse);
// console.log(beautifiedResponse);
