const puppeteer = require('puppeteer');
const Product = require('../models/Product'); // Assuming your Product model is here
const User = require('../models/User'); // Assuming your User model is here

exports.productpost = async (req, res) => {
  const products = req.body; // Array of products coming in the request
  
  // Check if the body is an array and is not empty
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'No products provided in the request body' });
  }

  try {
    const userId = req.userId;  // Assuming the userId is in req.userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const { name: userName, email: userEmail } = user; // Get the user's name and email
    const savedProducts = []; // Array to hold the saved products
    const pdfBuffers = []; // Array to hold PDF buffers for each product

    let subtotal = 0;
    let gstTotal = 0;

    for (let product of products) {
      const { name, price, quantity } = product;

      if (!name || !price || !quantity) {
        return res.status(400).json({ message: 'All fields are required for each product' });
      }

      const total = price * quantity;
      const gst = total * 0.18;  // Assuming GST is 18%

      subtotal += total;
      gstTotal += gst;

      const newProduct = new Product({
        name,
        price,
        quantity,
        total,
        gst,
        userId: req.userId,  // Attach the logged-in userId
      });

      // Save the product to the database
      await newProduct.save();
      savedProducts.push(newProduct);
    }

    // Generate the invoice HTML with Tailwind
    const currentDate = new Date().toLocaleDateString();

    let productRows = '';
    products.forEach(product => {
      const { name, price, quantity } = product;
      const total = price * quantity;
      productRows += `
        <TableRow>
          <TableCell>${name}</TableCell>
          <TableCell class="text-right">${quantity}</TableCell>
          <TableCell class="text-right">₹${price}</TableCell>
          <TableCell class="text-right">₹${total}</TableCell>
        </TableRow>
      `;
    });

    const invoiceHTML = `
      <html>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
          <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-bold mb-2">INVOICE</h2>
              <p class="text-gray-600">Sample Output should be this</p>
            </div>

            <div class="mb-8">
              <h3 class="font-medium mb-2">Bill To:</h3>
              <p>${userName}</p>
              <p>${userEmail}</p>
            </div>

            <table class="min-w-full border-collapse">
              <thead>
                <tr>
                  <th class="text-left">Product</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right">Rate</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${productRows}
                <tr>
                  <td colspan="3" class="text-right font-medium">Sub-Total</td>
                  <td class="text-right">₹${subtotal}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right font-medium">GST (18%)</td>
                  <td class="text-right">₹${gstTotal}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right font-medium">Total Amount</td>
                  <td class="text-right font-bold">₹${subtotal + gstTotal}</td>
                </tr>
              </tbody>
            </table>

            <div class="mt-8 text-center text-gray-600 text-sm">
              <p>Thank you for your business!</p>
              <p>For any queries, please contact support@levitation.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Generate the PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(invoiceHTML);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    // Send the PDF as a response with appropriate headers
    res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF invoice' });
  }
};

