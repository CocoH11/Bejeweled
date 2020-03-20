let View= class View{
    container;
    grid;
    listPictures;
    cellSelected;
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
        this.listPictures=[];
        this.container=document.getElementById('content');
        this.cellSelected=null;
        this.createGrid();
    }

    createGrid(){
        for (let j = 0; j <8; j++) {
            let line=this.grid[j];
            for (let i = 0; i <8; i++) {
                let cel;
                cel=document.createElement("div");
                cel.style.gridColumn=(j+1).toString();
                cel.style.gridRow=(i+1).toString();
                //cel.style.backgroundColor="red";
                //A ajouter dans le controlleur plus tard
                //cel.onclick=function () {
                    //view.deleteCell(j, this);
                    //view.addCell(j);
                    /*if (view.cellSelected==null)view.cellSelected=this;
                    else{
                        view.swapCells(view.cellSelected, this);
                        view.cellSelected=null;
                    }*/
                //};
                this.container.append(cel);
                line.push(cel);
            }
        }
    }

    deleteCell(indiceCol, cell){
        let indiceRow=this.grid[indiceCol].indexOf(cell);
        this.grid[indiceCol].splice(indiceRow, 1)[0].remove();
        for (let i = 0; i <indiceRow ; i++) {
            //this.grid[indiceCol][i].style.backgroundColor="green";
            this.grid[indiceCol][i].style.gridRow=(parseInt(this.grid[indiceCol][i].style.gridRow)+1).toString();
        }
        //console.log(this.grid[indiceCol]);
    }

    addCell(indiceCol, indiceColor){
        let cel=document.createElement("div");
        cel.style.gridColumn=(indiceCol+1).toString();
        cel.style.gridRow=(1).toString();
        this.putPictureonCell(cel, indiceColor);
        //cel.style.backgroundColor="black";
        cel.onclick=function () {
            controller.actionGame(cel);
        };
        this.container.append(cel);
        this.grid[indiceCol].unshift(cel);
        return cel;
    }

    swapCells(firstCell, secondCell){
        let locationFirstCell= [parseInt(firstCell.style.gridColumn), parseInt(firstCell.style.gridRow)];
        let locationSecondCell= [parseInt(secondCell.style.gridColumn), parseInt(secondCell.style.gridRow)];
        this.grid[locationFirstCell[0]-1][locationFirstCell[1]-1]=secondCell;
        this.grid[locationSecondCell[0]-1][locationSecondCell[1]-1]=firstCell;
        firstCell.style.gridColumn=locationSecondCell[0].toString();
        firstCell.style.gridRow=locationSecondCell[1].toString();
        secondCell.style.gridColumn=locationFirstCell[0].toString();
        secondCell.style.gridRow=locationFirstCell[1].toString();
    }

    putPictureonCell(cell, index){
        let picture;
        switch (index) {
            case 0:
                picture="images/boba-fett_icon-icons.com_76958.png";
                break;
            case 1:
                picture="images/c3p0_icon-icons.com_76936.png";
                break;
            case 2:
                picture="images/chewbacca_icon-icons.com_76942.png";
                break;
            case 3:
                picture="images/darth-maul_icon-icons.com_76953.png";
                break;
            case 4:
                picture="images/darth-vader_icon-icons.com_76959.png";
                break;
            case 5:
                picture="images/jabba-the-hutt_icon-icons.com_76950.png";
                break;
            case 6:
                picture="images/red-five_icon-icons.com_76957.png";
                break;
            case 7:
                picture="images/stormtrooper_icon-icons.com_76962.png";
                break;
        }
        let node=document.createElement("img");
        node.src=picture;
        cell.appendChild(node);
        //cell.style.backgroundColor=picture;
    }

    selectCell(cell){
        cell.style.borderColor="red";
        cell.style.borderWidth="5px";
    }
};