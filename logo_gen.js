var LogoGen = function (sizeish) {
    this.d = sizeish;

    var x = Math.sin(60 * (Math.PI / 180)) * this.d,
        y = this.d / 2,
        draw = SVG('drawing').size('500', '500'),
        count = 0, // Counter to give the triangles an id, 0 based, from right top sloped down left
    // The top most point's offset from the edge of the canvas
        xOff = 100,
        yOff = 10;

    console.log(this.d, x, y);

    function triangle(d, offsetX, offsetY, left, color) {
        if (typeof color === 'undefined') color = 'none';
        var triangle =
            (x + offsetX) + ',' + offsetY + ' ' +
            (x + offsetX) + ',' + (d + offsetY) + ' ' +
            (offsetX + (left ? 0 : 2 * x )) + ',' + (y + offsetY);

        draw.polygon(triangle).fill(color).stroke({width: 0.5}).attr({id: 'tr' + count, 'stroke-linejoin': 'bevel'});

        //draw.text('tr' + count).move(x - 20 + offsetX + (left ? 0 : 2 * x - 100), 40 + offsetY).font({ size: 10, anchor: 'middle'});

        count++;
    }

    function row(d, xOff, yOff, big, left) {
        var nr = big ? 3 : 2, v = 0;

        if (!left)
            triangle(d, xOff, yOff, false);

        for (v; v < nr; v++) {
            triangle(d, xOff - v * x, yOff + v * y, true);
            triangle(d, xOff - v * x - x, yOff + v * y + y, false);
        }

        if (left)
            triangle(d, xOff - v * x, yOff + v * y, true);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    var colors = [
        [255, 204, 9],
        [246, 138, 33],
        [228, 39, 43],
        [232, 31, 111],
        [189, 61, 147],
        [113, 69, 155],
        [77, 73, 156],
        [57, 96, 169],
        [32, 183, 232],
        [70, 183, 140],
        [73, 182, 80],
        [120, 191, 68]
    ];

    function getRandomColor() {
        var c1 = "rgb(",
            c2 = "rgb(",
            ca = "rgb(",
            nr1 = getRandomInt(0, colors.length), nr2;

        do {
            nr2 = getRandomInt(0, colors.length);
        } while (nr1 === nr2); // TODO and nr intersect nr2 < 2

        // Multiply colors
        ca += Math.round(colors[nr1][0] * colors[nr2][0] / 255) + ',' +
            Math.round(colors[nr1][1] * colors[nr2][1] / 255) + ',' +
            Math.round(colors[nr1][2] * colors[nr2][2] / 255) + ')';


        return {'c1': c1 + colors[nr1].join(',') + ')', 'c2': c2 + colors[nr2].join(',') + ')', 'ca': ca};
    }

    row(this.d, xOff, yOff, false, false);
    row(this.d, x + xOff, y + yOff, true, false);
    row(this.d, 2 * x + xOff, 2 * y + yOff, true, true);
    row(this.d, 2 * x + xOff, 4 * y + yOff, false, true);

    console.log("Triangles drawn:", count);
    if (count != 24) console.warn("Wrong number of triangles!");


    // Colors
    var neighbors = {
        'tr0': [1, 6], 'tr1': [0, 2], 'tr2': [1, 3, 8], 'tr3': [2, 4], 'tr4': [3, 10],
        'tr5': [6, 12], 'tr6': [0, 5, 7], 'tr7': [6, 8, 14], 'tr8': [2, 7, 9], 'tr9': [8, 10, 16],
        'tr10': [4, 9, 11], 'tr11': [10, 18], 'tr12': [5, 13], 'tr13': [12, 14, 19], 'tr14': [7, 13, 15],
        'tr15': [14, 16, 21], 'tr16': [9, 15, 17], 'tr17': [16, 18, 23], 'tr18': [11, 17], 'tr19': [13, 20],
        'tr20': [19, 21], 'tr21': [15, 20, 22], 'tr22': [21, 23], 'tr23': [17, 22]
    };

    function setColor(id, color) {
        document.getElementById(id).setAttribute('fill', color);
    }

    function doColor(color) {
        var nr = getRandomInt(8, 12), curr = getRandomInt(0, 24), result = [], safety = 0;
        result.push(curr);

        console.log("nr", nr);
        do {
            safety++;
            var n = neighbors['tr' + curr];
            curr = n[getRandomInt(0, n.length)];
            result.push(curr);
        } while (result.length < nr && safety < 100);
        if (safety > 40) console.warn(safety);

        result.forEach(function (el) {
            setColor('tr' + el, color);
        });
        return result;
    }

    function intersect(a, b) {
        var t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
        return a.filter(function (e) {
            if (b.indexOf(e) !== -1) return true;
        });
    }

    function clearColors() {
        for (var r = 0; r < 24; r++) {
            setColor('tr' + r, 'none');
        }
    }

    this.redraw = function () {
        clearColors();
        var colors = getRandomColor();
        console.log("colors", colors);

        var set1 = doColor(colors.c1);
        var set2 = doColor(colors.c2);
        var set3 = intersect(set1, set2);
        set3.forEach(function (el) {
            setColor('tr' + el, colors.ca);
        });
    };

};

function logo() {
    lg.redraw();
}
var lg = new LogoGen(80);
lg.redraw();
