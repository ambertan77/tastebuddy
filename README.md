# Taste Buddy
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

### Unit & Integration Testing with Jest
To conduct unit and integration testing with Jest, change the root directory in the package.json file ("jest" > "setupFiles", "jest" > "resolver"), then you can run the following code in your CLI:
```
npm run test
```

If you would like to run the test by folders, you can run the following code in your CLI:
```
npx jest <path to the __tests__ file>
```
Replace the <path to the tests file> with your path to the tests file you want to test for. 

### System Testing
After launching Taste Buddy on Expo Go, the following test cases can be used to check if the current implementation of the app is working well (each bullet point describes a "test > expected outcome"):
#### Welcome Page
1. Click on the Login Button > User is redirected to Login Page and can key in Login credentials
2. Click on Sign up Button > User is redirected to Sign up Page to create a new account
#### Sign up page
1. Type in all three fields accurately and click on Sign up button > Keyboard does not block & user is directed to Home Page upon successful account creation, Home Page displays user's username
2. Click on sign up button with missing fields > New account is not created, user stays on Sign up page & error message is displayed 
3. Attempt to create a new account with an existing email in the database > New account is not created, user stays on Sign up page & error message is displayed
4. Attempt to sign up with invalid email address (not in the email address format) > New account is not created, user stays on Sign up page & error message is displayed
5. Attempt to sign up with a username that is already taken > New account is not created, user stays on Sign up page & error message is displayed
6. Click on the Log in Button > User is redirected to Login Page and can key in Login credentials
#### Log in page
1. Attempt to login with an email that has not been registered > Login fails, user stays on Login page & error message is displayed
2. Attempt to login with wrong login password > Login fails, user stays on Login page & error message is displayed
3. Attempt to login with invalid email address (not in the email address format) > Login fails, user stays on Login page & error message is displayed
4. Attempt to login with missing fields > Login fails, user stays on Login page & error message is displayed
5. Type correct email and password and click on Login button > Keyboard does not block the two fields & user is directed to Home Page upon successful login, Home Page displays user's username
6. Click on Sign up button > User is redirected to Sign up Page and can key in Sign up information
#### Navigation Bar
1. Click on the heart icon > User is redirected to the Favourites Page 
2. Click on the calendar icon > User is redirected to the Calendar Page
3. Click on the search icon > User is redirected to the Search Page
4. Click on the bell icon > User is redirected to the Feeds Page
5. Click on the profile icon > User is redirected to the Profile Page
#### Favourites Page
1. Click on the heart icon in the navigation bar > User is redirected to the Favourites Page which shows the list of all items which the user liked
2. Press on the heart icon to unlike the food item > The food item is removed from the page and is removed from the "favourites" field in the current user's document in the "Users" collection in Firebase.
3. Press on the 'post' button next to a liked food item > Review Popup appears
4. Type text into the review Text Input and click on 'post' button on Pop up > review is added to users' reviews and users' followers' feed (in realtime database), Pop up disappears, 'post' button changes to 'posted'
5. Click on the cross button (top right) on the Review Popup > Pop up is closed
6. Click on the 'posted' button > nothing happens 
#### Calendar Page
1. Click on the calendar icon in the navigation bar > User is redirected to the calendar page with a list of habits scheduled, if any
2. Click on button to create new habits > User is redirected to the page to create a new habit, fieds can be filled in and the created habits are stored in Firebase
3. Click on a date in the calendar > All habits are displayed accurately below the calendar, all dates with habits scheduled have a green dot on the bottom of the date
4. Calendar reflects today's date > Calendar marks today's date in green
5. Calendar marks the date selected > A green circle around the date appears for the date selected
6. Pull on the green bar below the calendar > The calendar switches from weekly view to monthly view
#### Search Page
1. Click on the grey cross button in the search bar when typing > All text input into the search bar will be cleared
2. Type in the full name of the food item accurately > Food item is displayed correctly
3. Type in the name of food halfway > Food items are displayed correctly
4. Type in the name of food without capitalisation (but spelling is correct) > Food items are displayed correctly
5. Type in food not existing within the database > No food items displayed
6. No text input in the search bar > All food items in the database displayed
7. Scroll through food options > Vertical scroll to see the full list of food items works
8. Select 1 nutritional filter by clicking on it > Filter selected turns green and only the food items that satisfy the nutrition flter criteria selected are displayed 
9. Select multiple nutrition filters by clicking on them > Filters selected turns green and only the food items that satisfy aall nutrition filters are shown
10. Unselect nutrition filter(s) > Filter unselected turns white and only food items that satisfy the remaining selected nutrition filters are selected
11. Scroll through nutrition filters > Horizontal scroll to see the list of filters available works
12. Search for food item after selecting filter(s) > Food items that satisfy filter criteria and text input in search bar are displayed
13. Click on button to randomly generate a food choice > A random food item that fulfills the criteria of the filters chosen are displayed 
14. Click on the heart icon next to the food item > Food item is displayed in the favourites page and is added to the "favourites" field in the current user's document in the "Users" collection in Firebase
15. Click on the heart icon next to the food item again (to unlike) > Filled heart changes to heart outline, food item is removed from the favourites page and is removed from the "favourites" field in the current user's document in the "Users" collection in Firebase
#### Feeds Page 
1. Click on the bell icon in the navigation bar > User is redirected to the feeds page which displays feed data fetched from realtime database
#### Profile Page
1. Click on the Log Out button > User is redirected to the Welcome Page
2. Click on the "Add Friends" button > User is redirected to a page with a list of all users 
3. Search list of users > User is able to find any other user that exists in the database
4. Click on the "Follow" button > The user followed is now reflected in the "Following" page
5. Click the "followers" button in the profile page > User is redirected to a correct list of all followers
6. Click the "following" button in the profile page > User is redirected to a correct list of all following
7. Click on the "Add to food log" button > User is redirected to the page to input information to add a new food item into the food log 
8. User presses "Add" in the page to add new food item > Newly added food items are added to the database and reflected in the food log with the correct details (name, date and meal)
9. User clicks on the "Head back to your profile" button in the page to add new food item > User is redirected to the profile page with no data entered into the fields saved
10. User has no food items created currently > Food log displays "No data to display"
