// backend/index.js
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const ScriptController =require('./controllers/ScriptController');
const sequelize = require('./config/database');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/save-script',ScriptController.save)

app.post('/run-script', async (req, res) => {
  const { scenario } = req.body;

  if (!Array.isArray(scenario)) {
    return res.status(400).json({ status: 'Error', message: 'Senaryo geçerli bir dizi değil' });
  }

  try {
    const browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport:null,
      args:['--start-maximized']

    });
    const page = await browser.newPage();

    for (let action of scenario) {
      switch (action.type) {
        case 'goto':
          await page.goto(action.params.url);
          break;
        case 'click':
          await page.click(action.params.selector);
          break;
        case 'wait':
          await page.waitForTimeout(action.params.time);
          break;
        case 'type':
          await page.type(action.params.selector, action.params.text);
          break;
        case 'keyboardPress':
          await page.keyboard.press(action.params.key);
          break;
        case 'screenshot':
          await page.screenshot({ path: action.params.path });
          break;
        case 'waitForSelector':
          await page.waitForSelector(action.params.selector);
          break;
        case 'waitForSelectorHidden':
          await page.waitForSelector(action.params.selector, { hidden: true });
          break;
        case 'newPage':
          await browser.newPage();
          break;
        case 'reload':
          await page.reload();
          break;
        case 'scroll':
          await page.evaluate((x, y) => window.scrollBy(x, y), action.params.x, action.params.y);
          break;
        case 'submit':
          await page.$eval(action.params.selector, form => form.submit());
          break;
        case 'getText':
          const text = await page.$eval(action.params.selector, el => el.textContent);
          console.log('Element text content:', text);
          break;
        default:
          console.log(`Unsupported action type: ${action.type}`);
      }
    }

    await browser.close();
    res.json({ status: 'Success', message: 'Senaryo başarıyla çalıştırıldı!' });
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message });
  }
});
sequelize.sync({force:false})
.then(()=>{
  console.log('Database connection has been established successfully.');
}).catch(()=>{
  console.error('Unable to connect to the database:', error);
})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
