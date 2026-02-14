import { useState, useEffect } from 'react'
import { pdf } from '@react-pdf/renderer'
import { SignForm } from './SignForm'
import { SignPDF } from './SignPDF'
import { PersistentPDFViewer } from './PersistentPDFViewer'
import './App.css'
import nccLogo from './img/ncc.png'
import koataLogo from './img/koata.png'
import nmtbcLogo from './img/nmtbc.png'

const STORAGE_KEY = 'nmtbc-sign-creator-state'

// Logo Data Structure
export interface LogoDefinition {
  id: string
  name: string
  image: string
}

export const LOGOS: LogoDefinition[] = [
  { id: 'ncc', name: 'NCC', image: nccLogo },
  { id: 'koata', name: 'Koata', image: koataLogo },
  { id: 'nmtbc', name: 'NMTBC', image: nmtbcLogo },
]

// Common Types
export type Grade = 1 | 2 | 3 | 4 | 5 | 6
export type ArrowDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'
export type WarningSymbol = 'danger' | 'warning'
export type HardEasyWord = 'HARD' | 'EASY'

// Wayfinding Sign Data Structure
export interface WayfindingSignData {
  signType: 'wayfinding'
  trailName: string
  grade: Grade
  gradeNote: string
  distance: string
  distanceType: string
  latitude: number
  longitude: number
  arrowDirection: ArrowDirection
  bike: boolean
  walk: boolean
  logoToggles: Record<string, boolean>
}

// Warning Post Data Structure
export interface WarningPostData {
  signType: 'warning'
  symbol: WarningSymbol
  title: string
  grade?: Grade
}

// Hard/Easy Post Data Structure
export interface HardEasyPostData {
  signType: 'hardeasy'
  topDirection: ArrowDirection
  topWord: HardEasyWord
  topGrade: Grade
  bottomDirection: ArrowDirection
  bottomWord: HardEasyWord
  bottomGrade: Grade
}

// Small Wayfinding Sign Data Structure
export type SmallWayfindingBackground = Grade | 'nograde' | 'warning' | 'danger'

export interface SmallWayfindingSignData {
  signType: 'smallwayfinding'
  trailName: string
  background: SmallWayfindingBackground
  arrowDirection?: ArrowDirection
  activityDescription: string
  latitude?: number
  longitude?: number
  printGuides: boolean
}

// Discriminated Union of all sign types
export type SignData = WayfindingSignData | WarningPostData | HardEasyPostData | SmallWayfindingSignData

export type SignType = SignData['signType']

// Default data for each sign type
export const defaultWayfindingData: WayfindingSignData = {
  signType: 'wayfinding',
  trailName: 'Te Piki',
  grade: 4,
  gradeNote: 'Climb',
  distance: '1.2 km',
  distanceType: 'Uphill biking (priority)\nTwo way walking',
  latitude: -41.2971,
  longitude: 174.7222,
  arrowDirection: 'N',
  bike: true,
  walk: true,
  logoToggles: Object.fromEntries(LOGOS.map(logo => [logo.id, true])),
}

export const defaultWarningPostData: WarningPostData = {
  signType: 'warning',
  symbol: 'danger',
  title: 'JUMP',
  grade: 6,
}

export const defaultHardEasyPostData: HardEasyPostData = {
  signType: 'hardeasy',
  topDirection: 'W',
  topWord: 'EASY',
  topGrade: 3,
  bottomDirection: 'E',
  bottomWord: 'HARD',
  bottomGrade: 5,
}

export const defaultSmallWayfindingData: SmallWayfindingSignData = {
  signType: 'smallwayfinding',
  trailName: 'Te Piki',
  background: 4,
  arrowDirection: 'N',
  activityDescription: '',
  latitude: -41.2971,
  longitude: 174.7222,
  printGuides: false,
}

// Storage structure to hold all sign types
interface StoredSignData {
  activeType: SignType
  data: {
    wayfinding: WayfindingSignData
    warning: WarningPostData
    hardeasy: HardEasyPostData
    smallwayfinding: SmallWayfindingSignData
  }
}

const defaultStoredData: StoredSignData = {
  activeType: 'wayfinding',
  data: {
    wayfinding: defaultWayfindingData,
    warning: defaultWarningPostData,
    hardeasy: defaultHardEasyPostData,
    smallwayfinding: defaultSmallWayfindingData,
  },
}

// Serialize only the active sign type to URL parameter
const serializeToUrl = (signData: SignData): string => {
  try {
    return `data=${encodeURIComponent(JSON.stringify(signData))}`
  } catch (error) {
    console.error('Error encoding to URL:', error)
    return ''
  }
}

