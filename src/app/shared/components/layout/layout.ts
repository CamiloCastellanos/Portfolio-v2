import { Component } from '@angular/core';
//
import { Profile } from '../profile/profile';
import { Sections } from '../sections/sections';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'layout',
  imports: [Profile, Sections, Navbar, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
