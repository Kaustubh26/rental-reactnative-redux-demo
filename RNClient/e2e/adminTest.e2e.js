describe('Admin Test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should test admin login', async () => {
    //Login Page
    await expect(element(by.text('Apartment Rental App'))).toBeVisible();

    // Getting the reference and typing
    await element(by.id('email')).typeText('kaustubh91@gmail.com');
    await element(by.id('password')).typeText('testing');

    //Press Login
    await element(by.id('login')).tap();

    //Verify Login successful
    await expect(element(by.text('Apartment Rentals Home'))).toBeVisible();
    await expect(element(by.text('Apartment Rental App'))).toNotExist();
  });

  it('should test user addition', async () => {
    //Press User Tab
    await element(by.text('users')).tap();

    //Add a user
    await element(by.id('adduser')).tap();
    await element(by.id('useremail')).typeText('testingadmin@test.com');
    await element(by.id('username')).typeText('Testing Admin');
    await element(by.id('userpassword')).typeText('testing');
    await element(by.id('userconfirmpassword')).typeText('testing');
    await element(by.id('userrole')).setColumnToValue(0, "Realtor looking to post");
    await element(by.id('usersubmit')).multiTap(2);

    //Verification Email sent
    await expect(element(by.text('Verification Email sent to user'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
  });

  it('should test user deletion', async () => {
    //Scroll down and find user
    await element(by.id('userlistscroll-view')).swipe('up');
    await expect(element(by.text('Testing Admin'))).toBeVisible();
    await element(by.id('userdelete4')).tap();
    await expect(element(by.text('User successfully deleted'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
  });

  it('should test admin logout', async () => {
    //Logout
    await element(by.id('logout')).tap();
    //Login Page
    await expect(element(by.text('Apartment Rental App'))).toBeVisible();
  });

});
