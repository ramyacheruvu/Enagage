import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class ToasterHelperService
{
  private _toasterService: ToasterService;

  private toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    animation: 'fade',
    showCloseButton: false,
    timeout: 10000
  });

  constructor(toasterService: ToasterService)
  {
    this._toasterService = toasterService;
  }

  public popErrorToast(): void
  {
    const toast: Toast = {
      type: 'error',
      title: 'Error',
      body: 'Something is wrong. Contact adminstrator.',
    };
    this._toasterService.pop(toast);
  }

  public popErrorDependenciesToast(): void
  {
    const toast: Toast = {
      type: 'error',
      title: 'Error',
      body: 'Dependencies exisit cannot delete.',
    };
    this._toasterService.pop(toast);
  }

  public popDataNotValidToast(): void
  {
    const toast: Toast = {
      type: 'error',
      title: 'Error',
      body: 'Data is not valid.',
    };
    this._toasterService.pop(toast);
  }

  public popImportDataNotValidToast(): void
  {
    const toast: Toast = {
      type: 'error',
      title: 'Error',
      body: 'Data is not completely filled. Please enter all fields in the excel sheet',
    };
    this._toasterService.pop(toast);
  }

  public popImportFileNotValidToast(): void
  {
    const toast: Toast = {
      type: 'error',
      title: 'Error',
      body: 'File or its extension is in-valid. Please check or contact adminstrator.',
    };
    this._toasterService.pop(toast);
  }

  public popImportRowDataNotValidToast(): void
  {
    const toast: Toast = {
      type: 'error',
      title: 'Error',
      body: 'Data is not completely filled. Please check for missing fields in the excel sheet',
    };
    this._toasterService.pop(toast);
  }

  public popSaveSuccessToast(): void
  {
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Save success.',
    };
    this._toasterService.pop(toast);
  }

  public popDeleteSuccessToast(): void
  {
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Delete success.',
    };
    this._toasterService.pop(toast);
  }

  public getConfig(): ToasterConfig
  {
    return this.toasterConfig;
  }
}


@Injectable({ providedIn: 'root' })
export class HttpHelperService
{
  private headers;
  private emptyGuid: string;
  constructor()
  {

  }

  public getHeaders(): HttpHeaders
  {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    return this.headers;
  }

  public EmptyGuid(): string
  {
    this.emptyGuid = '00000000-0000-0000-0000-000000000000'
    return this.emptyGuid;
  }
}


