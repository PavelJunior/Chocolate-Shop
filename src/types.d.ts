type RoutesType = Array<RouteType>;
type RouteType = {name: string; url: string; component: any; exact: boolean};

type NavigationList = Array<NavigationItem>;
type NavigationItem = {title: string; path: string};
