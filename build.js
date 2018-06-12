const { Chromeless } = require('chromeless')

const username = "rawgni@ingwar.eu.org"
const password = process.env.CROSS_PASS

const chromeless = new Chromeless({
    debug: true,
    implicitWait: true,
    waitTimeout: 20000
})

async function run() {
    console.log("Running")
    await chromeless
        .goto('https://app.crossover.com/x/login')
        .wait('input[type="email"]')
        .goto('https://app.crossover.com/x/login')
        .type(username, 'input[type="email"]')
        .type(password, 'input[type="password"]')
        .click('button[type="submit"]')
        .wait('.checkin-chat')
        .goto('https://app.crossover.com/x/dashboard/contractor/checkin-chat')
        //.wait('.highcharts-series-group')
        .wait('checkin-metric-trend-popup')
        .click('td[class="unknown clickable"]')
        .click('span.ui-select-toggle')
        //.click('span.ui-select-choices-row-inner')
        .click('div.ui-select-choices-row')
//        .type('Done test', 'textarea')
        .wait(1000)
        .click('button[type="submit"]')
        .wait(10000)
    await chromeless.end()
}

async function close() {
    await console.error.bind(console)
    //console.log("Clearing queue")
    //chromeless.queue.comandQueue = {};
    //chromeless.queue.lastWaitAll = null;
    //chromeless.lastReturnPromise = null;
    await chromeless.end()
    console.log("Emergency close done")
}

run()
    .catch(() => close())
    .catch(console.error.bind(console))
