import { Utils } from "@nativescript/core";
import { Notification } from "./badge.common";

const ShortcutBadger = me.leolin.shortcutbadger.ShortcutBadger;

export function requestPremissions(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    resolve(true);
  });
}

export function setBadge(badge: number) {
  ShortcutBadger.applyCount(Utils.ad.getApplicationContext(), badge);
}

export function removeBadge() {
  ShortcutBadger.removeCount(Utils.ad.getApplicationContext());
}

export function applyNotification(notification: Notification, badge: number, channelId?: string) {
  const NBuilder = android.app.Notification.Builder;

  const builder = new NBuilder(Utils.ad.getApplicationContext())
    .setContentTitle(notification.title)
    .setContentText(notification.body)
    .setSmallIcon(Utils.ad.getApplicationContext().getApplicationInfo().icon);

  // @ts-ignore
  if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O && channelId) {
    // @ts-ignore
    builder.setChannelId(channelId);
  }
  const androidNotification = builder.build();
  ShortcutBadger.applyNotification(Utils.ad.getApplicationContext(), androidNotification, badge);
}
