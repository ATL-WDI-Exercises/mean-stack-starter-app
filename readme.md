# Mean Stack Starter App

## Steps to Reproduce

### Step 1 - Create the Express Project and add Dependencies

1a. Create directory and run Express Generator

```bash
mkdir mean-stack-starter-app
cd mean-stack-starter-app
express -e
npm install
```

1b. Install Server-side Dependencies

```bash
npm install --save express-session
npm install --save mongoose
npm install --save passport
npm install --save passport-local
npm install --save bcrypt-nodejs
```

1c. Install Client-side Dependencies

```bash
bower init
bower install --save bootstrap
bower install --save angular
bower install --save angular-messages
bower install --save angular-animate
bower install --save angular-ui-router
```

1d. Save work

```bash
git init
echo node_modules > .gitignore
echo bower_components >> .gitignore
git add -A
git commit -m "Project setup"
```
