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
   var text = draw.text('tr' + count).move(x - 20 + offsetX + (left ? 0 : c-120), 40 + offsetY)
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
    'tr0': [1,6], 'tr1': [0,2], 'tr2': [1,3,8], 'tr3': [2,4], 'tr4': [3,10],
    'tr5': [6,12], 'tr6': [0,5,7], 'tr7': [6,8,14], 'tr8': [2,7,9], 'tr9': [8,10,16],
    'tr10': [4,9,11], 'tr11': [10,18], 'tr12': [5,13], 'tr13': [12,14,19], 'tr14': [7,13,15],
    'tr15': [14,16,21], 'tr16': [9,15,17], 'tr17': [16,18,23], 'tr18': [11,17], 'tr19': [13,20],
    'tr20': [19,21], 'tr21': [15,20,22], 'tr22': [21,23], 'tr23': [17,22]
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

