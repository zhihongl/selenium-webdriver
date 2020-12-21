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

      // await driver.manage().window().maximize();

      await driver.get(rootURL);
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

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const actual = await anchor.getText();
      await anchor.click();
      const expected = await driver.current_url;
      // expect(expected).stringContaining(projectURLPartial);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await driver.quit();
    }
  },
  10000000000000000n
);
