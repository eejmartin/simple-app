import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { RecipesService } from './service/recipes.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'create', component: EditComponent },
      { path: 'edit/:id', component: EditComponent },
    ]),
  ],
  declarations: [ListComponent, EditComponent],
  providers: [RecipesService],
})
export class RecipesModule {}
