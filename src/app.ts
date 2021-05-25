import { PageField } from './components/page-field/page-field';
import { Router } from './components/shared/router';

export class App {
  private readonly pageField: PageField;

  private readonly router: Router;

  constructor(private readonly rootElement: HTMLElement) {
    this.pageField = new PageField();
    this.rootElement.appendChild(this.pageField.element);
    window.history.pushState('about-me', 'Match-match game', 'about-me');
    this.router = new Router();
  }
}
