## Automatic build and deployment
This repository includes a GitHub Workflow file which will build the solution, run tests and test coverage and also publish the extension to the Chrome Web Store.

You will need to add 4 secrets to your GitHub repository and the names should match the names the snippet below. Example, you should have a secret named `CHROME_REFRESH_TOKEN` in your GitHub repo for your Workflow file to have access to this. 

```yaml
refresh-token: ${{ secrets.CHROME_REFRESH_TOKEN }}
client-id: ${{ secrets.CHROME_CLIENT_ID }}
client-secret: ${{ secrets.CHROME_CLIENT_SECRET }}
file-name: './extension.zip'
app-id: ${{ secrets.CHROME_APP_ID }}
```

The values for `CHROME_REFRESH_TOKEN`, `CHROME_CLIENT_ID` and `CHROME_CLIENT_SECRET` can be retrieved by following [this guide](https://github.com/ClydeDz/google-api-keys-docs/blob/main/How%20to%20generate%20Google%20API%20keys.md). 

To obtain the `CHROME_APP_ID`, you'll need to upload a version of your Chrome extension to the Chrome Web Store Developer Dashboard. This will create a draft version of your extension and generate an ID for you. Each extension gets a unique ID. 
