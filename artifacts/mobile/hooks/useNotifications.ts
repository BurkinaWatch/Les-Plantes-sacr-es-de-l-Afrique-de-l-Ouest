/**
 * useNotifications — Expo push notifications helper.
 *
 * Responsibilities:
 *  - Request permission on first call (native only)
 *  - Expose a helper to schedule an immediate local notification
 *  - Expose the Expo push token (for future remote push via API server)
 */
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Constants, { AppOwnership, ExecutionEnvironment } from 'expo-constants';
import type * as Notifications from 'expo-notifications';

type NotificationsApi = typeof Notifications;

let notificationsApi: NotificationsApi | null = null;

function loadNotificationsApi(): NotificationsApi | null {
  if (notificationsApi) return notificationsApi;

  try {
    // Keep the native module out of Expo Go: Android remote notifications are
    // unavailable there and the module logs an error during import.
    notificationsApi = require('expo-notifications') as NotificationsApi;
  } catch {
    notificationsApi = null;
  }

  return notificationsApi;
}

function isExpoGo() {
  return (
    Constants.appOwnership === AppOwnership.Expo ||
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient
  );
}

export interface UseNotificationsReturn {
  /** Expo push token — undefined until retrieved, null if unavailable */
  pushToken: string | null | undefined;
  /** Schedule an immediate local notification */
  scheduleLocalNotification: (title: string, body: string) => Promise<void>;
  /** Whether permission has been granted */
  hasPermission: boolean;
}

export function useNotifications(): UseNotificationsReturn {
  const [pushToken, setPushToken] = useState<string | null | undefined>(undefined);
  const [hasPermission, setHasPermission] = useState(false);
  const listenerRef = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    // Notifications are not supported on web
    // Expo Go no longer supports remote push notifications. Local
    // notifications remain available, so only skip the remote-token setup.
    const runningInExpoGo = isExpoGo();

    if (Platform.OS === 'web' || runningInExpoGo) {
      setPushToken(null);
      return;
    }

    const notifications = loadNotificationsApi();
    if (!notifications) {
      setPushToken(null);
      return;
    }

    // How delivered notifications appear while the app is in the foreground.
    notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    let cancelled = false;

    async function setup() {
      try {
        // Request permission
        // Cast to any because PermissionResponse from 'expo' may not resolve in
        // all TypeScript configs; the runtime shape always has `granted: boolean`.
         const existingPerms = await notifications.getPermissionsAsync() as any;
        let granted: boolean = existingPerms.granted as boolean;

        if (!granted) {
           const newPerms = await notifications.requestPermissionsAsync() as any;
          granted = newPerms.granted as boolean;
        }

        if (!cancelled) setHasPermission(granted);

        if (!granted) {
          if (!cancelled) setPushToken(null);
          return;
        }

        // Android: create a notification channel
        if (Platform.OS === 'android') {
           await notifications.setNotificationChannelAsync('plantes-sacrees', {
            name: 'Plantes Sacrées',
            importance: notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#D4A017',
            sound: 'default',
          });
        }

        // Retrieve the Expo push token (requires a physical device or simulator with push support)
        try {
          const projectId = Constants.expoConfig?.extra?.eas?.projectId;
          if (!projectId) {
            if (!cancelled) setPushToken(null);
            return;
          }

          const tokenData = await notifications.getExpoPushTokenAsync({ projectId });
          if (!cancelled) setPushToken(tokenData.data);
        } catch {
          // Simulators and Expo Go on some platforms don't support remote push tokens
          if (!cancelled) setPushToken(null);
        }
      } catch {
        if (!cancelled) setPushToken(null);
      }
    }

    setup();

    // Listen for notification taps (brings app to foreground)
    listenerRef.current = notifications.addNotificationResponseReceivedListener(
      (_response) => {
        // Future: navigate to the relevant screen based on response.notification.request.content.data
      }
    );

    return () => {
      cancelled = true;
      listenerRef.current?.remove();
    };
  }, []);

  const scheduleLocalNotification = async (title: string, body: string) => {
    if (Platform.OS === 'web' || isExpoGo()) return;
    const notifications = loadNotificationsApi();
    if (!notifications) return;

    try {
      await notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
          ...(Platform.OS === 'android' ? { channelId: 'plantes-sacrees' } : {}),
        },
        trigger: null, // fire immediately
      });
    } catch {
      // Silently ignore — notifications are enhancement, not critical path
    }
  };

  return { pushToken, scheduleLocalNotification, hasPermission };
}
