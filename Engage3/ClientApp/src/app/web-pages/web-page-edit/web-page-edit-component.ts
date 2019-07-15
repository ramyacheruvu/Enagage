import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToasterHelperService } from 'src/helpers/toaster-helper';
import { BaseComponent } from '../../base/base-component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Params, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/services/category-service';
import { PageService } from 'src/services/page-service';

@Component({
  selector: 'web-page-edit',
  templateUrl: './web-page-edit-view.html'
})


export class WebPageEditComponent extends BaseComponent implements OnInit
{
  public Editor = ClassicEditor;
  public categories: Category[];
  public webPageForm: any;
  private Id;

  public ngOnInit(): void
  {
    this.route.params.forEach((params: Params) =>
    {
      this.Id = params['id'];

      if (!this.Id)
        this.addNewForm();
      else
        this.populateData();
    });
  }

  constructor(@Inject('BASE_URL') baseUrl: string, formBuilder: FormBuilder, toasterService: ToasterHelperService,
    private route: ActivatedRoute, private _categoryservice: CategoryService, private _service: PageService)
  {
    super(baseUrl, formBuilder, toasterService);

    this.initializeForm();
    this.populateCategoriesData();
  }

  private initializeForm(): void
  {
    this.webPageForm = this._formBuilder.group({
      id: 0,
      webPageCategoryId: [null, Validators.required],
      webPageName: [null, Validators.required],
      webPageTitle: [null, Validators.required],
      webPageContent: [null, Validators.required]
    });
  }

  private populateCategoriesData(): void
  {
    this._categoryservice.getCategories()
      .then((t) =>
      {
        this.categories = t;
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });
  }

  public save(): void
  {
    const data = this.webPageForm.value;
    this._service.createorUpdatePage(data)
      .then(() =>
      {
        this._toasterService.popSaveSuccessToast();
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });

  }

  public populateData(): void
  {
    this._service.getPage(this.Id)
      .then((t) =>
      {
        this.webPageForm.patchValue({
          webPageCategoryId: t.webPageCategoryId,
          id: t.id,
          webPageName: t.webPageName,
          webPageTitle: t.webPageTitle,
          webPageContent: t.webPageContent
        });
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });
  }

  public addNewForm(): void
  {
    this.webPageForm.patchValue({
      id: 0
    });
  }
}

interface WebPage
{
  id: string;
  webPageCategoryId: number;
  webPageName: string;
  webPageTitle: string;
  webPageContent: string;
}

interface Category
{
  id: number;
  webPageCategoryName: string;
  parentCategoryId: number;
}
