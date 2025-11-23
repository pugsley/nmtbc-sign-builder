import { PDFDocument, rgb, degrees } from 'pdf-lib'
import { SignData } from './App'

export async function generateSignPDF(signData: SignData): Promise<Uint8Array> {
  // Load the template PDF
  const templateUrl = '/signs.pdf'
  const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer())
  const templatePdf = await PDFDocument.load(existingPdfBytes)

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()

  // Copy the page corresponding to the grade (pages are 0-indexed, grades are 1-6)
  const pageIndex = signData.grade - 1
  const [templatePage] = await pdfDoc.copyPages(templatePdf, [pageIndex])
  const page = pdfDoc.addPage(templatePage)

  const { width, height } = page.getSize()

  // Embed a font (using Helvetica Bold which should be similar to the original)
  const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold')
  const helvetica = await pdfDoc.embedFont('Helvetica')

  // Now we need to overlay the custom text
  // We'll need to clear the old text areas first by drawing white rectangles
  // Then draw the new text

  // Clear and redraw trail name area (large text in the middle-left)
  page.drawRectangle({
    x: 40,
    y: height - 500,
    width: width - 80,
    height: 200,
    color: rgb(0, 0, 0),
    opacity: 0, // Transparent - just measuring
  })

  // Draw trail name (split into lines if needed)
  const trailNameLines = signData.trailName.split('\n')
  const trailNameFontSize = 80
  const trailNameY = height - 380

  trailNameLines.forEach((line, index) => {
    page.drawText(line, {
      x: 60,
      y: trailNameY - (index * 90),
      size: trailNameFontSize,
      font: helveticaBold,
      color: rgb(1, 1, 1), // White text
    })
  })

  // Draw grade text
  page.drawText(signData.grade === 1 ? 'Grade 1 Tech' :
                signData.grade === 2 ? 'Grade 2 Tech' :
                signData.grade === 3 ? 'Grade 3 Tech' :
                signData.grade === 4 ? 'Grade 4 Tech' :
                signData.grade === 5 ? 'Grade 5 Tech' :
                'Grade 6 Tech', {
    x: 60,
    y: height - 580,
    size: 50,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  })

  // Draw distance text
  const distanceText = `${signData.distance} km ${signData.distanceType}`
  page.drawText(distanceText, {
    x: 60,
    y: height - 650,
    size: 35,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  })

  // Draw location coordinates at the bottom
  const longitudeText = `${Math.abs(signData.longitude).toFixed(4)}° ${signData.longitude >= 0 ? 'E' : 'W'}`
  const latitudeText = `${Math.abs(signData.latitude).toFixed(4)}° ${signData.latitude >= 0 ? 'N' : 'S'}`

  page.drawText(`Location: ${longitudeText}, ${latitudeText}`, {
    x: 60,
    y: 60,
    size: 16,
    font: helvetica,
    color: rgb(1, 1, 1),
  })

  // Handle logo if provided
  if (signData.logo) {
    try {
      // Convert base64 to bytes
      const logoBytes = await fetch(signData.logo).then(res => res.arrayBuffer())

      // Determine image type and embed
      let logoImage
      if (signData.logo.includes('data:image/png')) {
        logoImage = await pdfDoc.embedPng(logoBytes)
      } else if (signData.logo.includes('data:image/jpeg') || signData.logo.includes('data:image/jpg')) {
        logoImage = await pdfDoc.embedJpg(logoBytes)
      }

      if (logoImage) {
        const logoDims = logoImage.scale(0.3)
        page.drawImage(logoImage, {
          x: width - logoDims.width - 40,
          y: 40,
          width: logoDims.width,
          height: logoDims.height,
        })
      }
    } catch (error) {
      console.error('Error embedding logo:', error)
    }
  }

  // Save the PDF
  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
