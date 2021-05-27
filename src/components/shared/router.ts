import { AboutField } from '../about-field/about-field';
import { GameField } from '../game-field/game-field';
import { ScoreField } from '../score-field/score-field';
import { SettingsField } from '../settings-field/settings-field';
import { RootField } from '../root-field/root-field';
import { BaseComponent } from './base-component';
import { ROUTE_PATHS, GAME_TITLE } from './constants';

export class Router {
  private readonly routes: {
    path: string;
    NewFieldElementClass: typeof BaseComponent;
  }[];

  constructor() {
    this.routes = [
      { path: ROUTE_PATHS.aboutMe, NewFieldElementClass: AboutField },
      { path: ROUTE_PATHS.gameSettings, NewFieldElementClass: SettingsField },
      { path: ROUTE_PATHS.bestScore, NewFieldElementClass: ScoreField },
      { path: ROUTE_PATHS.playground, NewFieldElementClass: GameField },
    ];

    document.addEventListener('click', (event: Event) => {
      const currentState = window.history.state;
      this.setHistoryState(event);
      if (currentState !== window.history.state) {
        this.changeRootField();
      }
    });

    window.addEventListener('popstate', () => this.changeRootField());
  }

  setHistoryState(event: Event): void {
    const dataPath: string | null | undefined = (event.target as Element)
      .closest('[data-path]')
      ?.getAttribute('data-path');

    const newRoute: Router['routes'][0] | null = this.getRouteByPath(dataPath);

    if (newRoute && newRoute.path !== window.history.state) {
      window.history.pushState(newRoute.path, GAME_TITLE, newRoute.path);
    }
  }

  changeRootField(): void {
    const StateClass: typeof BaseComponent | undefined = this.getRouteByPath(
      window.history.state
    )?.NewFieldElementClass;
    if (StateClass) {
      RootField.changeField(new StateClass());
    }
  }

  private getRouteByPath(
    path: string | null | undefined
  ): Router['routes'][0] | null {
    let returnRoute: Router['routes'][0] | null = null;
    this.routes.forEach((route) => {
      if (route.path === path) {
        returnRoute = route;
      }
    });
    return returnRoute;
  }
}
