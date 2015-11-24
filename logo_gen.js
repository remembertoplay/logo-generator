var LogoGen = function(){
var d = 80, // Influences size of the logo
    x = Math.sin(60 * (Math.PI / 180)) * d,
    y = d / 2,
    draw = SVG('drawing').size('500', '500'),
    count = 0, // Counter to give the triangles an id, 0 based, from right top sloped down left
    // The top most point's offset from the edge of the canvas
    xOff = 100,
    yOff = 10;

console.log(d, x, y);

function triangle(offsetX, offsetY, left, color) {
  if (typeof color === 'undefined') color = 'none';
  var triangle =
    (x + offsetX) + ',' + offsetY + ' ' +
    (x + offsetX) + ',' + (d + offsetY) + ' ' +
    (offsetX + (left ? 0 : 2 * x )) + ',' + (y + offsetY);

  draw.polygon(triangle).fill(color).stroke({ width: 0.5 }).attr({ id: 'tr' + count, 'stroke-linejoin': 'bevel' });

  count++;
}

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
  var c1 = "rgb(",
      c2 = "rgb(",
      ca = "rgb(",
      nr1, nr2;

  for(var t = 2; t >= 0; t--) {
    nr1 = getRandomInt(0, 256);
    nr2 = getRandomInt(0, 256);
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

row(xOff, yOff, false, false);
row(x + xOff, y + yOff, true, false);
row(2 * x + xOff, 2 * y + yOff, true, true);
row(2 * x + xOff, 4 * y + yOff, false, true);

console.log("Triangles drawn:", count);
if (count != 24) console.warn("Wrong number of triangles!");


// Colors
var colors = getRandomColor(), color1 = colors.c1, color2 = colors.c2, colorAvg = colors.ca;
console.log(color1, color2, colorAvg);
var neighbors = {
    'tr0': [1,6], 'tr1': [0,2], 'tr2': [1,3,8], 'tr3': [2,4], 'tr4': [3,10],
    'tr5': [6,12], 'tr6': [0,5,7], 'tr7': [6,8,14], 'tr8': [2,7,9], 'tr9': [8,10,16],
    'tr10': [4,9,11], 'tr11': [10,18], 'tr12': [5,13], 'tr13': [12,14,19], 'tr14': [7,13,15],
    'tr15': [14,16,21], 'tr16': [9,15,17], 'tr17': [16,18,23], 'tr18': [11,17], 'tr19': [13,20],
    'tr20': [19,21], 'tr21': [15,20,22], 'tr22': [21,23], 'tr23': [17,22]
};

function setColor(id, color){
  document.getElementById(id).setAttribute('fill', color);
}

function doColor(color){
  var nr = getRandomInt(8, 12), curr = getRandomInt(0, 24), result = new Array(), safety = 0;
  result.push(curr);

  console.log("nr", nr);
  do {
    safety++;
    var n = neighbors['tr' + curr];
      curr = n[getRandomInt(0, n.length)];
    result.push(curr);
  } while(result.length < nr && safety < 100);
  if (safety > 40) console.warn(safety);

  result.forEach(function(el){ setColor('tr' + el, color); });
  return result;
}

function intersect(a, b) {
  var t;
  if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
  return a.filter(function (e) {
    if (b.indexOf(e) !== -1) return true;
  });
}

function clearColors(){
  for (var r = 0; r < 24; r++) {
    setColor('tr' + r, 'none');
  }
}

clearColors();
var set1 = doColor(color1);
var set2 = doColor(color2);
var set3 = intersect(set1, set2);
set3.forEach(function(el){ setColor('tr' + el, colorAvg); });
console.log(set1, set2, set3);

};

function logo() {
  var lg = new LogoGen();
}
var lg = new LogoGen();
