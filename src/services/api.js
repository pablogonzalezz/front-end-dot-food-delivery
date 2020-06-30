import { getHost } from "../serviceWorker";
import { getToken } from "./auth";

const api = `http://${getHost()}:2222/`;
const tokenlessHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

function setHeaders() {
    return { 'x-access-token': `${getToken()}`, 'Accept': 'application/json', 'Content-Type': 'application/json' }
}


/* =================== ITEM GROUPS =================== */
export const getAllItemGroups = async () => {
    return await fetch(api + 'item_group/get_all', {method: "GET", headers: setHeaders()});
}

export const getItemGroupById = async (id) => {
    return await fetch(api + `item_group/get_item_group/${id}`, {method: "GET", headers: setHeaders()});
}

export const createItemGroup = async (title, description, image) => {
    return await fetch(api + 'item_group/create_item_group', {
        method: "POST",
        headers: setHeaders(),
        body: JSON.stringify({
            title: title,
            description: description,
            image: image
        })
    })
}

export const updateItemGroup = async (title, description, image, id) => {
    return await fetch(api + `item_group/update_item_group/${id}`, {
        method: "POST",
        headers: setHeaders(),
        body: JSON.stringify({
            title: title,
            description: description,
            image: image
        })
    })
}


export const deleteItemGroup = async (id) => {
    return await fetch(api + `item_group/delete_item_group/${id}`, {method: "DELETE", headers: setHeaders()});
}


/* =================== ITEMS =================== */
export const getAllItems = async () => {
    return await fetch(api + 'items/get_all', {method: "GET", headers: setHeaders()});
}

export const getItemById = async (id) => {
    return await fetch(api + `items/get_item/${id}`, {method: "GET", headers: setHeaders()});
}

export const getItemByGroup = async (id) => {
    return await fetch(api + `items/get_item_by_group/${id}`, {method: "GET", headers: setHeaders()});
}

export const createItem = async (title, description, image, price, group_id) => {
    return await fetch(api + 'items/create_item', {
        method: "POST", 
        headers: setHeaders(),
        body: JSON.stringify({
            title: title,
            description: description,
            image: image,
            group_id: group_id,
            price: price
        })
    });
}

export const updateItem = async (title, description, image, price, group_id, id) => {
    return await fetch(api + `items/update_item/${id}`, {
        method: "POST", 
        headers: setHeaders(),
        body: JSON.stringify({
            title: title,
            description: description,
            image: image,
            group_id: group_id,
            price: price
        })
    });
}

export const deleteItem = async (id) => {
    return await fetch(api + `items/delete_item/${id}`, {method: "DELETE", headers: setHeaders()});
}


/* =================== AUTH =================== */
export const Authenticate = async (login, password) => {
    return await fetch(api + 'auth/authenticate', {
        method: "POST", 
        headers: tokenlessHeaders,
        body: JSON.stringify({ 
            login: login,
            password: password
        }) 
    });
}

export const CreateUser = async (login,name,cpf,email,phone,password,address) => {
    return await fetch(api + 'auth/create_user', {
        method: "POST", 
        headers: tokenlessHeaders,
        body: JSON.stringify({ 
            login: login,
            name: name,
            cpf: cpf,
            email: email,
            phone: phone,
            address: address,
            password: password
        }) 
    });
}

export const getUserAddress = async (login) => {
    return await fetch(api + `user/get_user_address/${login}`, {
        method: "GET", 
        headers: setHeaders(),
    });
}

export const getUserPhone = async (login) => {
    return await fetch(api + `user/get_user_phone/${login}`, {
        method: "GET", 
        headers: setHeaders(),
    });
}