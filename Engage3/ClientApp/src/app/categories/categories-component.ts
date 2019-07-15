import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ToasterHelperService } from 'src/helpers/toaster-helper';
import { BaseComponent } from '../base/base-component';
import { CategoryService } from 'src/services/category-service';


@Component({
  selector: 'categories',
  templateUrl: './categories-view.html'
})


export class CategoriesComponent extends BaseComponent
{
  public categories: Category[];

  constructor(@Inject('BASE_URL') baseUrl: string, formBuilder: FormBuilder, toasterService: ToasterHelperService, private _service: CategoryService)
  {
    super(baseUrl, formBuilder, toasterService);

    this.populateData();
  }

  private populateData(): void
  {
    this._service.getCategories()
      .then((t) =>
      {
        this.categories = t;
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });
  }
}


interface Category
{
  id: number;
  webPageCategoryName: string;
  parentCategoryId: number;
}





