var LogoGen = function (sizeish, shape) {
    this.d = sizeish;
    this.shape = shape;

    var x = Math.sin(60 * (Math.PI / 180)) * this.d,
        y = this.d / 2,
        draw = SVG('drawing').size('150', '150'),
        count = 0, // Counter to give the triangles an id, 0 based, from right top sloped down left
    // The top most point's offset from the edge of the canvas
        xOff = 50,
        yOff = 10;

    console.log(this.d, x, y);

    function triangle(d, offsetX, offsetY, left, color) {
        if (typeof color === 'undefined') color = 'none';
        var triangle =
            (x + offsetX) + ',' + offsetY + ' ' +
            (x + offsetX) + ',' + (d + offsetY) + ' ' +
            (offsetX + (left ? 0 : 2 * x )) + ',' + (y + offsetY);

        draw.polygon(triangle).fill(color).stroke({width: 0.5}).attr({
            id: 'tr' + shape + '_' + count,
            'stroke-linejoin': 'bevel'
        });

        //draw.text('tr' + count).move(x - 20 + offsetX + (left ? 0 : 2 * x - 100), 40 + offsetY).font({
        //    size: 10,
        //    anchor: 'middle'
        //});

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


    //console.log("Triangles drawn:", count);
    if (count != 24) console.warn("Wrong number of triangles!");

    // Colors


    var shapes = [
        [9, 16, 17, 23, 22, 21],
        [17, 23, 22, 21, 15, 14],
        [6, 7, 8, 9, 15, 16],
        [7, 8, 14, 15, 16, 17],
        [9, 16, 17, 23, 14, 15],
        [2, 8, 9, 10, 11, 16],
        [5, 6, 7, 8, 14, 15],
        [8, 9, 15, 16, 17, 18],
        [6, 7, 13, 14, 15, 16, 19],
        [2, 3, 6, 7, 8, 9, 16],
        [1, 2, 8, 9, 15, 16, 17],
        [2, 7, 8, 9, 16, 17, 23],
        [9, 10, 15, 16, 17, 21],
        [7, 12, 13, 14, 15, 16],
        [2, 7, 8, 9, 10, 16],
        [6, 7, 8, 13, 14, 15],
        [9, 10, 11, 14, 15, 16],
        [9, 13, 14, 15, 16, 19],
        [9, 10, 13, 14, 15, 16],
        [7, 8, 9, 10, 13, 14],
        [7, 8, 9, 13, 14, 15],
        [7, 9, 13, 14, 15, 16],
        [8, 9, 10, 14, 15, 16],
        [2, 7, 8, 9, 14, 16],
        [8, 9, 14, 15, 16, 17],
        [2, 3, 6, 7, 8, 9],
        [7, 13, 14, 15, 16, 19]
    ];

    function setColor(id, color) {
        document.getElementById('tr' + shape + '_' + id).setAttribute('fill', color);
    }

    function doColor(shape, color) {
        console.log(shape, color);
        shape.forEach(function (el) {
            setColor(el, color);
        });
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
            setColor(r, 'none');
        }
    }

    this.redraw = function () {
        clearColors();
        doColor(shapes[this.shape], 'lightblue');
        //var colors = getRandomColor();
        //console.log("colors", colors);
        //
        //var set1 = doColor(colors.c1);
        //var set2 = doColor(colors.c2);
        //var set3 = intersect(set1, set2);
        //set3.forEach(function (el) {
        //    setColor('tr' + el, colors.ca);
        //});
    };

};

function logo(logo) {
    logo.redraw();
}


for (var t = 0; t < 100; t++) {
    logo(new LogoGen(30, t));
}