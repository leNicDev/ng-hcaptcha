import { Component } from "@angular/core";
import { environment } from "../environments/environment";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "hc-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  appVersion = environment.version;
}
