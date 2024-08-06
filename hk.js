const puppeteer = require("puppeteer");

const codeObj = require("./codes");

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "dora.2026993@gmail.com";
const password = "neha@007";

let browserOpened = puppeteer.launch( {
    headless:false,
    args:["--startmiximized"],
    defaultViewport : null
});

let page;

browserOpened.then(function(browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab) {
    page = newTab;
    let hackerrankOpenPromise = newTab.goto("https://www.hackerrank.com/auth/login");
    return hackerrankOpenPromise;
}).then(function() {
    let emailIsEntered = page.type("input[type='text']",email,{delay:50})
    return emailIsEntered;
}).then(function() {
    let passwordIsEntered = page.type("input[type='password']",password,{delay:50})
    return passwordIsEntered;
}).then(function () {
    let loginButtonClicked = page.click("button[data-analytics='LoginPassword']",{delay:50});
    return loginButtonClicked;
}).then(function() {
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
    return clickOnAlgoPromise;
}).then(function() {
    let goToWarmUp = waitAndClick("input[value='warmup']",page);
    return goToWarmUp;
// }).then(function() {
//     let waitFor3Seconds = page.waitFor(3000);
//     return waitFor3Seconds;
}).then(function() {
    let allChallengesPromise = page.$$('.challenge-submit-btn', {delay:50}) ;
    return allChallengesPromise;
}).then(function(questionsArr) {
    console.log('number of question',questionsArr.length);
    let questionWillBeSolved= questionSolver(page,questionsArr[0],codeObj.answers[0]);
    return questionWillBeSolved
}).then(function() {

})


//wait for page open to click on selector
function waitAndClick(selector , cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function() {
            let clickModel = cPage.click(selector);
            return clickModel;
        }).then(function() {
            resolve();
        }).catch(function (err){
            reject();
        })
    })
}

function questionSolver(page, question ,  answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function() {
            let EditorInFocusPromise  = waitAndClick('.hr-monaco-editor-parent',page);
            return EditorInFocusPromise;
        }).then(function() {
            return waitAndClick('.checkbox-input',page);
        }).then(function() {
            return page.waitForSelector('.input.text-area.custominput.auto-width',page);
        }).then(function() {
            return page.type('.input.text-area.custominput.auto-width',answer , {delay:10});
        }).then(function() {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then (function() {
            let AIsPressed = page.keyboard.press("A",{delay:100});
            return AIsPressed;
        }).then(function() {
            let XIsPressed = page.keyboard.press("X" , { delay: 100});
            return XIsPressed;
        }).then(function() {
            let ctrlIsUnPressed = page.keyboard.up("Control");
            return ctrlIsUnPressed;
        }).then(function() {
            let mainEditorInFocus = waitAndClick(".hr-monaco-editor-parent",page);
            return mainEditorInFocus;
        }).then(function() {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function() {
            let AIsPressed = page.keyboard.press("A",{delay:100});
            return AIsPressed;
        }).then(function() {
            let VIsPressed = page.keyboard.press("v",{delay:100});
            return VIsPressed;
        }).then(function() {
            let ctrlIsUnPressed = page.keyboard.up("Control");
            return ctrlIsUnPressed;
        }).then(function() {
            return page.click('.ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled',{delay:50});
        // }).then(function() {
        //     return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',{delay:50});
        })
        .then(function() {
            resolve();
        }).catch(function(err) {
            reject();
        })
    })
}

