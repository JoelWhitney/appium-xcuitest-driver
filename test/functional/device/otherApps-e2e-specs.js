import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { MOCHA_TIMEOUT, initSession, deleteSession, hasDefaultPrebuiltWDA } from '../helpers/session';
import { MULTIPLE_APPS, amendCapabilities } from '../desired';

chai.should();
chai.use(chaiAsPromised);

describe('OtherApps', function() {
  this.timeout(MOCHA_TIMEOUT);

  let caps;

  let driver;
  before(function() {
    caps = amendCapabilities(MULTIPLE_APPS, {
      'appium:usePrebuiltWDA': hasDefaultPrebuiltWDA(),
      'appium:wdaStartupRetries': 0,
    });
  });

  afterEach(async function() {
    // try to get rid of the driver, so if a test fails the rest of the
    // tests aren't compromised
    await deleteSession();
  });

  it('should start and stop a session', async function() {
    driver = await initSession(caps);
    await driver.isAppInstalled('io.appium.TestApp').should.eventually.be.equal(true);
    await driver.isAppInstalled('com.example.apple-samplecode.UICatalog').should.eventually.be.equal(true);
  });
});
