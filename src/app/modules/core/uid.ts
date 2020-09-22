export function getDeviceId(): string {
  const navigatorInfo = window.navigator;
  const screenInfo = window.screen;
  let uid = String(navigatorInfo.mimeTypes.length);
  uid += navigatorInfo.userAgent.replace(/\D+/g, '');
  uid += navigatorInfo.plugins.length;
  uid += screenInfo.height || '';
  uid += screenInfo.width || '';
  uid += screenInfo.pixelDepth || '';
  return uid;
}
