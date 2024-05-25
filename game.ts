import { Board, MoveRequest } from "./interfaces"
export class Game {
    board: Board;
    constructor(){
        this.board = new createInitialBoard().create();
    }
    isValidState(request: MoveRequest): boolean{
        let curr = request.current;
        let final = request.final;
        let currPos = String(curr[0])+curr[1];
        let finalPos = String(final[0])+final[1];
        let currPiece = this.board.state[currPos];
        console.log(currPiece);
        let pieceSplit = currPiece.split('_');
        let pieceType = pieceSplit[0];
        let pieceColor = pieceSplit[1];
        const validStates = this.getValidStates(curr, pieceType, pieceColor);
        console.log(validStates);
        if(validStates.has(finalPos)){
            this.board.state[finalPos] = currPiece;
            delete this.board.state[currPos];
            return true;
        }
        return false;
    }

    getValidStates(curr: number[], pieceType: string,pieceColor: string){
        let validStates = new Set();
        if(pieceType == "Pawn"){
            if(pieceColor == "B"){
                if(curr[0] + 1 < 8 && this.board.state[String(curr[0]+1)+curr[1]] == undefined) 
                validStates.add(String(curr[0]+1)+(curr[1]));
                if(curr[0]+1 < 8 && curr[1]-1 >= 0){
                    let piece = this.board.state[String(curr[0]+1)+(curr[1]-1)];
                    if(piece && piece.includes('_W'))
                    validStates.add(String(curr[0]+1)+(curr[1]-1))
                }
                if(curr[0]+1 < 8 && curr[1]+1 <8){
                    let piece  = this.board.state[String(curr[0]+1)+(curr[1]+1)];
                    if(piece && piece.includes('_W'))
                    validStates.add(String(curr[0]+1)+(curr[1]+1))
                }
            }
            if(pieceColor == "W"){
                if(curr[0] - 1 >= 0 && this.board.state[String(curr[0]-1)+curr[1]] == undefined) 
                validStates.add(String(curr[0]-1)+curr[1]);
                if(curr[0]-1 >= 0 && curr[1]-1 >= 0){
                    let piece = this.board.state[String(curr[0]+1)+(curr[1]-1)]
                    if(piece && piece.includes('_B'))
                    validStates.add(String(curr[0]+1)+(curr[1]-1))
                }
                if(curr[0]-1 >= 0 && curr[1]+1 <8){
                    let piece = this.board.state[String(curr[0]+1)+(curr[1]+1)]
                    if(piece && piece.includes('_B'))
                    validStates.add(String(curr[0]+1)+(curr[1]+1))
                }
            }

        }
        else if(pieceType == "Rook"){
            let directions = [[1,0],[0,1],[-1,0],[0,-1]];
            for(let i =0;i<directions.length;i++){
                let dr = directions[i][0];
                let dc = directions[i][1];
                let r = curr[0];
                let c = curr[1];
                while(r+dr >= 0 && r+dr < 8 && c+dc < 8 && c+dc >= 0){
                    let piece = this.board.state[String(r+dr)+(c+dc)]
                    if(pieceColor == "B" && piece && piece.includes('_B')){
                        break;
                    }
                    if(pieceColor == "W" && piece && piece.includes('_W')){
                        break;
                    }
                    if(pieceColor == "W" && piece && piece.includes('_B')){
                        validStates.add(String(r+dr)+(c+dc));
                        break;
                    }
                    if(pieceColor == "B" && piece && piece.includes('_W')){
                        validStates.add(String(r+dr)+(c+dc));
                        break;
                    }
                    validStates.add(String(r+dr)+(c+dc))
                    r = r + dr;
                    c = c+ dc;
                }
            }
        }
        else if(pieceType == "Bishop"){
            let directions = [[1,1],[-1,1],[-1,-1],[1,-1]];
            for(let i =0;i<directions.length;i++){
                let dr = directions[i][0];
                let dc = directions[i][1];
                let r = curr[0];
                let c = curr[1];
                while(r+dr >= 0 && r+dr < 8 && c+dc < 8 && c+dc >= 0){
                    let piece = this.board.state[String(r+dr)+(c+dc)];
                    if(pieceColor == "B" && piece && piece.includes('_B')){
                        break;
                    }
                    if(pieceColor == "W" && piece && piece.includes('_W')){
                        break;
                    }
                    if(pieceColor == "W" && piece && piece.includes('_B')){
                        validStates.add(String(r+dr)+(c+dc));
                        break;
                    }
                    if(pieceColor == "B" && piece && piece.includes('_W')){
                        validStates.add(String(r+dr)+(c+dc));
                        break;
                    }
                    validStates.add(String(r+dr)+(c+dc));
                    r = r + dr;
                    c = c + dc;
                }
            }
        }
        else if(pieceType == "King"){
            let directions = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]];
            for(let i =0;i<directions.length;i++){
                let dr = directions[i][0];
                let dc = directions[i][1];
                let r = curr[0];
                let c = curr[1];
                if(r+dr >= 0 && r+dr < 8 && c+dc < 8 && c+dc >= 0){
                    let piece = this.board.state[String(r+dr)+(c+dc)];
                    if(pieceColor == "B" && piece && piece.includes('_B')){
                        break;
                    }
                    if(pieceColor == "W" && piece && piece.includes('_W')){
                        break;
                    }
                    if(pieceColor == "W" && piece && piece.includes('_B')){
                        validStates.add(String(r+dr)+(c+dc));
                        break;
                    }
                    if(pieceColor == "B" && piece && piece.includes('_W')){
                        validStates.add(String(r+dr)+(c+dc));
                        break;
                    }
                    validStates.add(String(r+dr)+(c+dc));
                }
            }
        }
        else if(pieceType == "Queen"){
            let directions = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]];
            for(let i =0;i<directions.length;i++){
                let dr = directions[i][0];
                let dc = directions[i][1];
                let r = curr[0];
                let c = curr[1];
                while(r+dr >= 0 && r+dr < 8 && c+dc < 8 && c+dc >= 0){
                    let piece = this.board.state[String(r+dr)+(c+dc)];
                    if(pieceColor == "B" && piece && piece.includes('_B')){
                        break;
                    }
                    if(pieceColor == "W" && piece && piece.includes('_W')){
                        break;
                    }
                    if(pieceColor == "W" && piece && piece.includes('_B')){
                        validStates.add(String(r+dr)+(c+dc));
                        break;
                    }
                    if(pieceColor == "B" && piece && piece.includes('_W')){
                        validStates.add(String(r+dr)+(c+dc));
                        break;
                    }
                    validStates.add(String(r+dr)+(c+dc));
                    r = r + dr;
                    c = c + dc;
                }
        }
    }
    return validStates;
}
}


