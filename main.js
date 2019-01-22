const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless:false,
    // slowMo:50,
    appMode:true,
    ignoreHTTPSErrors: true,
    devtools:true
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height:800,
  })
  await new Promise(resolve => setTimeout(resolve, 1000));

  const client = await page.target().createCDPSession();
  await client.send('Network.emulateNetworkConditions',{
    'offline':false,
    'downloadThroughput':50 * 1024,
    'uploadThroughput': 20 * 1024,
    'latency': 500,
  })
  await page.goto('https://tokyo2020shop.jp/user_data/banner/cp/O10571.png',{timeout: 0});
  // await browser.close();
})();