export function b64Encode(str: string = ''): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))))
}

export function b64Decode(encodedStr: string = ''): string {
  return decodeURIComponent(
    atob(encodedStr)
      .split('')
      .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )
}
