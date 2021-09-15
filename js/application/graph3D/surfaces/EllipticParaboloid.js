Surface.prototype.EllipticParaboloid = (count = 20, p = 2, q = 2) => {
    const points = [];
    const edges = [];
    const polygones = [];
    

    const PI2 = Math.PI * 2;
    const da = PI2 / count;

    //add points
    for(let z = -count; z <= count; z++){
        const r = Math.sqrt(z)
        for(let a = 0; a < PI2; a += da){
            points.push(new Point(
                r * Math.cos(a),
                r * Math.sin(a),
                z
            ));
        }
    }
   // add edges
    for(let i = 0; i < points.length; i++){
        if(points[i + 1] && (i + 1) % count !== 0){
            edges.push(new Edge(i, i + 1));
    } else {
        edges.push(new Edge(i, i + 1 - count));
    }
    if(points[i + count]){
        edges.push(new Edge(i, i + count));
        }
    }
  //  add polygones
    for(let i = 0; i < points.length; i++){
        if(points[i + 1 + count] && (i + 1) % count !== 0){
            polygones.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count

            ]));
        } else {
            if ((i+1) % count === 0 ) {
                if(points[i + count]) {
                    polygones.push(
                        new Polygon([
                            i,
                            i + 1 - count,
                            i + 1,
                            i + count
                        ])
                    );
                }
            }
        }
    }

    let j = 0;
    for(let n = 0; n < count; n++ ) {
        j+=30;
        for (let i = 0; i < polygones.length; i++) {
            polygones[i].color = {r: j + i + 5, g: j - i + 10, b: 200}
        }
    }

    /*let j = 0;
    for (let i = 0; i < polygones.length; i++) {
        if ((i + 1 - count) < points.length && ((i + 1)%count) != 0) {
            polygones[i].color = {r: j, g: j, b: j}
            j+=30;
        } else {
            if ((i + 1 - count) < points.length && ((i + 1)%count) == 0) {
                polygones[i].color = {r: j, g: j, b: j}
                j+=30;
            }
        }
        /*for (let j = 0; j < 255; j+=30){
        polygones[i].color = {r: j, g: j, b: 255}
    }
}*/
   /* for (let i = 0; i < points.length; i++) {
        if ((i + 1 + count) < points.length && ((i + 1) % count) != 0) {                                      // gradient
            polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#' + i + '64aa'));
        } else {
            if ((i + count) < points.length && ((i + 1) % count) == 0) {
                polygones.push(new Polygon([i, i - count + 1, i + 1, i + count], '#' + i + '64aa'));
            }
        }
    }*/

    

    return new Subject(points, edges, polygones);
}