function logAction(action) {
  switch (action.shape) {
    case 'arc':
      if (action.aspectRatioSquare) {
        let size = Math.max(action.rect.width, action.rect.height);
        console.log(`arc(${action.origin.x + (size / 2)}, ${action.origin.y + (size / 2)}, ${size}, ${size}, ${action.angle.start}, ${action.angle.end})`)
      } else {
        console.log(`arc(${action.origin.x + (action.rect.width / 2)}, ${action.origin.y + (action.rect.height / 2)}, ${action.rect.width}, ${action.rect.height}, ${action.angle.start}, ${action.angle.end})`)
      }
      break;
  
    case 'ellipse':
      if (action.aspectRatioSquare) {
        let size = Math.max(action.rect.width, action.rect.height);
        console.log(`ellipse(${action.origin.x + (size / 2)}, ${action.origin.y + (size / 2)}, ${size}, ${size})`)
      } else {
        console.log(`ellipse(${action.origin.x + (action.rect.width / 2)}, ${action.origin.y + (action.rect.height / 2)}, ${action.rect.width}, ${action.rect.height})`)
      }
      break;
  
    case 'circle':
      if (action.aspectRatioSquare) {
        let size = Math.max(action.rect.width, action.rect.height);
        console.log(`circle(${action.origin.x + (size / 2)}, ${action.origin.y + (size / 2)}, ${size}, ${size})`)
      } else {
        console.log(`circle(${action.origin.x + (action.rect.width / 2)}, ${action.origin.y + (action.rect.height / 2)}, ${action.rect.width}, ${action.rect.height})`)
      }
      break;
  
    case 'line':
      console.log(`line(${action.origin.x}, ${action.origin.y}, ${action.rect.width + action.origin.x}, ${action.rect.height + action.origin.y})`)
      break;
  
    case 'point':
      console.log(`point(${action.origin.x}, ${action.origin.y})`)
      break;
  
    case 'quad':
      let aquad = action.shapePoints[0];
      if (!aquad) return;
      let bquad = action.shapePoints[1] || action.shapePoints[0];
      let cquad = action.shapePoints[2] || bquad;
      let dquad = action.shapePoints[3] || cquad;
      console.log(`quad(${aquad.x}, ${aquad.y}, ${bquad.x}, ${bquad.y}, ${cquad.x}, ${cquad.y}, ${dquad.x}, ${dquad.y})`)
      break;
  
    case 'rect':
      if (action.aspectRatioSquare) {
        let size = Math.max(action.rect.width, action.rect.height);
        console.log(`rect(${action.origin.x}, ${action.origin.y}, ${size}, ${size})`)
      } else {
        console.log(`rect(${action.origin.x}, ${action.origin.y}, ${action.rect.width}, ${action.rect.height})`)
      }
      break;
  
    case 'square':
      let size = Math.max(action.rect.width, action.rect.height);
      console.log(`square(${action.origin.x}, ${action.origin.y}, ${size})`)
      break;
  
    case 'triangle':
      let atriangle = action.shapePoints[0];
      if (!atriangle) return;
      let btriangle = action.shapePoints[1] || action.shapePoints[0];
      let ctriangle = action.shapePoints[2] || btriangle;
      let dtriangle = action.shapePoints[3] || ctriangle;
      console.log(`triangle(${atriangle.x}, ${aqatriangleuad.y}, ${btriangle.x}, ${btriangle.y}, ${ctriangle.x}, ${ctriangle.y}, ${dtriangle.x}, ${dtriangle.y})`)
      break;
    }
}

function onMouseDown() {
  isDrawing = true
  currentAction.origin = {
    x: mouseX,
    y: mouseY
  }
  
  if (currentAction.shape == "quad") {
    currentAction.shapePoints.push({
      x: mouseX,
      y: mouseY
    })
  } else if (currentAction.shape == "triangle") {
    currentAction.shapePoints.push({
      x: mouseX,
      y: mouseY
    })
  } else if (currentAction.shape == "vertex") {
    currentAction.shapePoints.push({
      x: mouseX,
      y: mouseY
    })
    console.log(currentAction)
  }

  if (currentAction.shapePoints.length == 4 && currentAction.shape == "quad") {
    isDrawing = false;
    actions.push({...currentAction});
    logAction(currentAction);
    resetAction();
  } else if (currentAction.shapePoints.length == 3 && currentAction.shape == "triangle") {
    isDrawing = false;
    actions.push({...currentAction});
    logAction(currentAction);
    resetAction();
  }
}

function onMouseMove() {
  if (!isDrawing) return;
  let x = currentAction.origin.x
  let y = currentAction.origin.y
  currentAction.rect = {
    width: mouseX - x,
    height: mouseY - y
  }
}

function onMouseUp() {
  if (!['quad', 'triangle', 'vertex'].includes(currentAction.shape)) {
    isDrawing = false
  }

  if (!isDrawing) {
    actions.push({...currentAction});
    logAction(currentAction);
    resetAction();
  }
}

