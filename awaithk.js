const puppeteer = require("puppeteer");

const codeObj = require("./codes");

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "dora.2026993@gmail.com";
const password = "neha@007";



(async function() {
    try {
        let browserInstance = await puppeteer.launch( {
            headless:false,
            args:["--startmiximized"],
            defaultViewport : null
        });

        let newTab = await browserInstance.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[type='text']",email,{delay:50});
        await newTab.type("input[type='password']",password,{delay:50});
        await newTab.click("button[data-analytics='LoginPassword']",{delay:50});
        await waitAndClick('.topic-card a[data-attr1="algorithms"]',newTab);
        await waitAndClick("input[value='warmup']",newTab);
        let allChallenges = await newTab.$$('.challenge-submit-btn', {delay:50})
        console.log("Total questions" , allChallenges.length);
    } catch (error) {
        console.log(error);
    }
})()

async function waitAndClick(selector,cPage) {
    await cPage.waitForSelector(selector);
    let selectorClick = cPage.click(selector);
    return selectorClick;
}


