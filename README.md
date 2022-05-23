# Fit WIth Us

## Set-up

To start the App, please follow the instructions below:

1. Clone the repo into the file location of your choice.
2. On one terminal, using a Postgres server, from the Root folder go into the **backend** folder with the following line:

```
cd .\backend\
```

3. Next, run the command to install all the packages for the App database in the **backend** folder:

```
npm install
```

5. Next, run the command to create the database:

```
npm run db:reset
```

6. To start the server, run the command in the **backend** folder:

```
npm start
```

7. Sign up with the EDAMAM's Recipe API to get their **App ID** and **App Key**: [EDAMAM Recipe API](https://developer.edamam.com/edamam-recipe-api)

8. From the root folder, go into the **./fit_with_us** folder and copy the example.env file as a .env file.

9. Next, paste the EDAMAM App ID and Key into the file where specified.

10. On another terminal, from the root folder, go into **./fit_with_us** folder using the command:

```
cd .\fit_with_us
```

11. Next, run the command to install all the packages for the App database in the **./fit_with_us** folder:

```
npm install
```

13. To start the server, run the command in the **./fit_with_us** folder:

```
npm start
```

14. Ensure that the server is running at port 3002.

## Fit With Us Preview

## Dev Dependencies

- Axios
- Bcrypt
- Bulma
- Cookie-parser
- Express
- env-cmd
- React
- SASS

## Credits

- [Brian Duong][https://github.com/bduong94]
- [Lucas Lee][https://github.com/notlucaslee]
- [Abhiram Sathasivam][https://github.com/abhiram-satha]
