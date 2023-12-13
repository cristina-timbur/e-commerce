# E-Shop APIs

## Table of Contents

- [Overview](#overview)
- [Database Diagrams](#database-diagrams)
- [Endpoints](#Endpoints)
    - [register()](#register)
    - [sign_in()](#sign_in)
    - [get_user_profile()](#get_user_profile)
    - [edit_user_profile()](#edit_user_profile)
    - [delete_account()](#delete_account)
    - [create_product_review()](#create_product_review)
    - [edit_product_review()](#edit_product_review)
    - [get_product_reviews()](#get_product_reviews)
    - [get_product](#get_product)
    - [get_products()](#get_products)
    - [add_product_to_cart()](#add_product_to_cart)
    - [pop_product_from_cart()](#pop_product_from_cart)
    - [get_cart_items()](#get_cart_items)
    - [get_carts()](#get_carts)
    - [get_order()](#get_order)
    - [make_order()](#make_order)
    - [get_orders()](#get_orders)
    - [get_payment()](#get_payments)
    - [get_payments()](#get_payments)

## Overview

Node server that exposes the basic endpoints necessary to an E-Shop application dedicated to fashion. The project was created as a requirement for the `JavaScript Server` course at University Of Bucharest, Faculty of Mathematics and Computer Science, by <a href="https://github.com/cristina-timbur">Cristina Tîmbur</a> and <a href="https://github.com/vl4dio4n">Vlad-Ioan Bîrsan</a>.

## Database Diagrams

[Database Diagrams](database_diagram.pdf)

## Endpoints

### register()

<b>Description</b>: Endpoint for creating user account.</br>
<b>Method</b>: `POST` </br>
<b>URL</b>: `https://api/register`</br>
<b>Request Body</b>: 

```json
{
    "username": string,
    "password": string,
    "email": string,
    "first_name": string,
    "last_name": string
}
```

<b>Response</b>:

```json
{
    "status": string
}
```

### sign_in()

<b>Description</b>: Endpoint for user authentication.</br>
<b>Method</b>: `POST` </br>
<b>URL</b>: `https://api/sign_in`</br>
<b>Request Body</b>: 

```json
{
    "username": string,
    "password": string
}
```

<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "user_id": integer,
        "username": string,
        "token": string
    }
}
```

### get_user_profile()

<b>Description</b>: Endpoint for getting user profile.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_user_profile/{{userId}}`</br>

<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "user_id": integer,
        "username": string,
        "email": string,
        "firstName": string,
        "lastName": string,
        "token": string
    }
}
```

### edit_user_profile()

<b>Description</b>: Endpoint for updating user profile.</br>
<b>Method</b>: `PUT` </br>
<b>URL</b>: `https://api/edit_user_profile/{{userId}}`</br>

<b>Request Body</b>: 

```json
{
    "username": string,
    "password": string,
    "email": string,
    "firstName": string,
    "lastName": string
}
```

<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "user_id": integer,
        "username": string,
        "token": string
    }
}
```

### delete_account()


<b>Description</b>: Endpoint for deleting user account.</br>
<b>Method</b>: `DELETE` </br>
<b>URL</b>: `https://api/delete_account/{{userId}}`</br>

<b>Response</b>:

```json
{
    "status": string
}
```

### create_product_review()

<b>Description</b>: Endpoint for creating product review.</br>
<b>Method</b>: `POST` </br>
<b>URL</b>: `https://api/create_product_review`</br>
<b>Query Params</b>: </br>

| Key       | Value       | Description                                    |
|-----------|-------------|------------------------------------------------|
|user_id    |{{userId}}   |The id of the user who is making the review     |
|product_id |{{productId}}|The id of the product being reviewed            |

<b>Request Body</b>: 

```json
{
    "comment": string,
    "rating": double
}
```

<b>Response</b>:

```json
{
    "status": string
}
```

### edit_product_review()

<b>Description</b>: Endpoint for editing product review.</br>
<b>Method</b>: `PUT` </br>
<b>URL</b>: `https://api/edit_product_review`</br>
<b>Query Params</b>: </br>

| Key       | Value       | Description                                    |
|-----------|-------------|------------------------------------------------|
|user_id    |{{userId}}   |The id of the user who is editing the review    |
|product_id |{{productId}}|The id of the product being reviewed            |

<b>Request Body</b>: 

```json
{
    "comment": string,
    "rating": double
}
```

<b>Response</b>:

```json
{
    "status": string
}
```


### get_product_reviews()

<b>Description</b>: Endpoint for getting products reviews.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_product_reviews`</br>
<b>Query Params</b>: </br>

| Key       | Value       | Description                                             |
|-----------|-------------|---------------------------------------------------------|
|user_id    |{{userId}}   |The id of the user who's reviews are requested           |
|product_id |{{productId}}|The id of the products which the reviews are wanted for  |


<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "product_reviews": [{
            "username": string,
            "comment": string,
            "rating": double,
            "created_at": timestamp,
            "updated_at": timestamp
        }]
    }
}
```

### get_product()

<b>Description</b>: Endpoint for getting product details.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_product/{{productId}}`</br>

<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "product":{
            "prodct_name": string,
            "description": string,
            "rating": double,
            "price": double,
            "discount": double,
            "categoey_name": string,
            "created_at": timestamp,
            "reviews": [{
                "username": string,
                "comment": string,
                "rating": double,
                "created_at": timestamp,
                "updated_at": timestamp
            }]
        }
    }
}
```

### get_products()

<b>Description</b>: Endpoint for getting products preview.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_products`</br>
<b>Query Params</b>: </br>

| Key              | Value             | Description                                  |
|------------------|-------------------|----------------------------------------------|
|products_per_page |{{productsPerPage}}|The number of products displayed on a page    |
|page_num          |{{pageNum}}        |The page number                               |


<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "products":[{
            "prodct_name": string,
            "rating": double,
            "price": double,
            "discount": double,
            "categoey_name": string,
            "created_at": timestamp,
        }]
    }
}
```

### add_product_to_cart()

<b>Description</b>: Endpoint for adding product to cart.</br>
<b>Method</b>: `PUT` </br>
<b>URL</b>: `https://api/add_product_to_cart`</br>

<b>Request Body</b>: 

```json
{
    "cart_id": integer,
    "product_id": integer,
    "quantity": integer
}
```

<b>Response</b>:

```json
{
    "status": string
}
```

### pop_product_from_cart()

<b>Description</b>: Endpoint for popping products from cart.</br>
<b>Method</b>: `PUT` </br>
<b>URL</b>: `https://api/pop_product_from_cart`</br>

<b>Request Body</b>: 

```json
{
    "cart_id": integer,
    "product_id": integer,
    "quantity": integer
}
```

<b>Response</b>:

```json
{
    "status": string
}
```

### get_cart_items()

<b>Description</b>: Endpoint for getting cart items.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_cart_items`</br>

<b>Query Params</b>: </br>

| Key    | Value    | Description                                      |
|--------|----------|--------------------------------------------------|
|user_id |{{userId}}|The id of the user who requested the cart content |
|cart_id |{{cartId}}|The id of cart being requested                    |


<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "cart": {
            "cart_id": integer,
            "created_at": timestamp,
            "products": [{
                "prodct_name": string,
                "rating": double,
                "price": double,
                "discount": double,
                "categoey_name": string,
                "created_at": timestamp,
                "quantity": integer
            }]
        }
    }
}
```

### get_carts()


<b>Description</b>: Endpoint for getting a user's carts.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_carts`</br>

<b>Query Params</b>: </br>

| Key    | Value    | Description                                      |
|--------|----------|--------------------------------------------------|
|user_id |{{userId}}|The id of the user who requested the carts        |

<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "carts": [{
            "cart_id": integer,
            "created_at": timestamp,
            "products": [{
                "prodct_name": string,
                "price": double,
                "discount": double,
                "quantity": integer
            }]
        }
    }
}
```

### get_order()

<b>Description</b>: Endpoint for getting order details.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_order`</br>

<b>Query Params</b>: </br>

| Key       | Value       | Description                                      |
|-----------|-------------|--------------------------------------------------|
|user_id    |{{userId}}   |The id of the user who requested the order details|
|payment_id |{{paymentId}}|The payment id associated to the order            |


<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "order": {
            "order_id": integer,
            "created_at": string,
            "status": varchar,
            "products": [{
                "prodct_name": string,
                "rating": double,
                "price": double,
                "discount": double,
                "categoey_name": string,
                "created_at": timestamp,
                "quantity": integer
            }]
        }
    }
}
```

### get_orders()

<b>Description</b>: Endpoint for getting a user's orders.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_orders`</br>

<b>Query Params</b>: </br>

| Key       | Value       | Description                                      |
|-----------|-------------|--------------------------------------------------|
|user_id    |{{userId}}   |The id of the user who requested the order details|

<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "order": {
            "order_id": integer,
            "created_at": string,
            "status": varchar,
            "products": [{
                "prodct_name": string,
                "price": double,
                "discount": double,
                "quantity": integer
            }],
            "amount": double
        }
    }
}
```

### make_order()

<b>Description</b>: Endpoint for making an order.</br>
<b>Method</b>: `PUT` </br>
<b>URL</b>: `https://api/make_order`</br>

<b>Query Params</b>: </br>

| Key       | Value       | Description                                      |
|-----------|-------------|--------------------------------------------------|
|user_id    |{{userId}}   |The id of the user who requested the order details|
|cart_id    |{{cartId}}   |The id of the cart being purchased                |


<b>Request Body</b>: 

```json
{
    "provider": varchar
}
```

<b>Response</b>:

```json
{
    "status": string
}
```

### get_payment()

<b>Description</b>: Endpoint for getting payment details.</br>
<b>Method</b>: `GET` </br>
<b>URL</b>: `https://api/get_payment`</br>


<b>Query Params</b>: </br>

| Key       | Value       | Description                                        |
|-----------|-------------|----------------------------------------------------|
|user_id    |{{userId}}   |The id of the user who requested the payment details|
|payment_id |{{paymentId}}|The id of the payment being requested               |


<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "payment": {
            "amount": double,
            "provider": varchar,
            "created_at": timestamp,
            "order_id": integer
        }
    }
}
```

### get_payments()

<b>Query Params</b>: </br>

| Key       | Value       | Description                                 |
|-----------|-------------|---------------------------------------------|
|user_id    |{{userId}}   |The id of the user who requested the payments|


<b>Response</b>:

```json
{
    "status": string,
    "data": {
        "payments": [{
            "amount": double,
            "provider": varchar,
            "created_at": timestamp,
            "order_id": integer
        }]
    }
}
```


## Copyright © 2023

<p><a href="https://github.com/cristina-timbur">@cristina-timbur</a><a> &nbsp;</a><a href="https://github.com/vl4dio4n">@vl4dio4n</a></p>

***
*<p align="center"><a>FMI UniBuc 2023</a></p>*

<p align="right">(<a href="#top">Back to Top</a>)</p>
