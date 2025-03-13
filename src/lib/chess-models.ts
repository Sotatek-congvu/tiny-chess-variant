// Chess piece types
export enum PieceType {
  KING = 'king',
  QUEEN = 'queen',
  ROOK = 'rook',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  PAWN = 'pawn'
}

// Chess piece colors
export enum PieceColor {
  WHITE = 'white',
  BLACK = 'black'
}

// Chess piece representation
export interface ChessPiece {
  id: string;
  type: PieceType;
  color: PieceColor;
  hasMoved: boolean;
}

// Position on the board
export interface Position {
  row: number;
  col: number;
}

// Represent a move
export interface Move {
  from: Position;
  to: Position;
  piece: ChessPiece;
  capturedPiece?: ChessPiece;
  isPromotion?: boolean;
  promoteTo?: PieceType;
  isCheck?: boolean;
  isCheckmate?: boolean;
  isDropped?: boolean;
}

// Store captured pieces that can be dropped back
export interface PieceBank {
  [PieceColor.WHITE]: ChessPiece[];
  [PieceColor.BLACK]: ChessPiece[];
}

// Game state
export interface GameState {
  board: (ChessPiece | null)[][];
  currentPlayer: PieceColor;
  moveHistory: Move[];
  selectedPiece: Position | null;
  validMoves: Position[];
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  lastMove: Move | null;
  pieceBank: PieceBank;
  isDroppingPiece?: boolean;
}

// Game initialization with 6x6 board and limited pieces as per image
export const createInitialBoard = (): (ChessPiece | null)[][] => {
  // Create 6x6 board
  const board: (ChessPiece | null)[][] = Array(6).fill(null).map(() => Array(6).fill(null));
  
  // Setup pawns at opposite corners of the board
  board[1][5] = { 
    id: `white-pawn-0`, 
    type: PieceType.PAWN, 
    color: PieceColor.WHITE,
    hasMoved: false
  };
  board[4][0] = { 
    id: `black-pawn-0`, 
    type: PieceType.PAWN, 
    color: PieceColor.BLACK,
    hasMoved: false
  };
  
  // Setup white pieces at bottom row (as shown in the image)
  board[0][0] = { id: 'white-king', type: PieceType.KING, color: PieceColor.WHITE, hasMoved: false };
  board[0][1] = { id: 'white-rook', type: PieceType.ROOK, color: PieceColor.WHITE, hasMoved: false };
  board[0][2] = { id: 'white-knight', type: PieceType.KNIGHT, color: PieceColor.WHITE, hasMoved: false };
  board[0][3] = { id: 'white-bishop', type: PieceType.BISHOP, color: PieceColor.WHITE, hasMoved: false };
  
  // Setup black pieces at top row (as shown in the image)
  board[5][3] = { id: 'black-bishop', type: PieceType.BISHOP, color: PieceColor.BLACK, hasMoved: false };
  board[5][2] = { id: 'black-knight', type: PieceType.KNIGHT, color: PieceColor.BLACK, hasMoved: false };
  board[5][1] = { id: 'black-rook', type: PieceType.ROOK, color: PieceColor.BLACK, hasMoved: false };
  board[5][0] = { id: 'black-king', type: PieceType.KING, color: PieceColor.BLACK, hasMoved: false };
  
  return board;
};

export const createInitialGameState = (): GameState => {
  return {
    board: createInitialBoard(),
    currentPlayer: PieceColor.WHITE,
    moveHistory: [],
    selectedPiece: null,
    validMoves: [],
    isCheck: false,
    isCheckmate: false,
    isStalemate: false,
    lastMove: null,
    pieceBank: {
      [PieceColor.WHITE]: [],
      [PieceColor.BLACK]: []
    }
  };
};

// Check if a position is within the board bounds
export const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < 6 && pos.col >= 0 && pos.col < 6;
};

// Convert algebraic notation (e.g., "a1") to a Position object
export const algebraicToPosition = (algebraic: string): Position => {
  const col = algebraic.charCodeAt(0) - 'a'.charCodeAt(0);
  const row = parseInt(algebraic.charAt(1)) - 1;
  return { row, col };
};

// Convert a Position object to algebraic notation
export const positionToAlgebraic = (pos: Position): string => {
  const colChar = String.fromCharCode('a'.charCodeAt(0) + pos.col);
  return `${colChar}${pos.row + 1}`;
};
