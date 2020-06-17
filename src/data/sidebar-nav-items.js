export default function() {
  return [
    {
      title: "Pedidos",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">pending_actions</i>',
      htmlAfter: ""
    },
    {
      title: "Meu cardápio",
      htmlBefore: '<i class="material-icons">menu_book</i>',
      to: "/cardapio",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
