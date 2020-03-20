let Controller=class{
    model;
    view;
    itemclicked=null;
    constructor(view, model) {
        this.view=view;
        this.model=model;

        this.initGame();
    }

    initGame(){
        stopPlaying=false;
        for (let j = 0; j <8 ; j++) {
            for (let i = 0; i <8 ; i++) {
                let cel=view.grid[j][i];
                view.putPictureonCell(cel, model.grid[j][i]);
                cel.onclick=function () {
                    controller.actionGame(cel);
                };
            }
        }
    }

    stopGame(){
        for (let j = 0; j <8 ; j++) {
            for (let i = 0; i <8 ; i++) {
                let cel=view.grid[j][i];
                cel.onclick=null;
            }
        }
    }

    actionGame(cel){
        console.log(perc);
        view.selectCell(cel);
        console.log(this.itemclicked);
        let swapped=false;
        if (this.itemclicked!=null) {
            let gridcol1 = parseInt(this.itemclicked.style.gridColumn) - 1,
                gridrow1 = parseInt(this.itemclicked.style.gridRow) - 1,
                gridcol2 = parseInt(cel.style.gridColumn) - 1,
                gridrow2 = parseInt(cel.style.gridRow) - 1,
                boolSameCol = Math.abs(gridcol1 - gridcol2) === 0 && Math.abs(gridrow1 - gridrow2) === 1,
                boolSameRow = Math.abs(gridcol1 - gridcol2) === 1 && Math.abs(gridrow1 - gridrow2) === 0;
            //console.table(model.grid);
            if(boolSameCol || boolSameRow){
                model.swapCell(gridcol1, gridrow1, gridcol2, gridrow2);
                view.swapCells(view.grid[gridcol1][gridrow1], view.grid[gridcol2][gridrow2]);

                swapped=this.verifColumns(swapped);
                swapped=this.verifLines(swapped);


                if (swapped){
                    while(swapped){
                        swapped=this.verifColumns();
                        swapped=this.verifLines();
                    }
                    document.getElementById('score').innerHTML=model.score;
                }else{
                    model.swapCell(gridcol1, gridrow1, gridcol2, gridrow2);
                    view.swapCells(view.grid[gridcol1][gridrow1], view.grid[gridcol2][gridrow2]);
                }
            }
            this.itemclicked=null;
        }else{
            this.itemclicked=cel;
        }
    }

    verifLines(swapped) {
        for (let i = 0; i <8; i++) {
            for (let j = 2; j <8; j++) {
                let bool12and3ligne1=model.grid[j][i]===model.grid[j-1][i] && model.grid[j][i]===model.grid[j-2][i];
                let bool3and4ligne1;
                let bool4and5ligne1;

                try {
                    bool3and4ligne1=model.grid[j][i]===model.grid[j-1][i] && model.grid[j][i]===model.grid[j-2][i] && model.grid[j][i]===model.grid[j+1][i];
                }catch (e) {

                }

                try{
                    bool4and5ligne1=model.grid[j][i]===model.grid[j-1][i] && model.grid[j][i]===model.grid[j-2][i] && model.grid[j][i]===model.grid[j+1][i] && model.grid[j][i]===model.grid[j+2][i];
                }catch (e) {

                }

                if (bool4and5ligne1){
                    do {
                        perc+=20;
                        model.addPoints(1000*level);
                        for (let h = 2; h >=0 ; h--) {
                            view.deleteCell(j-h, view.grid[j-h][i]);
                            model.deleteCell(j-h, i);
                            view.addCell(j-h, model.addCell(j-h));
                        }

                        for (let h = 2; h >=1 ; h--) {
                            view.deleteCell(j+h, view.grid[j+h][i]);
                            model.deleteCell(j+h, i);
                            view.addCell(j+h, model.addCell(j+h));
                        }
                    }while(!bool4and5ligne1);
                    swapped=true;
                }else if (bool3and4ligne1){
                    do {
                        model.addPoints(300*level);
                        perc+=20;
                        for (let h = 3; h >=0 ; h--) {
                            view.deleteCell(j-h, view.grid[j-h][i]);
                            model.deleteCell(j-h, i);
                            view.addCell(j-h, model.addCell(j-h));
                        }

                        for (let h = 1; h >=1 ; h--) {
                            view.deleteCell(j+h, view.grid[j+h][i]);
                            model.deleteCell(j+h, i);
                            view.addCell(j+h, model.addCell(j+h));
                        }
                    }while(!bool3and4ligne1);
                    swapped=true;
                }
                else if (bool12and3ligne1){
                    //view.swapCells(view.grid[gridcol1][gridrow1], view.grid[gridcol2][gridrow2]);
                    do {
                        model.addPoints(100*level);
                        perc+=20;
                        for (let h = 2; h >=0 ; h--) {
                            view.deleteCell(j-h, view.grid[j-h][i]);
                            model.deleteCell(j-h, i);
                            view.addCell(j-h, model.addCell(j-h));
                        }
                    }while (!bool12and3ligne1);
                    swapped=true;
                    console.table(model.grid);
                }

            }
        }
        return swapped;
    }

    verifColumns(swapped) {
        for (let j = 0; j <8 ; j++) {
            for (let i = 2; i <8 ; i++) {
                let bool12and3ligne1=model.grid[j][i]===model.grid[j][i-1] && model.grid[j][i]===model.grid[j][i-2];
                let bool3and4ligne1=model.grid[j][i]===model.grid[j][i-1] && model.grid[j][i]===model.grid[j][i-2] && model.grid[j][i]===model.grid[j][i+1];
                let bool4and5ligne1=model.grid[j][i]===model.grid[j][i-1] && model.grid[j][i]===model.grid[j][i-2] && model.grid[j][i]===model.grid[j][i+1] && model.grid[j][i]===model.grid[j][i+2];

                if (bool4and5ligne1){
                    do {
                        model.addPoints(1000*level);
                        perc+=20;
                        for (let h = 0; h < 5; h++) {
                            view.deleteCell(j, view.grid[j][i+2]);
                            model.deleteCell(j, i+2);
                            view.addCell(j, model.addCell(j));
                        }
                    }while(bool4and5ligne1);
                    swapped=true;
                }else if (bool3and4ligne1){
                    do {
                        model.addPoints(300*level);
                        perc+=20;
                        for (let h = 0; h < 4; h++) {
                            view.deleteCell(j, view.grid[j][i+1]);
                            model.deleteCell(j, i+1);
                            view.addCell(j, model.addCell(j));
                        }
                    }while(!bool3and4ligne1);
                    swapped=true;
                }
                else if (bool12and3ligne1){
                    do {
                        console.log("ligne1");
                        console.log(bool12and3ligne1);
                        console.log(bool3and4ligne1);
                        console.log(bool4and5ligne1);
                        console.log("indice"+i);

                        console.log("hello");
                        //view.swapCells(view.grid[gridcol1][gridrow1], view.grid[gridcol2][gridrow2]);
                        model.addPoints(100*level);
                        perc+=20;
                        for (let h = 2; h >=0 ; h--) {
                            view.deleteCell(j, view.grid[j][i]);
                            model.deleteCell(j, i);
                            view.addCell(j, model.addCell(j));
                        }
                        //console.table(model.grid);
                    }while(!bool12and3ligne1);
                    swapped=true;
                }
            }

        }
        return swapped;
    }
};