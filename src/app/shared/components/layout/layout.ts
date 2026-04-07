import { Component, EventEmitter, Output } from '@angular/core';
//
import { Profile } from '../profile/profile';
import { Sections } from '../sections/sections';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'layout',
  imports: [Profile, Sections, Navbar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
