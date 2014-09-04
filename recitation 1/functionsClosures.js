function foo(name){
	return function(){console.log("Hi,"+name + "!");};
}

var helloFun = foo();
helloFun(); // => "Hi, 

function foo(){
	var bar = function(){};
	for (var i = 0; i<5; ++i){
		if (i==3){bar = function(){console.log(i);}}
	}
	return bar;
}

function foo(){
	var bar = function(){};
	for (var i = 0; i<5; ++i){
		if (i==3){
			bar = (function(j){
				return function(){console.log(j);}
			})(i)
		}
	}
	return bar;
}