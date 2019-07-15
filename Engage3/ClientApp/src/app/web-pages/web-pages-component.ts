import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToasterHelperService, } from 'src/helpers/toaster-helper';
import { BaseComponent } from '../base/base-component';
import { PageService } from 'src/services/page-service';

@Component({
  selector: 'web-pages',
  templateUrl: './web-pages-view.html'
})


export class WebPagesComponent extends BaseComponent
{
  public webPages: WebPage[];

  constructor(@Inject('BASE_URL') baseUrl: string, formBuilder: FormBuilder, toasterService: ToasterHelperService, private _service: PageService)
  {
    super(baseUrl, formBuilder, toasterService);

    this.populateData();
  }

  private populateData(): void
  {
    this._service.getPages()
      .then((t) =>
      {
        this.webPages = t;
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });
  }
}


interface WebPage
{
  id: number;
  webPageCategoryId: number;
  webPageName: string;
  webPageTitle: string;
  webPageContent: string;
}

