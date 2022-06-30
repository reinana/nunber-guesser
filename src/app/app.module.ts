import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GuessComponent } from './guess/guess.component';
import { MessageComponent } from './message/message.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [ AppComponent, GameComponent, GuessComponent, MessageComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
