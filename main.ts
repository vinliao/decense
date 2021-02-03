const getInput = async (returnInt: boolean = false) => {
  // take bytestring then decode to string
  const buf = new Uint8Array(64);
  const choice = await Deno.stdin.read(buf) as number;
  const result = new TextDecoder().decode(buf.subarray(0, choice));

  if (returnInt) return +result;
  return result;
};

const licenseList = [
  "agpl-3.0",
  "apache-2.0",
  "bsd-2-clause",
  "bsd-3-clause",
  "cc0-1.0",
  "epl-2.0",
  "free-art-1.3",
  "gpl-2.0",
  "gpl-3.0",
  "lgpl-2.1",
  "lgpl-3.0",
  "mit",
  "mpl-2.0",
  "unlicense",
  "wtfpl",
];

// printing stuff
console.log("Pick your license");
for (let i = 0; i < licenseList.length; i++) {
  console.log(`${i + 1}. ${licenseList[i]}`);
}

// take license choice
let text = new TextEncoder().encode("Your choice: ");
Deno.writeAll(Deno.stdout, text);
let licenseChoice = await getInput(true) as number;
if (isNaN(licenseChoice) || licenseChoice <= 0 || licenseChoice >= 15) {
  console.log('\n===')
  console.log('Invalid input! Defaulting to MIT license');
  console.log('===\n')
  licenseChoice = 12; //defaults to mit
}
const license = licenseList[licenseChoice-1] as string;

// take author name
text = new TextEncoder().encode("Your name: ");
Deno.writeAll(Deno.stdout, text);
const authorName = await getInput() as string;

const currentYear = new Date().getFullYear().toString() as string;
const licenseLink =
  `https://raw.githubusercontent.com/nishanths/license/master/.templates/${license}.tmpl` as string;

const response = await fetch(licenseLink);
let data = await response.text() as string;

data = data.replace('{{.Year}}', currentYear);
data = data.replace('{{.Name}}', authorName);

Deno.writeTextFileSync('./LICENSE', data);