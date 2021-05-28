import './components/shared/styles.scss';
import { runAppAppendedTo } from './run-app-appended-to';

window.onload = () => {
  runAppAppendedTo(document.body);
};
