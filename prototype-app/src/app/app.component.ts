import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import data from '../assets/fake.json';
import 'pikaday';
import { AppService } from './app.service'
declare var Pikaday;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit, AfterViewInit {
  constructor(private appService: AppService) { }

  @ViewChild('datepicker', { static: false }) datepicker: ElementRef;
  title = 'prototype-app';
  pikaday: Pikaday;
  public dataComponents = data.DataComponents;

  public tree: Array<[]>;

  ngOnInit() {
    this.appService.useFormRenderer(data);
    this.tree = this.appService.tree;
  }

  ngAfterViewInit() {
    this.datePicker();
  }

  public datePicker() {
    this.pikaday = new Pikaday({
      field: this.datepicker.nativeElement
    });
  }
}
