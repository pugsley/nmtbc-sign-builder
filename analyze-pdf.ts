// Script to analyze the template PDF and extract text positions
import { PDFDocument } from 'pdf-lib'
import * as fs from 'fs'

async function analyzePDF() {
  const pdfBytes = fs.readFileSync('./signs.pdf')
  const pdfDoc = await PDFDocument.load(pdfBytes)

  console.log('PDF Analysis:')
  console.log('=============')
  console.log(`Number of pages: ${pdfDoc.getPageCount()}`)

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i)
    const { width, height } = page.getSize()

    console.log(`\nPage ${i + 1} (Grade ${i + 1}):`)
    console.log(`  Size: ${width} x ${height} points`)

    // Get page content - this will help us understand the structure
    const content = page.node.Contents()
    console.log(`  Has content streams: ${content ? 'Yes' : 'No'}`)
  }
}

analyzePDF().catch(console.error)
