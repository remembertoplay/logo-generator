/**
 * TODO download link
 *
 */

var LogoGen = function (sizeish) {
    this.d = sizeish;

    var x = Math.sin(60 * (Math.PI / 180)) * this.d,
        y = this.d / 2,
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        svgNS = svg.namespaceURI,
        count = 0, // Counter to give the triangles an id, 0 based, from right top sloped down left
    // The top most point's offset from the edge of the canvas
        xOff = this.d,
        yOff = 10,
        colors = [
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
        ],
        shapes = [
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
    svg.setAttribute("width", "500");
    svg.setAttribute("height", "500");
    svg.setAttribute("id", "canvas");

    console.log("LogoGen initiated", this.d, x, y);

    this.drawGrid = function () {
        document.getElementById('drawing').appendChild(svg);

        row(this.d, xOff, yOff, false, false);
        row(this.d, x + xOff, y + yOff, true, false);
        row(this.d, 2 * x + xOff, 2 * y + yOff, true, true);
        row(this.d, 2 * x + xOff, 4 * y + yOff, false, true);

        //console.log("Triangles drawn:", count);
        if (count != 24) console.warn("Wrong number of triangles!");
    };

    function triangle(d, offsetX, offsetY, left) {
        var triangle =
            (x + offsetX) + ',' + offsetY + ' ' +
            (x + offsetX) + ',' + (d + offsetY) + ' ' +
            (offsetX + (left ? 0 : 2 * x )) + ',' + (y + offsetY);

        var polygon = document.createElementNS(svgNS, 'polygon');
        polygon.setAttribute("points", triangle);
        polygon.setAttribute("id", 'tr' + count);

        svg.appendChild(polygon);

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

    function getRandomInt(min, maxExc) {
        return Math.floor(Math.random() * (maxExc - min)) + min;
    }

    function getRandomColors() {
        var c1 = "rgb(",
            c2 = "rgb(",
            ca = "rgb(",
            nr1 = getRandomInt(0, colors.length), nr2;

        do {
            nr2 = getRandomInt(0, colors.length);
        } while (nr1 === nr2);

        // Multiply colors
        //ca += Math.round(colors[nr1][0] * colors[nr2][0] / 255) + ',' +
        //    Math.round(colors[nr1][1] * colors[nr2][1] / 255) + ',' +
        //    Math.round(colors[nr1][2] * colors[nr2][2] / 255) + ')';

        // Average colors (blend?)
        ca += Math.round(colors[nr1][0] + colors[nr2][0] / 2) + ',' +
            Math.round(colors[nr1][1] + colors[nr2][1] / 2) + ',' +
            Math.round(colors[nr1][2] + colors[nr2][2] / 2) + ')';
        return {'c1': c1 + colors[nr1].join(',') + ')', 'c2': c2 + colors[nr2].join(',') + ')', 'ca': ca};
    }

    function setColor(id, color) {
        document.getElementById('tr' + id).setAttribute('fill', color);
    }

    function setColorToShape(shape, color) {
        shape.forEach(function (el) {
            setColor(el, color);
        });
    }

    function intersect(a, b) {
        if (b.length > a.length) {
            var t = b;
            b = a;
            a = t;
        } // indexOf to loop over shorter
        return a.filter(function (e) {
            if (b.indexOf(e) !== -1) return true;
        });
    }

    function clearColors() {
        for (var r = 0; r < 24; r++) {
            setColor(r, 'none');
        }
    }

    this.redrawColors = function () {
        clearColors();
        var colors = getRandomColors(),
            nr1 = getRandomInt(0, shapes.length), nr2, safety = 0, overlap;
        do {
            nr2 = getRandomInt(0, shapes.length);
            safety++;
            overlap = intersect(shapes[nr1], shapes[nr2]);
        } while (safety < 100 && (nr1 === nr2 || overlap.length < 2)); // TODO some other way to make this safe

        console.log("colors", colors, "shape1", nr1, "shape2", nr2, "safety", safety);
        if (safety >= 100) console.warn("These shapes don't overlap! (Or very unlucky)");

        setColorToShape(shapes[nr1], colors.c1);
        setColorToShape(shapes[nr2], colors.c2);
        setColorToShape(overlap, colors.ca);
    };

};

var lg = new LogoGen(80);

$(document).ready(function () {
    lg.drawGrid();
    lg.redrawColors();

    $("#go").click(function () {
        lg.redrawColors();
    });

    $("#download").click(function () {
        var source = '<?xml version="1.0" standalone="no"?>\r\n' + new XMLSerializer().serializeToString($("#canvas")[0]),
            a = document.createElement('a');

        a.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(source);
        a.download = 'logo.svg';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
