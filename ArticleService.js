const articlesUrl = new URL("https://sprint-mission-api.vercel.app/articles");

export function getArticleList(page, pageSize, keyword) {
  return fetch(
    `${articlesUrl}/?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("error");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function createArticle(title, content, image) {
  return fetch(`${articlesUrl}`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      image,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("createArticle에러");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function patchArticle(id, update) {
  return fetch(`${articlesUrl}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("에러");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteArticle(id) {
  return fetch(`${articlesUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("에러");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getArticle(id) {
  return fetch(`${articlesUrl}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("get에러");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}
