# jest-react

Utils and extensions for testing [React](https://reactjs.org/) components with [Jest](https://jestjs.io/). 

## Getting Started
Install the package with npm

```bash
npm install jest-react
```

or yarn

```bash
yarn add jest-react
```

To enable [custom matchers](https://jestjs.io/docs/using-matchers) in your test file, you need to import `jest-react` in this file

```typescript
// YourComponent.test.tsx
import 'jest-react';
```

To enable it globally, you need to import it in your [tests setup file](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array)

```javascript
// tests-setup.js
import '@testing-library/jest-dom'

// jest.config.js
setupFilesAfterEnv: ['<rootDir>/tests-setup.js'] // the path you your tests setup file
```

## API 

- [Matchers](https://jestjs.io/docs/using-matchers)
    - [toThrowWhileRender](#`toThrowWhileRender`)

## Matchers



### `toThrowWhileRender`

```
toThrowWhileRender(error?: Error | string | RegExp)
```
Apply this matcher when testing [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) or components that 
throw errors. If you don't use it, you see in console that errors you handled are still logged in the console :upside_down_face: : 
- `Error: Uncaught [...]`
- `The above error occurred ...`

More details can be found in this [GitHub issue](https://github.com/facebook/react/issues/11098).

`toThrowWhileRender` matcher solves this problem and your console will be clean from the errors.

#### Example
```typescript jsx
const ThrowingComponent: FC = () => {
  throw new Error('Expected error');
};

expect(() => { 
  render(<ThrowingComponent />);
}).toThrowWhileRender('Expected error');
```
