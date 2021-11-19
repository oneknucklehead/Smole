import bcrypt from 'bcryptjs'
const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    sizes: ['S', 'M', 'L', 'XL'],
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    sizes: ['S', 'M', 'L', 'XL'],

    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    sizes: ['S', 'M', 'L', 'XL'],

    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    sizes: ['S', 'M', 'L', 'XL'],

    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    sizes: ['S', 'M', 'L', 'XL'],

    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    sizes: ['S', 'M', 'L', 'XL'],
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
]

const shops = [
  {
    name: "zoheb's",
    tagline: 'The World’s Most Comfortable Shoes',
    description: 'best high quality products on sale',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },
    paymentQR: '/images/QR.jpg',
    paymentUPI: '8420317786@paytm',

    products: [...products],
  },
  {
    name: "Zoya's",
    tagline: 'Monthly Beauty and Grooming Subscription Boxes',
    description: 'More than a beauty box',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },
    paymentQR: '/images/QR.jpg',
    paymentUPI: '8420317786@paytm',

    products: [...products],
  },
  {
    name: "Chamar's",
    tagline: 'Naam pe mat jao',
    description: 'best low quality products at the highest price',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },
    paymentQR: '/images/QR.jpg',
    paymentUPI: '8420317786@paytm',

    products: [...products],
  },
  {
    name: "ashu's",
    tagline:
      'Menswear Founded on Fit, Built on Service, and Focused on Style. However You Fit, Bonobos Fits You.',
    description: 'best bike at the lowest price',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },
    paymentQR: '/images/QR.jpg',
    paymentUPI: '8420317786@paytm',

    products: [...products],
  },
  {
    name: "Yashu's",
    tagline: 'Awesome Products. No Nonsense.',
    description: 'best Georgian education at the lowest price',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },
    paymentQR: '/images/QR.jpg',
    paymentUPI: '8420317786@paytm',

    products: [...products],
  },
  {
    name: 'Belly',
    tagline: '100% dark',
    description: 'best Dark chocolate at the lowest price',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },
    paymentQR: '/images/QR.jpg',
    paymentUPI: '8420317786@paytm',
    products: [...products],
  },
]
export default shops
