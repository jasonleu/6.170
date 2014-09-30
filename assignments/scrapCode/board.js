//Board is an nxn square board, where Square[0,0[ is the upper-left corner
//Board is mutable, board changes as things are added or removed
var Board = function (size) {
    //boardSize is number of squares on each side of board
    this.boardSize = size;
    
    //this.square is a 2d array representing the entire board
    //square[row][col] is a particular square, or null if square is empty
    //use boardSize-1 because if we want size of 2, we only want square[0] and square[1] => zero index
    this.square = new Array(this.boardSize-1);
    //make an empty checkerboard
    for (var i = 0; i<=this.boardSize-1; i++){
        this.square[i] = [];
    }

    //function that gets the number of surrounding cells that have a 1 in them
    var getSurround = function(board,row,col){
        var totalNum = 0;

        //for cells which have row>0, look at the three cells above it at row-1
        if (row!=0){
            for (var j = -1; j<2; j++){
                if (board.square[row-1][col+j]==1){

                    totalNum+=1;
                }
            }
        }
        //look at cells which have row<maxRows, look at rows below it at row+1
        if (row!==size-1){
            for (var j = -1; j<2; j++){
                if (board.square[row+1][col+j]==1){

                    totalNum+=1;
                }
            }   
        }
        //for all cells, look at that cell's row, col +1 and -1
        if (board.square[row][col+1]==1){
            totalNum+=1;
        }
        if (board.square[row][col-1]==1){
            totalNum+=1;
        }
        return totalNum;
        
    }
    
    
    //updates the board by first making a copy of the board state,changing that copy to the new board state, and then replace the board state to that updated state 
    this.updateBoard = function(){
        //make a copy of the board's state called newSquare
        var newSquare = new Array(this.boardSize-1);
        for (var i = 0; i<=size-1; i++){
            newSquare[i] = [];   
        }
        for (var i = 0; i<=size-1;i++){
            for (var j = 0; j<=size-1; j++){
                newSquare[i][j] = this.square[i][j];
            }
        }
        //update newSquare based on previous state and rules
        for (var i = 0; i<=size-1; i++){
            for(var j = 0; j<= size-1; j++){
                //get num of surrounding cells
                var numSurrounds = getSurround(this,i,j);
                //rules 
                if (this.square[i][j] == 1 && numSurrounds<2) {
                    delete newSquare[i][j];
                }
                else if (this.square[i][j] ==1 && numSurrounds>3){
                    delete newSquare[i][j];
                }
                else if (typeof this.square[i][j] =='undefined' && numSurrounds==3){
                    newSquare[i][j]=1;  
                }
            }
        }
        //replace the state of the board with new state
        this.square = newSquare;
    }
}
