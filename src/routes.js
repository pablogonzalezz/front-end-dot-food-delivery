import React from "react";
import { Redirect, Router } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import ViewGroups from "./views/ItemGroup/ViewGroups";
import CreateGroup from "./views/ItemGroup/CreateGroup";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import ViewGroupItems from "./views/Items/ViewGroupItems";
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/cardapio",
    layout: DefaultLayout,
    component: ViewGroups,
  },
  {
    path: "/create-group",
    layout: DefaultLayout,
    component: CreateGroup,
  },
  {
    path: "/view-group-items/:id",
    layout: DefaultLayout,
    component: ViewGroupItems
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
];