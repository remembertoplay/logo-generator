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
   var text = draw.text('tr' + count).move(offsetX, offsetY)
             text.font({
                       size: 10
                       , anchor: 'middle'
                       })

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
    'tr0': [1, 6], 'tr1': [0, 2], 'tr2': [1, 3, 8], 'tr3': [2, 4], 'tr4': [3, 10],
    'tr5': [6, 8], 'tr6': [1, 6], 'tr7': [1, 6], 'tr8': [1, 6], 'tr9': [1, 6],
    'tr10': [1, 6], 'tr11': [1, 6], 'tr12': [1, 6], 'tr13': [1, 6], 'tr14': [1, 6],
    'tr15': [1, 6], 'tr16': [1, 6], 'tr17': [1, 6], 'tr18': [1, 6], 'tr19': [1, 6],
    'tr20': [1, 6], 'tr21': [1, 6], 'tr22': [1, 6], 'tr23': [1, 6]
  };
console.log(neighbors);

function setColor(id, color){
  document.getElementById(id).setAttribute('fill', color);
}

var ttt = 0;
function f(){
  var t = 'tr' + ttt;
  document.getElementById('b1').innerHTML = t;
  ttt++;
  for (var y=0; y<24; y++){
    setColor('tr' + y, 'white');
  }
  document.getElementById(t).setAttribute('fill', 'red');
  neighbors[t].forEach(function(el){
    setColor('tr' + el, 'green');
  });
}
f();

//document.getElementById('tr0').setAttribute('fill', color1);
//document.getElementById('tr1').setAttribute('fill', colorAvg);
//document.getElementById('tr9').setAttribute('fill', color2);

