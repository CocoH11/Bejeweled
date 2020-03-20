let Model=class Model{
    grid;
    values;
    score;
    constructor() {
        this.grid=[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        this.values=[0, 1, 2, 3, 4, 5, 6, 7];
        this.score=0;
        this.createGrid();
    }

    createGrid(){
        let compteuri=2;
        for (let i=0; i<2; i++){
            let compteurj=0;
            for (let j = 0; j <8 ; j++) {
                compteurj++;
                if (j<=1){
                    this.grid[i].push(this.getRandomInt([-1, -1]));
                }else{
                    if (this.grid[i][j-1]===this.grid[i][j-2])this.grid[i].push(this.getRandomInt([this.grid[i][j-1], -1]));
                    else this.grid[i].push(this.getRandomInt([-1, -1]));
                    //view.grid[i][j].style.backgroundColor="red";
                }

            }
        }
        for (let i=2; i<8; i++){
            let prohibitedvalues=[];
            compteuri++;
            let compteurj=0;
            for (let j = 0; j <8 ; j++) {
                compteurj++;
                if (j<=1){
                    prohibitedvalues.push(-1);
                    //prohibitedvalues.push(-1);
                    //this.grid[i].push(this.getRandomInt([-1, -1]));
                }else{
                    if (this.grid[i][j-1]===this.grid[i][j-2]){
                        prohibitedvalues.push(this.grid[i][j-1]);
                        //prohibitedvalues.push(-1);
                        //this.grid[i].push(this.getRandomInt([this.grid[i][j-1], -1]));
                    }
                    else{
                        prohibitedvalues.push(-1);
                        //prohibitedvalues.push(-1);
                        //this.grid[i].push(this.getRandomInt([-1, -1]));
                    }
                    //view.grid[i][j].style.backgroundColor="red";
                }

                if (i<=1){
                    prohibitedvalues.push(-1);
                    //prohibitedvalues.push(-1);
                }else{
                    if (this.grid[i-1][j]===this.grid[i-2][j]){
                        prohibitedvalues.push(this.grid[i-2][j]);
                    }else{
                        prohibitedvalues.push(-1);
                    }
                }
                this.grid[i].push(this.getRandomInt(prohibitedvalues));
                prohibitedvalues=[];
            }
        }
        //console.log(this.grid);
    }

    getRandomInt(prohibitedvalue) {
        let value;
        do {
            value=Math.floor(Math.random()*8);
        }while (value===prohibitedvalue[0] || value===prohibitedvalue[1]);
        return value;
    }

    deleteCell(indiceCol, indiceRow){
        this.grid[indiceCol].splice(indiceRow, 1);
    }

    addCell(indiceCol){
        let value=this.getRandomInt([-1, -1]);
        this.grid[indiceCol].unshift(value);
        return value;
    }

    swapCell(indiceCol1, indiceRow1, indiceCol2, indiceRow2){
        let valeur=this.grid[indiceCol2][indiceRow2];
        this.grid[indiceCol2][indiceRow2]=this.grid[indiceCol1][indiceRow1];
        this.grid[indiceCol1][indiceRow1]=valeur;
    }

    addPoints(points){
        this.score+=points;
    }



};