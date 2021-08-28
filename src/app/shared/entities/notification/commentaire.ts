import { NotificationType } from "../../utils/enum/notification.enum";
import { Notification } from "./notification";

export class CommentNotification extends Notification
{
    type:NotificationType=NotificationType.COMMENT_NOTIFICATION;
}