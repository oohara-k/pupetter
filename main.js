const puppeteer = require('puppeteer');
const delay = require('delay');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height:800,
    })
    console.log('---------- goto yahoo.co.jp ----------');
    await page.goto('https://www.yahoo.co.jp/');
    await delay(1000);
    await page.screenshot({path: 'yahoo.png'});
    console.log('---------- wait and click ----------');
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'load'}),
        page.click('#topicsfb > div.topicsindex > ul.emphasis > li:nth-child(1) > a'),
    ])

    await page.screenshot({path: 'news.png'});

    console.log('---------- evaluate ----------');
    const h2Title = await page.evaluate(() =>
      document.querySelector('h2.newsTitle').textContent
    );
    console.log(h2Title);
    console.log('---------- close ----------');

    await browser.close();
})();