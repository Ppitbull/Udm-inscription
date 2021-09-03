import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

    refresh = 1;

    constructor() {

    }

    showNotification(typMsg, message, time?, iconImg?) {
        if (!time) {
            time = 4000;
        }

        let from = 'top';
        let align = 'center';
        let messages: string;
        const type = ['', 'info', 'success', 'warning', 'danger'];

        if (typMsg == 'warning') {
            if (!iconImg) {
                iconImg = '<img src="../../../../assets/img/warning_icon.jpeg" class="img" alt="image" /> ';
            }
            console.log('warning note');
            $.notify({
                icon: 'fa fa-exclamation-triangle',
                message: iconImg + message,

            }, {
                    type: type[3],
                    timer: time,
                    placement: {
                        from: from,
                        align: align
                    },
                    template: '<div data-notify="container" style="border-radius: 15px 15px 15px 15px;" class="col-xl-3 col-lg-3 col-11 col-sm-3 col-md-3 alert alert-{0} alert-with-icon" role="alert">' +
                        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                        '<div class="progress" data-notify="progressbar">' +
                        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                        '</div>' +
                        '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>'
                });
        }

        else if (typMsg == 'info') {
            if (!iconImg) {
                iconImg = '<img src="../../../../assets/img/info_icon.jpeg" class="img" alt="image" /> ';
            }
            console.log('info note');
            $.notify({
                icon: 'notifications',
                message: iconImg + message,

            }, {
                    type: type[1],
                    timer: time,
                    placement: {
                        from: from,
                        align: align
                    },
                    template: '<div data-notify="container" style="border-radius: 15px 15px 15px 15px;" class="col-xl-3 col-lg-3 col-11 col-sm-3 col-md-3 alert alert-{0} alert-with-icon" role="alert">' +
                        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                        '<div class="progress" data-notify="progressbar">' +
                        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                        '</div>' +
                        '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>'
                });
        }

        else if (typMsg == 'danger') {
            if (!iconImg) {
                iconImg = '<img src="../../../../assets/img/danger_icon.png" class="img" alt="image" /> ';
            }
            console.log('danger note');
            $.notify({
                icon: 'pe-7s-close-circle',
                message: iconImg + message,

            }, {
                    type: type[4],
                    timer: time,
                    placement: {
                        from: from,
                        align: align
                    },
                    template: '<div data-notify="container" style="border-radius: 15px 15px 15px 15px;" class="col-xl-3 col-lg-3 col-11 col-sm-3 col-md-3 alert alert-{0} alert-with-icon" role="alert">' +
                        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                        '<i class="pe-7s-close-circle" data-notify="icon"></i> ' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                        '<div class="progress" data-notify="progressbar">' +
                        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                        '</div>' +
                        '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>'
                });
        }

        else if (typMsg == 'success') {
            if (!iconImg) {
                iconImg = '<img src="../../../../assets/img/good_icon.png" class="img" alt="image" /> ';
            }
            console.log('success note');
            $.notify({
                icon: 'fa fa-good',
                message: iconImg + message,

            }, {
                    type: type[2],
                    timer: time,
                    placement: {
                        from: from,
                        align: align
                    },
                    template: '<div data-notify="container" style="border-radius: 15px 15px 15px 15px;" class="col-xl-3 col-lg-3 col-11 col-sm-3 col-md-3 alert alert-{0} alert-with-icon" role="alert">' +
                        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                        '<span data-notify="title" text-center>{1}</span> ' +
                        '<span data-notify="message" text-center>{2}</span>' +
                        '<div class="progress" data-notify="progressbar">' +
                        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                        '</div>' +
                        '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>'
                });
        }

    }

    refreshFonct() {
        if (this.refresh == 1) {
            window.location.reload();
            this.refresh = 0;
        }
    }
}
