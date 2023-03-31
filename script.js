
  const  canvas = document.getElementById("canvas");
  var ctx ;
  const image = document.getElementById('image');

  $("#image").on('load', function() {
      initCanvas();
    }).each(function() {
      if(this.complete) $(this).trigger('load');
    });

  var stopDrawing = false;
  var circle = null;
  var circles = []

  function initCanvas(event){
      ctx = canvas.getContext("2d");
    canvas.width = image.offsetWidth;
    canvas.height = image.offsetHeight;
  }

  function peekCorrdinate(event) {
    stopDrawing = false;
    console.log("canvas offset %s , %s", canvas.offsetLeft,canvas.offsetTop);
    console.log("event %s , %s", event.clientX,event.clientY);
    circle = {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
      radius: 0,
      lineWidth: 1,
      color: 'red'
    };
    console.log("init circle", circle);
  }

  function buildCircle(event) {

    if (!stopDrawing) {
      const circleX = event.pageX - circle.x - image.offsetLeft;
      const circleY = event.pageY- circle.y - image.offsetTop;
      console.log("event.clientX= %s, canvas offset %s", event.clientX, image.offsetLeft)
      circle.radius = Math.sqrt(circleX**2 + circleY**2);
      console.log("OnMove", circle)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCircle(circle)
    }
  }

  function persistCircle() {

    stopDrawing = true;
    console.log("persisted circle", circle)
    circles.push(circle);
    circles.forEach(drawCircle);

    circle = null;
  }

  function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
    ctx.strokeStyle = circle.color;
    ctx.lineWidth = circle.lineWidth;
    ctx.stroke();
  }

  function clear() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

canvas.addEventListener("mousedown", peekCorrdinate);
  canvas.addEventListener("mousemove", buildCircle);
  canvas.addEventListener("mouseup", persistCircle);
      image.addEventListener('load', initCanvas);
