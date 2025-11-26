# NMTBC Trail Sign Creator - Development Guide

## Project Overview
A React-based web application for creating PDF trail signs for NMTBC (Nelson Mountain Bike Club). Generates three types of signs with customizable content, directions, and difficulty grades.

## Tech Stack
- **Framework**: React 18.2.0 with TypeScript 5.6.2
- **Build Tool**: Vite 6.4.1
- **PDF Generation**: @react-pdf/renderer
- **Styling**: Inline styles (React PDF doesn't support external CSS)

## Development Commands
```bash
yarn dev          # Start dev server (http://localhost:5173)
yarn build        # Production build
npx tsc --noEmit  # Type check
```

## Architecture

### Sign Types (Discriminated Union Pattern)
Three sign types defined in `src/App.tsx`:

1. **Wayfinding Sign** (`signType: 'wayfinding'`)
   - Dimensions: 240mm × 480mm (portrait)
   - Purpose: Trail navigation with directions, distance, grade
   - Features: Arrow circle, activity icons (bike/walk), GPS coordinates, footer logos

2. **Warning Post** (`signType: 'warning'`)
   - Dimensions: 115mm × 900mm (tall, narrow)
   - Purpose: Hazard warnings (danger/caution)
   - Features: Warning symbol (triangle/diamond), large vertical text, optional grade badge

3. **Hard/Easy Post** (`signType: 'hardeasy'`)
   - Dimensions: 115mm × 900mm (same as Warning Post)
   - Purpose: Difficulty indicators with directional guidance
   - Features: Two sections (top/bottom), each with arrow, word (HARD/EASY), and grade
   - **Key Detail**: Grades are REQUIRED (not optional like Warning Post)

### Key Files

#### `src/App.tsx` (Type Definitions & Main App)
- All TypeScript interfaces for sign data
- Discriminated union: `type SignData = WayfindingSignData | WarningPostData | HardEasyPostData`
- Default data for each sign type
- Download handler with filename generation
- Logo definitions (NCC, Koata, NMTBC)

#### `src/SignForm.tsx` (Form UI)
- Handles all user input for sign configuration
- Type-specific form fields using conditional rendering
- Arrow direction selector (8-way: N, NE, E, SE, S, SW, W, NW)
- Grade selectors with grades 1-6

#### `src/SignPDF.tsx` (PDF Generation)
- All PDF rendering logic using @react-pdf/renderer
- Main router function that switches between sign types
- Individual render components: `WayfindingSign`, `WarningPost`, `HardEasyPost`
- Shared utilities:
  - `getGradeColor(grade)` - Returns color for grades 1-6
  - `getArrowRotation(direction)` - Maps direction to rotation degrees
  - `Arrow` component - Reusable SVG arrow (white, rotatable)
  - Activity icons: `Bike`, `Walker`
  - Warning symbols: `Danger`, `Warning`

#### `src/PersistentPDFViewer.tsx` (Custom PDF Preview)
- Replaces default @react-pdf/renderer PDFViewer
- Zoom controls that persist across updates
- Grouped UI: [−] [100%] [+] [Reset]
- **Chrome Fix**: Uses `key={pdfUrl}-${zoom}` to force iframe remount
- Zoom range: 25% to 300% in 25% increments

## Important Patterns & Conventions

### Grade Colors (Consistent Across All Signs)
```typescript
1: '#8BBF4B'  // Light Green
2: '#45A525'  // Bright Green
3: '#47ACEC'  // Cyan
4: '#1538A6'  // Deep Blue
5: '#27292E'  // Dark Gray
6: '#C63823'  // Red-Orange
```

### Arrow System
- 8 directions: N, NE, E, SE, S, SW, W, NW
- Rendered as white arrows in colored circles
- Rotation mapping: N=0°, NE=45°, E=90°, etc.
- Wayfinding: 315×315 circle
- Hard/Easy Post: 250×250 circle (smaller)

### PDF Dimensions
- Conversion: `MM_TO_PT = 72 / 25.4`
- Always use `size={[width * MM_TO_PT, height * MM_TO_PT]}`

## How to Add a New Sign Type

1. **Define Interface** (`src/App.tsx`)
   ```typescript
   export interface NewSignData {
     signType: 'newsign'
     // ... fields
   }
   ```

2. **Update Union Type** (`src/App.tsx`)
   ```typescript
   export type SignData = WayfindingSignData | WarningPostData | HardEasyPostData | NewSignData
   ```

3. **Add Default Data** (`src/App.tsx`)
   ```typescript
   export const defaultNewSignData: NewSignData = { ... }
   ```

4. **Add Form Fields** (`src/SignForm.tsx`)
   - Update `getDefaultDataForType()` to handle new type
   - Update `handleSignTypeChange` type parameter
   - Add `<option value="newsign">` to select
   - Add conditional form section: `{signData.signType === 'newsign' && <> ... </>}`

5. **Create PDF Component** (`src/SignPDF.tsx`)
   ```typescript
   function NewSign({signData}: NewSignProps) {
     return (
       <Document>
         <Page size={[width * MM_TO_PT, height * MM_TO_PT]}>
           {/* ... */}
         </Page>
       </Document>
     )
   }
   ```

6. **Update Router** (`src/SignPDF.tsx`)
   ```typescript
   case 'newsign':
     return <NewSign signData={signData} />
   ```

7. **Update Download Handler** (`src/App.tsx`)
   - Add filename logic for new sign type

## Hard/Easy Post Implementation Details

### Structure
- Two sections split 40%/40% (with 20% whitespace margin)
- Each section independently configured:
  - `topDirection` / `bottomDirection` (N, NE, E, SE, S, SW, W, NW)
  - `topWord` / `bottomWord` ('HARD' | 'EASY')
  - `topGrade` / `bottomGrade` (1-6, REQUIRED)

### Visual Layout
```
┌─────────────┐
│   Arrow ○   │ ← 250×250 white circle
│             │
│      H      │ ← Word split vertically
│      A      │    130px font, Overpass Bold
│      R      │
│      D      │
├─────────────┤ ← Section divider (40% mark)
│             │
│      E      │
│      A      │
│      S      │
│      Y      │
│             │
│   Arrow ○   │
└─────────────┘
```

### Key Styling Decisions
- Background color: `getGradeColor(topGrade)` / `getGradeColor(bottomGrade)`
- Arrow circle: 250×250 (smaller than Wayfinding's 315×315)
- Word positioning: `justifyContent: 'flex-start'` for consistent top alignment
- Sections: `height: '40%'` (not 50% - leaves margin)
- Font: Overpass Bold 130px
- **White Divider**: 10px white line appears between sections when `topGrade === bottomGrade` (helps distinguish sections visually when colors match)

### Default Data
```typescript
topDirection: 'W'
topWord: 'EASY'
topGrade: 3
bottomDirection: 'E'
bottomWord: 'HARD'
bottomGrade: 5
```

## Common Issues & Solutions

### PDF Zoom Not Working in Chrome
**Problem**: Chrome's PDF viewer doesn't update zoom from URL hash changes
**Solution**: Use `key` prop on iframe to force remount: `key={pdfUrl}-${zoom}`

### TypeScript Errors with SignData Union
**Problem**: Can't access properties that don't exist on all union members
**Solution**: Use type guards (`signData.signType === 'wayfinding'`) or explicit type assertions

### Form Field Not Updating
**Problem**: Conditional fields don't narrow TypeScript types automatically
**Solution**: Cast in onChange: `handleChange('field', value as SpecificType)`

### Hot Module Reload Issues
- @react-pdf/renderer components need `key` prop for proper updates
- File size changes may require full page reload
- Check dev server output for HMR success/failure

## Fonts
Located in `public/fonts/`:
- Open Sans Bold (700) - `open-sans-700.ttf`
- Open Sans Semi-Bold (600) - `open-sans-600.ttf`
- Overpass Bold (700) - `overpass-latin-700-normal.woff`

Registered in `SignPDF.tsx` using `Font.register()`

## Assets
Logo images in `src/img/`:
- `ncc.png` - Nelson City Council
- `koata.png` - Koata
- `nmtbc.png` - Nelson Mountain Bike Club

## State Management & Persistence

### localStorage Persistence
All three sign types maintain independent state that persists across sessions:

**Storage Structure** (`src/App.tsx:102-114`)
```typescript
interface StoredSignData {
  wayfinding: WayfindingSignData
  warning: WarningPostData
  hardeasy: HardEasyPostData
  activeType: SignType
}
```

**How It Works:**
1. Each sign type stores its own configuration independently
2. Switching between sign types preserves all values
3. Returns to last active sign type on page load
4. Data saved to `localStorage['nmtbc-sign-creator-state']`

**Implementation** (`src/App.tsx:213-227`):
- Saves to localStorage on every state change via `useEffect`
- Loads on mount with fallback chain: URL → localStorage → defaults

### URL-Based State Sharing
Share exact sign configurations via URL links:

**URL Format:**
```
http://localhost:5173/?data={encoded-json}
```

**Encoding** (`src/App.tsx:116-147`):
- JSON.stringify entire StoredSignData object
- encodeURIComponent for URL safety
- Single `?data=` query parameter

**Priority System** (`src/App.tsx:170-181`):
1. **URL parameters** (highest) - shared links
2. **localStorage** - previous work
3. **Default values** - first-time visitors

**Automatic URL Updates** (`src/App.tsx:218-223`):
- URL updates on every state change
- Uses `window.history.replaceState()` (no page reload)
- Copy URL from browser to share configuration

### Type Switching Logic
**Important**: When switching sign types, stored data is preserved (`src/App.tsx:147-164`):
```typescript
const handleUpdate = (data: SignData) => {
  setStoredData(prev => {
    // If switching types, use stored data (don't overwrite)
    if (data.signType !== prev.activeType) {
      return { ...prev, activeType: data.signType }
    }
    // Normal update - save to correct slot
    return { ...prev, [data.signType]: data, activeType: data.signType }
  })
}
```

This prevents `SignForm.tsx` default values from overwriting stored configurations.

## Future Improvements to Consider
- Batch PDF generation
- QR code generation for GPS coordinates
- Print layout optimization
