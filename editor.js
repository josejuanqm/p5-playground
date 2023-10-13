let isDrawing = false
let bgImage;
let bgOpacity = 1;
let fillOpacity = 1;
let strokeOpacity = 1;
let bgImageHasChanged;
let currentAction = {
  id: Math.random() * 1000,
  shape: 'rect',
  fill: 'black',
  stroke: {
    color: 'black',
    width: 0,
  },
  origin: {
    x: 0,
    y: 0
  },
  rect: {
    width: 0,
    height: 0
  },
  shapePoints: [],
  angle: {
    start: 0,
    end: 2 * Math.PI
  },
  aspectRatioSquare: false
}
let actions = []

function resetAction() {
  currentAction = {
    ...currentAction,
    id: Math.random() * 1000,
    origin: {
      x: 0,
      y: 0
    },
    rect: {
      width: 0,
      height: 0
    },
    shapePoints: [],
    angle: {
      start: 0,
      end: 2 * Math.PI
    },
    aspectRatioSquare: false
  }
}

function undo() {
  actions.pop();
}

function updateControls() {
  updateFillControl();
  updateStrokeControl();
  updateStrokeWidthControl();
  updateShapeControl();
  updateBgOpacity();
  updateFillOpacity();
  updateStrokeOpacity();
}

function updateFillControl() {
  let color = document.querySelector("input#fill-color").value;
  let control = document.getElementById('fill-picker');
  control.style.backgroundColor = color;
  let hexColor = parseInt(fillOpacity * 255).toString(16)
  if (hexColor.length == 1) {
    hexColor = "0" + hexColor
  }
  currentAction.fill = color + hexColor;
}

function updateStrokeControl() {
  let color = document.querySelector("input#stroke-color").value;
  let control = document.getElementById('stroke-picker');
  control.style.borderColor = `${color}`;
  let hexColor = parseInt(strokeOpacity * 255).toString(16)
  if (hexColor.length == 1) {
    hexColor = "0" + hexColor
  }
  currentAction.stroke = {
    ...currentAction.stroke,
    color: color + hexColor
  };
}

function updateStrokeWidthControl() {
  let width = document.querySelector("input#stroke-width").value;
  currentAction.stroke = {
    ...currentAction.stroke,
    width
  };
}

function updateShapeControl() {
  let shape = document.querySelector("select#shape-style").value;
  currentAction.shape = shape;
}

function updateBgOpacity() {
  let opacity = document.querySelector("input#bg-opacity").value;
  bgOpacity = opacity;
}

function updateFillOpacity() {
  let opacity = document.querySelector("input#fill-opacity").value;
  fillOpacity = opacity;
}

function updateStrokeOpacity() {
  let opacity = document.querySelector("input#stroke-opacity").value;
  strokeOpacity = opacity;
}