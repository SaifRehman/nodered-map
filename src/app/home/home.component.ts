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

    let link = "https://worood-iot-automotive-starter-iot-automotive-starter.mybluemix.net/user/driverInsights/behaviors/latest";
    let options = new RequestOptions({
          headers: new Headers({
              Accept: 'application/json'
          })
      });
    this.http.get(link, options)
          .subscribe((data1) => {
        console.log(JSON.parse(data1['_body']));
              // this.provider.status= JSON.parse(data1["_body"]);
              // this.provider.status  = this.provider.status["quotes"];
              // console.log(this.provider.status);
          },(error) => {
              console.log('error');
          });
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