// Deserialize from URL parameter - returns only the active sign type data
const deserializeFromUrl = (): SignData | null => {
  try {
    const params = new URLSearchParams(window.location.search)
    const dataStr = params.get('data')

    if (!dataStr) return null

    const data = JSON.parse(dataStr) as SignData

    // Validate that it has a signType
    if (!data.signType) {
      return null
    }

    return data
  } catch (error) {
    console.error('Error decoding from URL:', error)
    return null
  }
}

// Load all sign data from localStorage with validation
const loadFromLocalStorage = (): StoredSignData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored)

    // Validate structure
    if (!parsed || !parsed.activeType || !parsed.data ||
        !parsed.data.wayfinding || !parsed.data.warning ||
        !parsed.data.hardeasy || !parsed.data.smallwayfinding) {
      return null
    }

    return parsed as StoredSignData
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}

// Load initial data with priority: URL > localStorage > defaults
const loadInitialData = (): StoredSignData => {
  // Start with localStorage or defaults
  const storedData = loadFromLocalStorage() || defaultStoredData

  // If URL has data, merge it in and set as active type
  const urlData = deserializeFromUrl()
  if (urlData) {
    return {
      activeType: urlData.signType,
      data: {
        ...storedData.data,
        [urlData.signType]: urlData,
      },
    }
  }

  return storedData
}

function App() {
  // Load all sign data with priority: URL > localStorage > defaults
  const [storedData, setStoredData] = useState<StoredSignData>(() => {
    return loadInitialData()
  })

  // Track the last active type to detect type switches
  const [lastActiveType, setLastActiveType] = useState<SignType>(storedData.activeType)

  // Get the current sign data based on active type
  const signData = storedData.data[storedData.activeType]

  // Update handler that saves to the correct slot
  const handleUpdate = (data: SignData) => {
    setStoredData(prev => {
      // If switching sign types, use stored data for that type (don't overwrite with defaults)
      if (data.signType !== prev.activeType) {
        // Clear URL when switching types (rely on localStorage instead)
        window.history.replaceState({}, '', window.location.pathname)
        setLastActiveType(data.signType)

        return {
          ...prev,
          activeType: data.signType,
        }
      }

      // Normal field update - save the data to the correct slot
      return {
        ...prev,
        activeType: data.signType,
        data: {
          ...prev.data,
          [data.signType]: data,
        },
      }
    })
  }

  // Save all sign data to localStorage and URL whenever it changes
  useEffect(() => {
    try {
      // Save to localStorage (all sign types)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData))

      // Only update URL if we didn't just switch types (URL was already cleared)
      const justSwitchedTypes = storedData.activeType !== lastActiveType
      if (!justSwitchedTypes) {
        // Update URL with only the active sign type data
        const params = serializeToUrl(storedData.data[storedData.activeType])
        if (params) {
          const newUrl = `${window.location.pathname}?${params}`
          window.history.replaceState({}, '', newUrl)
        }
      } else {
        // Update lastActiveType for next render
        setLastActiveType(storedData.activeType)
      }
    } catch (error) {
      console.error('Error saving to localStorage/URL:', error)
    }
  }, [storedData, lastActiveType])

  const handleDownload = async () => {
    const blob = await pdf(<SignPDF signData={signData} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    let filename = ''
    if (signData.signType === 'wayfinding') {
      const trailName = signData.trailName.toLowerCase().replace(/\s+/g, '-').replace(/\n/g, '-')
      filename = `${trailName}-wayfinding-sign.pdf`
    } else if (signData.signType === 'warning') {
      const title = signData.title.toLowerCase().replace(/\s+/g, '-')
      filename = `${title}-warning-post.pdf`
    } else if (signData.signType === 'smallwayfinding') {
      const trailName = signData.trailName.toLowerCase().replace(/\s+/g, '-').replace(/\n/g, '-')
      filename = `${trailName}-small-wayfinding-sign.pdf`
    } else {
      const topWord = signData.topWord.toLowerCase()
      const topDirection = signData.topDirection.toLowerCase()
      const topGrade = signData.topGrade
      const bottomWord = signData.bottomWord.toLowerCase()
      const bottomDirection = signData.bottomDirection.toLowerCase()
      const bottomGrade = signData.bottomGrade
      filename = `${topWord}-${topDirection}-${topGrade}-${bottomWord}-${bottomDirection}-${bottomGrade}.pdf`
    }

    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <div className="form-container">
        <h1>NMTBC Trail Sign Creator</h1>
        <p>Configure your trail sign below. Preview updates automatically.</p>
        <SignForm signData={signData} onUpdate={handleUpdate} />
        <button className="download-button" onClick={handleDownload}>
          Download PDF
        </button>
      </div>
      <div className="preview-container">
        <h2>Preview</h2>
        <PersistentPDFViewer signData={signData} style={{ width: '100%', flex: 1 }} />
      </div>
    </div>
  )
}

export default App
