import * as H from 'history';

export type RouteType = {
  url: string;
  component: any;
  name?: string;
  exact?: boolean;
};

interface MatchParams {
  name: string;
  id: string;
}

export interface match {
  params: MatchParams;
  isExact: boolean;
  path: string;
  url: string;
}

export interface RouteComponentProps {
  match: match;
  location: H.Location;
  history: H.History;
  staticContext?: any;
}
