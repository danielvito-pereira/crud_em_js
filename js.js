
/* 
  Nesta etapa, estou criando um objeto indexedDB e abrindo uma conexão com um banco de dados nomeado como "myDatabase" com a versão 1. Em seguida, estou adicionando um listener de evento onupgradeneeded para a conexão, que será executado sempre que o banco de dados for atualizado. Dentro desse listener, estou criando um objeto objectStore chamado "myTable" no banco de dados, com uma chave primária chamada "id" que é auto-incrementada. Além disso, estou criando um índice secundário para o nome no objeto objectStore.
*/
const request = indexedDB.open("myDatabase", 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore("myTable", { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("name", "name", { unique: false });
};






/* 
  Nesta etapa, estamos adicionando um listener de evento onsuccess para a conexão que será executado quando a conexão for bem-sucedida. Dentro desse listener, estamos iniciando uma transação de leitura e gravação no objeto myTable e adicionando um novo objeto de dados com o nome "John Doe" e o email "john.doe@example.com". O request é a solicitação de adicionar esse objeto de dados na transação. Quando a solicitação for concluída com sucesso, exibimos uma mensagem de "Data inserted successfully" no console.
*/
request.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction(["myTable"], "readwrite");
  const objectStore = transaction.objectStore("myTable");
  const data = { name: "John Doe", email: "john.doe@example.com" };
  const request = objectStore.add(data);
  
  request.onsuccess = function(event) {
    console.log("Data inserted successfully");
  };
};





/* 
  Nesta etapa, estamos adicionando outro listener de evento onsuccess para a conexão que será executado quando a conexão for bem-sucedida. Dentro desse listener, estamos iniciando uma transação somente de leitura no objeto myTable e obtendo todos os objetos de dados na transação usando o método getAll() do objeto objectStore. Quando a solicitação for concluída com sucesso, exibimos os dados resultantes no console.
*/
request.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction(["myTable"], "readonly");
  const objectStore = transaction.objectStore("myTable");
  const request = objectStore.getAll();
  
  request.onsuccess = function(event) {
    console.log(event.target.result);
  };
};






/* 
  Nesta etapa, estamos adicionando outro listener de evento
*/
request.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction(["myTable"], "readwrite");
  const objectStore = transaction.objectStore("myTable");
  const data = { id: 1, name: "Jane Doe", email: "jane.doe@example.com" };
  const request = objectStore.put(data);
  
  request.onsuccess = function(event) {
    console.log("Data updated successfully");
  };
};
