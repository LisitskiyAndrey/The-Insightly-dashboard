# Introduction
This is the “Insightly” dashboard project that showcases a user’s daily activity and mood insights with a touch
of intelligence and interactivity.

# Getting Started
1. Run `npm install`
2. Run `npm start`
3. Open your browser on 'http://localhost:5173'

## Assumptions and Logic Decisions

### Assumptions
1. **Mock Data**:
    - Task data and mood trends are mocked locally for the purpose of this demo.
    - Mood data is stored as an array of objects, each containing a `date` and a `mood` score.


2. **Mood Score Calculation**:
    - The "Mood Score" is calculated as the average of mood entries for the past 7 days (Explanation in 4.Chart Data Views).
    - Each mood is assigned a numerical value: Happy = 3, Neutral = 2, Sad = 1.


3. **Dynamic Messages**:
    - Messages about mood trends are based on simple logic:
        - Consistently increasing scores: Positive trend message.
        - Decreasing scores: Encouragement message.
        - Fluctuating scores: Suggestion to find balance.


4. **Chart Data Views**:
    - Based on the requirement: *"Allow users to toggle between daily, weekly, and monthly views"*, a group of buttons was added to switch the chart view:
        1. **Day**: The interval is set to hourly steps. The average value is calculated based on the available data but does not exceed 24 hours.
        2. **Week**: The interval is set to daily steps. The average value is calculated based on the available data but does not exceed 7 days.
        3. **Month**: The interval is set to daily steps. The average value is calculated based on the available data but does not exceed 30 days.


5. **Design Decisions**:
    - The color scheme, font, and button styles were chosen based on inspiration from the potential client's website, [GetFliff](https://www.getfliff.com/). This approach ensures visual consistency and aligns the application's design with the client's brand identity.



### Logic Decisions
- **State Management**:
    - React hooks and the Context API are used for managing theme and mood state across components.
- **Styling**:
    - CSS modules ensure component-scoped styles, maintaining a clean design.
- **Testing**:
    - Unit tests focus on the mood analysis logic to ensure accurate insights.
---
