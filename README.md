## LiftTracker
- The main inspiration for this app was wanting a better stopwatch - since I like to use the default stopwatch app on my phone to make sure I rest enough between sets at the gym, and to track how long I've been there
- Additionally, I wanted to log my workouts throughout the year with an easy to use calendar
### Main functions
#### Rest timer 

- By default the Rest button starts a stopwatch, but this can also be changed into a timer (+/- buttons to change duration)
- When you finish a set, click the rest button which will start the timer/stopwatch and increment which set you are currently on
- Click the NEW button when you move on to your next exercise 
- Total workout time is also tracked
#### Calendar (Track your workouts)
- Features a calendar with full CRUD functionality to track your workouts, specifically the date, type of workout, and the duration
- When you're finished with your workout, click STOP and you will be prompted to track your workout, and provide a brief summary of the workout (leg day, upperbody, etc.)
- You can also edit and delete your workouts within the calendar screen

### Tools used
- Languages: Javascript/Typescript
- React Native / Expo
- [Wix calendar library](https://github.com/wix/react-native-calendars)
- Supabase (PostgreSQL) for the CRUD backend


