import React from "react";
// import { Redirect } from "react-router-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

//  Order Routes
import ReceivedOrder from "./views/Order/ReceivedOrder";
import MakeOrder from "./views/Order/MakeOrder";
import MakeOrderViewItems from "./views/Order/MakeOrderViewItems";
import PreConfirmOrder from "./views/Order/PreConfirmOrder";
import ConfirmOrder from "./views/Order/ConfirmOrder";

//  Login Routes
import Login from "./views/Login/Login";
import { getToken } from "./services/auth";

// ItemGroup Routes
import ViewGroups from "./views/ItemGroup/ViewGroups";
import CreateGroup from "./views/ItemGroup/CreateGroup";
import UpdateGroup from "./views/ItemGroup/UpdateGroup";

// Items Routes
import ViewItems from "./views/Items/ViewItems";
import CreateItem from "./views/Items/CreateItem";
import UpdateItem from "./views/Items/UpdateItem";

// Tables Routes
import TablesView from "./views/Tables/TablesView";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = getToken()

  if (auth !== null) {
    return (<Route
        {...rest}
        render={props =>
          (
            <DefaultLayout>
              <Component {...props}/>
            </DefaultLayout>
          )
        }
      />)
  } else {
    return (<Route
        {...rest}
        render={props => 
          (
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          )
        }
        />)
  }
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect from="/" to="/pedidos" exact/>
      <Route path="/login" component={Login}/>
      <Route path="/fazer-pedido" component={MakeOrder}/>
      <Route path="/fazer-pedido-items/:id" component={MakeOrderViewItems}/>
      <Route path="/login-pedido" component={PreConfirmOrder}/>
      <Route path="/confirmar-pedido" component={ConfirmOrder}/>
      <PrivateRoute path="/pedidos" component={ReceivedOrder}/>
      <PrivateRoute path="/cardapio" component={ViewGroups}/>
      <PrivateRoute path="/tables" component={TablesView}/>
      <PrivateRoute path="/create-group" component={CreateGroup}/>
      <PrivateRoute path="/update-group/:id" component={UpdateGroup}/>
      <PrivateRoute path="/view-group-items/:id" component={ViewItems}/>
      <PrivateRoute path="/create-item/:id" component={CreateItem}/>
      <PrivateRoute path="/update-item/:id" component={UpdateItem}/>
    </Switch>
  </BrowserRouter>
)

export default Routes;
// export default [
//   // ############# Pedidos Admin #############
//   {
//     path: "/pedidos",
//     layout: DefaultLayout,
//     component: ReceivedOrder,
//   },


//   // ############# Login #############
//   {
//     path: "/login",
//     layout: BlankLayout,
//     component: Login,
//   },
  

//   // ############# Item Groups #############
//   {
//     path: "/cardapio",
//     layout: DefaultLayout,
//     component: ViewGroups,
//   },
//   {
//     path: "/create-group",
//     layout: DefaultLayout,
//     component: CreateGroup,
//   },
//   {
//     path: "/update-group/:id",
//     layout: DefaultLayout,
//     component: UpdateGroup,
//   },


//   // ############# Items #############
//   {
//     path: "/view-group-items/:id",
//     layout: DefaultLayout,
//     component: ViewItems
//   },
//   {
//     path: "/create-item/:id",
//     layout: DefaultLayout,
//     component: CreateItem
//   },
//   {
//     path: "/update-item/:id",
//     layout: DefaultLayout,
//     component: UpdateItem
//   },

  
//   // ############# Página inicial #############
//   {
//     path: "/",
//     exact: true,
//     layout: DefaultLayout,
//     component: () => <Redirect to={`${home_path}`} />
//   },


//   // ########################
//   {
//     path: "/blog-overview",
//     layout: DefaultLayout,
//     component: BlogOverview
//   },
//   {
//     path: "/user-profile-lite",
//     layout: DefaultLayout,
//     component: UserProfileLite
//   },
//   {
//     path: "/errors",
//     layout: DefaultLayout,
//     component: Errors
//   },
//   {
//     path: "/components-overview",
//     layout: DefaultLayout,
//     component: ComponentsOverview
//   },
//   {
//     path: "/tables",
//     layout: DefaultLayout,
//     component: Tables
//   },
// ];