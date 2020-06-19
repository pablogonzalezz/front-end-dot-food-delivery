import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// ItemGroup Routes
import ViewGroups from "./views/ItemGroup/ViewGroups";
import CreateGroup from "./views/ItemGroup/CreateGroup";
import UpdateGroup from "./views/ItemGroup/UpdateGroup";

// Items Routes
import ViewItems from "./views/Items/ViewItems";
import CreateItem from "./views/Items/CreateItem";
import UpdateItem from "./views/Items/UpdateItem";


import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";

export default [
  // ############# Item Groups #############
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
    path: "/update-group/:id",
    layout: DefaultLayout,
    component: UpdateGroup,
  },


  // ############# Items #############
  {
    path: "/view-group-items/:id",
    layout: DefaultLayout,
    component: ViewItems
  },
  {
    path: "/create-item/:id",
    layout: DefaultLayout,
    component: CreateItem
  },
  {
    path: "/update-item/:id",
    layout: DefaultLayout,
    component: UpdateItem
  },


  // ########################
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