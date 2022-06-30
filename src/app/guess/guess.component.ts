import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {

  // gameコンポーネントから引き継がれた値
  @Input() player1Num: number;
  
  // 現在のplayer名
  @Input() currentPlayer: String;

  // player2の数字
  @Input() currentNum: number;

  selectedMessage: string;
  
  // asetsに後で差し替え
  nowImg!: any;
  images: {[key: string]: string} = {
    'offBy0': "https://cdn-ak.f.st-hatena.com/images/fotolife/h/happyreina/20220629/20220629160606.png",
    'offBy1-2': "https://cdn-ak.f.st-hatena.com/images/fotolife/h/happyreina/20220630/20220630015939.png",
    'offBy3-4': 'https://cdn-ak.f.st-hatena.com/images/fotolife/h/happyreina/20220630/20220630015943.png',
    'offBy5-9': 'https://cdn-ak.f.st-hatena.com/images/fotolife/h/happyreina/20220630/20220630015946.png',
    'offBy10-24': 'https://cdn-ak.f.st-hatena.com/images/fotolife/h/happyreina/20220630/20220630015950.png',
    'offBy25-49': 'https://cdn-ak.f.st-hatena.com/images/fotolife/h/happyreina/20220630/20220630015957.png',
    'offBy50+': 'https://cdn-ak.f.st-hatena.com/images/fotolife/h/happyreina/20220630/20220630025319.png',
  }

  offByMessage: {[key: string]: string} = {
    'offBy0': 'せいかいおめでとう！ きみならやれるとおもってたよ',
    'offBy1-2': 'おしい！ 1 - 2 はなれてるよ',
    'offBy3-4': 'もうすこし！ 3 - 4 はなれてるよ',
    'offBy5-9': 'まだまだ！5 - 9 はなれてるよ',
    'offBy10-24': 'がんばれ！ 10 - 24 はなれてるよ',
    'offBy25-49': 'きあいだ！ 25 - 49 はなれてるよ',
    'offBy50+': 'はなれすぎて（笑） 50 いじょうはなれてるよ',
    
  }
  

  constructor(
    private messageService: MessageService,
  ) { }
  ngOnInit() {
  }

  ngOnChanges() {

    // 判定する
    this.judge();

  }
  // currentPlayerがplayer2かどうか
  isPlayer2() {
    return this.currentPlayer == 'player2' && this.currentNum != undefined;
  }

 
  // 判定する
  judge() {

    let difference = Math.abs(this.currentNum - this.player1Num);
    if (this.isPlayer2()) {
      let offby = "";
      if (difference == 0) offby = 'offBy0';
      else if (difference < 2) offby = 'offBy1-2';
      else if (difference < 5) offby = 'offBy3-4';
      else if (difference < 10) offby = 'offBy5-9';
      else if (difference < 25) offby = 'offBy10-24';
      else if (difference < 50) offby = 'offBy25-49';
      else offby = 'offBy50+';

      this.selectImg(offby);
      this.selectMessage(offby);
    } 
  }


  // 結果に応じて画像を表示
  selectImg(offby: string): void {
    this.nowImg = this.images[`${offby}`];
  }
  // 結果に応じてメッセージを表示
  selectMessage(offby:string): void {
    this.selectedMessage = this.offByMessage[offby];
    // messageServiceにメッセージを追加add
    this.messageService.add(this.selectedMessage);
  }


}