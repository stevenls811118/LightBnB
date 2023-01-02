# LightBnB

A simple multi-page Airbnb clone that uses a server-side Javascript to display the information from queries to we oages via SQL queries.
## Project Structure

```
├── public
│   ├── index.html
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── index.js
│   │   ├── libraries
│   │   ├── network.js
│   │   └── views_manager.js
│   └── styles
├── sass
└── server
  ├── apiRoutes.js
  ├── database.js
  ├── json
  ├── server.js
  └── userRoutes.js
├── migrations
  ├── 01_schema.sql
  ├── 02_new_tables.sql
├── seeds
```

* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `sass` contains all of the sass files. 
* `server` contains all of the server side and database code.
  * `server.js` is the entry point to the application. This connects the routes to the database.
  * `apiRoutes.js` and `userRoutes.js` are responsible for any HTTP requests to `/users/something` or `/api/something`. 
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database.

## Final Product

!["Screenshot of ERD"](https://github.com/stevenls811118/LightBnB/blob/master/LightBnB_WebApp-master/docs/ERD.PNG?raw=true)
!["Screenshot of homepage"](https://github.com/stevenls811118/LightBnB/blob/master/LightBnB_WebApp-master/docs/Homepage.PNG?raw=true)
!["Screenshot of my reservations"](https://github.com/stevenls811118/LightBnB/blob/master/LightBnB_WebApp-master/docs/My%20reservations.PNG?raw=true)
!["Screenshot of my listings"](https://github.com/stevenls811118/LightBnB/blob/master/LightBnB_WebApp-master/docs/My%20listings.PNG?raw=true)
!["Screenshot of search with options"](https://github.com/stevenls811118/LightBnB/blob/master/LightBnB_WebApp-master/docs/Search%20with%20options.PNG?raw=true)
!["Screenshot of create listing"](https://github.com/stevenls811118/LightBnB/blob/master/LightBnB_WebApp-master/docs/Create%20listing.PNG?raw=true)

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:3000/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- bcrypt 3.0.6
- body-parser 1.19.0
- cookie-session 1.3.3
- dotenv 16.0.3
- express 4.17.1
- nodemon 1.19.1
- pg 8.8.0