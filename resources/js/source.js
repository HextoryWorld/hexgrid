window.onload = function() {
    const app = new PIXI.Application({ transparent: true });
    const graphics = new PIXI.Graphics();

    const Hex = Honeycomb.extendHex({ size: 5 });
    const Grid = Honeycomb.defineGrid(Hex);

    document.body.appendChild(app.view);
    // set a line style of 1px wide and color #999
    graphics.lineStyle(1, 0x999999);

    // render 10,000 hexes
    Grid.rectangle({ width: 100, height: 100 }).forEach(hex => {
        const point = hex.toPoint();
        // add the hex's position to each of its corner points
        const corners = hex.corners().map(corner => corner.add(point));
        // separate the first from the other corners
        const [firstCorner, ...otherCorners] = corners;

        // move the "pen" to the first corner
        graphics.moveTo(firstCorner.x, firstCorner.y);
        // draw lines to the other corners
        otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));
        // finish at the first corner
        graphics.lineTo(firstCorner.x, firstCorner.y);

        app.stage.addChild(graphics)
    });
};