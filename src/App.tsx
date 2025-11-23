import { useState } from 'react'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import { SignForm } from './SignForm'
import { SignPDF } from './SignPDF'
import './App.css'

export interface SignData {
  trailName: string
  grade: 1 | 2 | 3 | 4 | 5 | 6
  distance: string
  distanceType: 'One Way' | 'Two Way'
  latitude: number
  longitude: number
  arrowDirection: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'
  logo: string | null
  bike: boolean
  walk: boolean
}

function App() {
  const [signData, setSignData] = useState<SignData>({
    trailName: 'Te Ara\nWhakaheke',
    grade: 5,
    distance: '1.4 km',
    distanceType: 'One Way',
    latitude: -41.2971,
    longitude: 174.7222,
    arrowDirection: 'N',
    logo: null,
    bike: true,
    walk: true,
  })

  const handleDownload = async () => {
    const blob = await pdf(<SignPDF signData={signData} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${signData.trailName.replace(/\s+/g, '-')}-sign.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <div className="form-container">
        <h1>MTB Trail Sign Creator</h1>
        <p>Configure your trail sign below. Preview updates automatically.</p>
        <SignForm signData={signData} onUpdate={setSignData} />
      </div>
      <div className="preview-container">
        <h2>Preview</h2>
        <PDFViewer style={{ width: '100%', flex: 1, border: 'none', borderRadius: '8px' }}>
          <SignPDF signData={signData} />
        </PDFViewer>
        <button className="download-button" onClick={handleDownload}>
          Download PDF
        </button>
      </div>
    </div>
  )
}

export default App
