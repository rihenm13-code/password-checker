# 🔐 Password Strength Checker

A modern, user-friendly web application that analyzes password strength and provides actionable recommendations for creating secure passwords.

## Features

✨ **Real-time Password Analysis**
- Instantly evaluate password strength as you type
- Visual strength meter with color-coded feedback
- Detailed recommendations for improvement

🎯 **Smart Scoring System**
- Analyzes password length (8, 12, 16 characters)
- Checks for uppercase, lowercase, numbers, and special characters
- Detects and penalizes common patterns (sequences, repetitions)
- Provides a percentage score and strength level

🔄 **Password Generator**
- Generate strong random passwords with one click
- Customizable length (8-32 characters)
- Instantly check the strength of generated passwords

📋 **Easy Copy-to-Clipboard**
- Copy passwords with a single click
- Helpful notifications confirm the action

📱 **Fully Responsive Design**
- Works seamlessly on desktop, tablet, and mobile
- Beautiful gradient UI with smooth animations

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/password-strength-checker.git
   cd password-strength-checker
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open in browser**
   Navigate to `http://localhost:5000`

## Project Structure

```
password-strength-checker/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── Procfile              # Render deployment configuration
├── .gitignore            # Git ignore file
├── templates/
│   ├── index.html        # Main page
│   ├── 404.html          # Not found page
│   └── 500.html          # Server error page
└── static/
    ├── style.css         # Stylesheet
    └── script.js         # Frontend logic
```

## Password Strength Criteria

The application evaluates passwords based on:

- **Very Weak** (0-2 points): Improve significantly
- **Weak** (3-4 points): Add more character variety
- **Fair** (5 points): Good, but could be stronger
- **Good** (6 points): Strong password
- **Very Strong** (7+ points): Excellent security

### Scoring Factors:
- ✅ 8+ characters: +1 point
- ✅ 12+ characters: +1 point
- ✅ 16+ characters: +1 point
- ✅ Lowercase letters: +1 point
- ✅ Uppercase letters: +1 point
- ✅ Numbers: +1 point
- ✅ Special characters: +1 point
- ❌ Repeating characters: -1 point
- ❌ Sequential characters: -1 point

## API Endpoints

### Check Password Strength
```
POST /api/check
Content-Type: application/json

{
    "password": "YourPassword123!"
}

Response:
{
    "score": 6,
    "strength": "Good",
    "color": "lightgreen",
    "percentage": 85.7,
    "feedback": []
}
```

### Generate Strong Password
```
GET /api/generate?length=16

Response:
{
    "password": "aB3#xY9@mK2$pQ8!",
    "score": 7,
    "strength": "Very Strong",
    "color": "green",
    "percentage": 100,
    "feedback": []
}
```

## Deployment on Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Connect your GitHub account

### Step 3: Deploy
1. Click "New +" → "Web Service"
2. Select your repository
3. Configure:
   - **Name**: password-strength-checker
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free (or paid for better uptime)
4. Click "Deploy Web Service"

### Step 4: Environment Variables (Optional)
In Render dashboard → Environment:
```
SECRET_KEY=your-secure-secret-key
```

### Access Your App
Your app will be available at: `https://password-strength-checker.onrender.com`

## Security Tips

🔒 **Password Security Best Practices:**
- Use unique passwords for each account
- Avoid using personal information (names, birthdays)
- Don't share passwords via email or messaging
- Use a password manager to store complex passwords
- Enable two-factor authentication when available
- Regularly update passwords for important accounts

## Local Development

### Enable Debug Mode (Development Only)
```python
# In app.py, change:
app.run(debug=False, ...)
# To:
app.run(debug=True, ...)
```

### Run Tests
```bash
python -m pytest
```

## Technologies Used

- **Backend**: Flask 2.3.3
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Server**: Gunicorn
- **Deployment**: Render

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For issues, questions, or suggestions, please open an Issue on GitHub.

## Author

Created with ❤️ for better password security

---

**Remember**: A strong password is your first line of defense against unauthorized access!
