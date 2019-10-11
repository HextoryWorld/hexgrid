window.onload = function() {
    const canvas = document.getElementById("canvas");
    const app = new PIXI.Application({ width:$("#grid").width(), height: $(window).height()-100,transparent: true, view: canvas});
    const graphics = new PIXI.Graphics();

    const Hex = Honeycomb.extendHex({ size: 20 });
    const Grid = Honeycomb.defineGrid(Hex);

    console.log($(window).height());
    console.log($(window).width());

    // set a line style of 1px wide and color #999
    graphics.lineStyle(1, 0x999999);

    // render 10,000 hexes
    Grid.rectangle({ width: 32, height: 20 }).forEach(hex => {
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