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
import * as Notifications from 'expo-notifications';

// How delivered notifications appear while the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

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
    if (Platform.OS === 'web') {
      setPushToken(null);
      return;
    }

    let cancelled = false;

    async function setup() {
      try {
        // Request permission
        // Cast to any because PermissionResponse from 'expo' may not resolve in
        // all TypeScript configs; the runtime shape always has `granted: boolean`.
        const existingPerms = await Notifications.getPermissionsAsync() as any;
        let granted: boolean = existingPerms.granted as boolean;

        if (!granted) {
          const newPerms = await Notifications.requestPermissionsAsync() as any;
          granted = newPerms.granted as boolean;
        }

        if (!cancelled) setHasPermission(granted);

        if (!granted) {
          if (!cancelled) setPushToken(null);
          return;
        }

        // Android: create a notification channel
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('plantes-sacrees', {
            name: 'Plantes Sacrées',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#D4A017',
            sound: 'default',
          });
        }

        // Retrieve the Expo push token (requires a physical device or simulator with push support)
        try {
          const tokenData = await Notifications.getExpoPushTokenAsync({
            projectId: 'ed9dd362-3b1f-4207-9a47-48059ecaf683',
          });
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
    listenerRef.current = Notifications.addNotificationResponseReceivedListener(
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
    if (Platform.OS === 'web') return;
    try {
      await Notifications.scheduleNotificationAsync({
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
