export function setCookie(cname: string, cvalue: string, exdays: number, exseconds: number = 0): void {
  const d = new Date()
  d.setTime(d.getTime() + (exseconds * 1000 || exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export function getCookie(cname: string): string {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function removeCookie(cname: string): void {
  const d = new Date()
  d.setTime(d.getTime() + 1)

  document.cookie = cname + `='';expires=` + d.toUTCString() + `;path=/`
}
