import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';

const MaterialComponents=[MatCommonModule, MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatExpansionModule,
  MatSelectModule,
  MatCheckboxModule
];

@NgModule({
  // 
  
  imports: [
    MaterialComponents
  ],
  exports:[MaterialComponents]
})
export class MaterialModule { }
