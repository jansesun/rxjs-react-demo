# rxjs-react-demo
Simple way to connect rxjs to React component in Redux style

```js
export default connect(state => {
  ...state.successRate,
  succeed() {
    successRateActions.succeed$.next();
  },
  fail() {
    successRateActions.fail$.next();
  },
  reset() {
    successRateActions.reset$.next();
  }
})(SuccessRate);
```

Start Server
```
npm start
```

Unit Test
```
npm test
```
