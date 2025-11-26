import { useEffect, useState, useRef } from 'react'
import { pdf } from '@react-pdf/renderer'
import { SignPDF } from './SignPDF'
import { SignData } from './App'

interface PersistentPDFViewerProps {
  signData: SignData
  style?: React.CSSProperties
}

export function PersistentPDFViewer({ signData, style }: PersistentPDFViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string>('')
  const [zoom, setZoom] = useState(100)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    let mounted = true
    let objectUrl = ''

    const generatePdf = async () => {
      try {
        const blob = await pdf(<SignPDF signData={signData} />).toBlob()
        if (mounted) {
          objectUrl = URL.createObjectURL(blob)
          setPdfUrl(objectUrl)
        }
      } catch (error) {
        console.error('Error generating PDF:', error)
      }
    }

    generatePdf()

    return () => {
      mounted = false
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [signData])

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <div style={{
        display: 'flex',
        gap: '12px',
        padding: '8px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px 8px 0 0',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => handleZoomChange(Math.max(25, zoom - 25))}
            style={{
              padding: '6px 12px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            −
          </button>
          <span style={{
            minWidth: '60px',
            textAlign: 'center',
            fontSize: '14px',
            padding: '0 8px',
            color: '#333',
            fontWeight: '500',
          }}>
            {zoom}%
          </span>
          <button
            onClick={() => handleZoomChange(Math.min(300, zoom + 25))}
            style={{
              padding: '6px 12px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            +
          </button>
        </div>
        <button
          onClick={() => handleZoomChange(100)}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
      {pdfUrl && (
        <iframe
          key={`${pdfUrl}-${zoom}`}
          ref={iframeRef}
          src={`${pdfUrl}#zoom=${zoom}`}
          style={{
            flex: 1,
            border: 'none',
            borderRadius: '0 0 8px 8px',
            minHeight: '600px',
          }}
          title="PDF Preview"
        />
      )}
    </div>
  )
}
