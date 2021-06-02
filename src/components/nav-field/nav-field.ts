import './nav-field.scss';
import aboutMeTabLogoUrl from '../../assets/images/about-me.png';
import bestScoreTabLogoUrl from '../../assets/images/best-score.png';
import gameSettingsTabLogoUrl from '../../assets/images/game-settings.png';
import { BaseComponent } from '../shared/base-component';
import { NavItem } from '../nav-item/nav-item';

export class NavField extends BaseComponent {
  readonly navItems: {
    imgUrl: string;
    label: string;
    dataPath: string;
    instance?: NavItem;
  }[];

  constructor() {
    super('ul', ['nav-field']);

    this.navItems = [
      {
        imgUrl: aboutMeTabLogoUrl,
        label: 'About me',
        dataPath: 'about-me',
      },
      {
        imgUrl: bestScoreTabLogoUrl,
        label: 'Best Score',
        dataPath: 'best-score',
      },
      {
        imgUrl: gameSettingsTabLogoUrl,
        label: 'Game Settings',
        dataPath: 'game-settings',
      },
    ];

    this.setNavItems();
  }

  setNavItems(): void {
    function setActiveItem(event: Event, navItems: NavField['navItems']): void {
      navItems.forEach((item: NavField['navItems'][0]) => {
        if (item.instance) {
          item.instance.element.classList.remove('nav-item_active');
        }
      });
      (event.currentTarget as HTMLElement).classList.add('nav-item_active');
    }

    this.navItems.forEach((item) => {
      item.instance = new NavItem(item.imgUrl, item.label, item.dataPath);
      this.element.appendChild(item.instance.element);
      item.instance.element.addEventListener('click', (event: Event) =>
        setActiveItem(event, this.navItems)
      );
    });

    if (this.navItems[0].instance) {
      this.navItems[0].instance.element.classList.add('nav-item_active');
    }
  }
}
