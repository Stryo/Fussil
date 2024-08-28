document.addEventListener('DOMContentLoaded', function () {
    // Set up the script select element
    const scriptSelect = document.getElementById('scriptSelect');
    let currentScriptSrc = scriptSelect.value;

    // Load the initial script
    loadScript(currentScriptSrc);

    // Add event listener to the script select element
    scriptSelect.addEventListener('change', function () {
        // Update the current script source and load the script
        currentScriptSrc = scriptSelect.value;
        loadScript(currentScriptSrc);
    });
});

function loadScript(scriptSrc) {
    // Remove existing script elements
    const existingScript = document.getElementById('dynamicScript');
    if (existingScript) {
        existingScript.remove();
    }

    // Create a new script element
    const script = document.createElement('script');
    script.src = `FuturosilMake/${scriptSrc}.js`; // Adjust the folder path
    script.id = 'dynamicScript';
    script.defer = true;

    // Append the script to the head
    document.head.appendChild(script);
}
