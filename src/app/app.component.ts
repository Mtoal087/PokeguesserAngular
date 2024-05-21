import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeService } from './poke.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.fetchPoke();
  }

  @ViewChild('pokeGuess') pokeGuessField!: ElementRef;
  ngAfterViewInit() {
    this.pokeGuessField.nativeElement.focus();
  }

  decideEnter(poke: string): void {
    if (this.guessed) {
      this.fetchPoke();
    } else {
      this.guessPoke(poke);
    }
  }

  poke = '';
  sprite = null;
  title = 'pokeguesser';
  constructor(private pokeService: PokeService) {}
  fetchPoke(): void {
    this.pokeGuessField.nativeElement.focus();
    this.guess = '';
    this.guessed = false;
    this.pokeService.getPoke().subscribe((data: any) => {
      this.poke = data.name;
      this.sprite = data.sprites.front_default;
    });
  }

  guessed = false;
  correct = false;
  guess = '';

  guessPoke(poke: string) {
    this.guessed = true;
    this.correct = this.guess.toLowerCase() === poke;
  }

  onKey(event: any) {
    this.guess = event.target.value;
  }
}
