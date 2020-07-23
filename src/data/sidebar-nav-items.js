export default function() {
  return [
    {
      title: "Pedidos",
      to: "/pedidos",
      htmlBefore: '<i class="material-icons">pending_actions</i>',
      htmlAfter: ""
    },
    {
      title: "Meu cardápio",
      htmlBefore: '<i class="material-icons">menu_book</i>',
      to: "/cardapio",
    },
    {
      title: "Mesas",
      htmlBefore: '<i class="material-icons">food_bank</i>',
      to: "/tables",
    },
    {
      title: "Usuários",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "#",
    },
    {
      title: "Relatório de itens",
      htmlBefore: '<i class="material-icons">insert_chart</i>',
      to: "#",
    },
    {
      title: "Relatório de usuários",
      htmlBefore: '<i class="material-icons">people</i>',
      to: "#",
    },
  ];
}
