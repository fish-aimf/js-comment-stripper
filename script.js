function stripComments(code) {
    // Split into lines and process each line
    const lines = code.split('\n');
    const processedLines = [];
    
    for (let line of lines) {
        let inString = false;
        let stringChar = '';
        let i = 0;
        
        while (i < line.length) {
            const char = line[i];
            const nextChar = line[i + 1];
            
            // Handle string literals
            if (!inString && (char === '"' || char === "'" || char === '`')) {
                inString = true;
                stringChar = char;
            } else if (inString && char === stringChar && line[i - 1] !== '\\') {
                inString = false;
                stringChar = '';
            }
            
            // Check for // comment outside of strings
            if (!inString && char === '/' && nextChar === '/') {
                // Remove everything from // to end of line
                line = line.substring(0, i);
                break;
            }
            
            i++;
        }
        
        // Only add non-empty lines or lines with actual content
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
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(function() {
            copyBtn.textContent = originalText;
        }, 1000);
    });
    
    // Auto-process on input change
    inputTextarea.addEventListener('input', function() {
        const inputCode = inputTextarea.value;
        const strippedCode = stripComments(inputCode);
        outputTextarea.value = strippedCode;
    });
});
