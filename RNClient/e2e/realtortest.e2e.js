describe('Realtor Test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should test realtor login', async () => {
    //Login Page
    await expect(element(by.text('Apartment Rental App'))).toBeVisible();

    // Getting the reference and typing
    await element(by.id('email')).typeText('singlewindowsearch@gmail.com');
    await element(by.id('password')).typeText('testing');

    //Press Login
    await element(by.id('login')).tap();

    //Verify Login successful
    await expect(element(by.text('Apartment Rentals Home'))).toBeVisible();
    await expect(element(by.text('Apartment Rental App'))).toNotExist();
  });

  it('should test apartment addition', async () => {
    //Add an apartment
    await element(by.id('addapartment')).tap();
    await element(by.id('apartmentname')).typeText('Test Apartment 5');
    await element(by.id('apartmentdescription')).typeText('this is an automatically added apartment');
    await element(by.id('apartmentarea')).typeText('100');
    await element(by.id('apartmentprice')).typeText('150');
    await element(by.id('apartmentrooms')).typeText('3');
    await element(by.id('apartmentrented')).tap();

    await element(by.id('apartmentscroll-view')).swipe('up');
    await element(by.id('apartmentgeocodadrs')).typeText('All India Institute of Medical Sciences, New Delhi, India');
    await element(by.id('apartmentsubmit')).multiTap(2);

    //Apartment added
    await expect(element(by.text('Apartment successfully added'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
  });
    
  it('should test apartment deletion', async () => {
    await element(by.id('apartmentlistscroll-view')).swipe('up');
    await element(by.id('apartmentdelete4')).tap();
    await expect(element(by.text('Apartment successfully deleted'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
  });

  it('should test realtor logout', async () => {
    //Logout
    await element(by.id('logout')).tap();
    //Login Page
    await expect(element(by.text('Apartment Rental App'))).toBeVisible();

  });

});