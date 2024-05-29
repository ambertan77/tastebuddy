## Taste Buddy
TasteBuddy is a mobile app that aims to help students at NUS make informed food choices. The app guides their decision by taking into consideration their nutrition and budget goals.

### Deployment
An apple device is required to deploy our app. The following applications must be installed in order for Taste Buddy to be deployed:
- Expo Go
- React Native
- Any Command Line Interface (CLI)

In the CLI, run the following code to launch the app on Expo Go:
```
npx expo start
```

### Testing
After launching Taste Buddy on Expo Go, the following test cases can be used to check if the current implementation of the app is working well (each bullet point describes a "test > expected outcome"):
1. Welcome Page
..* Click on the Login Button > User is redirected to Login Page and can key in Login credentials
..* Click on Sign up Button > User is redirected to Sign up Page to create a new account
2. Sign up page
..* Type in all three fields accurately and click on Sign up button > Keyboard does not block & user is directed to Home Page upon successful account creation
..* Click on sign up button with missing fields > New account is not created, user stays on Sign up page & error message is displayed 
..* Attempt to create a new account with an existing email in the database > New account is not created, user stays on Sign up page & error message is displayed
..* Attempt to sign up with invalid email address (not in the email address format) > New account is not created, user stays on Sign up page & error message is displayed
..* Click on the Log in Button > User is redirected to Login Page and can key in Login credentials
3. Log in page
..* Attempt to login with an email that has not been registered > Login fails, user stays on Login page & error message is displayed
..* Attempt to login with wrong login password > Login fails, user stays on Login page & error message is displayed
..* Attempt to login with invalid email address (not in the email address format) > Login fails, user stays on Login page & error message is displayed
..* Attempt to login with missing fields > Login fails, user stays on Login page & error message is displayed
..* Type correct email and password and click on Login button > Keyboard does not block the two fields & user is directed to Home Page upon successful login
..* Click on Sign up button > User is redirected to Sign up Page and can key in Sign up information