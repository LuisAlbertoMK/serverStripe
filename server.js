// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NOlofEg8nFeK6NCYFm9FST2EY3m3PbUkEXJgIOEdF8WJ44UtQtZtry1wCK1MIQrAQmiQWbp8zTYQSqWazh88al80091NAHBAc');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));


const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    if (whiteList.includes(origin)) {
      callback(null, origin);  // Retornamos el origen específico, no todos
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization'
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const YOUR_DOMAIN = 'https://serverstripe.onrender.com';

const whiteList=['https://speed-pro-desarrollo.web.app','http://localhost:4200'];
app.post('/checkout', async (req, res) => {
  const items = req.body.items.map((item)=>{
    return {
      price_data: {
        currency: 'MXN',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }
  })
  const session = await stripe.checkout.sessions.create({
    line_items: [...items],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  })

  res.status(200).json(session);
 
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));