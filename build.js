const puppeteer = require('puppeteer')
const getUniqueRandomArray = require("get-unique-random-array").default
const randomInt = require('random-int');

const username = "rawgni@ingwar.eu.org"
const password = process.env.CROSS_PASS

async function run() {
    const browser = await puppeteer.launch({
        headless: true,
        env: {
            TZ: 'Europe/Warsaw',
        }
    })
    try {
        console.log("Running")
        const page = await browser.newPage();
        await page.goto('https://app.crossover.com/x/login')
        await page.waitForSelector('input[type="email"]')
        await page.goto('https://app.crossover.com/x/login')
        await page.type('input[type="email"]', username)
        await page.type('input[type="password"]', password)
        await page.click('button[type="submit"]')
        await page.waitForSelector('.checkin-chat')
        await page.goto('https://app.crossover.com/x/dashboard/contractor/checkin-chat')
        //.wait('.highcharts-series-group')
        await page.waitForSelector('checkin-metric-trend-popup')
        await page.click('td[class="unknown clickable"]')
        await page.click('span.ui-select-toggle')
        //.click('span.ui-select-choices-row-inner')
        await page.click('div.ui-select-choices-row')
        await page.type('textarea', generate_message())
        await page.waitFor(1000)
        await page.click('button[type="submit"]')
        console.log("All done")
        await page.waitFor(10000)
    } finally {
        await browser.close()
    }
}

function generate_message() {
    const lines = require('fs').readFileSync('reason_list.txt', 'utf-8').split(/\r?\n/)
    const numLines = randomInt(2, 6)
    console.log("Num lines: " + numLines)
    const randomLines = getUniqueRandomArray(lines, { size: numLines });
    return randomLines.join("\n")
}

run()
