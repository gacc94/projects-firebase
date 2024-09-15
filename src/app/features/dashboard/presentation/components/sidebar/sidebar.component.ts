import { Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUserState } from '@app/shared/states/interfaces';
import { AppRoutes } from '@app/utils/libraries/app-routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterLinkActive, RouterLink, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  user = input<IUserState | undefined>();

  routeSavingRecord = AppRoutes.DASH_SAVING_RECORD

}
