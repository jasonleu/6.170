int foo(void){
	{
		int y =0;
	}
	printf("%d",y);
}

//variables inside functions are accessible in any nested functions within the function too
function foo(x){
	var y = x+1;
	var myFun = function(){return y*2;};
	return myFun();
}

function foo(){
	var x = 10;
	var bar = function (){
		var y = x+1;
		var baz = function(){
			var z = 2*y;
			return z;
		};
		y = -100;
		console.log(baz());
	};
	bar();
}
// functions have access to variables up it's chain
// this is interesting because y = -100 occurs because baz(), so that y = -100 during baz()


