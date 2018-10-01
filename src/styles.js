// Ease in curve
const easeIn = t => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};

// function getGridTone(value = 50) {
//   let cw, ch, dt, dd, dl, c;
//   const cv = document.createElement("canvas");
//   const cx = cv.getContext("2d");

//   cw = cv.width = 300;
//   ch = cv.height = 300;
//   dt = cx.createImageData(cw, ch);
//   dd = dt.data;
//   dl = dt.width * dt.height;

//   let density = Math.floor(value / 10);
//   let offset = Math.floor(density / 2);

//   function makeDot(num) {
//     dd[p++] = c = num;
//     dd[p++] = c;
//     dd[p++] = c;
//     dd[p++] = 255;
//   }

//   let p = 0;

//   for (let i = 0; i < dl; ++i) {
//     let row = Math.floor(i / cw);
//     let col = i % cw;

//     if (row % density !== 0) {
//       makeDot(255);
//       continue;
//     } else {
//       let isOffset = row % (density * 2) === 0;
//       if ((isOffset ? col : col + offset) % density === 0) {
//         makeDot(0);
//       } else {
//         makeDot(255);
//       }
//     }
//   }

//   cx.putImageData(dt, 0, 0);

//   const data = cv.toDataURL("image/webp");

//   return `url("${data}") top left repeat local`;
// }

// Create a noise tone based on a value
function getNoiseTone(value = 50) {
  value = easeIn(value / 100) * 100;

  let cw, ch, dt, dd, dl, c, r;
  const cv = document.createElement("canvas");
  const cx = cv.getContext("2d");

  cw = cv.width = 300;
  ch = cv.height = 300;
  dt = cx.createImageData(cw, ch);
  dd = dt.data;
  dl = dt.width * dt.height;

  let p = 0;
  for (let i = 0; i < dl; ++i) {
    c = 255;

    if (Math.random() > value / 100) {
      c = Math.random();
    }

    dd[p++] = c;
    dd[p++] = c;
    dd[p++] = c;
    dd[p++] = 255;
  }
  cx.putImageData(dt, 0, 0);

  const data = cv.toDataURL("image/webp");

  return `url("${data}") top left repeat local`;
}

// Create CSS rules
const rules = ["lighter", "light", "base", "dark", "darker"].map((n, i) => {
  let rule = getNoiseTone((7 - i) * 10);
  return `--tone-${n}: ${rule};`;
});

rules.push(`--tone: ${getNoiseTone(50)};`);
rules.push(`--border: 1px solid #000;`);

// Create variable rule
const rootRule = `
	:root { 
		${rules.join(`
`)} 
	}`;

// push variable rule to stlyes
document.styleSheets[0].insertRule(rootRule, 0);
