const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('@testing-library/jest-dom/extend-expect');

Enzyme.configure({ adapter: new Adapter() });

const localStorageMock = (function() {
  let store = {};
  return {
    clear() {
      store = {};
    },
    getItem(key) {
      return store[key];
    },
    removeItem(key) {
      delete store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

HTMLCanvasElement.prototype.getContext = () => {
  return 0;
};