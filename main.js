document.addEventListener("DOMContentLoaded", function() {
    let fromBase = null;
    let toBase = null;

    const sections = document.querySelectorAll("section");
    // First section = From buttons; second section = To buttons.
    const fromSection = sections[0];
    const toSection = sections[1];

    const numberInput = document.getElementById("numberbefor");
    const output = document.getElementById("output");
    const resultButton = document.querySelector(".result");

    // Mapping from class name to base value.
    const mapBase = {
        "Binary": 2,
        "Octaly": 8,
        "Decimal": 10,
        "Hex": 16
    };

    // Helper function to clear selected styling.
    function clearSelection(section) {
        section.querySelectorAll("button").forEach(btn => {
            btn.classList.remove("selected");
        });
    }

    // Event listeners for FROM base buttons.
    fromSection.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function() {
            clearSelection(fromSection);
            button.classList.add("selected");
            // Use the class name (Binary, Octaly, Decimal, Hex) to set fromBase.
            for (let key in mapBase) {
                if (button.classList.contains(key)) {
                    fromBase = mapBase[key];
                    break;
                }
            }
        });
    });

    // Event listeners for TO base buttons.
    toSection.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function() {
            clearSelection(toSection);
            button.classList.add("selected");
            for (let key in mapBase) {
                if (button.classList.contains(key)) {
                    toBase = mapBase[key];
                    break;
                }
            }
        });
    });

    // On clicking result, perform the conversion.
    resultButton.addEventListener("click", function() {
        const numStr = numberInput.value.trim();

        if (numStr === "") {
            output.textContent = "Please enter a number.";
            return;
        }

        if (fromBase === null || toBase === null) {
            output.textContent = "Please select both From and To bases.";
            return;
        }

        // Convert the input number using the chosen source base.
        const parsedNumber = parseInt(numStr, fromBase);
        if (isNaN(parsedNumber)) {
            output.textContent = "Invalid number for the selected From base.";
            return;
        }

        // Convert the parsed number into the target base.
        const converted = parsedNumber.toString(toBase).toUpperCase();
        output.textContent = converted;
    });
});