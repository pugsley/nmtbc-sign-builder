# MTB Trail Sign Creator

A single-page application for creating and customizing Mountain Bike trail signs as PDFs. Built with React, TypeScript, and @react-pdf/renderer for fully client-side PDF generation.

## Features

- **Live Preview**: Real-time PDF preview that updates as you edit
- **Customizable Fields**:
  - Trail name
  - Grade level (1-6) with automatic color coding
  - Distance and type (One Way, Loop, Return)
  - GPS coordinates (latitude/longitude)
  - Arrow direction (8 directions: N, NE, E, SE, S, SW, W, NW)
  - Custom logo upload
- **Client-Side Generation**: No server required - all PDF generation happens in the browser
- **Download**: Export your sign as a PDF file

## Grade Color System

The application automatically applies colors based on difficulty grade:
- **Grade 1-2**: Green shades (easier trails)
- **Grade 3**: Cyan/light blue (moderate)
- **Grade 4**: Blue (challenging)
- **Grade 5**: Dark gray (difficult)
- **Grade 6**: Red (expert)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to the URL shown (typically http://localhost:5173)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Edit the form** on the left side with your trail information
2. **Preview updates automatically** on the right side
3. **Upload a logo** (optional) by clicking the file input
4. **Adjust arrow direction** using the 8-direction selector
5. **Download the PDF** by clicking the "Download PDF" button

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **@react-pdf/renderer** - Client-side PDF generation
- **CSS** - Styling with responsive design

## Project Structure

```
src/
├── App.tsx          # Main application component
├── SignForm.tsx     # Form component for editing sign data
├── SignPDF.tsx      # PDF document component using @react-pdf/renderer
├── App.css          # Main layout styles
├── SignForm.css     # Form styles
├── index.css        # Global styles
└── main.tsx         # Application entry point
```

## Design Reference

The `signs.pdf` file in the project root contains sample designs for each difficulty grade level, which this application replicates programmatically.
