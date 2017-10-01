///<reference path="../../../node_modules/@types/node/index.d.ts"/>
import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import {Http} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    public zoom = 15;
    public opacity = 1.0;
    public width = 5;

    increaseZoom() {
        this.zoom  = Math.min(this.zoom + 1, 18);
        console.log('zoom: ', this.zoom);
    }

    decreaseZoom() {
        this.zoom  = Math.max(this.zoom - 1, 1);
        console.log('zoom: ', this.zoom);
    }

    increaseOpacity() {
        this.opacity  = Math.min(this.opacity + 0.1, 1);
        console.log('opacity: ', this.opacity);
    }

    decreaseOpacity() {
        this.opacity  = Math.max(this.opacity - 0.1, 0);
        console.log('opacity: ', this.opacity);
    }
  /**
   * Set our default values
   */
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
    private http: Http
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
      /**
       * this.title.getData().subscribe(data => this.data = data);
       */
      var options = new RequestOptions({
          headers: new Headers({
              'content-type': 'application/json'
          })
      });
      let link: string;
      link = 'https://worood-iot-automotive-starter-iot-automotive-starter.mybluemix.net/user/driverInsights/behaviors/latest';
    this.http.get(link, options)
          .subscribe((data1) => {
              // this.provider.token = JSON.parse(data1["_body"]);
              // this.provider.token = this.provider.token["token"];
              console.log(JSON.parse(data1['_body']));
          }, (error) => {
              console.log('error');
          });
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
