import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
  selector: "[no-header-tabs]",
})
export class HeaderLessTabsDirective implements OnInit {
  constructor(private eleRef: ElementRef) {
  }

  ngOnInit(): void {
    this.eleRef.nativeElement.firstChild.style.display = "none";
  }
}
