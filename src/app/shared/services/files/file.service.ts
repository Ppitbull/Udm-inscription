import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    SERVER_URL: string = '{Server URL}';
    constructor(private httpClient: HttpClient) { }

    // tslint:disable-next-line:typedef
    public upload(formData) {
        return this.httpClient.post<any>(this.SERVER_URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }
    
}
