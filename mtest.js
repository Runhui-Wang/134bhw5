let idNum = 0;
const url = "https://httpbin.org";
function makeList(obj) {
  let list = document.createElement("ul");
  Object.entries(obj).forEach((entry) => {
    let item = document.createElement("li");
    let item2 = document.createElement("li");

    let key = entry[0];
    let value = entry[1];

    item.textContent = key + " : ";
    if (typeof value === "string") {
      item.textContent += value;
    } else {
      if (!value) {
        item.textContent += "";
      } else if (Object.keys(value).length === 0) {
        item.textContent += JSON.stringify(value);
      } else {
        item2.appendChild(makeList(value));
      }
    }

    list.appendChild(item);
    list.appendChild(item2);
  });

  return list;
}

function fetchArticle(id) {
  let endpoint = url + "/" + "get?id=" + id;
  let output = document.getElementById("response");

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      output.appendChild(makeList(data));
    })
    .catch((err) => {
      output.textContent = err;
    });
}

function createArticle(name, body, date) {
  let endpoint = url + "/" + "post";
  let output = document.getElementById("response");
  let content = {
    id: idNum,
    article_name: name,
    article_body: body,
    date: date,
  };
  idNum++;

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  })
    .then((response) => response.json())
    .then((data) => {
      output.appendChild(makeList(data));
    })
    .catch((err) => {
      output.textContent = err;
    });
}

function updateArticle(id, name, body, date) {
  let endpoint = url + "/" + "put?id=" + id;
  let output = document.getElementById("response");
  let content = {
    id: idNum,
    article_name: name,
    article_body: body,
    date: date,
  };
  idNum++;

  fetch(endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  })
    .then((response) => response.json())
    .then((data) => {
      output.appendChild(makeList(data));
    })
    .catch((err) => {
      output.textContent = err;
    });
}

function deleteArticle(id) {
  let endpoint = url + "/" + "delete?id=" + id;
  let output = document.getElementById("response");

  fetch(endpoint, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      output.appendChild(makeList(data));
    })
    .catch((err) => {
      output.textContent = err;
    });
}

window.addEventListener("DOMContentLoaded", () => {
  let currentMethod = "";

  let methodSelect = document.getElementById("methodSelect");
  let output = document.getElementById("response");
  let title = document.getElementById("title");

  let form = document.getElementById("submit_form");

  methodSelect.addEventListener("click", (event) => {
    let name = document.getElementById("nameInput");
    let id = document.getElementById("idInput");
    let body = document.getElementById("bodyInput");
    let date = document.getElementById("dateInput");

    let articleDate = document.getElementById("articleDate");
    let newDate = new Date();
    articleDate.value = newDate.toISOString().split("T")[0];

    let methodText = event.target.textContent;
    currentMethod = methodText;

    switch (methodText) {
      case "Get":
        output.textContent = "";
        title.textContent = "Get Article: ";
        id.style.display = "block";
        name.style.display = "none";
        body.style.display = "none";
        date.style.display = "none";
        break;
      case "Delete":
        output.textContent = "";
        title.textContent = "Remove Article: ";
        id.style.display = "block";
        name.style.display = "none";
        body.style.display = "none";
        date.style.display = "none";
        break;
      case "Post":
        output.textContent = "";
        title.textContent = "Insert Article: ";
        id.style.display = "block";
        name.style.display = "block";
        body.style.display = "block";
        date.style.display = "block";
        break;
      case "Put":
        output.textContent = "";
        title.textContent = "Update Article: ";
        id.style.display = "block";
        name.style.display = "block";
        body.style.display = "block";
        date.style.display = "block";
        break;

      default:
        break;
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = document.querySelector("#nameInput input");
    let id = document.querySelector("#idInput input");
    let body = document.querySelector("#bodyInput input");
    let date = document.querySelector("#dateInput input");

    switch (currentMethod) {
      case "Get":
        fetchArticle(id.value);
        break;
      case "Delete":
        deleteArticle(id.value);
        break;
      case "Post":
        createArticle(name.value, body.value, date.value);
        break;
      case "Put":
        updateArticle(id.value, name.value, body.value, date.value);
        break;
      default:
        break;
    }

    name.value = "";
    body.value = "";

    let newDate = new Date();
    date.value = newDate.toISOString().split("T")[0];
    id.value = "";
  });
});
