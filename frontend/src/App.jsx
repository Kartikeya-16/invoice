'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'
import InvoiceDownload from './components/InvoiceDownload'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'

export default function Home() {
  const [invoiceData, setInvoiceData] = useState(null)

  const handleInvoiceSubmit = async (data) => {
    setInvoiceData(data)
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to save invoice')
      }
    } catch (error) {
      console.error('Error saving invoice:', error)
      // You can add a toast notification here to inform the user of the error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <Card className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
            <CardTitle className="text-3xl font-bold text-center">
              Invoice Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <InvoiceForm onSubmit={handleInvoiceSubmit} />
          </CardContent>
        </Card>
        {invoiceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <InvoicePreview invoice={invoiceData} />
            <div className="mt-4 flex justify-end">
              <InvoiceDownload invoice={invoiceData} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

