import React from 'react'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

const InvoiceDownload = ({ invoice }) => {
  const generatePDF = () => {
    const { customerDetails, items } = invoice
    const doc = new jsPDF()

   
    doc.setFont("helvetica", "bold")


    doc.setFontSize(24)
    doc.setTextColor(88, 80, 236) // Purple color
    doc.text('INVOICE', 105, 15, { align: 'center' })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(33, 33, 33) 

    
    doc.text('Bill To:', 20, 30)
    doc.setFont("helvetica", "bold")
    doc.text(`${customerDetails.name}`, 20, 35)
    doc.setFont("helvetica", "normal")
    doc.text(`${customerDetails.address}`, 20, 40)
    doc.text(`${customerDetails.email}`, 20, 45)


    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 190, 30, { align: 'right' })
    doc.text(`Invoice Number: INV-${Math.floor(Math.random() * 1000000)}`, 190, 35, { align: 'right' })


    const tableColumn = ['Description', 'Quantity', 'Price', 'Total']
    const tableRows = items.map((item) => [
      item.description,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.quantity * item.price).toFixed(2)}`,
    ])

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: 'grid',
      headStyles: { 
        fillColor: [88, 80, 236],
        textColor: 255,
        fontStyle: 'bold'
      },
      bodyStyles: { 
        textColor: 33,
        fontSize: 10
      },
      alternateRowStyles: { 
        fillColor: [248, 248, 248]
      },
    })


    const finalY = doc.lastAutoTable.finalY + 10
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax

    doc.setFontSize(10)
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 190, finalY, { align: 'right' })
    doc.text(`Tax (10%): $${tax.toFixed(2)}`, 190, finalY + 7, { align: 'right' })
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(88, 80, 236) // Purple color
    doc.text(`Total: $${total.toFixed(2)}`, 190, finalY + 14, { align: 'right' })


    doc.save('invoice.pdf')
  }

  return (
    <Button onClick={generatePDF} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
      <Download className="mr-2 h-4 w-4" /> Download PDF
    </Button>
  )
}

export default InvoiceDownload

