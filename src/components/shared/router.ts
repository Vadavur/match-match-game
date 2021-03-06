import { AboutField } from '../about-field/about-field';
import { GameField } from '../game-field/game-field';
import { ScoreField } from '../score-field/score-field';
import { SettingsField } from '../settings-field/settings-field';
import { RootField } from '../root-field/root-field';
import { NavField } from '../nav-field/nav-field';
import { BaseComponent } from './base-component';
import { ROUTE_PATHS, MM_GAME } from './constants';

export class Router {
  private readonly routes: {
    path: string;
    NewFieldElementClass: typeof BaseComponent;
  }[];

  private readonly navItems;

  constructor(navField: NavField) {
    this.navItems = navField.navItems;
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
        this.changeNavPanel();
      }
    });

    window.addEventListener('popstate', () => {
      this.changeRootField();
      this.changeNavPanel();
    });
  }

  private changeNavPanel() {
    this.navItems.forEach((navItem) => {
      if (
        navItem.instance?.element.getAttribute('data-path') ===
        window.history.state
      ) {
        navItem.instance?.element.classList.add('nav-item_active');
      } else {
        navItem.instance?.element.classList.remove('nav-item_active');
      }
    });
  }

  private setHistoryState(event: Event) {
    const dataPath: string | null | undefined = (event.target as Element)
      .closest('[data-path]')
      ?.getAttribute('data-path');

    const newRoute: Router['routes'][0] | null = this.getRouteByPath(dataPath);

    if (newRoute && newRoute.path !== window.history.state) {
      window.history.pushState(newRoute.path, MM_GAME.title, newRoute.path);
    }
  }

  changeRootField(): void {
    const StateClass: typeof BaseComponent | undefined = this.getRouteByPath(
      window.history.state
    )?.NewFieldElementClass;
    if (StateClass) {
      RootField.changeField(new StateClass());
    }
    this.changeNavPanel();
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
