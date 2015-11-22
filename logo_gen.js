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
  draw.polygon(triangle).fill(color).stroke({ width: 5 }).attr({ 'stroke-linejoin': 'bevel' });
  count++;
}

var xOff = 100, yOff = 10;

function row(xOff, yOff, big, left) {
  var big = big ? 3 : 2, v = 0;

  if (!left)
    triangle(xOff, yOff, false);

  for (v; v < big; v++) {
    triangle(xOff - v * x, yOff + v * y, true);
    triangle(xOff - v * x - x, yOff + v * y + y, false, 'red');
  }

  if (left)
    triangle(xOff - v * x, yOff + v * y, true, 'green');
}
row(xOff, yOff, false, false);
row(x + xOff, y + yOff, true, false);
row(2 * x + xOff, 2 * y + yOff, true, true);
row(2 * x + xOff, 4 * y + yOff, false, true);

console.log("Triangles drawn:", count);
if (count != 24) console.warn("Wrong number of triangles!");

