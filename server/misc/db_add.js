require("dotenv").config();
const pool = require("../config/db");

async function addToDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        category VARCHAR(100),
        image VARCHAR(500),
        submittedBy VARCHAR(100)
      );
    `);

    const items = [
      {
        id: 1,
        title: "How to Find Your Niche",
        text: "Tips on identifying the right niche for your business.",
        category: "Market Research",
        image: "https://businessmarketingengine.com/wp-content/uploads/2016/03/Depositphotos_12451252_s-2015.jpg",
        submittedBy: "Jane Doe",
      },
      {
        id: 2,
        title: "Building a Strong Team",
        text: "Strategies for assembling a dedicated team.",
        category: "Team Building",
        image: "https://www.babbelforbusiness.com/wp-content/uploads/2024/02/teambuilding.jpg",
        submittedBy: "John Smith",
      },
      {
        id: 3,
        title: "Developing a Business Plan",
        text: "Key components of an effective business plan.",
        category: "Planning",
        image: "https://www.hillwebcreations.com/wp-content/uploads/2020/12/creating-an-effective-business-plan-for-start-ups-2020s.jpg",
        submittedBy: "Alice Johnson",
      },
      {
        id: 4,
        title: "Securing Funding",
        text: "Options for financing your startup.",
        category: "Funding",
        image: "https://cityofpt.us/sites/default/files/styles/gallery500/public/imageattachments/finance/page/92/finance_graphic.jpg?itok=kTY-y8sx",
        submittedBy: "Robert Brown",
      },
      {
        id: 5,
        title: "Marketing Strategies for Startups",
        text: "How to market your new business effectively.",
        category: "Marketing",
        image: "https://www.intandemcommunications.co.uk/wp-content/uploads/2019/08/What-is-marketing.jpg",
        submittedBy: "Emily Davis",
      },
    ];

    await pool.query("DELETE FROM items");

    for (const item of items) {
      await pool.query(
        `INSERT INTO items (title, text, category, image, submittedBy)
         VALUES ($1, $2, $3, $4, $5)`,
        [item.title, item.text, item.category, item.image, item.submittedBy]
      );
    }

    console.log("added stuff to db");
  } catch (err) {
    console.error("Error adding to db:", err);
  } finally {
    pool.end();
  }
}

addToDB();
