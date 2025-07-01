function stripComments(code) {
    const lines = code.split('\n');
    const processedLines = [];
    for (let line of lines) {
        let inString = false;
        let stringChar = '';
        let i = 0;
        while (i < line.length) {
            const char = line[i];
            const nextChar = line[i + 1];
            if (!inString && (char === '"' || char === "'" || char === '`')) {
                inString = true;
                stringChar = char;
            } else if (inString && char === stringChar && line[i - 1] !== '\\') {
                inString = false;
                stringChar = '';
            }
            if (!inString && char === '/' && nextChar === '/') {
                line = line.substring(0, i);
                break;
            }
            i++;
        }
        if (line.trim().length > 0) {
            processedLines.push(line);
        }
    }
    return processedLines.join('\n');
}
document.addEventListener('DOMContentLoaded', function() {
    const inputTextarea = document.getElementById('input');
    const outputTextarea = document.getElementById('output');
    const stripBtn = document.getElementById('stripBtn');
    const copyBtn = document.getElementById('copyBtn');
    stripBtn.addEventListener('click', function() {
        const inputCode = inputTextarea.value;
        const strippedCode = stripComments(inputCode);
        outputTextarea.value = strippedCode;
    });
    copyBtn.addEventListener('click', function() {
        outputTextarea.select();
        document.execCommand('copy');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(function() {
            copyBtn.textContent = originalText;
        }, 1000);
    });
    inputTextarea.addEventListener('input', function() {
        const inputCode = inputTextarea.value;
        const strippedCode = stripComments(inputCode);
        outputTextarea.value = strippedCode;
    });
});
