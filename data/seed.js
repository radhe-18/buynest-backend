require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

function makeSlug(s) {
  return slugify(s, { lower: true, strict: true });
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // clear
  await Category.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  // categories (9)
  const catDefs = [
    { name: 'Grocery & Staples', slug: 'grocery' },
    { name: 'Fruits & Vegetables', slug: 'fruits' },
    { name: 'Dairy & Bakery', slug: 'dairy' },
    { name: 'Beverages', slug: 'beverages' },
    { name: 'Snacks & Branded Foods', slug: 'snacks' },
    { name: 'Personal Care', slug: 'personal-care' },
    { name: 'Home Care', slug: 'home-care' },
    { name: 'Baby & Kids', slug: 'baby-kids' },
    { name: 'Household & Kitchen', slug: 'household-kitchen' },
  ];

  const cats = await Category.create(catDefs);
  console.log('Categories created:', cats.map(c => c.slug).join(', '));

  // product name lists (25 each)
  // Grocery
  const groceryNames = [
    "Basmati Rice 1kg",
    "Wheat Flour (Atta) 5kg",
    "Toor Dal 1kg",
    "Moong Dal 1kg",
    "Chana Dal 1kg",
    "Sugar 1kg",
    "Salt Iodized 1kg",
    "Refined Sunflower Oil 1L",
    "Mustard Oil 1L",
    "Soya Chunks 500g",
    "Poha 1kg",
    "Semolina (Rava) 1kg",
    "Besan 1kg",
    "Masoor Dal 1kg",
    "Sona Masoori Rice 5kg",
    "Idli Rava 1kg",
    "Rice Flour 1kg",
    "Jowar Flour 1kg",
    "Ragi Flour 1kg",
    "Multigrain Flour 1kg",
    "Chakki Atta 5kg",
    "Honey Natural 500g",
    "Jaggery 1kg",
    "Tea Leaves (Assam) 250g",
    "Coffee Powder 200g"
  ];

  // Fruits & Vegetables
  const fruitsNames = [
    "Apple (Washington) 1kg",
    "Banana (Cavendish) 1 dozen",
    "Orange 1kg",
    "Mango (Alphonso) 1kg",
    "Grapes 1kg",
    "Pomegranate 1kg",
    "Watermelon 1pc",
    "Papaya 1pc",
    "Tomato 1kg",
    "Potato 1kg",
    "Onion 1kg",
    "Carrot 1kg",
    "Cauliflower 1pc",
    "Cucumber 1pc",
    "Spinach 250g",
    "Green Chilli 250g",
    "Ginger 250g",
    "Garlic 250g",
    "Bell Pepper (Capsicum) 500g",
    "Brinjal (Eggplant) 1kg",
    "Sweet Corn 3 pcs",
    "Lemon 250g",
    "Coriander 100g",
    "Mint 100g",
    "Beetroot 1kg"
  ];

  // Dairy & Bakery
  const dairyNames = [
    "Amul Toned Milk 1L",
    "Fresh Curd 500g",
    "Amul Butter 200g",
    "Paneer 250g",
    "Cheese Slices 200g",
    "Ghee (Desi) 500g",
    "Yogurt Cup 100g",
    "Brown Bread 400g",
    "White Bread 400g",
    "Eggs (12 pcs)",
    "Milk Powder 500g",
    "Flavored Yogurt 150g",
    "Cream 200ml",
    "Doughnuts Pack",
    "Croissant",
    "Bun (6 pcs)",
    "Muffin Pack",
    "Sliced Cake 500g",
    "Curd Drink 200ml",
    "Paneer Cubes 200g",
    "Sour Cream 200g",
    "Buttermilk 1L",
    "Khoa 250g",
    "Lassi Sweet 250ml",
    "Bakery Cookies 200g"
  ];

  // Beverages
  const beveragesNames = [
    "Coca Cola 500ml",
    "Pepsi 500ml",
    "Sprite 500ml",
    "Tropicana Mango 1L",
    "Tropicana Orange 1L",
    "Real Fruit Juice 1L",
    "Bisleri Mineral Water 1.5L",
    "Kinley Soda 1L",
    "Nescafe Classic 100g",
    "Bru Instant Coffee 100g",
    "Tea Bags 100 pcs",
    "Green Tea 25 bags",
    "Cold Coffee 200ml",
    "Lemonade 1L",
    "Energy Drink 250ml",
    "Horlicks 500g",
    "Bournvita 500g",
    "Milo 400g",
    "Iced Tea Bottle 500ml",
    "Apple Juice 1L",
    "Sparkling Water 750ml",
    "Coconut Water 1L",
    "Herbal Tea 20 bags",
    "Protein Shake 500g",
    "Kashmiri Kahwa 100g"
  ];

  // Snacks & Branded Foods
  const snacksNames = [
    "Lays Classic 52g",
    "Kurkure Masala 60g",
    "Haldiram Namkeen 200g",
    "Maggi 2-Min Noodles (pack)",
    "Oreo Cookies 90g",
    "Parle-G 200g",
    "Bingo Mad Angles 60g",
    "Pringles 165g",
    "Britannia Cake 200g",
    "Hershey Chocolate 100g",
    "Cadbury Dairy Milk 60g",
    "KitKat 4-finger",
    "Peanut Chikki 200g",
    "Roasted Peanuts 200g",
    "Trail Mix 200g",
    "Corn Flakes 500g",
    "Instant Soup 50g",
    "Protein Bar",
    "Salted Cashews 200g",
    "Almonds 200g",
    "Dates 500g",
    "Honey Roasted Peanuts 200g",
    "Soya Chips 150g",
    "Popcorn 100g",
    "Chocolate Chips 200g"
  ];

  // Personal Care
  const personalNames = [
    "Dove Beauty Bar 75g",
    "Lifebuoy Handwash 500ml",
    "Colgate Toothpaste 150g",
    "Pepsodent Toothpaste 150g",
    "Palmolive Shampoo 200ml",
    "Sunsilk Shampoo 180ml",
    "Nivea Body Lotion 200ml",
    "Dettol Soap 75g",
    "Gillette Shaving Foam 200ml",
    "Himalaya Face Wash 100ml",
    "Vaseline Petroleum Jelly 100g",
    "Pampers Baby Wipes 80pcs",
    "Nivea Men Deodorant 150ml",
    "Mamaearth Face Cream 50g",
    "Forest Essentials Soap",
    "Oral-B Toothbrush",
    "Sunscreen SPF50 100ml",
    "Hand Sanitizer 200ml",
    "Hair Oil 200ml",
    "Conditioner 200ml",
    "Face Moisturizer 50g",
    "Lip Balm",
    "Perfume Small 50ml",
    "Makeup Remover Wipes",
    "Nail Clipper Set"
  ];

  // Home Care
  const homecareNames = [
    "Surf Excel Detergent 1kg",
    "Tide Soap 400g",
    "Vim Dishwash Liquid 500ml",
    "Harpic Toilet Cleaner 500ml",
    "Lizol Floor Cleaner 1L",
    "Colin Glass Cleaner 500ml",
    "Dettol Disinfectant 500ml",
    "Floor Mop",
    "Garbage Bags 20pcs",
    "Dishwashing Bar 200g",
    "Mosquito Coil 10pcs",
    "Air Freshener Spray 300ml",
    "Bleach 1L",
    "Scrub Sponge 2pcs",
    "Duster Cloth 5pcs",
    "Cleaning Brush",
    "Washing Powder 2kg",
    "Foam Cleaner 400ml",
    "Hand Gloves (pair)",
    "Shoe Polish 100g",
    "Window Wiper",
    "Carpet Cleaner 500ml",
    "Storage Boxes (set)",
    "Aluminium Foil 10m",
    "Plastic Wrap 20m"
  ];

  // Baby & Kids
  const babyNames = [
    "Pampers Diapers M 44pcs",
    "Huggies Diapers L 36pcs",
    "Johnson's Baby Oil 200ml",
    "Johnson's Baby Powder 100g",
    "Baby Lotion 200ml",
    "Baby Soap 75g",
    "Baby Wipes 72pcs",
    "Baby Shampoo 200ml",
    "Diaper Rash Cream 50g",
    "Baby Food Jar 125g",
    "Toddler Snack Pack",
    "Sippy Cup",
    "Baby Feeding Bottle",
    "Teether Toy",
    "Baby Blanket",
    "Baby Powder Puff",
    "Baby Detergent 500g",
    "Baby Bibs 3pcs",
    "Pacifier Set",
    "Baby Nail Scissors",
    "Infant Formula 400g",
    "Baby Wet Wipes",
    "Stroller Cover",
    "Baby Spoon Set",
    "Soft Toy"
  ];

  // Household & Kitchen
  const householdNames = [
    "Steel Scrubber 5pcs",
    "Microfiber Cloth 3pcs",
    "Stainless Steel Tawa",
    "Non-stick Kadai",
    "Gas Lighter",
    "Garbage Can 10L",
    "Tupperware Set",
    "Cutlery Set 16pcs",
    "Plastic Storage Jar 1L",
    "Kitchen Knife 8 inch",
    "Chopping Board",
    "Peeler",
    "Measuring Cups",
    "Thermos Flask 1L",
    "Oil Dispenser",
    "Colander",
    "Baking Tray",
    "Oven Mitts",
    "Dish Rack",
    "Spice Box",
    "Rolling Pin",
    "Silicone Spatula",
    "Matches Box",
    "Candle Pack",
    "Clothespins 50pcs"
  ];

  // array of arrays aligned with cats order
  const namesByCat = [
    groceryNames,
    fruitsNames,
    dairyNames,
    beveragesNames,
    snacksNames,
    personalNames,
    homecareNames,
    babyNames,
    householdNames
  ];

  const products = [];

  for (let ci = 0; ci < cats.length; ci++) {
    const cat = cats[ci];
    const names = namesByCat[ci];

    // base price and increments by category to feel realistic
    let base = 50;
    switch (cat.slug) {
      case 'grocery': base = 80; break;
      case 'fruits': base = 60; break;
      case 'dairy': base = 40; break;
      case 'beverages': base = 45; break;
      case 'snacks': base = 30; break;
      case 'personal-care': base = 120; break;
      case 'home-care': base = 90; break;
      case 'baby-kids': base = 150; break;
      case 'household-kitchen': base = 200; break;
      default: base = 60;
    }

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const slug = makeSlug(name);
      // price varying a bit
      const price = Math.round((base + i * (Math.random() * 0.6 + 0.2)) * 10) / 10;
      const mrp = Math.round((price * (1 + (Math.random() * 0.25 + 0.05))) * 10) / 10;
      const stock = Math.floor(Math.random() * 80) + 10;

      // image path - uses folder per category
      const imageIndex = (i % 25) + 1; // 1..25
      const image = `/products/${cat.slug}/${cat.slug}-${imageIndex}.jpg`;

      products.push({
        name,
        slug,
        description: `${name} — premium quality, fresh and carefully selected. Ideal for daily use and perfect value for money.`,
        price,
        mrp,
        image,
        category: cat._id,
        countInStock: stock
      });
    }
  }

  // create all products
  await Product.create(products);
  console.log('Products created:', products.length);

  // create admin user
  const adminPass = await bcrypt.hash('admin123', 10);
  await User.create({
    name: 'Admin',
    email: 'admin@buynest.test',
    password: adminPass,
    isAdmin: true
  });
  console.log('Admin user created: admin@buynest.test / admin123');

  console.log('Seed finished');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
