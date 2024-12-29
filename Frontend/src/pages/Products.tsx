import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/slices/productslice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon } from 'lucide-react';
import { Logo } from '@/components/Logo';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function ProductsPage() {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const token = useSelector((state: any) => state.auth.token);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      const productData = {
        id: Date.now(),
        name: newProduct.name,
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
        total: Number(newProduct.price) * Number(newProduct.quantity),
        gst: (Number(newProduct.price) * Number(newProduct.quantity)) * 0.18,
      };

      dispatch(addProduct(productData));
      setNewProduct({ name: '', price: '', quantity: '' });
    }
  };

  const calculateTotal = () => {
    const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const gst = subtotal * 0.18;
    return { subtotal, gst, total: subtotal + gst };
  };

  const generatePDFInvoice = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', products, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
        responseType: 'blob', // Expect the response to be a file (PDF)
      });
  
      // Create a download link for the PDF file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');  // Specify the file name
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Button variant="ghost" className="text-lime-400 hover:text-lime-300" onClick={() => navigate('/login')}>
            Logout
          </Button>
        </div>

        <Card className="border-0 shadow-2xl bg-gray-800/50 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Add Products</CardTitle>
            <CardDescription className="text-gray-400">
              Add your products to generate an invoice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="name" className="text-white">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter the product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-white">Product Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter the price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="quantity" className="text-white">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter the Qty"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <Button onClick={handleAddProduct} className="bg-lime-500 hover:bg-lime-600 text-gray-900">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </CardContent>
        </Card>

        {products.length > 0 && (
          <Card className="border-0 shadow-2xl bg-gray-800/50 backdrop-blur">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Product name</TableHead>
                    <TableHead className="text-white text-right">Price</TableHead>
                    <TableHead className="text-white text-right">Quantity</TableHead>
                    <TableHead className="text-white text-right">Total Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="text-gray-300">{product.name}</TableCell>
                      <TableCell className="text-gray-300 text-right">₹{product.price}</TableCell>
                      <TableCell className="text-gray-300 text-right">{product.quantity}</TableCell>
                      <TableCell className="text-gray-300 text-right">₹{product.price * product.quantity}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium text-white">Sub-Total</TableCell>
                    <TableCell className="text-right text-white">₹{calculateTotal().subtotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium text-white">GST (18%)</TableCell>
                    <TableCell className="text-right text-white">₹{calculateTotal().gst.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium text-white">Total Amount</TableCell>
                    <TableCell className="text-right font-bold text-lime-400">₹{calculateTotal().total.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 flex justify-center">
                <Button onClick={generatePDFInvoice} className="bg-lime-500 hover:bg-lime-600 text-gray-900 px-8">
                  Generate PDF Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
