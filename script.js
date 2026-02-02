// DOM Elements
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strengthBar');
const strengthLevel = document.getElementById('strengthLevel');
const strengthPercentage = document.getElementById('strengthPercentage');
const feedbackContainer = document.getElementById('feedback');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const generatedPassword = document.getElementById('generatedPassword');
const generatedText = document.getElementById('generatedText');
const copyGenerated = document.getElementById('copyGenerated');

// Event Listeners
passwordInput.addEventListener('input', handlePasswordInput);
togglePassword.addEventListener('click', togglePasswordVisibility);
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);
copyGenerated.addEventListener('click', copyGeneratedPassword);

// Toggle password visibility
function togglePasswordVisibility() {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.textContent = isPassword ? '🙈' : '👁️';
}

// Handle password input
async function handlePasswordInput(e) {
    const password = e.target.value;

    if (!password) {
        resetDisplay();
        return;
    }

    try {
        const response = await fetch('/api/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password }),
        });

        if (!response.ok) {
            throw new Error('Failed to check password');
        }

        const data = await response.json();
        updateDisplay(data);
    } catch (error) {
        console.error('Error:', error);
        feedbackContainer.innerHTML = '<div class="feedback-item warning">Error checking password</div>';
    }
}

// Update display with strength info
function updateDisplay(data) {
    // Update strength bar
    const percentage = data.percentage;
    strengthBar.style.width = percentage + '%';

    // Update strength level
    strengthLevel.textContent = data.strength;
    strengthPercentage.textContent = `(${Math.round(percentage)}%)`;

    // Update color based on strength
    const colors = {
        'Very Weak': '#ef4444',
        'Weak': '#f97316',
        'Fair': '#eab308',
        'Good': '#84cc16',
        'Very Strong': '#22c55e'
    };
    
    strengthLevel.style.color = colors[data.strength] || '#6b7280';

    // Update feedback
    updateFeedback(data.feedback);

    // Show copy button
    if (passwordInput.value.length > 0) {
        copyBtn.style.display = 'inline-block';
    }

    // Hide generated password section
    generatedPassword.style.display = 'none';
}

// Update feedback section
function updateFeedback(feedback) {
    if (feedback.length === 0) {
        feedbackContainer.innerHTML = '<div class="feedback-item success">✓ Password looks great!</div>';
        return;
    }

    feedbackContainer.innerHTML = feedback
        .map(item => `<div class="feedback-item warning">${item}</div>`)
        .join('');
}

// Reset display
function resetDisplay() {
    strengthBar.style.width = '0%';
    strengthLevel.textContent = 'Enter a password';
    strengthLevel.style.color = '#6b7280';
    strengthPercentage.textContent = '(0%)';
    feedbackContainer.innerHTML = '';
    copyBtn.style.display = 'none';
    generatedPassword.style.display = 'none';
}

// Generate random password
async function generatePassword() {
    try {
        const response = await fetch('/api/generate');
        if (!response.ok) {
            throw new Error('Failed to generate password');
        }

        const data = await response.json();
        
        // Set the password in input
        passwordInput.value = data.password;
        
        // Show generated password section
        generatedText.textContent = data.password;
        generatedPassword.style.display = 'block';
        
        // Update strength display
        updateDisplay(data);
        
        // Show notification
        showNotification('Password generated successfully!');
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error generating password', 'error');
    }
}

// Copy password to clipboard
function copyToClipboard() {
    const password = passwordInput.value;
    copyToClipboardUtil(password, 'Password copied!');
}

// Copy generated password
function copyGeneratedPassword() {
    const password = generatedText.textContent;
    copyToClipboardUtil(password, 'Password copied!');
}

// Utility function to copy to clipboard
function copyToClipboardUtil(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(message);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy', 'error');
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    resetDisplay();
});
