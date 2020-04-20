
const __importDefault = (this && this.__importDefault)
  || function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));

const app = express_1.default();
app.get('/', (req, res) => res.json({ message: 'Hello world' }));
app.listen(3333, () => {
  console.log('Server started on port 3333');
});
