type RoutesType = Array<RouteType>;
type RouteType = {url: string; component: any; name?: string; exact?: boolean};

type NavigationList = Array<NavigationItem>;
type NavigationItem = {title: string; path: string};
