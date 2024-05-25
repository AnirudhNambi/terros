export interface Board {
    state: any;
    turn: String;
}

export interface MoveRequest {
    current: number[];
    final: number[];
}