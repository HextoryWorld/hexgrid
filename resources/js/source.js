"use strict";

window.onload = function() {

    //adapt sizes to the screen size
    let settings = {
        screenW: window.innerWidth - 100,
        screenH: window.innerHeight - 100,
        hexSize: 36,
        hexOrientation: 'flat',
        hexColums: (window.innerWidth - 100) / 54, // x
        hexRows:  (window.innerHeight - 100) / 72, // y
        lineThickness: 2,
        lineColor: 0x999999
    };

    let canvas = document.getElementById("canvas");
    let app = new PIXI.Application({ width: settings.screenW, height: settings.screenH, transparent: true, view: canvas });

    loadGrid(app, settings);

    $("#gridSettingsModal").submit(function(event){
        for (let i = app.stage.children.length - 1; i >= 0; i--) {	app.stage.removeChild(app.stage.children[i]);};
        applySettings(app);
        return false;
    });
};

function loadGrid(app, settings) {
    let graphics = new PIXI.Graphics();
    let Hex = Honeycomb.extendHex({ size: settings.hexSize,  orientation: settings.hexOrientation });
    let Grid = Honeycomb.defineGrid(Hex);

    // set a line style of 1px wide and color #999
    graphics.lineStyle(settings.lineThickness, settings.lineColor);

    // render hex grid
    let gr = Grid.rectangle({ width: settings.hexColums, height: settings.hexRows });
    gr.forEach(hex => {
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
console.log('hex')
        app.stage.addChild(graphics)
    });
}

function applySettings(app) {
    let settings = {};
    settings.screenW = window.innerWidth - 100;
    settings.screenH = window.innerHeight - 100;
    settings.hexSize = parseInt($('#hexSize').val()) || 36;
    settings.hexOrientation = parseInt($('#hexOrientation').val()) || 'flat';
    settings.hexColums = parseInt($('#hexColums').val()) || (window.innerWidth - 100) / 54;
    settings.hexRows = parseInt($('#hexRows').val()) || (window.innerHeight - 100) / 72;
    settings.lineThickness = parseInt($('#lineThickness').val()) || 2;
    settings.lineColor = 0x999999;

    loadGrid(app, settings);
    $("#gridSettingsModal").modal("hide");
}