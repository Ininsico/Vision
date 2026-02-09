# Vision AI - Text-to-Image Generator Frontend

A stunning, modern frontend for Vision AI text-to-image generator built with React, TypeScript, and Tailwind CSS.

## 🎨 Design Features

- **Premium Color Scheme**: Warm peachy/beige tones (#FDFBF7, #EB8C6C, #8B5E3C) matching your reference image
- **Unique Typography**: 
  - Space Grotesk for headings
  - Inter for body text
  - Syne for accent text
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Glassmorphism Effects**: Modern UI with backdrop blur and transparency
- **Responsive Design**: Mobile-first approach with beautiful mobile menu
- **Premium Components**: Custom-designed buttons, cards, and navigation

## 📁 Project Structure

```
frontend/
├── public/
│   └── Logo.svg                    # Vision AI logo
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Sticky navigation with scroll effects
│   │   │   └── Footer.tsx         # Footer with social links
│   │   └── ui/
│   │       └── Button.tsx         # Reusable button component
│   ├── pages/
│   │   ├── Home.tsx               # Landing page with hero, features, CTA
│   │   ├── Contact.tsx            # Contact form with info cards
│   │   └── Docs.tsx               # API documentation with code examples
│   ├── lib/
│   │   └── utils.ts               # Utility functions (cn for class merging)
│   ├── App.tsx                    # Main app with routing
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles with Tailwind
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Dependencies

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 Pages

### 1. Landing Page (`/`)
- **Hero Section**: Eye-catching headline with gradient text and CTA buttons
- **Stats Section**: Key metrics (1M+ images, 50K+ users, etc.)
- **Features Section**: 4 feature cards with icons and descriptions
- **Use Cases Section**: Perfect for various creative applications
- **CTA Section**: Final call-to-action with gradient background

### 2. Contact Page (`/contact`)
- **Contact Form**: Functional form with validation
- **Contact Information**: Email, phone, and office location cards
- **Social Links**: GitHub, Twitter, LinkedIn integration
- **Office Hours**: Business hours display

### 3. Docs Page (`/docs`)
- **Sidebar Navigation**: Quick links to documentation sections
- **Code Examples**: Copy-to-clipboard functionality
- **API Reference**: Complete API documentation
- **Getting Started Guide**: Quick start instructions
- **Examples**: React integration examples

## 🎨 Color Palette

```css
Primary Colors:
- #FDFBF7 (Background)
- #F9F5EE (Secondary Background)
- #4A2F1A (Dark Text)
- #6B4628 (Secondary Text)

Accent Colors:
- #EB8C6C (Peach)
- #C85A35 (Dark Peach)
- #8B5E3C (Brown)
```

## 🔧 Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **clsx & tailwind-merge** - Class name utilities

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Key Features

1. **Smooth Scrolling**: Animated scroll behavior throughout
2. **Active Link Highlighting**: Current page indication in navigation
3. **Hover Effects**: Button lifts, card elevations, icon animations
4. **Loading States**: Form submission feedback
5. **Copy to Clipboard**: Code examples in docs
6. **Mobile Menu**: Animated slide-in navigation
7. **Gradient Text**: Eye-catching headlines
8. **Custom Scrollbar**: Styled to match color scheme

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Customization

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your custom colors
  },
  peach: {
    // Your custom colors
  }
}
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Navbar.tsx`

### Modifying Fonts

Update the Google Fonts import in `src/index.css` and the font families in `tailwind.config.js`

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 📄 License

MIT License - feel free to use this for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by the Vision Team
