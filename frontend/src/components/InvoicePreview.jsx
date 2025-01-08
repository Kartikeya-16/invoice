import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Separator } from './ui/separator'

const InvoicePreview = ({ invoice }) => {
  const { customerDetails, items } = invoice

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
          <CardTitle className="text-2xl font-bold">Invoice Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-purple-700">Customer Details</h4>
              <p className="text-gray-700"><span className="font-medium">Name:</span> {customerDetails.name}</p>
              <p className="text-gray-700"><span className="font-medium">Address:</span> {customerDetails.address}</p>
              <p className="text-gray-700"><span className="font-medium">Email:</span> {customerDetails.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-right">
              <h4 className="font-semibold text-lg mb-2 text-purple-700">Invoice Details</h4>
              <p className="text-gray-700">Invoice Date: {new Date().toLocaleDateString()}</p>
              <p className="text-gray-700">Invoice Number: INV-{Math.floor(Math.random() * 1000000)}</p>
            </div>
          </div>
          <Separator className="my-6" />
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-100">
                <TableHead className="font-semibold text-purple-700">Description</TableHead>
                <TableHead className="text-right font-semibold text-purple-700">Quantity</TableHead>
                <TableHead className="text-right font-semibold text-purple-700">Price</TableHead>
                <TableHead className="text-right font-semibold text-purple-700">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-end">
            <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg text-purple-700">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default InvoicePreview

