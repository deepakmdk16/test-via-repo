# Scientific Calculator

A powerful, feature-rich scientific calculator web application built with React and Vite.

## Features

### Basic Operations
- Addition, subtraction, multiplication, division
- Parentheses support for complex expressions
- Power operations (x^y)
- Decimal point handling

### Scientific Functions

**Trigonometric Functions:**
- sin, cos, tan (with degree/radian mode toggle)
- sin⁻¹ (asin), cos⁻¹ (acos), tan⁻¹ (atan)
- sinh, cosh, tanh (hyperbolic functions)

**Power and Root Functions:**
- x² (square)
- x³ (cube)
- √x (square root)
- ³√x (cube root)
- x^y (arbitrary power)

**Logarithmic and Exponential Functions:**
- ln (natural logarithm)
- log (base-10 logarithm)
- e^x (exponential)

**Additional Functions:**
- n! (factorial)
- 1/x (reciprocal)
- ± (negate)

**Constants:**
- π (pi)
- e (Euler's number)

### Memory Functions
- MC (Memory Clear)
- MR (Memory Recall)
- M+ (Memory Add)
- M− (Memory Subtract)

### User Interface Features
- Clean and modern scientific calculator layout
- Mode indicator showing DEG/RAD and memory status
- Keyboard support for faster input
- Responsive design for mobile and desktop
- Color-coded buttons for different function types
- Error handling for invalid operations

## Usage

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

### Using the Calculator

**Mouse/Touch Input:**
- Click on number buttons (0-9) to enter numbers
- Click on operator buttons to perform operations
- Click '=' to calculate the result
- Click 'C' to clear the display
- Click 'CE' to clear entry
- Click '←' to delete the last character
- Click function buttons (sin, cos, etc.) to apply scientific functions
- Click 'DEG' to toggle between degree and radian modes

**Keyboard Input:**
- `0-9`: Enter numbers
- `+`, `-`, `*`, `/`: Enter operators
- `(`, `)`: Enter parentheses
- `^`: Power operator
- `.`: Decimal point
- `Enter` or `=`: Calculate result
- `Escape` or `C`: Clear display
- `Backspace`: Delete last character

## Technical Details

- **Frontend**: React 19.2.3 with functional components and hooks
- **Build Tool**: Vite 7.3.0 for fast development and optimized builds
- **Styling**: CSS with modular component stylesheets
- **State Management**: React useState and useEffect hooks
- **Node Version**: Requires Node.js 20+

## Docker Deployment

The application includes a production-ready multi-stage Dockerfile:

```bash
# Build and run with Docker
docker build -t scientific-calculator .
docker run -p 8080:8080 scientific-calculator
```

The Docker container:
- Uses Node 20-slim base image
- Multi-stage build for optimal image size
- Serves static files using the `serve` package
- Listens on PORT environment variable (defaults to 8080)
- Ready for Cloud Run deployment

## File Structure

```
calculator/
├── src/
│   ├── main.jsx         # Application entry point
│   ├── App.jsx          # Main App component
│   ├── App.css          # App styles
│   ├── Calculator.jsx   # Scientific calculator component
│   ├── Calculator.css   # Calculator styles
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
├── Dockerfile           # Production Docker configuration
└── README.md            # Documentation
```

## Browser Compatibility

Works on all modern browsers including:
- Chrome/Edge (Chromium-based)
- Firefox
- Safari
- Opera

## License

This project is open source and available for use.
