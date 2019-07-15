import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToasterModule, } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ToasterHelperService } from 'src/helpers/toaster-helper';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CategoriesComponent } from './categories/categories-component';
import { CategoryEditComponent } from './categories/category-edit/category-edit-component';
import { WebPagesComponent } from './web-pages/web-pages-component';
import { WebPageEditComponent } from './web-pages/web-page-edit/web-page-edit-component';
import { DashboardComponent } from './dashboard/dashboard-component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoryService } from 'src/services/category-service';
import { PageService } from 'src/services/page-service';
import { DashboardService } from 'src/services/dashboard-service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryEditComponent,
    WebPagesComponent,
    WebPageEditComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    DragDropModule,
    ToasterModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'categories', component: CategoriesComponent },
      { path: 'category-edit/:id', component: CategoryEditComponent },
      { path: 'web-pages', component: WebPagesComponent },
      { path: 'web-page-edit/:id', component: WebPageEditComponent },
      { path: 'dashboard', component: DashboardComponent }
    ])
  ],
  providers: [ToasterHelperService, CategoryService, PageService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
