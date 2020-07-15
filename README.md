# Chuck Norris Jokes

Application that fetches 100 unique jokes Chuck Norris API (<https://api.chucknorris.io/jokes/random>) , stores the jokes in a CSV file and uploads the file to Dropbox account.

### Setup/Run instructions
* In order to upload the CSV file to a Dropbox account you need to generate an access token so the steps to generate that token are:

	1. Create or login with a Dropbox account.
	2. Go to <https://www.dropbox.com/developers/apps/create> to enable app with with your dropbox account. Choose following options there 1 Dropbox API > 2 Scoped acces >  3 Full Dropbox > 4 Choose name of your preference for the app.
	3. Go to settings in the app in Dropbox account, generate an access token.

* Save that generated access token in a config.env file in the project main folder as DROPBOX_TOKEN variable.
* Open a terminal, navigate to the project root folder and run `npm run start`
* Make GET request of endpoint that fetches jokes from Chuck Norris API (<http://localhost:3000/jokes>) to request API jokes (It will fetch jokes and storage them in a map and then in CSV file in fs, finally it connects your code with your Dropbox account using your access token to save the CSV file with 100 Chuck Norris jokes in your Dropbox Account).

## Libraries/Dependencies

* [Axios](https://github.com/axios/axios) - Used to fetch jokes from API
* [DropboxV2Api](https://www.dropbox.com/developers/documentation/http/documentation) - Used to save CSV file in Dropbox account
* [Express](https://expressjs.com/) - Used for structure of project
* [fs](https://nodejs.org/api/fs.html) - Used for create and save jokes file in CSV
