document.addEventListener('DOMContentLoaded', function() {
    let fromBase = 10;
    let toBase = 2;
    const fromButtons = document.querySelectorAll('#from:nth-of-type(1) button');
    const toButtons = document.querySelectorAll('#from:nth-of-type(2) button');
    const inputNumber = document.getElementById('numberbefor');
    const convertBtn = document.querySelector('.result');
    const output = document.getElementById('output');

    function updateSelectedButton(buttons, selectedBase) {
        buttons.forEach(btn => {
            if (getBaseFromClass(btn.className) === selectedBase) {
                btn.style.transform = 'scale(1.2)';
            } else {
                btn.style.transform = 'scale(1)';
            }
        });
    }

    function getBaseFromClass(className) {
        switch(className) {
            case 'Binary': return 2;
            case 'Octaly': return 8;
            case 'Decimal': return 10;
            case 'Hex': return 16;
            default: return 10;
        }
    }

    fromButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            fromBase = getBaseFromClass(this.className);
            updateSelectedButton(fromButtons, fromBase);
        });
    });

    toButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toBase = getBaseFromClass(this.className);
            updateSelectedButton(toButtons, toBase);
        });
    });

    function isValidInput(input, base) {
        const regex = {
            2: /^[01]+$/,
            8: /^[0-7]+$/,
            10: /^\d+$/,
            16: /^[0-9A-Fa-f]+$/
        };
        return regex[base].test(input);
    }

    function convertBase(num, fromBase, toBase) {
        return parseInt(num, fromBase).toString(toBase).toUpperCase();
    }

    convertBtn.addEventListener('click', function() {
        const input = inputNumber.value.trim();
        if (!isValidInput(input, fromBase)) {
            alert('Invalid input for the selected base!');
            inputNumber.value = ''; // Clear the input field
            output.textContent = ''; // Clear the output
            return;
        }

        const converted = convertBase(input, fromBase, toBase);
        output.innerHTML = `Result: ${input}<sub>${fromBase}</sub> = ${converted}<sub>${toBase}</sub>`;
        inputNumber.value = ''; // Clear the input field after successful conversion
    });

    // Initialize with default selection
    updateSelectedButton(fromButtons, fromBase);
    updateSelectedButton(toButtons, toBase);
});