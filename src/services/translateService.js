export async function translateText(
  text,
  from,
  to
) {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${from}|${to}`
    )

    const data =
      await response.json()

    return data.responseData
      .translatedText
  } catch (error) {
    console.error(error)

    return 'Error al traducir'
  }
}