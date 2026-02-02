from flask import Flask, render_template, request, jsonify
import re
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

def check_password_strength(password):
    """
    Analyze password strength and return score, feedback, and strength level.
    """
    score = 0
    feedback = []
    
    # Length checks
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Password should be at least 8 characters long")
    
    if len(password) >= 12:
        score += 1
    
    if len(password) >= 16:
        score += 1
    
    # Character type checks
    if re.search(r'[a-z]', password):
        score += 1
    else:
        feedback.append("Add lowercase letters")
    
    if re.search(r'[A-Z]', password):
        score += 1
    else:
        feedback.append("Add uppercase letters")
    
    if re.search(r'[0-9]', password):
        score += 1
    else:
        feedback.append("Add numbers")
    
    if re.search(r'[!@#$%^&*()_+\-=\[\]{};:\'",.<>?/\\|`~]', password):
        score += 1
    else:
        feedback.append("Add special characters (!@#$%^&*)")
    
    # Common patterns to avoid
    if re.search(r'(.)\1{2,}', password):
        score -= 1
        feedback.append("Avoid repeating characters")
    
    if re.search(r'(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def)', password, re.IGNORECASE):
        score -= 1
        feedback.append("Avoid sequential characters")
    
    # Determine strength level
    score = max(0, score)
    if score <= 2:
        strength = "Very Weak"
        color = "red"
    elif score <= 4:
        strength = "Weak"
        color = "orange"
    elif score <= 5:
        strength = "Fair"
        color = "yellow"
    elif score <= 6:
        strength = "Good"
        color = "lightgreen"
    else:
        strength = "Very Strong"
        color = "green"
    
    return {
        'score': score,
        'strength': strength,
        'color': color,
        'feedback': feedback,
        'percentage': min(100, (score / 7) * 100)
    }

@app.route('/')
def index():
    """Render the main page."""
    return render_template('index.html')

@app.route('/api/check', methods=['POST'])
def check():
    """API endpoint to check password strength."""
    data = request.get_json()
    password = data.get('password', '')
    
    if not password:
        return jsonify({'error': 'Password is required'}), 400
    
    result = check_password_strength(password)
    return jsonify(result)

@app.route('/api/generate', methods=['GET'])
def generate():
    """Generate a strong random password."""
    import random
    import string
    
    length = request.args.get('length', 16, type=int)
    length = min(max(length, 8), 32)  # Limit between 8 and 32
    
    characters = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(random.choice(characters) for _ in range(length))
    
    result = check_password_strength(password)
    result['password'] = password
    return jsonify(result)

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors."""
    return render_template('500.html'), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
