var d = 100, x = Math.sin(60 * (Math.PI / 180)) * d, y = Math.cos(60 * (Math.PI / 180)) * d, c = 2 * x;
console.log(d, x, y);
/* create an svg drawing */
var draw = SVG('drawing').size('500', '500')

var count = 0;

function triangle(offsetX, offsetY, left, color) {
  if (typeof color === 'undefined') color = 'none';
  var triangle = 
    (x + offsetX) + ',' + offsetY + ' ' + 
    (x + offsetX) + ',' + (d + offsetY) + ' ' + 
    (offsetX + (left ? 0 : c )) + ',' + (y + offsetY);

  //console.log(triangle);
  draw.polygon(triangle).fill(color).stroke({ width: 5 }).attr({ id: 'tr' + count, 'stroke-linejoin': 'bevel' });
  count++;
}

var xOff = 100, yOff = 10;

function row(xOff, yOff, big, left) {
  var big = big ? 3 : 2, v = 0;

  if (!left)
    triangle(xOff, yOff, false);

  for (v; v < big; v++) {
    triangle(xOff - v * x, yOff + v * y, true);
    triangle(xOff - v * x - x, yOff + v * y + y, false);
  }

  if (left)
    triangle(xOff - v * x, yOff + v * y, true);
}


// colors
function getRandomInt() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  var c1 = 'rgb(', c2 = 'rgb(', ca = 'rgb(', nr1, nr2;

          for(var t = 2; t >= 0; t--) {
            nr1 = getRandomInt();
            nr2 = getRandomInt();
            c1 += nr1;
            c2 += nr2;
            ca += Math.round((nr1 + nr2) / 2);
            if(t != 0) {
              c1 += ',';
              c2 += ',';
              ca += ',';
            }
          }
          return {'c1':c1+')','c2':c2+')','ca':ca+')'};
  }
  
var colors = getRandomColor(), color1 = colors.c1, color2 = colors.c2, colorAvg = colors.ca;
console.log(color1, color2, colorAvg);




row(xOff, yOff, false, false);
row(x + xOff, y + yOff, true, false);
row(2 * x + xOff, 2 * y + yOff, true, true);
row(2 * x + xOff, 4 * y + yOff, false, true);

console.log("Triangles drawn:", count);
if (count != 24) console.warn("Wrong number of triangles!");


document.getElementById('tr0').setAttribute('fill', color1);
document.getElementById('tr1').setAttribute('fill', colorAvg);
document.getElementById('tr2').setAttribute('fill', color2);
