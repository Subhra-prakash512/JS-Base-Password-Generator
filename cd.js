document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    let lengthSlider = document.getElementById('length');
    let lengthValue = document.getElementById('length-value');
    let uppercaseCheckbox = document.getElementById('uppercase');
    let lowercaseCheckbox = document.getElementById('lowercase');
    let numbersCheckbox = document.getElementById('numbers');
    let symbolsCheckbox = document.getElementById('symbols');
    let generateButton = document.getElementById('generate');
    let passwordField = document.getElementById('password');
    let copyButton = document.getElementById('copy-button');
    let strengthFill = document.getElementById('strength-fill');
    let strengthText = document.getElementById('strength-text');

    // Character sets

    let capital_text = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let small_text = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let number_list = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let symbol_list = ["!", "@", "#", "$", "%", "&", ";", "?", "/", ".", ","];
    let output;
    
    
    let password;

    lengthSlider.addEventListener('input', function () {
        lengthValue.textContent = this.value;
    });

    function generatePassword() {
        let mix = [];
        let x=0;
        output = null;
       
        if (uppercaseCheckbox.checked == true) {

            mix = mix.concat(capital_text);
            x = 26;

        }
        if (lowercaseCheckbox.checked == true) {

            mix = mix.concat(small_text);
            
            x = x + 26;

        }
        if (numbersCheckbox.checked == true) {

            mix = mix.concat(number_list);
            x = x + 9;

        }
        if (symbolsCheckbox.checked == true) {

            mix = mix.concat(symbol_list);
            x = x + 11;

        }

        
        let i = 0;
        let pos;
        for (i = 0; i < lengthSlider.value; i++) {
            pos = Math.floor(Math.random() * x);

            if (output == null) {
                output = mix[pos];
            }
            else {
                output = output + mix[pos];

            }



        }
        password = output;

        return password;


    }




    // Calculate password strength
    function calculateStrength(password) {
        let strength = 0;

        // Length contributes to strength
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (password.length >= 16) strength += 1;

        // Character variety contributes to strength
        if (/[A-Z]/.test(password)) strength += 1; // Uppercase letters
        if (/[a-z]/.test(password)) strength += 1; // Lowercase letters
        if (/[0-9]/.test(password)) strength += 1; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) strength += 2; // Symbols

        // Cap at maximum strength of 8
        return Math.min(strength, 8);
    }

    // Update strength meter
    function updateStrengthMeter(password) {
        const strength = calculateStrength(password);
        const percentage = (strength / 8) * 100;

        strengthFill.style.width = `${percentage}%`;

        // Update color and text based on strength
        if (strength <= 2) {
            strengthFill.style.backgroundColor = '#e53e3e'; // Red
            strengthText.textContent = 'Password strength: Weak';
        } else if (strength <= 5) {
            strengthFill.style.backgroundColor = '#dd6b20'; // Orange
            strengthText.textContent = 'Password strength: Fair';
        } else if (strength <= 7) {
            strengthFill.style.backgroundColor = '#38a169'; // Green
            strengthText.textContent = 'Password strength: Strong';
        } else {
            strengthFill.style.backgroundColor = '#2f855a'; // Dark green
            strengthText.textContent = 'Password strength: Very Strong';
        }
    }

    // Generate password on button click
    generateButton.addEventListener('click', function () {
        const password = generatePassword();
        if (password) {
            passwordField.value = password;
            updateStrengthMeter(password);
        }

    });
  
    // Copy to clipboard function
    copyButton.addEventListener('click', function () {
        if (!passwordField.value) return;

        // Select the text field
        passwordField.select();
        passwordField.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(passwordField.value)
            .then(() => {
                // Visual feedback for successful copy
                copyButton.classList.add('copied');
                copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

                // Revert after 2 seconds
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });

    // Generate an initial password on load
    generateButton.click();





});





