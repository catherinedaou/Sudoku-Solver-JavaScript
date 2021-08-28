const b = null;

var emptyGrid = [ [b, b, b, b, b, b, b, b, b],
                  [b, b, b, b, b, b, b, b, b],
                  [b, b, b, b, b, b, b, b, b],
                  [b, b, b, b, b, b, b, b, b],
                  [b, b, b, b, b, b, b, b, b],
                  [b, b, b, b, b, b, b, b, b],
                  [b, b, b, b, b, b, b, b, b],
                  [b, b, b, b, b, b, b, b, b],
                  [b, b, b, b, b, b, b, b, b]]

var grid = [...emptyGrid];

function solve(board) {
  if(solved(board)) {
    return board;
  } else {
    const possibilities = nextBoards(board);
    const validBoards = keepOnlyValid(possibilities);
    return searchForSolution(validBoards);
  }
}

function searchForSolution(boards) {
  if (boards.length < 1) {
    return false; 
  } else {
    //backtracking search for solution
    var first = boards.shift();
    const tryPath = solve(first);
    if (tryPath != false) {
      return tryPath;
    } else {
      return searchForSolution(boards);
    }
  }
}

function solved(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] === null) {
        return false;
      }
    }
  }
  return true;
}

function nextBoards(board) {
  var res = [];
  const firstEmpty = findEmptySquare(board); // <-- (y,x)
  if (firstEmpty != undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];
    for (var i = 1; i<= 9; i++) {
      var newBoard = [...board];
      var row = [...newBoard[y]];
      row[x] = i;
      newBoard[y] = row;
      res.push(newBoard);
    }
  }
  return res;
}

function findEmptySquare(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return [i, j];
      }
    }
  }
}

function keepOnlyValid(boards) {
  var res = []
  for (var i = 0; i < boards.length; i++){
    if(validBoards(boards[i])) {
      res.push(boards[i]);
    }
  }
  return res;
}

function validBoards(board) {
  return rowGood(board) && columnGood(board) && boxesGood(board);
}

function rowGood(board) {
  for (var i = 0; i < 9; i++) {
    var cur = [];
    for (var j = 0; j < 9; j++) {
      if (cur.includes(board[i][j])) {
        return false;
      } else if (board[i][j] != null) {
        cur.push(board[i][j]);
      }

    }
  }
  return true;
}

function columnGood(board) {
  for (var i = 0; i < 9; i++) {
    var cur = [];
    for (var j = 0; j < 9; j++) {
      if (cur.includes(board[j][i])) {
        return false;
      } else if (board[j][i] != null) {
        cur.push(board[j][i]);
      }

    }
  }
  return true;
}


function boxesGood(board){
  const boxCoordinates = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2]
  ];

  for (var y = 0; y < 9; y+= 3) {
    for (var x = 0; x < 9; x+=3) {
      var cur = [];
      for (var i = 0; i < 9; i++) {
        var coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += x ;
        if (cur.includes(board[coordinates[0]][coordinates[1]])) {
          return false;
        } else if (board[coordinates[0]][coordinates[1]] != null) {
          cur.push(board[coordinates[0]][coordinates[1]]);
        }
      }
    }
  }
  return true;
}

$(document).ready(function() {

	$(".grid").children().each(function() {
		var x;
		var y;
		x = parseInt($(this).attr("id").substring(0, 1));
		y = parseInt($(this).attr("id").substring(1));

		//setting the borders of the 3 x 3 cells
		if (y == 2 || y == 5 || y == 8) {
			$(this).css("border-right-width", 5);
		}
		if (x == 2 || x == 5 || x == 8) {
			$(this).css("border-bottom-width", 5);
		}
    if (x === 0){
      $(this).css("border-top-width", 5);
    }
    if (y === 0) {
      $(this).css("border-left-width", 5);
    }


	});

	var oldCell = null;
	var newCell;

	$(".cell").click(function() {
		newCell = $(this);
		if (oldCell != null) {
		  oldCell.css("background-color", "white");
		  }
		if (oldCell != null) {
			oldCell.css("background-color", "white");
		}
		$(this).css("background-color", "#c7fff7");
		oldCell = $(this);
  });

		//If user clicks on a key
		$(window).keydown(function(evt) {
				if (evt.which >= 49 && evt.which <= 57) {
					newCell.html(String.fromCharCode(evt.which));
					var x = newCell.attr("id").substring(0, 1);
					var y = newCell.attr("id").substring(1, 2);
					grid[x][y] = String.fromCharCode(evt.which);
				} else if (evt.which == 8) {
					newCell.html("");
				}

		}).keyup(function(evt){

		});

    


  $("#solve-button").click(function() {

        for (var x = 0; x < 9; x++) {
          for (var y = 0; y < 9; y++) {
            var id = "#"+x+y;
              if ($(id).html() != "") {
                grid[x][y] = parseInt($(id).html());
                $(id).attr("data-original", "true");
              }
            }
          }
            
          console.log(grid);
            
          var solved_grid = solve(grid); 

          console.log(solved_grid);
            
          for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 9; y++) {
              if (solved_grid[x][y] != null) {
                var id = "#"+x+y;
                $(id).html(solved_grid[x][y]);
                $(id).css("background-color", "white"); 
                if ($(id).attr("data-original") == "true") {
                  $(id).css("font-weight", "bold");
                }
              }
            }
          }
            
      });

  $("#reset-button").click(function() {
      for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
          var id = "#"+x+y;
          $(id).html(""); 
          $(id).css("background-color", "white");
          $(id).attr("data-original", "false");
          $(id).css("font-weight", "normal");
        }
      }
      grid = [...emptyGrid];    

  });

});