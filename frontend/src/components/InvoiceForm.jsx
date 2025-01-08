import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Receipt, User, Mail, MapPin, Building2, Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';

const InvoiceForm = ({ onSubmit }) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    email: '',
    company: ''
  });
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: name === 'description' ? value : Number(value) };
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ customerDetails, items });
  };

  const calculateTotal = () => items.reduce((total, item) => total + (item.quantity * item.price), 0);
  const calculateSubtotal = () => calculateTotal();
  const calculateTax = () => calculateTotal() * 0.1;
  const calculateGrandTotal = () => calculateSubtotal() + calculateTax();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Create New Invoice</h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
     
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-8">
                  <User className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-semibold text-gray-800">Customer Details</h2>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: Building2, name: "company", label: "Company Name", placeholder: "Enter company name" },
                    { icon: User, name: "name", label: "Contact Name", placeholder: "Enter contact name" },
                    { icon: Mail, name: "email", label: "Email Address", placeholder: "Enter email address", type: "email" },
                    { icon: MapPin, name: "address", label: "Billing Address", placeholder: "Enter billing address" }
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <Label className="inline-flex items-center text-sm font-medium text-gray-700 mb-2">
                        <field.icon className="w-4 h-4 text-blue-500 mr-2" />
                        {field.label}
                      </Label>
                      <Input
                        name={field.name}
                        type={field.type || "text"}
                        value={customerDetails[field.name]}
                        onChange={handleCustomerChange}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

        
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <Receipt className="w-6 h-6 text-blue-500" />
                    <h2 className="text-2xl font-semibold text-gray-800">Invoice Items</h2>
                  </div>
                  <Button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 inline-flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-12">
                            <Label className="text-sm font-medium text-gray-700">Description</Label>
                            <Input
                              name="description"
                              value={item.description}
                              onChange={(e) => handleItemChange(e, index)}
                              className="mt-1"
                              placeholder="Item description"
                            />
                          </div>
                          <div className="md:col-span-6">
                            <Label className="text-sm font-medium text-gray-700">Quantity</Label>
                            <Input
                              name="quantity"
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(e, index)}
                              className="mt-1"
                              min="1"
                            />
                          </div>
                          <div className="md:col-span-6">
                            <Label className="text-sm font-medium text-gray-700">Price</Label>
                            <Input
                              name="price"
                              type="number"
                              value={item.price}
                              onChange={(e) => handleItemChange(e, index)}
                              className="mt-1"
                              min="0"
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="bg-red-100 hover:bg-red-200 text-red-600 inline-flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>


          <Card className="shadow-lg mt-8">
            <CardContent className="p-6">
              <div className="flex justify-end">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span className="mr-8">Subtotal:</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="mr-8">Tax (10%):</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-xl font-bold text-blue-900">
                      <span className="mr-8">Total:</span>
                      <span>${calculateGrandTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit Invoice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;