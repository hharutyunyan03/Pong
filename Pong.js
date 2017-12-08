    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 40;

    let box = {
        x     : canvas.width/2 - 450,
        y     : canvas.height/2 - 50,
        w     : 20,
        h     : 100,
        xdir  : 0,
        ydir  : 0,
        speed : 10
    };
	
    let boxRight = {
        x     : canvas.width/2 + 450 - 20,
        y     : canvas.height/2 - 50,
        w     : 20,
        h     : 100,
        xdir  : 0,
        ydir  : 0,
        speed : 10
    };
	
    let ball = {
        x     : canvas.width/2,
        y     : 200,
        r     : 20,
        xdir  : 1,
        ydir  : 1,
        speed : 6
    };

    const boxMethods = {
        draw   : box => {
            ctx.fillStyle = 'blue';
            ctx.fillRect(box.x, box.y, box.w, box.h);
        },
		
        update : box => {
			if(box.y <= 0){
				box.y = 0;
			}
			if(box.y >= canvas.height - box.h){
				box.y = canvas.height - box.h;
			}
            box.y += box.ydir * box.speed;
        }
    };
	
    const ballMethods = {
        draw   : ball => {
            ctx.fillStyle = 'green';
			ctx.beginPath();
			ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2); 
			ctx.fill(); 
			},
			
		update : ball => {	
			ball.x = ball.x + ball.xdir * ball.speed;
			ball.y = ball.y + ball.ydir * ball.speed;
			
			if(ball.x >= canvas.width - ball.r || ball.x <= ball.r ||
				(ball.x >= boxRight.x - ball.r && ball.y > boxRight.y - ball.r && ball.y < boxRight.y + boxRight.h + ball.r) || 
				(ball.x <= box.x + box.w + ball.r && ball.y > box.y - ball.r && ball.y < box.y + box.h + ball.r)){
					ball.xdir = -ball.xdir;
			}
			
			if(ball.y >= canvas.height - ball.r || ball.y <= ball.r){
				ball.ydir = -ball.ydir;
			}

			if(ball.x < box.x - 10)
			{
				score2();
			}
			
			if(ball.x > boxRight.x + boxRight.w + 10)
			{
				score1();   
			}
		}
	};
	
	let nscore1 = 0;
	let nscore2 = 0;
	
	const drawScore = function() {    
		ctx.fillStyle = "black";
		ctx.font = "50px Georgia"; 
		ctx.fillStyle = "black";
		ctx.fillText("Boghos",100,350); 
		ctx.fillText("Bedros",canvas.width-280,350); 
		ctx.fillText(nscore1,170,410); 
		ctx.fillText(nscore2,canvas.width-280+70,410);
		ctx.font = "130px Georgia"; 
		ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
		ctx.fillText("PONG",canvas.width/2-200,150);
	};
	
	const score1 = function(){
		nscore1++;
		ball.x = canvas.width/2;
		ball.y = 250;
	};
	
    const score2 = function(){
		nscore2++;
		ball.x = canvas.width/2;
		ball.y = 250;
	};
	
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        boxMethods.draw(box);
		boxMethods.draw(boxRight);
		ballMethods.draw(ball);
		drawScore();
    };

    const update = () => {
        boxMethods.update(box);
		boxMethods.update(boxRight);
		ballMethods.update(ball);
    };

    const loop = () => {
        draw();
        update();
        requestAnimationFrame(loop);
    };
	
    loop();
		
	const p = 80,
        l = 76,
        q = 81,
        a = 65;

    document.addEventListener('keydown', e => {
        e.preventDefault();
        const keyCode = e.keyCode;
        if(keyCode === p)
            boxRight.ydir = -1;
        else if(keyCode === l)
            boxRight.ydir = 1;
        else if(keyCode === q)
            box.ydir = -1;
        else if(keyCode === a)
            box.ydir = 1;
    });
	
    document.addEventListener('keyup', e => {
        e.preventDefault();
        const keyCode = e.keyCode;
        if(keyCode === p || keyCode === l) {
            boxRight.ydir = 0;
        } else if(keyCode === q || keyCode === a) {
            box.ydir = 0;
        }
    });