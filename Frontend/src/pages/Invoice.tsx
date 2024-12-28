import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

export function InvoicePage() {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Button 
            variant="ghost" 
            className="text-lime-400 hover:text-lime-300"
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </div>

        <Card className="border-0 shadow-2xl bg-white">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">INVOICE</h2>
                <p className="text-gray-600">Sample Output should be this</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Date: {currentDate}</p>
                <p className="text-gray-600">Invoice #: INV-2024-001</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-2">Bill To:</h3>
              <p>John Doe</p>
              <p>john.doe@example.com</p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Product 1</TableCell>
                  <TableCell className="text-right">2</TableCell>
                  <TableCell className="text-right">₹100</TableCell>
                  <TableCell className="text-right">₹200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product 2</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">₹150</TableCell>
                  <TableCell className="text-right">₹150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Sub-Total</TableCell>
                  <TableCell className="text-right">₹350</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">GST (18%)</TableCell>
                  <TableCell className="text-right">₹63</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Total Amount</TableCell>
                  <TableCell className="text-right font-bold">₹413</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-8 text-center text-gray-600 text-sm">
              <p>Thank you for your business!</p>
              <p>For any queries, please contact support@levitation.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}