function onKeyDown (ev) {
  var key;
  var isShift;
  if (window.event) {
    key = window.event.keyCode;
    isShift = !!window.event.shiftKey; // typecast to boolean
  } else {
    key = ev.which;
    isShift = !!ev.shiftKey;
  }
  if (!isShift) {
    switch (key) {
      case 16:
        break;
      default:
        break;
    }
  }
  currentAction.aspectRatioSquare = isShift;
}

function onKeyUp() {
  currentAction.aspectRatioSquare = false;
}

function preload()
{
	
}

function setup()
{
  let toolbarSection = document.querySelector('#toolbar-section');
  let canvas = document.querySelector('canvas');
	createCanvas(window.innerWidth, window.innerHeight - toolbarSection.clientHeight - 8);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('keydown', onKeyDown);
  canvas.addEventListener('keyup', onKeyUp);
  document.querySelector('#background-file').onchange = e => {
    bgImageHasChanged = true
  }
  document.querySelector('#shape-style').onchange = e => {
    isDrawing = false;
    actions.push({...currentAction});
    logAction(currentAction);
    resetAction();
  }
}

function draw()
{
  clear();
  updateControls();
  let backgroundImage = document.getElementById('background-file').files;
  if (backgroundImage.length > 0 && bgImageHasChanged) {
    const [file] = backgroundImage
    if (!file) return;
    let url = URL.createObjectURL(file);
    bgImageHasChanged = false
    bgImage = loadImage(url, img => {
      image(img, 0, 0)
    });
  } else if (bgImage) {
    image(bgImage, 0, 0)
  }
  for (let index = 0; index < actions.length; index++) {
    const element = actions[index];
    drawAction(element, false);
  }
  if (isDrawing) {
    drawAction(currentAction, true);
  }
}

function drawAction(action, isDrawing) {
  stroke(action.stroke.color);
  strokeWeight(action.stroke.width);
  fill(action.fill);
  switch (action.shape) {
  case 'arc':
    if (action.aspectRatioSquare) {
      let size = Math.max(action.rect.width, action.rect.height);
      arc(action.origin.x + (size / 2), action.origin.y + (size / 2), size, size, action.angle.start, action.angle.end);
    } else {
      arc(action.origin.x + (action.rect.width / 2), action.origin.y + (action.rect.height / 2), action.rect.width, action.rect.height, action.angle.start, action.angle.end);
    }
    break;

  case 'ellipse':
    if (action.aspectRatioSquare) {
      let size = Math.max(action.rect.width, action.rect.height);
      ellipse(action.origin.x + (size / 2), action.origin.y + (size / 2), size, size);
    } else {
      ellipse(action.origin.x + (action.rect.width / 2), action.origin.y + (action.rect.height / 2), action.rect.width, action.rect.height);
    }
    break;

  case 'circle':
    if (action.aspectRatioSquare) {
      let size = Math.max(action.rect.width, action.rect.height);
      circle(action.origin.x + (size / 2), action.origin.y + (size / 2), size, size);
    } else {
      circle(action.origin.x + (action.rect.width / 2), action.origin.y + (action.rect.height / 2), action.rect.width, action.rect.height);
    }
    break;

  case 'line':
    line(action.origin.x, action.origin.y, action.rect.width + action.origin.x, action.rect.height + action.origin.y);
    break;

  case 'point':
    point(action.origin.x, action.origin.y);
    break;

  case 'quad':
    let aquad = action.shapePoints[0];
    if (!aquad) return;
    let bquad = action.shapePoints[1] || action.shapePoints[0];
    let cquad = action.shapePoints[2] || bquad;
    let dquad = action.shapePoints[3] || cquad;
    quad(aquad.x, aquad.y, bquad.x, bquad.y, cquad.x, cquad.y, dquad.x, dquad.y);
    break;

  case 'rect':
    if (action.aspectRatioSquare) {
      let size = Math.max(action.rect.width, action.rect.height);
      rect(action.origin.x, action.origin.y, size, size);
    } else {
      rect(action.origin.x, action.origin.y, action.rect.width, action.rect.height);
    }
    break;

  case 'square':
    let size = Math.max(action.rect.width, action.rect.height);
    square(action.origin.x, action.origin.y, size);
    break;

  case 'triangle':
    let atriangle = action.shapePoints[0];
    if (!atriangle) return;
    let btriangle = action.shapePoints[1] || action.shapePoints[0];
    let ctriangle = action.shapePoints[2] || btriangle;
    let dtriangle = action.shapePoints[3] || ctriangle;
    triangle(atriangle.x, atriangle.y, btriangle.x, btriangle.y, ctriangle.x, ctriangle.y, dtriangle.x, dtriangle.y);
    break;

    case 'vertex':
      console.log(action.shapePoints);
      beginShape();
      for (let index = 0; index < action.shapePoints.length; index++) {
        const element = action.shapePoints[index];
        vertex(element.x, element.y);
      }
      if (action.shapePoints[0]) {
        vertex(action.shapePoints[0].x, action.shapePoints[0].y);
      }
      endShape();
      break;
  }
  noFill();
  strokeWeight(0);
}