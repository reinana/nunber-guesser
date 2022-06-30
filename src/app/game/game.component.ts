import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from '../message.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //最小値最大値
  minValue: number = 1;
  maxValue: number = 100;

  // h2タグ文のリスト
  gameMessage: string[] = [
    
    `${this.minValue} から ${this.maxValue} のすうじをいれて、けっていボタンをおしてね！`,
    "player1がきめたすうじをあてよう！"
  ]

  // h2タグ文
  currentMessage: string = this.gameMessage[0];

  // 現在のplayer
  currentPlayer: string = "player1";

  // formのコントロール
  playerControl:FormControl;

  // player1の数字
  player1Num:number;

  //player2の数字
  currentNum: number;

  isCorrect: boolean;

  // player1の数字を見えなくするための変数
  nowClass: any;
  
  constructor(
    private messageService : MessageService
  ) { }
  
  ngOnInit() {
    this.currentMessage = this.gameMessage[0];
    this.currentPlayer = "player1";
    this.playerControl = new FormControl(1,[Validators.min(this.minValue), Validators.max(this.maxValue)]);
    this.player1Num = 1;
    this.currentNum = null;
    this.isCorrect = false;
    this.nowClass = {
      'transparent' : false
    }
    this.messageService.clear();
  }

  // 数字を見えなくする
  check(c: any) {
    this.nowClass.transparent = c;
  }

  // 決定ボタンをおす
  onSubmit() {

    //player1の処理
    if(this.currentPlayer == "player1") {

      // 数字を保存 → gameコンポーネントに渡す
      this.player1Num = this.playerControl.value;
  
      // 現在のプレイヤーを2に変更
      this.currentPlayer = "player2";
  
      // h2タグをpler2用に変更
      this.currentMessage = this.gameMessage[1];

      // 数字を見えるように変更
      this.nowClass.transparent = false;
  
    }
    
    // player2の処理
    else {
      //現在の数字を保存 → gameコンポーネントに渡す
      this.currentNum = this.playerControl.value;
      // 判定する
      this.isCorrect = this.player1Num - this.currentNum == 0;
     
      
    }
    
    //formをクリア
    this.clear();
  }

  restart() {
    this.ngOnInit();
  }



  // formをクリア
  clear() {
    this.playerControl = new FormControl(1,[Validators.min(this.minValue), Validators.max(this.maxValue)]);
  }

}