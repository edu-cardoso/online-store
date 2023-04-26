export async function fetchProductsByCategory(id) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
  const data = await request.json()

  return data
}

export async function fetchProductsByName(name) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${name}`);
  const data = await request.json()

  return data
}