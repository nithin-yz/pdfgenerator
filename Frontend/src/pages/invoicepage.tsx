import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from "../components/Button"
export function InvoicePage() {
  const [invoiceHtml, setInvoiceHtml] = useState('');
  const navigate = useNavigate();

  // Sample invoice HTML (you would get this from the backend or generate it in your frontend)
  useEffect(() => {
    const fetchInvoiceHtml = async () => {
      try {
        // Fetch invoice HTML content from your backend
        const response = await axios.post('http://localhost:5000/api/products', products, {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token if required
          }
        });
        setInvoiceHtml(response.data.html);  // Set the HTML content returned from the backend
      } catch (error) {
        console.error("Error fetching invoice HTML:", error);
      }
    };

    fetchInvoiceHtml();
  }, []);

  // Function to generate and download the PDF
  const generatePDFInvoice = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-pdf', { htmlContent: invoiceHtml }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Expecting a PDF file in the response
      });

      // Create a link to download the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');  // Specify the filename for the download
      document.body.appendChild(link);
      link.click(); // Programmatically click the link to trigger the download
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="text-lime-400 hover:text-lime-300"
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </div>

        {/* Display HTML Invoice Preview */}
        <div className="bg-white p-8" dangerouslySetInnerHTML={{ __html: invoiceHtml }} />

        {/* Button to download PDF */}
        <div className="flex justify-center mt-8">
          <Button onClick={generatePDFInvoice} className="bg-lime-500 hover:bg-lime-600 text-gray-900 px-8">
            Download PDF Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
