const ProductUrl = new URL("https://sprint-mission-api.vercel.app/products");

export async function getProductList(page, pageSize, keyword) {
  try {
    const response = await fetch(
      `${ProductUrl}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );

    if (!response.ok) {
      throw new Error("에러");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createProduct(name, description, price, tags, images) {
  try {
    const response = await fetch(`${ProductUrl}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("create에러");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function patchProduct(id, update) {
  try {
    const response = await fetch(`${ProductUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("patch에러");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${ProductUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("딜리트에러");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${ProductUrl}/${id}`);

    if (!response.ok) {
      throw new Error("get에러");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
