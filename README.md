# simple_sockets_app
A simple web socket app to learn about socket.io + react

I am following [this](https://www.youtube.com/watch?v=djMy4QsPWiI) tutorial on Youtube to learn about Socket.io

In addition to learning about websockets, I'm also going to learn about TypeScript. 

### SERVER
For my server I've installed the following packages:

- typescript 
- express - server side routes
- cors - allow cross-origin requests from web browsers
- nodemon - automatic server restart during development
- socket.io - creating websocket connections betweeen clients

I installed them all using 

```
npm install (package-name)
```

I then created a TS config file in the 'server' directory by running 

```
npx tsc --init
```

I also installed ESLint for linting:

```
npm install eslint --save-dev
npx eslint --init
```

And followed the prompts for creating a style guide. 

You can fun ESLint with the following:

```
npx eslint .
npx eslint . --fix
```

### CLIENT

I created a react app by running in the parent directory:

```
npx create-react-app client --template typescript
```

This sets up a new React project with TypeScript configured. 

Installed socket.io-client

PROBLEM: There were 8 vulnerabilites (2 moderate, 6 high)

