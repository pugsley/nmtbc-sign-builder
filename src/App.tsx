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

// Wayfinding Sign Data Structure
export interface WayfindingSignData {
  signType: 'wayfinding'
  trailName: string
  grade: 1 | 2 | 3 | 4 | 5 | 6
  gradeNote: string
  distance: string
  distanceType: string
  latitude: number
  longitude: number
  arrowDirection: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'
  logo: string | null
  bike: boolean
  walk: boolean
  logoToggles: Record<string, boolean>
}

// Warning Post Data Structure
export interface WarningPostData {
  signType: 'warning'
  symbol: 'danger' | 'warning'
  title: string
  grade?: 1 | 2 | 3 | 4 | 5 | 6
}

// Hard/Easy Post Data Structure
export interface HardEasyPostData {
  signType: 'hardeasy'
  topDirection: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'
  topWord: 'HARD' | 'EASY'
  topGrade: 1 | 2 | 3 | 4 | 5 | 6
  bottomDirection: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'
  bottomWord: 'HARD' | 'EASY'
  bottomGrade: 1 | 2 | 3 | 4 | 5 | 6
}

// Discriminated Union of all sign types
export type SignData = WayfindingSignData | WarningPostData | HardEasyPostData

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
  logo: null,
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

// Storage structure to hold all three sign types
interface StoredSignData {
  wayfinding: WayfindingSignData
  warning: WarningPostData
  hardeasy: HardEasyPostData
  activeType: SignType
}

const defaultStoredData: StoredSignData = {
  wayfinding: defaultWayfindingData,
  warning: defaultWarningPostData,
  hardeasy: defaultHardEasyPostData,
  activeType: 'wayfinding',
}

// Serialize storedData to URL parameter
const serializeToUrl = (data: StoredSignData): string => {
  try {
    const json = JSON.stringify(data)
    return encodeURIComponent(json)
  } catch (error) {
    console.error('Error encoding to URL:', error)
    return ''
  }
}

// Deserialize from URL parameter
const deserializeFromUrl = (): StoredSignData | null => {
  try {
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('data')
    if (!encoded) return null

    const json = decodeURIComponent(encoded)
    const parsed = JSON.parse(json)

    // Validate structure
    if (!parsed || !parsed.wayfinding || !parsed.warning || !parsed.hardeasy || !parsed.activeType) {
      return null
    }

    return parsed as StoredSignData
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
    if (!parsed || !parsed.wayfinding || !parsed.warning || !parsed.hardeasy || !parsed.activeType) {
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
  // Try URL first
  const urlData = deserializeFromUrl()
  if (urlData) return urlData

  // Then localStorage
  const storedData = loadFromLocalStorage()
  if (storedData) return storedData

  // Finally defaults
  return defaultStoredData
}

function App() {
  // Load all sign data with priority: URL > localStorage > defaults
  const [storedData, setStoredData] = useState<StoredSignData>(() => {
    return loadInitialData()
  })

  // Track the last active type to detect type switches
  const [lastActiveType, setLastActiveType] = useState<SignType>(storedData.activeType)

  // Get the current sign data based on active type
  const signData = storedData[storedData.activeType]

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
        [data.signType]: data,
        activeType: data.signType,
      }
    })
  }

  // Save all sign data to localStorage and URL whenever it changes
  useEffect(() => {
    try {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData))

      // Only update URL if we didn't just switch types (URL was already cleared)
      const justSwitchedTypes = storedData.activeType !== lastActiveType
      if (!justSwitchedTypes) {
        // Update URL with new data
        const encoded = serializeToUrl(storedData)
        if (encoded) {
          const newUrl = `${window.location.pathname}?data=${encoded}`
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
