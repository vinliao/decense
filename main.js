async function getInput() {
  const buf = new Uint8Array(64)
  const choice = await Deno.stdin.read(buf)

  return new TextDecoder().decode(buf.subarray(0, choice))
}

const licenseList = ['agpl-3.0', 'apache-2.0', 'bsd-2-clause', 'bsd-3-clause',
'cc0-1.0', 'epl-2.0', 'free-art-1.3', 'gpl-2.0', 'gpl-3.0', 'lgpl-2.1', 'lgpl-3.0',
'mit', 'mpl-2.0', 'unlicense', 'wtfpl']

console.log('Here\'s the list of available license')
console.log('1. agpl-3.0      (GNU Affero General Public License v3.0)')
console.log('2. apache-2.0    (Apache License 2.0)')
console.log('3. bsd-2-clause  (BSD 2-Clause "Simplified" License)')
console.log('4. bsd-3-clause  (BSD 3-Clause "New" or "Revised" License)')
console.log('5. cc0-1.0       (Creative Commons Zero v1.0 Universal)')
console.log('6. epl-2.0       (Eclipse Public License 2.0)')
console.log('7. free-art-1.3  (Free Art License 1.3)')
console.log('8. gpl-2.0       (GNU General Public License v2.0)')
console.log('9. gpl-3.0       (GNU General Public License v3.0)')
console.log('10. lgpl-2.1     (GNU Lesser General Public License v2.1)')
console.log('11. lgpl-3.0     (GNU Lesser General Public License v3.0)')
console.log('12. mit          (MIT License)')
console.log('13. mpl-2.0      (Mozilla Public License 2.0)')
console.log('14. unlicense    (The Unlicense)')
console.log('15. wtfpl        (Do What the Fuck You Want To Public License)')

console.log('===============================================================')

console.log('If no choice is given, it will default to MIT')

// writing without newline in deno
const text = new TextEncoder().encode('Your choice: ')
const nameText = new TextEncoder().encode('Your name: ')

// license link
Deno.writeAll(Deno.stdout, text)
const rawLicenseNumber = await getInput()
const license = licenseList[Number(rawLicenseNumber) - 1]
const licenseLink = 'https://raw.githubusercontent.com/nishanths/license/master/.templates/' + license + '.tmpl'

// name and year
Deno.writeAll(Deno.stdout, nameText)
const rawAuthor = await getInput()
const author = rawAuthor.slice(0, -1) // remove trailing char
const currentYear = new Date().getFullYear()

const response = await fetch(licenseLink)
let data = await response.text()

// todo: gpl uses <year> <author> format
data = data.replace('{{.Year}}', currentYear)
data = data.replace('{{.Name}}', author)

Deno.writeTextFileSync('./LICENSE', data)