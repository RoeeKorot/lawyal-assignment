import { Component } from '@angular/core';

interface NavbarButtons {
  label: string;
  routePath: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public navigationButtons: NavbarButtons[] = [
    { label: 'cities', routePath: '/weather' },
    { label: 'favorites', routePath: '/favorites' }
  ];

}
