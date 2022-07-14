import {ErrorHandler, Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class SimpleErrorHandler implements ErrorHandler{
  constructor() {
  }

  handleError(error: any) {
    console.log(error)
  }
}
