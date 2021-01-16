import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boxes = Array(9).fill(null);
  nextPlayer: string;
  gameOver = false;
  noOneWins = false;

  constructor() {
  }

  ngOnInit(): void {
    this.startGame();
  }

  public startGame(): any {
    this.gameOver = false;
    this.noOneWins = false;
    this.nextPlayer = 'X';
    this.boxes = Array(9).fill(null);
  }

  public makeMove(idx: number): any {
    if (this.boxes[idx] === null && !this.gameOver) {
      this.boxes.splice(idx, 1, this.nextPlayer);
      this.nextPlayer = this.nextPlayer === 'X' ? 'O' : 'X';
      this.gameOver = this.checkTheWinner();
    }
  }

  public checkTheWinner(): boolean {
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of winnerLines) {
      if (this.boxes[line[0]] !== null &&
        (this.boxes[line[0]] === this.boxes[line[1]] && this.boxes[line[1]] === this.boxes[line[2]])) {
        this.nextPlayer = this.nextPlayer === 'X' ? 'O' : 'X';
        return true;
      } else {
        if (!(this.boxes.indexOf(null) > -1)) {
          this.noOneWins = true;
        }
      }
    }
  }
}
