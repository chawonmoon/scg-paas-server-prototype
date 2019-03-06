// eslint-disable-next-line
function dispatchEventToApp(eventName, eventData) {
  // eslint-disable-next-line
  alert('dispatchEventToApp : ' + eventName);
  $(window).trigger(eventName, [eventData]);
}
