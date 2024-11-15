import State from '../state/state';
import { Pages, RoutesPage } from './router-types';

export default class Router {
  private state: State;

  private routes: RoutesPage;

  constructor(state: State, routes: RoutesPage) {
    this.state = state;
    this.routes = routes;
    this.routeChangeListener();
    document.addEventListener('DOMContentLoaded', () => {
      this.navigate('start');
    });
  }

  private routeChangeListener(): void {
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
  }

  private handleRouteChange(): void {
    const newPath: string = window.location.pathname.slice(1).toLowerCase();
    this.updatePage(newPath);
  }

  public navigate(path: string = ''): void {
    const newPath: string = path || window.location.pathname.slice(1).toLowerCase();
    window.history.pushState({ path: newPath }, newPath, `/${newPath}`);
    this.updatePage(newPath);
  }

  private updatePage(routeName: string): void {
    let route: string = routeName === '' ? Pages.login : routeName;
    switch (route) {
      case Pages.start:
      case Pages.login:
        route = this.state.isLogged() ? Pages.start : Pages.login;
        if (routeName !== route) {
          window.history.replaceState({ path: route }, route, `/${route}`);
        }
        break;
      case Pages.game:
        route = this.state.isLogged() ? Pages.game : Pages.login;
      default:
    }
    this.routes[route]();
  }
}
