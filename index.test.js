const { Builder, By, Key, until, logging } = require("selenium-webdriver");
require("selenium-webdriver/chrome");
require("selenium-webdriver/firefox");
require("chromedriver");
require("geckodriver");
const { querySelector } = require("./helpers");

const rootURL =
  "https://www.kickstarter.com/discover/advanced?category_id=46&sort=popularity";
let driver;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5;
const projectURLPartial = "/projects/mkc/coding-hiro";

// beforeAll(async () => {
//   driver = await new Builder().forBrowser("firefox").build();
// });

// afterAll(async () => driver.quit());

// it("initialises the context", async () => {
//   await driver.get(rootURL);
// });

test(
  "should click on project to open a project",
  async () => {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // var options = new firefox.Options();
      // options.addArguments("-private");
      // var prefs = new logging.Preferences();
      // prefs.setLevel(logging.Type.BROWSER, logging.Level.INFO);

      driver = await new Builder()
        // .setFirefoxOptions(options)
        // .setLoggingPrefs(prefs)
        .forBrowser("firefox")
        .build();
      console.log("1. Browser built.");
      // await driver.manage().window().maximize();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await driver.get(rootURL);
      console.log("2. Main page opened.");
      const anchor = await querySelector(
        `[href*='${projectURLPartial}']`,
        driver
      );

      if (!anchor) {
        await driver.get(rootURL);
        const anchor = await querySelector(
          `[href*='${projectURLPartial}']`,
          driver
        );
      }
      console.log("3. Anchor selected.");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const actual = await anchor.getText();
      await anchor.click();
      console.log("4. Anchor clicked.");
      const expected = await driver.current_url;
      // expect(expected).stringContaining(projectURLPartial);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await driver.quit();
      console.log("5. Browser closed.\n");
      await new Promise((resolve) => setTimeout(resolve, 1000 * 60));
    }
  },
  10000000000000000n
);
