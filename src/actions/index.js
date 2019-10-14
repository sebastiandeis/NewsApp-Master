import * as ArticleActions from "./Articles";
import * as UIActions from "./UI";
import * as User from "./User";

export const ActionCreators = Object.assign(
  {},
  ArticleActions,
  UIActions,
  User
);
