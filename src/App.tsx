import { useState } from 'react'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import { SignForm } from './SignForm'
import { SignPDF } from './SignPDF'
import './App.css'

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
}

// Warning Post Data Structure
export interface WarningPostData {
  signType: 'warning'
  symbol: 'danger' | 'warning'
  title: string
  grade: 1 | 2 | 3 | 4 | 5 | 6
}

// Discriminated Union of all sign types
export type SignData = WayfindingSignData | WarningPostData

export type SignType = SignData['signType']

// Default data for each sign type
export const defaultWayfindingData: WayfindingSignData = {
  signType: 'wayfinding',
  trailName: 'Te Piki',
  grade: 4,
  gradeNote: 'Climb',
  distance: '1.2 km',
  distanceType: 'Uphill biking\nTwo way walking',
  latitude: -41.2971,
  longitude: 174.7222,
  arrowDirection: 'N',
  logo: null,
  bike: true,
  walk: true,
}

export const defaultWarningPostData: WarningPostData = {
  signType: 'warning',
  symbol: 'danger',
  title: 'JUMP',
  grade: 6,
}

function App() {
  const [signData, setSignData] = useState<SignData>(defaultWarningPostData)

  const handleDownload = async () => {
    const blob = await pdf(<SignPDF signData={signData} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    let filename = ''
    if (signData.signType === 'wayfinding') {
      const trailName = signData.trailName.toLowerCase().replace(/\s+/g, '-').replace(/\n/g, '-')
      filename = `${trailName}-wayfinding-sign.pdf`
    } else {
      const title = signData.title.toLowerCase().replace(/\s+/g, '-')
      filename = `${title}-warning-post.pdf`
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
        <SignForm signData={signData} onUpdate={setSignData} />
        <button className="download-button" onClick={handleDownload}>
          Download PDF
        </button>
      </div>
      <div className="preview-container">
        <h2>Preview</h2>
        <PDFViewer style={{ width: '100%', flex: 1, border: 'none', borderRadius: '8px' }}>
          <SignPDF signData={signData} />
        </PDFViewer>
      </div>
    </div>
  )
}

export default App
