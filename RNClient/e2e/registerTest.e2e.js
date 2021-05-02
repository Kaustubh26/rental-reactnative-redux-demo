describe('Register', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should test user registration', async () => {
    //Login Page
    await expect(element(by.text('Apartment Rental App'))).toBeVisible();

    // Click on Register
    await element(by.id('register')).tap();

    //Register details
    await element(by.id('useremail')).typeText('testingadmin2@test.com');
    await element(by.id('username')).typeText('Testing Admin2');
    await element(by.id('userpassword')).typeText('testing');
    await element(by.id('userconfirmpassword')).typeText('testing');
    await element(by.id('userrole')).setColumnToValue(0, "Realtor looking to post");
    await element(by.id('usersubmit')).multiTap(2);

    //Verification Email sent
    await expect(element(by.text("Verification Email sent. Verify your email and continue"))).toBeVisible();

    await element(by.label("OK")).atIndex(0).tap();
  });

});