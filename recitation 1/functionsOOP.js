function foo(binOp, arg1, arg2){
	return binOp(arg1, arg2);
}

function add(x,y){ return x+y}
foo(add,1,2)

function foo2(){
	return function(){console.log("Hi!");};
}

var helloFun = foo2();
helloFun();

(function foo3(){
	console.log("Hi!");
})();

(function fact(n){
	if (n<1) return 1;
	else return n*fact(n-1);
})(5);