Create this App

### Tech Stack and modules
- Frontend App
  - ReactJS Framework
    - Use `context`
      - Reference: https://react.dev/reference/react/createContext
    - Use `tailwind` for building/designing components/UI faster.
      - Reference: https://tailwindcss.com/
    - Use `webpack` for deployments/builds and releases
      - Reference: https://webpack.js.org/
    - Use `story-book` for testing and checking the components
      - Reference: https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/
- Backend App / Server
  - NodeJS
    - MongoDB for storing user preferences and data

---

### Backend App / Server and API
- Build a server in NodeJS, that accepts `POST` and `GET` requests
- `POST` will receive the payload / data and store it in MongoDB
  - Consider this payload: `[{"recipient": {name: "Simon", email: "optional, maybe not be sent"}, message: {title: "optional, maybe not sent", description: "You are awesome"}, {"recipient": {name: "John Lukas", email: "optional, maybe not be sent"}, message: {title: "optional, maybe not sent", description: "Great Job!"}]`
- `GET` will send the data from MongoDB
  - There can be filter to filter the data set
    - Say the filter is a `field: value` combo
    - E.g.: `recipient.name = 'Simon'`
- This will be used by the Frontend App

---

### Frontend App

#### Design and UI

App:
```
------------------------------------
| Header section (App name / logo) |
|----------------------------------|
|  [MC] | [FB]              [RP]   |
|  [AF] | [Card1] [Card2] [Card3]  |
|       | [Card4] [Card5] [Card6]  |
|       | [Card7] [Card8] [Card9]  |
|       |                          |
|       |                          |
| [ATP] |                          |
|----------------------------------|
|    Footer (copyright / links)    |
------------------------------------
```

Card:
```
------------------------------------
| [To John]                [Date]  |
|----------------------------------|
|       [Title] (Optional)         |
| [Message....................]    |
|                                  |
|                                  |
|                                  |
|                                  |
------------------------------------
```

#### Workflow and code
- This app will use and interact with Backend App / Server and API
- The app has 3 sections - header, main and footer
- The `App name` will be pulled in from `.env/config` file
- The main section is divided into 2 parts - `Left section` (`LS`) and `Right section` (`RS`)
- `Left section` (`LS`)
  - This section will be vertically scrollable
  - The `[MC]` (is a Message Component) is basically a text-area with a dropdown on top of it. It will include below elements
    - A dropdown, which will have names. Let's call it `Recipient dropdown`
      - The values in dropdown are to be filled in from a config/env file
      - For now, it can be an array array of objects with `{name, email}`
        - We can show the name as value in the dropdown
    - A text area will be blank where one can fill in their message for the name they have selected.
      - Let's call it `Message area`
  - The `[AF]` (`Add Fish` button) will create/add another instance of `[MC]`
    - The label-name will be pulled in from `.env/config` file
  - The `[ATP]` (`Add to pond` button) will send the data to API
    - The label-name will be pulled in from `.env/config` file
    - It will send it as a JSON based on the data from the different `MC`s. Say there are 2 `MC`
      - In that case, data will be: `[{"recipient": {name: "Selected value/name from 'Recipient dropdown'", email: "can be blank for now or maybe not sent"}, message: {title: "can be blank for now or maybe not sent", description: "Message typed in for the user in 'Message area'"}, {"recipient": {name: "Selected value/name from 'Recipient dropdown'", email: "can be blank for now or maybe not sent"}, message: {title: "can be blank for now or maybe not sent", description: "Message typed in for the user in 'Message area'"}]`
- `Right section` (`RS`)
  - This is basically all the values stored in MongoDB
    - Each card will be shown as a card - with the `to / recipient name`, `date (DD-MMM-YYYY format)`, `title (optional)`, `message`
      - Refer to `[To John]` pointing to `to / recipient name` part
      - Refer to `[Date]` pointing to `date (DD-MMM-YYYY format)` part
      - Refer to `[Title] (Optional)` pointing to `title (optional)` part
      - The card will a random background (from list of backgound images in `img/bg/*`)
      - The card will have a random background color (from list of background colors in `.env/config` file)
  - The `[FB]` (`Filter button`) is can be a dropdown to filter the cards based on `recipient.name`
  - The `[RP]` will refresh the cards, i.e. make a `GET` request to the Backend App / Server and API to refresh the data and pull render all the cards


#### Other points
- Make it a generic project such that one can configure it in their own way
- And one can start using it in their own fashion
hat this should also be responsive?
- The UI / Design can be `Right section` (`RS`) below `Left section` (`LS`) and not side-by-side
- The Card can also have a From: (optional) at the bottom. For now hide it using CSS.
  - And hence changes will be required to payload structure as well

```
I will explain:

`All time` will sent date as null or won't sent the date filer. Simple

Clicking on `Select date` will open a calendar on it's side. And selecting a date will change the label `Set date`. Say I set it to `05-Jan-2025`. So `Set date` will change to `(05-Jan-2025) Set date` and also send a request with the filter including the date condition.

If I click on the dropdown again, I will see `All time` and `(05-Jan-2025) Set Date`.
Clicking on again `(05-Jan-2025) Set Date` will again open calendar to allow me to select a date of my choice. After selecting the date, the option/label will again change. Let's say `(15-Jan-2025) Set Date`

On the other hand, if I select `All time` it will reset, meaning no date param/filter will be sent
```

ChatGPT Interaction: https://chatgpt.com/c/6790e5d6-ba88-8003-afe9-669fec528849