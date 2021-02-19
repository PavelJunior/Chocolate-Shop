import * as H from 'history';

interface MatchParams {
  name: string;
  id: number;
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
