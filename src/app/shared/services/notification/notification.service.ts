import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    refresh: number = 1;

    refreshFonct() {
        if (this.refresh == 1) {
            window.location.reload();
            this.refresh = 0;
        }
    }

    showNotification(typMsg, message, time?) {
        if (!time) {
            time = 4000;
        }

        let from = 'top';
        let align = 'center';
        let messages: string;
        const type = ['', 'info', 'success', 'warning', 'danger'];

        if (typMsg == 'success') {
            $.notify({
                icon: 'fa fa-exclamation-triangle',
                message: '<b>Important: </b><br /> ' + message,

            }, {
                    type: type[3],
                    timer: time,
                    placement: {
                        from: from,
                        align: align
                    },
                    template:
                    '<div class="alert alert-success alert-dismissible" role="alert">'+
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
                        '<div class="alert-message">'+
                            '<strong>Hello there!</strong> A simple success alert—check it out!'+
                        '</div>'+
                    '</div>'
                    
                });
        }

        else if (typMsg == 'info') {
            $.notify({
                icon: 'notifications',
                message: '<b>Info !</b><br />Ongoing treatment.',

            }, {
                    type: type[1],
                    timer: time,
                    placement: {
                        from: from,
                        align: align
                    },
                    template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                        '<i class="material-icons" data-notify="icon">notifications</i> ' +
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
            $.notify({
                icon: 'pe-7s-close-circle',
                message: '<b>Désole ! </b><br /> ' + message,

            }, {
                    type: type[4],
                    timer: time,
                    placement: {
                        from: from,
                        align: align
                    },
                    template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
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
            $.notify({
                icon: 'fa fa-good',
                message: '<b>succes ! </b><br /> ' + message,

            }, {
                    type: type[2],
                    timer: time,
                    placement: {
                        from: from,
                        align: align
                    },
                    template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                        '<i class="fa fa-good" data-notify="icon"></i> ' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                        '<div class="progress" data-notify="progressbar">' +
                        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                        '</div>' +
                        '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>'
                });
        }

    }
}