class createInitialBoard{
    pieces = {
        "70": 'Rook_W',
        "71": 'Knight_W',
        "72": 'Bishop_W',
        "73": 'Queen_W',
        "74": 'King_W',
        "75": 'Bishop_W',
        "76": 'Knight_W',
        "77": 'Rook_W',
        
        "60": 'Pawn_W',
        "61": 'Pawn_W',
        "62": 'Pawn_W',
        "63": 'Pawn_W',
        "64": 'Pawn_W',
        "65": 'Pawn_W',
        "66": 'Pawn_W',
        "67": 'Pawn_W',
    
        // Black pieces
        "00": 'Rook_B',
        "01": 'Knight_B',
        "02": 'Bishop_B',
        "03": 'Queen_B',
        "04": 'King_B',
        "05": 'Bishop_B',
        "06": 'Knight_B',
        "07": 'Rook_B',
    
        "10": 'Pawn_B',
        "11": 'Pawn_B',
        "12": 'Pawn_B',
        "13": 'Pawn_B',
        "14": 'Pawn_B',
        "15": 'Pawn_B',
        "16": 'Pawn_B',
        "17": 'Pawn_B',
      };
    create(){
        let intitalBoard:Board = {
            turn: "w",
            state: this.pieces
        };
        return intitalBoard;
}
}