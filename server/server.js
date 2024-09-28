const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let items = [
  {
    id: 1,
    title: 'How to Find Your Niche',
    text: 'Tips on identifying the right niche for your business.',
    category: 'Market Research',
    image: 'https://businessmarketingengine.com/wp-content/uploads/2016/03/Depositphotos_12451252_s-2015.jpg',
    submittedBy: 'Jane Doe',
  },
  {
    id: 2,
    title: 'Building a Strong Team',
    text: 'Strategies for assembling a dedicated team.',
    category: 'Team Building',
    image: 'https://www.babbelforbusiness.com/wp-content/uploads/2024/02/teambuilding.jpg',
    submittedBy: 'John Smith',
  },
  {
    id: 3,
    title: 'Developing a Business Plan',
    text: 'Key components of an effective business plan.',
    category: 'Planning',
    image: 'https://www.hillwebcreations.com/wp-content/uploads/2020/12/creating-an-effective-business-plan-for-start-ups-2020s.jpg',
    submittedBy: 'Alice Johnson',
  },
  {
    id: 4,
    title: 'Securing Funding',
    text: 'Options for financing your startup.',
    category: 'Funding',
    image: 'https://cityofpt.us/sites/default/files/styles/gallery500/public/imageattachments/finance/page/92/finance_graphic.jpg?itok=kTY-y8sx',
    submittedBy: 'Robert Brown',
  },
  {
    id: 5,
    title: 'Marketing Strategies for Startups',
    text: 'How to market your new business effectively.',
    category: 'Marketing',
    image: 'https://www.intandemcommunications.co.uk/wp-content/uploads/2019/08/What-is-marketing.jpg',
    submittedBy: 'Emily Davis',
  }
];


app.get('/', (req, res) => {
  res.send('<h1>Business Guide API/h1>');
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
