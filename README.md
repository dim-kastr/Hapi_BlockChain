# Hapi BlockChain

![BlockChain](https://cs12.pikabu.ru/post_img/2020/08/08/1/og_og_1596843812240840746.jpg)

Description: 

* Processing of the `BlockChain Events` contract
* Record `BlockChain Events`
* Using `BlockChain` functions
* Information about tokens in the `BlockChain`

## Main Technologies

1. [Hapi.js](https://hapi.dev/)
2. [ORM Sequelize](https://sequelize.org/master/identifiers.html)
3. [PostgreSQL](https://www.postgresql.org/)

### Database Schema

#### The data structure for "Hapi_BlockChain"

`List of tables:`

![DB](https://downloader.disk.yandex.ru/preview/15c457d6f739db81059e36139342623c34fe4d4f20de7b3af8e73b30e86724f2/620b9ec0/MXIPbBQ2T7r1fMLD6JJ462c_V9sNEbLgDJA1cM8JlR5lKjGpOwlymeU3Xw4ya7f1qnDM4mEbokUshk1sO_jLww%3D%3D?uid=0&filename=2022-02-15_15-37-45.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=1366x652)

> :white_circle: Transactions schema
>> ![Transactions](https://downloader.disk.yandex.ru/preview/8849bba0f12997cb1d54e75e25800c7b9d18fe454c34e82c375f5d22bc8eea75/620ba17d/MF3W5htazBlCR0jbCnAXlXfjIXrOQxyuS7zm3rlSjKlL3IQMbc96KV3t8oqOaWcQSllw5bcb3AIkMVYKwi4ZuA%3D%3D?uid=0&filename=2022-02-15_15-49-31.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=1366x652)

> :white_circle: User schema
>> ![User](https://downloader.disk.yandex.ru/preview/cb58f25ae7bf3b685c5827f542f0f8f2945a7fb5cad7be4f96888639614b5a2f/620ba1cf/_XFKFqqF-jAl_AaujF1uMIuBuHEnb0PQ--g0tRSZqqVCzYEDPn1MJjNj-Os8bMQ47vug8cHMoS2NKsIRiYVhPg%3D%3D?uid=0&filename=2022-02-15_15-50-59.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=1366x652)

> :white_circle: Wallet schema
>> ![Wallet](https://downloader.disk.yandex.ru/preview/5d4ad23ad7a51db6379c9450236fa0c0cfbe3c3e6a8badfffd322f5898c52020/620ba211/afIh7Y7KHCq2eVJ9PSw8eq8OljMmtoDgfIq7drlUDtq3PJF2mEvwuwy2ErHZnMMPFkJdfMzZbgjpvulYuwcbIA%3D%3D?uid=0&filename=2022-02-15_15-52-11.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=1366x652)


## Instruction

### Getting started

To get started with the project, the developer has to perform the following steps to get
the server up and running, the steps are carefully explained below.

<details><summary><b>Show steps</b></summary>

1. First off the developer has to create an `.env` file. The example is shown below.

   ```shell
   # Server
   HOST=localhost
   PORT=3000
   BASE_URL=
   
   # Database
   DB_LINK=
   
   # Wallet
   PRIVATE_KEY_ACCOUNT=
   
   ```
</details>

### Installing dependencies

To install the dependencies required in the project, the developer should navigate to the project folder and run the
following command in the terminal.

<details><summary><b>Show code</b></summary>

In the terminal run:

   ```shell
   $ npm install
   ```
</details>

### Starting server

To run the backend server, the developer should navigate to the project folder 
and run the following command in the terminal.

<details><summary><b>Show code</b></summary>

1. To build the project run:

    ```sh
    $ npm run build
    ```
2. To compile the project run:

    ```sh
    $ npm run compile
    ```
3. To start the server run:

    ```sh
    $ npm run start
    ```
</details>

## Handler functions
 
The functions of processing media or information on a smart contract
described in the ERC-20-FISH and ABI-CONTRACT token contracts
 
<details><summary><b>Functions</b></summary>

1. `callApprove`:
    
    ```sh
    Calling the approve funds functions on a smart contract
    ```
2. `callDeposit`:

    ```sh
    Calling the deposit functions of funds to a smart contract
    ```
3. `callWithdraw`:

    ```sh
    Calling the withdraw funds functions to a smart contract
    ```
4. `getListTokens`:

    ```sh
    Getting a list of tokens from the exchange contract
    ```
5. `getInfoToken`:

    ```sh
    Getting information about the token from the BlockChain
    ```
</details>

## POSTMAN TESTS

:white_check_mark: Added postman tests to check the payload and server responses

