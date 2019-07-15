import { FormBuilder } from '@angular/forms';
import { ToasterHelperService } from 'src/helpers/toaster-helper';
import { BaseComponent } from '../base/base-component';
import { Component, Inject } from '@angular/core';
import { DashboardService } from 'src/services/dashboard-service';
import { PageService } from 'src/services/page-service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard-view.html',
  styleUrls: ['./dashboard.css']
})


export class DashboardComponent extends BaseComponent
{
  public data = "";
  public title = "";
  public list: PageCategory[];
  public cardVisibile: boolean;
  public webPageId: string;

  constructor(@Inject('BASE_URL') baseUrl: string, formBuilder: FormBuilder, toasterService: ToasterHelperService,
    private _service: DashboardService, private _pageService: PageService)
  {
    super(baseUrl, formBuilder, toasterService);

    this.populateData();
    this.cardVisibile = false;
    this.list = new Array<PageCategory>();
  }

  private populateData(): void
  {
    this._service.getPageCategories()
      .then((t) =>
      {
        this.list = t;
        console.log(this.list);
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });
  }

  public GetWebPageData(webPageId: number): void
  {
    this._pageService.getPage(webPageId)
      .then((t) =>
      {
        this.data = t.webPageContent;
        this.title = t.webPageTitle;
        this.cardVisibile = true;
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });
  }
}


interface PageCategory
{
  WebPageCategoryName: string,
  WebPages: Array<WebPage>,
  ChildCategories: Array<PageCategory>
}

interface WebPage
{
  id: number;
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
