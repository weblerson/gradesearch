const chromium = require('chrome-aws-lambda');

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    })
}



function Scrap(){
    user = {
    RA: document.getElementById('RA').value,
    Password: document.getElementById('Password').value
    }
}

exports.handler = (async() => {
    const portal = "http://inscricoes.fundacaomatiasmachline.org.br/corpore.net/Login.aspx"

    const browser = await chromium.puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
    });

    const page = await browser.newPage()

    async function keys(key, times){
        for(let i = 0; i < times; i++){
            await page.keyboard.press(key)
            delay(100)
        }
    }

    await page.goto(portal)
    await page.type('#txtUser', "195675")
    await page.type('#txtPass', "Seujaowfx1@@")
    await page.click('#btnLogin')

    await delay(8000)

    await page.click('.description')

    await delay(10000)
    
    const userName = await page.evaluate(() => {
        return document.querySelector('#ctl24_ctl03_ctl00_xrpAluno_lblNomeAluno').innerText
    })

    console.log(userName)

    await delay(3000)

    await page.click('#ctl09_ctl00_tvAccordionContents_ctl00_ctl04__CaptionCell')

    await delay(8000)

    keys('Tab', 3)
    delay(200)

    keys('ArrowUp', 1)
})()